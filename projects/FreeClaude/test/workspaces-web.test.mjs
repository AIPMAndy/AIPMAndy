import test from 'node:test';
import assert from 'node:assert/strict';
import { validateWorkspaceInput, getBrowserSignals, compareLocalReport } from '../site/workspaces/core.mjs';
import { readFileSync } from 'node:fs';

const browser = { timezone: 'Asia/Tokyo', locale: 'ja-JP' };
const sample = {
  tool: 'FreeClaude', command: 'workspace doctor', schema: 1,
  platform: 'darwin', arch: 'arm64', timezone: 'Asia/Tokyo', locale: 'ja-JP',
  claudeCommandFound: true, defaultConfigPresent: true, configDirOverrideActive: false, authEnvOverridesPresent: false, managedWorkspaces: 2,
};

test('front-end names reject markup, whitespace and path traversal', () => {
  assert.equal(validateWorkspaceInput('demo'), true);
  for (const value of ['demo/a', '<img src=x>', '../home', 'A-BC', 'hi world', '-flag', '']) {
    assert.equal(validateWorkspaceInput(value), false);
  }
});

test('browser signal read tolerates missing permissions', () => {
  const data = getBrowserSignals({ language: 'zh-CN', platform: 'MacIntel', onLine: false, hardwareConcurrency: 8 }, {
    DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: 'Asia/Shanghai' }) }),
  });
  assert.equal(data.timezone, 'Asia/Shanghai');
  assert.equal(data.cores, 8);
  assert.equal(data.online, false);
});

test('report says text agreement and disclaims account status', () => {
  const report = compareLocalReport(sample, browser);
  assert.equal(report.ok, true);
  assert.equal(report.cli, '已找到');
  assert.equal(report.count, '2');
  assert.match(report.message, /时区：文本一致/);
  assert.match(report.message, /不代表匿名/);
});

test('report refuses unrelated JSON and invalid types', () => {
  assert.equal(compareLocalReport({ tool: 'FreeClaude' }, browser).ok, false);
  assert.equal(compareLocalReport({ ...sample, managedWorkspaces: -1 }, browser).ok, false);
  assert.equal(compareLocalReport({ ...sample, claudeCommandFound: 'yes' }, browser).ok, false);
  const other = compareLocalReport({ ...sample, timezone: 'Europe/London' }, browser);
  assert.match(other.message, /时区：文本不同/);
});

test('website self-hosted scripts never submit secrets', () => {
  const page = readFileSync(new URL('../site/workspaces/index.html', import.meta.url), 'utf8');
  const script = readFileSync(new URL('../site/workspaces/app.mjs', import.meta.url), 'utf8');
  assert.match(page, /工作区体检/);
  assert.match(page, /metaver\.vip/);
  assert.match(page, /liseami\/CCBaga/);
  assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon/.test(script));
  assert.ok(!/https?:\/\//.test(page.match(/<script[^>]*>/g)?.join('') ?? ''));
});
