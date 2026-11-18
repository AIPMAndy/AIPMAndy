import { ipVersion, maskIP, readIpify, readIpwho, readCloudflare, readRisk, environmentScore, createReport } from './core.mjs';

/** Browser-side diagnostics. NO analytics, passwords, captcha or account tokens. */
const el = id => document.getElementById(id);
const state = {
  regular: null, geo: null, cloudflare: null, score: null, risk: null,
  latency: {}, webrtc: null, device: null,
  hide: true, scanning: false
};
const HISTORY_KEY = 'freeclaude-check-history-v1';
const SAVE_KEY = 'freeclaude-check-save-history-v1';
const THEME_KEY = 'freeclaude-check-theme-v1';

function text(id, value) { el(id).textContent = value == null || value === '' ? '—' : String(value); }
function pill(id, label, tone = 'neutral') {
  const node = el(id);
  node.textContent = label;
  node.className = `small-pill ${tone}`;
}
function reportError(target, err) {
  const reason = String(err?.message || err || '检测不可用');
  return `${target}：${reason.slice(0, 90)}`;
}
function showToast(message) {
  const t = el('toast');
  t.textContent = message; t.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { t.hidden = true; }, 3200);
}

async function fetchJson(url, timeout = 7200) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal, method: 'GET', cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function renderIPs() {
  const r = state.regular;
  text('regular-ip', maskIP(r?.ip, state.hide));
  text('regular-flag', state.geo?.flag || '🌐');
  text('regular-summary', r ? `HTTP 出口 · IPv${r.version} · 已从独立服务获得` : '由公开 IP 服务观测的 HTTP 出口');
  const cf = state.cloudflare;
  text('cf-ip', maskIP(cf?.ip, state.hide));
  text('cf-flag', cf?.country ? '☁️' : '🌐');
  text('cf-summary', cf ? [cf.city, cf.country, cf.colo].filter(Boolean).join(' · ') : '未读取到 Cloudflare 元信息，不能据此推断网络异常');
  text('geo-country', state.geo?.country ? `${state.geo.flag} ${state.geo.country}` : '—');
  text('geo-city', state.geo?.city);
  text('geo-region', state.geo?.region);
  text('geo-asn', state.geo?.asn);
  text('geo-isp', state.geo?.isp || state.geo?.org);
  const center = state.risk?.datacenter;
  pill('geo-type', center === true ? '已识别机房 IP' : center === false ? '未标记为机房' : '缺少可靠分类', center === true ? 'amber' : center === false ? 'green' : 'neutral');
}

function renderSecurity() {
  const risk = state.risk;
  pill('security-status', risk ? '第三方数据' : '无法取得情报', risk ? 'green' : 'amber');
  const rows = { vpn:'sec-vpn', proxy:'sec-proxy', tor:'sec-tor', crawler:'sec-crawler', abused:'sec-abuse' };
  for (const [key,id] of Object.entries(rows)) {
    const flag = risk?.[key];
    pill(id, flag === true ? '有记录' : flag === false ? '未标记' : '未检测', flag === true ? 'amber' : flag === false ? 'green' : 'neutral');
  }
}

function renderScore() {
  const value = environmentScore({
    regular: state.regular, geo: state.geo, cloudflare: state.cloudflare,
    timezone: state.device?.timezone, webrtcIPs: state.webrtc?.ips || []
  });
  state.score = value;
  const pct = value.value;
  text('score-number', pct == null ? '—' : pct);
  text('score-tag', pct == null ? '等待双源数据' : '仅供排障参考 · 非官方');
  text('score-explain', pct == null ? '至少需要两个可用 IP 数据源' : '仅表示测量信息是否一致，不表示账户安全');
  el('gauge').style.setProperty('--score', `${pct == null ? 0 : pct}%`);
  el('score-fill').style.left = `calc(${pct == null ? 0 : pct}% - 1px)`;
  const list = el('score-factors');
  list.replaceChildren(...value.factors.map(item => {
    const li = document.createElement('li'); li.textContent = item; return li;
  }));
}

function readDevice() {
  const nav = navigator;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '未知';
  const language = (nav.languages || [nav.language]).filter(Boolean).join(', ') || '未知';
  const rawUA = nav.userAgent || '';
  const browser = /Edg\//.test(rawUA) ? 'Edge' : /Firefox\//.test(rawUA) ? 'Firefox' : /CriOS|Chrome\//.test(rawUA) ? 'Chrome' : /Safari\//.test(rawUA) ? 'Safari' : '未知浏览器';
  const system = /iPhone|iPad|iPod/i.test(rawUA) ? 'iOS / iPadOS' : /Android/i.test(rawUA) ? 'Android' : /Macintosh|Mac OS X/i.test(rawUA) ? 'macOS' : /Windows/i.test(rawUA) ? 'Windows' : /Linux/i.test(rawUA) ? 'Linux' : '未知系统';
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  let webgl = '不可获取';
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const ext = ctx?.getExtension('WEBGL_debug_renderer_info');
    if (ctx && ext) webgl = ctx.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '不可获取';
    else if (ctx) webgl = ctx.getParameter(ctx.RENDERER) || '已启用 / 受隐私限制';
  } catch { /* webgl unavailable or blocked */ }
  const result = {
    timezone, language,
    ua: `${system} / ${browser}`,
    touch: nav.maxTouchPoints > 0 ? `支持（${nav.maxTouchPoints} 触点）` : '未检测到',
    network: connection?.effectiveType || '浏览器未提供',
    dnt: nav.doNotTrack === '1' ? '已开启' : nav.doNotTrack === '0' ? '未开启' : '浏览器未提供',
    webgl, canvas: '计算中…'
  };
  state.device = result;
  renderDevice();
  canvasDigest().then(hash => { result.canvas = hash; renderDevice(); }).catch(() => { result.canvas = '浏览器限制'; renderDevice(); });
}

async function canvasDigest() {
  if (!crypto?.subtle) return '不可获取（非安全上下文）';
  const canvas = document.createElement('canvas'); canvas.width = 200; canvas.height = 36;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '不可获取';
  ctx.fillStyle = '#5b7eaa'; ctx.fillRect(0, 0, 200, 36);
  ctx.font = '15px Arial'; ctx.fillStyle = '#f4edd7'; ctx.fillText('FreeClaude - local hash', 8, 24);
  const data = new TextEncoder().encode(canvas.toDataURL());
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash).slice(0, 7), x => x.toString(16).padStart(2, '0')).join('');
}

function renderDevice() {
  if (!state.device) return;
  for (const [field, id] of Object.entries({timezone:'device-timezone',language:'device-language',ua:'device-ua',touch:'device-touch',network:'device-network',dnt:'device-dnt',webgl:'device-webgl',canvas:'device-canvas'})) text(id, state.device[field]);
}

async function lookupRegular() {
  try { return readIpify(await fetchJson('https://api.ipify.org?format=json')); }
  catch { return readIpify(await fetchJson('https://api64.ipify.org?format=json')); }
}

function markScan(active) {
  state.scanning = active;
  const runButton = el('run-scan');
  runButton.disabled = active;
  runButton.classList.toggle('is-running', active);
  runButton.innerHTML = active ? '<span class="spin-icon" aria-hidden="true">↻</span> 检测中…' : '<span class="spin-icon" aria-hidden="true">↻</span> 重新检测';
  text('last-run', active ? '正在访问所列公开数据源，请勿关闭此页' : `最近检测 · ${new Date().toLocaleString('zh-CN')}`);
}

async function startScan() {
  if (state.scanning) return;
  markScan(true);
  pill('regular-status', '检测中…');
  pill('geo-status', '检测中…');
  pill('cf-status', '检测中…');
  const results = await Promise.allSettled([
    lookupRegular(),
    fetchJson('https://ipwho.is/').then(readIpwho),
    fetchJson('https://speed.cloudflare.com/meta').then(readCloudflare),
    checkLatency('claude', 'https://claude.ai/favicon.ico'),
    checkLatency('anthropic', 'https://www.anthropic.com/favicon.ico')
  ]);
  const [reg, geo, cf, clat, alat] = results;
  state.regular = reg.status === 'fulfilled' ? reg.value : null;
  state.geo = geo.status === 'fulfilled' ? geo.value : null;
  state.cloudflare = cf.status === 'fulfilled' ? cf.value : null;
  state.latency = {
    claude: clat.status === 'fulfilled' ? clat.value : {label:'检测受限'},
    anthropic: alat.status === 'fulfilled' ? alat.value : {label:'检测受限'}
  };
  pill('regular-status', state.regular ? `IPv${state.regular.version} 已取得` : '不可用', state.regular ? 'green' : 'amber');
  pill('geo-status', state.geo ? '已取得' : '不可用', state.geo ? 'green' : 'amber');
  pill('cf-status', state.cloudflare ? '已取得' : '不可读取', state.cloudflare ? 'green' : 'amber');
  renderIPs(); renderScore(); renderLatency(); renderHistory();
  // Only lookup the exact primary IP. A server observing a different IP would be misleading.
  state.risk = null;
  if (state.regular?.ip) {
    try {
      const data = await fetchJson(`https://ipsnapshot.com/api/ip/${encodeURIComponent(state.regular.ip)}`, 6600);
      const observed = readRisk(data);
      if (observed.ip !== state.regular.ip) throw new Error('IP 与常规出口不一致');
      state.risk = observed;
    } catch { state.risk = null; }
  }
  renderSecurity(); renderIPs(); renderScore();
  if (el('save-history').checked) saveSnapshot();
  markScan(false);
  const errors = [reg,geo,cf].filter(x=>x.status==='rejected');
  showToast(errors.length ? `检测完成；${errors.length} 个数据源未响应，已标记不可用` : '检测完成；数据由公开来源提供');
}

async function checkLatency(key, url) {
  const started = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort('timeout'), 8000);
  try {
    await fetch(url, { mode:'no-cors', credentials:'omit', cache:'no-store', referrerPolicy:'no-referrer', signal: controller.signal });
    const ms = Math.round(performance.now() - started);
    return { ms, label: `静态资源请求可达 · ${ms} ms`, success: true };
  } catch(err) {
    return {ms:null, label: `未能确认 · ${err?.name === 'AbortError' ? '超时' : '网络或浏览器限制'}`, success: false};
  } finally { clearTimeout(timer); }
}

function renderLatency() {
  for (const [kind, id] of Object.entries({claude:'latency-claude',anthropic:'latency-anthropic'})) {
    const item = state.latency[kind];
    const node = el(id);
    node.replaceChildren();
    const pillEl = document.createElement('span');
    pillEl.className = `small-pill ${item?.success ? 'green' : item ? 'amber' : 'neutral'}`;
    pillEl.textContent = item?.label || '未检测';
    node.append(pillEl);
  }
}
async function refreshLatency() {
  el('refresh-latency').disabled = true;
  try {
    const a = await Promise.all([
      checkLatency('claude','https://claude.ai/favicon.ico'),
      checkLatency('anthropic','https://www.anthropic.com/favicon.ico')
    ]);
    state.latency = {claude:a[0],anthropic:a[1]};
    renderLatency(); showToast('连通性测试已刷新');
  } finally { el('refresh-latency').disabled = false; }
}

function checkWebRTC() {
  return new Promise(resolve => {
    if (!window.RTCPeerConnection) { resolve({ips:[],label:'浏览器不支持 WebRTC'}); return; }
    const ips = new Set();
    const pc = new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try { pc.close(); } catch { /* ignore */ }
      const list = [...ips];
      resolve({ips:list,label:list.length ? '获得候选公网 IP（不能直接判定泄露）' : '未发现公网候选地址；不代表无泄露'});
    };
    const timer = setTimeout(finish, 5600);
    pc.addEventListener('icecandidate', event => {
      if (!event.candidate) { clearTimeout(timer); finish(); return; }
      const line = event.candidate.candidate || '';
      const parts = line.trim().split(/\s+/);
      // Only observe server-reflexive candidates, NOT private host addresses.
      if (parts.includes('srflx') && ipVersion(parts[4])) ips.add(parts[4]);
    });
    try {
      pc.createDataChannel('freeclaude-local-check');
      pc.createOffer().then(offer=>pc.setLocalDescription(offer)).catch(()=>{clearTimeout(timer);finish();});
    } catch { clearTimeout(timer); finish(); }
  });
}

async function runWebRTC() {
  const button = el('run-webrtc'); button.disabled = true;
  el('webrtc-state').textContent = '正在探测…';
  try { state.webrtc = await checkWebRTC(); }
  catch { state.webrtc = { ips:[], label:'检测失败或被浏览器阻止'}; }
  const label = state.webrtc.ips.length ? '取得 STUN 地址' : '未能确认';
  el('webrtc-state').replaceChildren();
  const tag = document.createElement('span'); tag.className = `small-pill ${state.webrtc.ips.length ? 'amber' : 'neutral'}`; tag.textContent = label;
  el('webrtc-state').append(tag);
  text('webrtc-ip', state.webrtc.ips.length ? state.webrtc.ips.map(ip=>maskIP(ip,state.hide)).join(', ') : '未发现（不等于无泄露）');
  renderScore();button.disabled = false;
  showToast('WebRTC 检测已结束，请查看状态与说明');
}

function getHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(raw) ? raw.slice(0, 20) : [];
  } catch { return []; }
}
function saveSnapshot() {
  const snapshot = {
    at: new Date().toISOString(),
    ip: state.regular?.ip || null, country:state.geo?.country || null,
    city:state.geo?.city || null, asn:state.geo?.asn || null,
    score:state.score?.value ?? null
  };
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify([snapshot,...getHistory()].slice(0,20))); }
  catch { showToast('浏览器禁用了本地历史存储'); }
  renderHistory();
}
function renderHistory() {
  const tbody = el('history-rows');
  const records = getHistory();
  if (!records.length) {
    const tr = document.createElement('tr'); const td = document.createElement('td');
    td.colSpan = 5; td.className = 'history-empty';td.textContent = '暂无历史记录。勾选“保存本机历史”后再运行检测，即可存入当前浏览器。';tr.append(td);tbody.replaceChildren(tr);return;
  }
  tbody.replaceChildren(...records.map(rec => {
    const tr = document.createElement('tr');
    const vals = [new Date(rec.at).toLocaleString('zh-CN'),maskIP(rec.ip,state.hide),[rec.country,rec.city].filter(Boolean).join(' / ')||'—',rec.asn||'—',rec.score == null?'—':`${rec.score} / 100`];
    vals.forEach(v => { const td=document.createElement('td'); td.textContent=v; tr.append(td); });
    return tr;
  }));
}
async function copyReport() {
  const report = createReport({...state, hide:state.hide});
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) await navigator.clipboard.writeText(report);
    else { const area = document.createElement('textarea');area.value=report;area.style.cssText='position:fixed;opacity:0';document.body.append(area);area.select();if (!document.execCommand('copy'))throw Error();area.remove(); }
    showToast('诊断报告已复制（遵循当前 IP 隐藏状态）');
  } catch { showToast('复制受限制，请用 HTTPS 或 localhost 打开网页'); }
}

el('run-scan').addEventListener('click', startScan);
el('refresh-latency').addEventListener('click', refreshLatency);
el('run-webrtc').addEventListener('click', runWebRTC);
el('copy-report').addEventListener('click', copyReport);
el('toggle-ip').addEventListener('click', () => {
  state.hide = !state.hide;
  const button = el('toggle-ip'); button.setAttribute('aria-pressed', String(state.hide));
  button.querySelector('span').textContent = state.hide ? '显示 IP' : '隐藏 IP';
  renderIPs(); renderHistory();
  if (state.webrtc) text('webrtc-ip', state.webrtc.ips.map(ip=>maskIP(ip,state.hide)).join(', ') || '未发现（不等于无泄露）');
});
el('toggle-theme').addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  el('toggle-theme').textContent = dark ? '☀' : '☾';
  try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch { /* optional */ }
});
el('save-history').addEventListener('change', () => {
  try { localStorage.setItem(SAVE_KEY, el('save-history').checked ? 'yes' : 'no'); } catch { /* optional */ }
});
el('clear-history').addEventListener('click', () => {
  try { localStorage.removeItem(HISTORY_KEY); } catch { /* ignore */ }
  renderHistory(); showToast('本机历史已清除');
});
try {
  el('save-history').checked = localStorage.getItem(SAVE_KEY) === 'yes';
  if (localStorage.getItem(THEME_KEY) === 'dark') {document.body.classList.add('dark');el('toggle-theme').textContent = '☀';}
} catch { /* local storage disabled */ }
readDevice(); renderIPs(); renderSecurity(); renderScore(); renderHistory(); renderLatency();
