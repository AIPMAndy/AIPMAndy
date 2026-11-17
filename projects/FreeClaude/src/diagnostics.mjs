/**
 * Privacy-first network diagnostics.
 * - Only well-known official hostnames are contacted.
 * - No browser profile, cookies, passwords, local proxy settings, IP details,
 *   credentials or authentication state are ever read or stored.
 * - Network connectivity is not evidence of account eligibility or compliance.
 */
import dns from 'node:dns/promises';

export const TARGETS = Object.freeze([
  { hostname: 'claude.ai', title: 'Claude website' },
  { hostname: 'support.claude.com', title: 'Claude Help Center' },
  { hostname: 'status.claude.com', title: 'Claude Status' }
]);

/** Returns a simple, nonsensitive diagnostic object. */
export async function diagnoseHost(target, {
  lookup = dns.lookup,
  request = globalThis.fetch,
  timeoutMs = 5000
} = {}) {
  if (!TARGETS.some(({ hostname }) => hostname === target.hostname)) {
    throw new Error('Unsupported diagnostic target');
  }
  const result = { hostname: target.hostname, title: target.title, dns: 'unavailable', https: 'not_checked', status: null };
  try {
    await lookup(target.hostname);
    result.dns = 'ok';
  } catch {
    return result;
  }
  try {
    const response = await request(`https://${target.hostname}/`, {
      method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(timeoutMs),
      headers: { 'user-agent': 'FreeClaude/1.0 (unofficial network self-check)' }
    });
    result.https = 'reachable';
    result.status = response.status;
    if (response.body?.cancel) await response.body.cancel();
  } catch {
    result.https = 'failed';
  }
  return result;
}

export async function diagnoseAll(options = {}) {
  return Promise.all(TARGETS.map((target) => diagnoseHost(target, options)));
}

export function reportText(results) {
  const lines = [
    'FreeClaude • 网络基础诊断（不检查账号、不进行登录）',
    '────────────────────────────────────────',
    ...results.map((row) => {
      const dnsStatus = row.dns === 'ok' ? 'DNS 正常' : 'DNS 异常';
      const httpsStatus = row.https === 'reachable' ? `HTTPS 可达 (HTTP ${row.status})`
        : row.https === 'failed' ? 'HTTPS 请求失败' : '未执行 HTTPS';
      return `${row.hostname.padEnd(21)} ${dnsStatus} / ${httpsStatus}`;
    }),
    '────────────────────────────────────────',
    '注：HTTP 4xx/5xx 也可能证明服务器可达，不能等价于网页/账号可用。',
    '注：检测不判断支持地区、账号资格、账号封禁或服务条款。',
    '官方状态：https://status.claude.com/'
  ];
  return lines.join('\n');
}
