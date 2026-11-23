/** Deterministic browser-side validation; intentionally does not identify users. */
export function validateWorkspaceInput(value) {
  return typeof value === 'string' && /^[a-z][a-z0-9_-]{0,31}$/.test(value);
}

export function getBrowserSignals(navigatorObject, intlObject = Intl) {
  const nav = navigatorObject ?? {};
  let timezone = null;
  try { timezone = intlObject.DateTimeFormat().resolvedOptions().timeZone ?? null; } catch { /* unavailable */ }
  return {
    timezone,
    locale: typeof nav.language === 'string' ? nav.language : null,
    platform: typeof nav.userAgentData?.platform === 'string' ? nav.userAgentData.platform : typeof nav.platform === 'string' ? nav.platform : null,
    cores: Number.isInteger(nav.hardwareConcurrency) && nav.hardwareConcurrency > 0 ? nav.hardwareConcurrency : null,
    online: typeof nav.onLine === 'boolean' ? nav.onLine : null,
  };
}

const isSafeScalar = (value) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null;
export function compareLocalReport(data, browser) {
  if (!data || typeof data !== 'object' || Array.isArray(data) ||
    data.tool !== 'FreeClaude' || data.command !== 'workspace doctor' || data.schema !== 1) {
    return { ok: false, message: '不是有效的 FreeClaude workspace doctor 报告。请使用页面提供的专用命令。' };
  }
  const keys = ['platform','arch','timezone','locale','claudeCommandFound','defaultConfigPresent','configDirOverrideActive','authEnvOverridesPresent','managedWorkspaces'];
  if (!keys.every(key => Object.prototype.hasOwnProperty.call(data, key) && isSafeScalar(data[key]))) {
    return { ok: false, message: '字段缺失或类型无效，请使用最新版 FreeClaude 重新生成诊断报告。' };
  }
  if (typeof data.claudeCommandFound !== 'boolean' || typeof data.defaultConfigPresent !== 'boolean' || typeof data.configDirOverrideActive !== 'boolean' || typeof data.authEnvOverridesPresent !== 'boolean' ||
      !(data.managedWorkspaces === null || (Number.isSafeInteger(data.managedWorkspaces) && data.managedWorkspaces >= 0))) {
    return { ok: false, message: '体检报告字段类型不合法。' };
  }
  const sameTimezone = typeof data.timezone === 'string' && typeof browser.timezone === 'string' ? data.timezone === browser.timezone : null;
  const lang = (value) => typeof value === 'string' ? value.toLowerCase().split('-')[0] : null;
  const sameLanguage = lang(data.locale) && lang(browser.locale) ? lang(data.locale) === lang(browser.locale) : null;
  const oneLine = (label, same) => `${label}：${same === null ? '数据不足' : same ? '文本一致' : '文本不同（可能不是同一设备或系统设置不同）'}`;
  return {
    ok: true,
    cli: data.claudeCommandFound ? '已找到' : '未找到',
    count: data.managedWorkspaces === null ? '无法读取' : String(data.managedWorkspaces),
    defaultConfig: data.defaultConfigPresent ? '存在' : '未发现',
    message: [oneLine('时区',sameTimezone), oneLine('语言主标记',sameLanguage), `CLAUDE_CONFIG_DIR：${data.configDirOverrideActive ? '已有环境变量覆盖' : '未在本机环境中检测到覆盖'}`, `外部认证变量：${data.authEnvOverridesPresent ? '已检测到（可能影响登录工作区隔离）' : '未检测到'}`,  '', '仅对比所显示的元数据；一致不代表匿名、账号安全或地域许可。'].join('\n'),
  };
}
