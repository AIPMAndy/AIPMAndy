/** Browser-only FreeClaude Workspaces UI; no analytics, third-party scripts or outbound reporting. */
import { validateWorkspaceInput, compareLocalReport, getBrowserSignals } from './core.mjs';

const $ = (id) => document.getElementById(id);
const input = $('workspace-name');
const installCommand = 'git clone https://github.com/AIPMAndy/AIPMAndy.git\ncd AIPMAndy/projects/FreeClaude';
const doctorCommand = 'node bin/freeclaude.mjs workspace doctor --json';
const commands = { install: installCommand, doctor: doctorCommand, list: 'node bin/freeclaude.mjs workspace list', create: '', run: '' };
let toastHandle;

function showToast(message) {
  const toast = $('toast'); toast.textContent = message; toast.hidden = false;
  clearTimeout(toastHandle); toastHandle = setTimeout(() => { toast.hidden = true; }, 2600);
}

function updateCommands() {
  const name = input.value.trim();
  const valid = validateWorkspaceInput(name);
  const result = $('name-state');
  result.textContent = valid ? '可创建' : '格式错误';
  result.classList.toggle('invalid', !valid);
  input.setAttribute('aria-invalid', String(!valid));
  $('tree-name').textContent = `  └── ${valid ? name : '<合法名称>'}/`;
  commands.create = valid ? `node bin/freeclaude.mjs workspace create ${name}` : '';
  commands.run = valid ? `node bin/freeclaude.mjs workspace run ${name}` : '';
  $('cmd-create').textContent = commands.create || '请填写合法名称';
  $('cmd-run').textContent = commands.run || '请填写合法名称';
  for (const selector of ['create','run']) {
    const button = document.querySelector(`[data-copy="${selector}"]`);
    button.disabled = !valid;
  }
}

async function copyText(key) {
  const value = commands[key];
  if (!value) return;
  if (!navigator.clipboard?.writeText) { showToast('当前浏览器无法自动复制，请手动选择命令'); return; }
  try { await navigator.clipboard.writeText(value); showToast('命令已复制'); }
  catch { showToast('复制失败：请手动选中命令'); }
}

function renderBrowser() {
  const state = getBrowserSignals(window.navigator, Intl);
  $('browser-timezone').textContent = state.timezone ?? '未知';
  $('browser-locale').textContent = state.locale ?? '未知';
  $('browser-platform').textContent = state.platform ?? '未公开';
  $('browser-cores').textContent = state.cores ? String(state.cores) : '未知';
  $('browser-online').textContent = state.online === true ? '浏览器报告在线' : state.online === false ? '浏览器报告离线' : '未知';
  return state;
}

function setResults(text, state, warn=false) {
  $('compare-details').textContent = text;
  const pill = $('compare-state'); pill.textContent = state;
  pill.classList.toggle('warning', warn);
  pill.classList.toggle('positive', state === '已读取');
  pill.classList.toggle('muted', state === '等待报告');
}

function parseReport() {
  const text = $('report-json').value.trim();
  if (!text) { setResults('请先执行本地命令并粘贴 JSON 体检报告。', '等待报告'); return; }
  if (text.length > 10_000) { setResults('内容过长。这里只接受小型、脱敏的 FreeClaude doctor JSON，不接受原始配置文件。','无法识别',true);return; }
  let parsed;
  try { parsed = JSON.parse(text); }
  catch { setResults('JSON 格式不正确。请仅粘贴命令输出的完整 JSON，不包含终端提示符。','无法识别',true);return; }
  const comparison = compareLocalReport(parsed, getBrowserSignals(window.navigator, Intl));
  if (!comparison.ok) { setResults(comparison.message, '无法识别', true); return; }
  $('metric-cli').textContent = comparison.cli;
  $('metric-count').textContent = comparison.count;
  $('metric-default').textContent = comparison.defaultConfig;
  setResults(comparison.message, '已读取', false);
}

function clearReport() {
  $('report-json').value = '';
  $('metric-cli').textContent = '待输入';
  $('metric-count').textContent = '—';
  $('metric-default').textContent = '—';
  setResults('执行并粘贴本地报告后，这里会核对浏览器与本机时区、语言是否一致；检测结果不构成账号安全评价。','等待报告');
}

input.addEventListener('input', updateCommands);
for (const button of document.querySelectorAll('[data-copy]')) {
  button.addEventListener('click', () => void copyText(button.dataset.copy));
}
$('parse-report').addEventListener('click', parseReport);
$('clear-report').addEventListener('click', clearReport);
updateCommands();
renderBrowser();
