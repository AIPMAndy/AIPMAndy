import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, symlinkSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  validateWorkspaceName, createWorkspace, listWorkspaces, getWorkspace,
  inspectWorkspace, doctorWorkspaces, getLaunchSettings, workspaceRoot,
} from '../src/workspaces.mjs';

function withHome(fn) {
  const home = mkdtempSync(join(tmpdir(), 'freeclaude-test-'));
  try { return fn(home); } finally { rmSync(home, { recursive: true, force: true }); }
}

test('invalid name and traversal are rejected', () => {
  for (const invalid of ['../.claude', '../', 'UPPER', '', 'some name', 'a/b', '.config', 'a'.repeat(33), '--foo']) {
    assert.throws(() => validateWorkspaceName(invalid));
  }
  assert.equal(validateWorkspaceName('client_a-2'), 'client_a-2');
});

test('create/list is explicit and does not touch default Claude config', () => withHome(home => {
  const original = join(home, '.claude');
  mkdirSync(original);
  writeFileSync(join(original, 'auth.json'), 'SENSITIVE_MARKER');
  assert.deepEqual(listWorkspaces({ home }), []);
  const w = createWorkspace('client', { home, now: () => new Date('2026-11-23T00:00:00Z') });
  assert.equal(w.name, 'client');
  assert.equal(listWorkspaces({ home }).length, 1);
  assert.equal(listWorkspaces({ home })[0].createdAt, '2026-11-23T00:00:00.000Z');
  assert.equal(existsSync(join(original, 'auth.json')), true);
  assert.throws(() => createWorkspace('client', { home }), /已存在/);
  assert.equal(inspectWorkspace('client', { home }).state.settingsPresent, false);
  assert.match(getWorkspace('client', { home }).dir, /client$/);
}));

test('unmanaged or symbolic-link directories are never accepted as workspaces', () => withHome(home => {
  createWorkspace('mine', { home });
  const root = workspaceRoot(home);
  mkdirSync(join(root, 'unmanaged'));
  assert.throws(() => getWorkspace('unmanaged', { home }), /缺少/);
  symlinkSync(join(root, 'mine'), join(root, 'linked'), 'dir');
  assert.throws(() => getWorkspace('linked', { home }), /符号链接/);
  assert.equal(listWorkspaces({ home }).length, 1);
}));

test('launch settings set CLAUDE_CONFIG_DIR without shell invocation', () => withHome(home => {
  createWorkspace('work', { home });
  const env = { PATH: '/usr/bin', CLAUDE_CONFIG_DIR: '/old', ANTHROPIC_API_KEY: 'not-printed' };
  const launch = getLaunchSettings('work', { home, env });
  assert.equal(launch.command, 'claude');
  assert.equal(launch.env.CLAUDE_CONFIG_DIR, join(workspaceRoot(home), 'work'));
  assert.equal(env.CLAUDE_CONFIG_DIR, '/old');
  assert.throws(() => getLaunchSettings('unknown', { home, env }));
}));

test('sanitized doctor excludes path, email, keys and login contents', () => withHome(home => {
  mkdirSync(join(home, '.claude'));
  writeFileSync(join(home, '.claude', 'settings.json'), '{"token":"PRIVATE_TEST_SECRET"}');
  createWorkspace('demo', { home });
  const report = doctorWorkspaces({ home, env: { PATH: '', CLAUDE_CONFIG_DIR: '/somewhere', ANTHROPIC_API_KEY: 'PRIVATE_TEST_SECRET' }, platform: 'darwin', arch: 'arm64' });
  assert.equal(report.managedWorkspaces, 1);
  assert.equal(report.defaultConfigPresent, true);
  assert.equal(report.configDirOverrideActive, true);
  assert.equal(report.authEnvOverridesPresent, true);
  assert.equal(report.claudeCommandFound, false);
  assert.equal(report.platform, 'darwin');
  assert.ok(!JSON.stringify(report).includes('PRIVATE_TEST_SECRET'));
  assert.ok(!JSON.stringify(report).includes(home));
}));

test('CLI help and workspace doctor JSON expose no secret-bearing fields', () => {
  const bin = new URL('../bin/freeclaude.mjs', import.meta.url).pathname;
  const help = execFileSync(process.execPath, [bin, 'help'], { encoding: 'utf8' });
  assert.match(help, /workspace create/);
  const report = JSON.parse(execFileSync(process.execPath, [bin, 'workspace', 'doctor', '--json'], { encoding: 'utf8' }));
  assert.equal(report.command, 'workspace doctor');
  assert.ok(!('home' in report));
  assert.ok(!('token' in report));
});
