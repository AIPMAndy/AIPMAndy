#!/usr/bin/env node
import { diagnoseAll, reportText } from '../src/diagnostics.mjs';

const argv = process.argv.slice(2);
const command = argv[0] ?? 'help';
const outputJson = argv.includes('--json');

const HELP = `FreeClaude 1.0 — 开源、隐私优先的 Claude 入门与排查工具

用法：
  freeclaude checklist      官方注册前检查
  freeclaude doctor         检查官方域名 DNS 和 HTTPS 连通性
  freeclaude doctor --json  输出基础连接状态 JSON（不含 IP、账号信息）
  freeclaude links          官方资源速查
  freeclaude plans          Free、Claude Code 与 API 区别
  freeclaude help           显示帮助

注意：本工具不代注册、不采集密码、不伪装环境、不绕过地域或封禁限制。`;

const OFFICIAL_LINKS = {
  'Claude 官方入口': 'https://claude.ai/',
  '当前套餐与价格': 'https://claude.com/pricing',
  '支持地区': 'https://support.claude.com/en/articles/8461763-where-can-i-access-claude',
  '账号登录': 'https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account',
  '手机验证': 'https://support.claude.com/en/articles/8287232-verify-your-phone-number',
  '限制与申诉': 'https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals',
  '服务运行状态': 'https://status.claude.com/'
};

async function main() {
  switch (command) {
    case 'checklist':
      console.log(`FreeClaude • 官方注册前确认清单

[ ] 我本人位于 Claude 官方支持地区
[ ] 我已满 18 岁，满足服务要求
[ ] 我使用自己长期控制的邮箱 / Google 账户
[ ] 我有符合要求、可以接收短信的本人手机号
[ ] 我不会购买他人邮箱、账号或提供 2FA 秘钥
[ ] 我了解 Claude Free 有额度限制，Claude Code / API 非免费额度替代品

支持地区：${OFFICIAL_LINKS['支持地区']}
手机验证：${OFFICIAL_LINKS['手机验证']}`);
      break;
    case 'doctor': {
      const timeoutArg = argv.find((s) => s.startsWith('--timeout='));
      const rawTimeout = timeoutArg ? Number(timeoutArg.split('=')[1]) : 5000;
      if (!Number.isInteger(rawTimeout) || rawTimeout < 1000 || rawTimeout > 15000) {
        throw new Error('超时仅允许 1000–15000 毫秒');
      }
      const results = await diagnoseAll({ timeoutMs: rawTimeout });
      if (outputJson) console.log(JSON.stringify({ tool: 'FreeClaude', version: '1.0', checks: results, limitation: 'Connectivity only' }, null, 2));
      else console.log(reportText(results));
      break;
    }
    case 'links':
      console.log('FreeClaude • 官方资源\n' + Object.entries(OFFICIAL_LINKS).map(([name, url]) => `${name}: ${url}`).join('\n'));
      break;
    case 'plans':
      console.log(`FreeClaude • 套餐边界（校验：2026-11-17）

Claude Free：官网聊天、搜索、Artifacts 等，使用额度有限。
Claude Code：不属于普通 Free 套餐权益；以官方价格页为准。
Claude API：与 Claude Free 网页聊天额度分开，按 Console/API 计费规则。

官方价格：${OFFICIAL_LINKS['当前套餐与价格']}`);
      break;
    case '-h': case '--help': case 'help':
      console.log(HELP);
      break;
    default:
      console.error(`未知命令：${command}\n\n${HELP}`);
      process.exitCode = 2;
  }
}

main().catch((error) => {
  console.error(`FreeClaude：${error.message}`);
  process.exitCode = 1;
});
