import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { diagnoseHost, reportText, TARGETS } from '../src/diagnostics.mjs';
import { safeFilePath } from '../src/serve.mjs';

const run = (...args) => execFileSync(process.execPath, ['./bin/freeclaude.mjs', ...args], { encoding: 'utf8' });

test('help is discoverable and neutral', () => {
  const text = run('help');
  assert.match(text, /FreeClaude 1.2/);
  assert.match(text, /doctor/);
});
test('checklist contains eligibility and privacy guidance', () => {
  const text = run('checklist');
  assert.match(text, /官方支持地区/);
  assert.match(text, /2FA/);
});
test('plan guidance distinguishes Claude Code', () => {
  const text = run('plans');
  assert.match(text, /Claude Code/);
  assert.match(text, /Claude API/);
});
test('unsupported domains cannot be probed via library', async () => {
  await assert.rejects(diagnoseHost({ hostname: 'example.org', title: 'other' }), /Unsupported/);
});
test('DNS failure does not make HTTPS requests', async () => {
  const result = await diagnoseHost(TARGETS[0], {
    lookup: async () => { throw Error('no dns'); },
    request: async () => { throw Error('should not run'); }
  });
  assert.equal(result.dns, 'unavailable');
  assert.equal(result.https, 'not_checked');
});
test('HTTP error is still reported as reachable', async () => {
  const result = await diagnoseHost(TARGETS[1], {
    lookup: async () => ({ address: '127.0.0.1' }),
    request: async () => ({ status: 403, body: { cancel: async () => {} } })
  });
  assert.equal(result.https, 'reachable');
  assert.equal(result.status, 403);
  assert.match(reportText([result]), /HTTP 403/);
});
test('network exception is handled', async () => {
  const result = await diagnoseHost(TARGETS[2], {
    lookup: async () => ({}),
    request: async () => { throw Error('blocked'); }
  });
  assert.equal(result.https, 'failed');
});
test('static server rejects directory traversal', () => {
  assert.equal(safeFilePath('/../../etc/passwd'), null);
  assert.equal(safeFilePath('/%2e%2e/%2e%2e/etc/passwd'), null);
  assert.equal(safeFilePath('/%5cwindows'), null);
  assert.match(safeFilePath('/'), /site\/index\.html$/);
  assert.match(safeFilePath('/check/'), /site\/check\/index\.html$/);
  assert.match(safeFilePath('/check/app.mjs'), /site\/check\/app\.mjs$/);
});
