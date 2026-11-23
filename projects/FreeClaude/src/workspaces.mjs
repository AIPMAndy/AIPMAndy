/**
 * FreeClaude Workspaces — explicitly managed Claude Code config directories.
 * No account tokens, browser cookies, Claude session files or existing Claude
 * identity directories are read, modified, archived, or moved by this module.
 */
import { existsSync, readdirSync, lstatSync, mkdirSync, readFileSync, writeFileSync, accessSync, constants } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter, join, resolve } from 'node:path';

export const WORKSPACE_MARKER = '.freeclaude-workspace.json';
export const WORKSPACE_NAME = /^[a-z][a-z0-9_-]{0,31}$/;
const MAX_MARKER_BYTES = 4096;

export function validateWorkspaceName(name) {
  if (typeof name !== 'string' || !WORKSPACE_NAME.test(name)) {
    throw new Error('工作区名称只能使用小写英文字母开头，后接字母、数字、-、_，最多 32 个字符');
  }
  return name;
}

export function workspaceRoot(home = homedir()) {
  return join(resolve(home), '.freeclaude', 'workspaces');
}

function checkedDirectory(path, create = false) {
  if (create && !existsSync(path)) mkdirSync(path, { mode: 0o700 });
  const stat = lstatSync(path);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error('拒绝使用符号链接或非目录形式的工作区路径');
  return path;
}

function checkedRoot(home, create = false) {
  const normalized = resolve(home);
  checkedDirectory(normalized);
  const base = join(normalized, '.freeclaude');
  if (create || existsSync(base)) checkedDirectory(base, create);
  const root = join(base, 'workspaces');
  if (create || existsSync(root)) checkedDirectory(root, create);
  return root;
}

function markerFor(name, createdAt) {
  return { schema: 1, kind: 'freeclaude-managed-workspace', name, createdAt };
}

export function createWorkspace(name, { home = homedir(), now = () => new Date() } = {}) {
  validateWorkspaceName(name);
  const root = checkedRoot(home, true);
  const dir = join(root, name);
  if (existsSync(dir)) throw new Error(`工作区已存在：${name}，不会覆盖`);
  mkdirSync(dir, { mode: 0o700 });
  try {
    writeFileSync(join(dir, WORKSPACE_MARKER), JSON.stringify(markerFor(name, now().toISOString()), null, 2) + '\n', { mode: 0o600, flag: 'wx' });
  } catch (error) {
    throw new Error(`工作区创建未完成，请手动检查 ${name}：${error.message}`);
  }
  return { name, dir, created: true };
}

export function getWorkspace(name, { home = homedir() } = {}) {
  validateWorkspaceName(name);
  const root = checkedRoot(home);
  if (!existsSync(root)) throw new Error('尚未创建 FreeClaude 工作区');
  const dir = join(root, name);
  if (!existsSync(dir)) throw new Error(`工作区不存在：${name}`);
  checkedDirectory(dir);
  const markerPath = join(dir, WORKSPACE_MARKER);
  if (!existsSync(markerPath)) throw new Error('缺少 FreeClaude 标识，拒绝操作未托管的目录');
  const stat = lstatSync(markerPath);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > MAX_MARKER_BYTES) throw new Error('工作区标识不合法');
  let marker;
  try { marker = JSON.parse(readFileSync(markerPath, 'utf8')); } catch { throw new Error('工作区标识已损坏'); }
  if (marker.kind !== 'freeclaude-managed-workspace' || marker.name !== name || marker.schema !== 1 || typeof marker.createdAt !== 'string') {
    throw new Error('工作区标识不匹配，拒绝操作');
  }
  return { name, dir, createdAt: marker.createdAt };
}

export function listWorkspaces({ home = homedir() } = {}) {
  const root = checkedRoot(home);
  if (!existsSync(root)) return [];
  const names = readdirSync(root, { withFileTypes: true });
  return names.filter(entry => entry.isDirectory() && WORKSPACE_NAME.test(entry.name)).flatMap(entry => {
    try { return [getWorkspace(entry.name, { home })]; } catch { return []; }
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function inspectWorkspace(name, options = {}) {
  const workspace = getWorkspace(name, options);
  const has = (item) => {
    try { return existsSync(join(workspace.dir, item)) && !lstatSync(join(workspace.dir, item)).isSymbolicLink(); } catch { return false; }
  };
  return {
    name: workspace.name,
    createdAt: workspace.createdAt,
    state: {
      settingsPresent: has('settings.json'),
      instructionsPresent: has('CLAUDE.md'),
      projectRecordsPresent: has('projects'),
      pluginsPresent: has('plugins'),
    },
    note: '仅检测文件是否存在；不读取文件正文、登录凭据或历史对话。',
  };
}

export function executablePresent({ env = process.env, platform = process.platform } = {}) {
  const pathValue = env.PATH ?? env.Path ?? '';
  const extensions = platform === 'win32' ? ['.exe', '.cmd', '.bat'] : [''];
  for (const directory of pathValue.split(delimiter).filter(Boolean)) {
    for (const suffix of extensions) {
      try {
        const candidate = join(directory, 'claude' + suffix);
        if (!lstatSync(candidate).isFile()) continue;
        accessSync(candidate, platform === 'win32' ? constants.F_OK : constants.X_OK);
        return true;
      } catch { /* keep scanning */ }
    }
  }
  return false;
}

/** Sanitized diagnostics; safe to copy into the website without exposing paths or secrets. */
export function doctorWorkspaces({ home = homedir(), env = process.env, platform = process.platform, arch = process.arch } = {}) {
  let count;
  try { count = listWorkspaces({ home }).length; } catch { count = null; }
  let defaultConfig = false;
  try { defaultConfig = lstatSync(join(resolve(home), '.claude')).isDirectory(); } catch { /* absent */ }
  let timezone = null;
  let locale = null;
  try { const resolved = Intl.DateTimeFormat().resolvedOptions(); timezone = resolved.timeZone || null; locale = resolved.locale || null; } catch { /* unsupported */ }
  return {
    tool: 'FreeClaude', command: 'workspace doctor', schema: 1,
    platform, arch, timezone, locale,
    claudeCommandFound: executablePresent({ env, platform }),
    defaultConfigPresent: defaultConfig,
    configDirOverrideActive: Boolean(env.CLAUDE_CONFIG_DIR),
    authEnvOverridesPresent: ['ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN', 'ANTHROPIC_AUTH_TOKEN'].some(key => Boolean(env[key])),
    managedWorkspaces: count,
    limitation: '本报告仅包含本机环境元数据。不读取 Claude 登录凭据、账号状态或 Claude 服务器可见的网络信息。',
  };
}

/** Returns safe launch settings; caller must launch with spawn, never with a shell. */
export function getLaunchSettings(name, { home = homedir(), env = process.env } = {}) {
  const workspace = getWorkspace(name, { home });
  return { command: 'claude', dir: workspace.dir, env: { ...env, CLAUDE_CONFIG_DIR: workspace.dir } };
}
