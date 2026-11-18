/**
 * FreeClaude Check — pure data adapters, labels and heuristics.
 * These values describe observable network information. They are NEVER Anthropic
 * fraud scores, official account eligibility or an assurance of account access.
 */
export function ipVersion(ip) {
  if (typeof ip !== 'string') return null;
  const value = ip.trim();
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value)) {
    const octets = value.split('.').map(Number);
    return octets.every(n => Number.isInteger(n) && n >= 0 && n <= 255) ? 4 : null;
  }
  return /^[0-9a-f:]+$/i.test(value) && value.includes(':') && value.length >= 3 && value.length <= 45 ? 6 : null;
}

export function maskIP(ip, hidden) {
  if (!ip || typeof ip !== 'string') return '—';
  if (!hidden) return ip;
  if (ipVersion(ip) === 4) {
    return ip.split('.').map((n, i) => (i < 2 ? n : '•••')).join('.');
  }
  if (ipVersion(ip) === 6) return `${ip.slice(0, Math.min(7, ip.length))}••••:••••`;
  return '••••';
}

export function readIpify(data) {
  if (!data || ipVersion(data.ip) === null) throw new Error('IP 服务响应无有效地址');
  return { ip: data.ip, version: ipVersion(data.ip), source: 'api.ipify.org' };
}

export function readIpwho(data) {
  if (!data || data.success !== true || ipVersion(data.ip) === null) throw new Error('IP 归属数据不可用');
  return {
    ip: data.ip,
    version: ipVersion(data.ip),
    country: data.country || null,
    countryCode: data.country_code || null,
    region: data.region || null,
    city: data.city || null,
    timezone: data.timezone?.id || null,
    asn: Number.isInteger(data.connection?.asn) ? `AS${data.connection.asn}` : null,
    org: data.connection?.org || null,
    isp: data.connection?.isp || null,
    flag: typeof data.flag?.emoji === 'string' ? data.flag.emoji : '🌐',
    source: 'ipwho.is'
  };
}

export function readCloudflare(data) {
  const ip = data?.clientIp || data?.client_ip || null;
  if (ipVersion(ip) === null) throw new Error('Cloudflare 元信息无有效 IP');
  return {
    ip,
    country: data.country || null,
    city: data.city || null,
    colo: data.colo || null,
    asn: data.asn ? `AS${data.asn}` : null,
    org: data.asOrganization || null,
    source: 'speed.cloudflare.com/meta'
  };
}

/** Optional third-party IP reputation: only explicitly present booleans can be shown. */
export function readRisk(data) {
  if (!data || data.success !== true || ipVersion(data.ip) === null || !data.data) throw new Error('风险情报服务无有效响应');
  const d = data.data;
  const flag = key => typeof d[key] === 'boolean' ? d[key] : null;
  return {
    ip: data.ip,
    vpn: flag('is_vpn'),
    tor: flag('is_tor'),
    proxy: flag('is_proxy'), // optional; never assume false if absent
    crawler: flag('is_crawler'),
    abused: flag('is_abuser'),
    datacenter: flag('is_datacenter'),
    riskScore: Number.isInteger(d.risk_score) && d.risk_score >= 0 && d.risk_score <= 100 ? d.risk_score : null,
    riskLevel: typeof d.risk_level === 'string' ? d.risk_level : null,
    source: 'ipsnapshot.com',
    attribution: data.attribution || 'Geo / ASN data: DB-IP Lite (CC BY 4.0)'
  };
}

export function environmentScore({ regular, geo, cloudflare, timezone, webrtcIPs = [] }) {
  // Only two independently observed HTTP exit IPs are enough to calculate this.
  // It is a transparent consistency heuristic, NOT a security or trust score.
  if (!regular?.ip || !geo?.ip) return { value: null, title: '等待双源数据', factors: [] };
  let points = 70;
  const factors = [];
  if (regular.ip === geo.ip) {
    points += 20;
    factors.push('两个公开 IP 数据源一致 +20');
  } else {
    points -= 20;
    factors.push('两个公开 IP 数据源不同 -20（分流可能正常）');
  }
  if (timezone && geo.timezone && timezone === geo.timezone) {
    points += 10;
    factors.push('浏览器与 IP 时区文本一致 +10');
  } else {
    factors.push('时区未匹配 / 无数据 +0（可能是正常设置）');
  }
  if (cloudflare?.ip && cloudflare.ip !== regular.ip) {
    points -= 10;
    factors.push('Cloudflare 与常规出口不一致 -10（分流可能正常）');
  }
  if (webrtcIPs.some(ip => ipVersion(ip) && ip !== regular.ip)) {
    points -= 10;
    factors.push('WebRTC 候选地址与 HTTP 出口不同 -10（可能由多网卡产生）');
  }
  return {
    value: Math.max(0, Math.min(100, points)),
    title: '环境信息一致性，仅供排障参考',
    factors
  };
}

export function statusValue(value) {
  return value === true ? '检测到' : value === false ? '未检测到' : '未检测';
}

export function createReport({ regular, geo, cloudflare, score, risk, security, latency, webrtc, device, hide = false }) {
  const show = ip => maskIP(ip, hide);
  const rows = [
    'FreeClaude｜网络环境检测报告（非 Anthropic 官方）',
    `检测时间：${new Date().toLocaleString('zh-CN')}`,
    `常规出口：${show(regular?.ip)}`,
    `归属地数据源：${show(geo?.ip)}  ${[geo?.country, geo?.city, geo?.asn, geo?.org].filter(Boolean).join(' / ') || '未取得'}`,
    `Cloudflare 出口：${show(cloudflare?.ip)}（无数据不等于阻断）`,
    'Claude AI 实际出口：无法通过独立静态网页直接读取，需要目标服务侧配合',
    `环境信息一致性：${score?.value ?? '未计算'} / 100（只比较来源，不评估封号概率）`,
    `安全情报来源：${risk?.source || '未取得第三方风险情报'}；VPN：${statusValue(risk?.vpn)}；Tor：${statusValue(risk?.tor)}；代理：${statusValue(risk?.proxy)}`,
    `第三方 IP 威胁分：${risk?.riskScore ?? '无数据'}（不是 Claude 官方评分）`,
    `claude.ai 资源测试：${latency?.claude?.label || '未测'}`,
    `anthropic.com 资源测试：${latency?.anthropic?.label || '未测'}`,
    `DNS 解析器泄露：浏览器无法直接判断，请用专门 DNS 测试验证`,
    `WebRTC：${webrtc?.label || '未执行'}`,
    `时区：${device?.timezone || '未知'}；语言：${device?.language || '未知'}`,
    '',
    '说明：网络检测数据不是 Claude 的账号风控结论；不同服务可能走不同的分流出口。',
    '项目：https://github.com/AIPMAndy/AIPMAndy/tree/main/projects/FreeClaude'
  ];
  return rows.join('\n');
}
