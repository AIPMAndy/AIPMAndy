#!/usr/bin/env node
import { diagnoseAll, reportText } from '../src/diagnostics.mjs';
import { createWorkspace, listWorkspaces, inspectWorkspace, doctorWorkspaces, getLaunchSettings } from '../src/workspaces.mjs';
import { spawn } from 'node:child_process';

const argv = process.argv.slice(2);
const command = argv[0] ?? 'help';
const outputJson = argv.includes('--json');

const HELP = `FreeClaude 1.2 — 开源、隐私优先的 Claude 入门与排查工具

用法：
  freeclaude checklist      官方注册前检查
  freeclaude doctor         检查官方域名 DNS 和 HTTPS 连通性
  freeclaude doctor --json  输出基础连接状态 JSON（不含 IP、账号信息）
  freeclaude links          官方资源速查
  freeclaude plans          Free、Claude Code 与 API 区别
  freeclaude workspace doctor --json   本地工作区与系统元数据体检
  freeclaude workspace list            列出由 FreeClaude 创建的工作区
  freeclaude workspace create <name>   创建隔离 Claude Code 配置目录
  freeclaude workspace inspect <name>  查看文件存在状态（不读取内容）
  freeclaude workspace run <name>      使用该配置目录启动 Claude Code
  freeclaude help                     显示帮助

注意：本工具不代注册、不采集密码、不伪装环境、不绕过地域或封禁限制。
工作区只隔离通过 CLAUDE_CONFIG_DIR 读取的本地配置；操作系统凭据、外部环境变量、桌面客户端并不保证隔离。`;

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
    case 'workspace':
    case 'workspaces': {
      const action = argv[1] ?? 'help';
      const name = argv[2];
      if (action === 'doctor') {
        const report = doctorWorkspaces();
        if (outputJson) console.log(JSON.stringify(report, null, 2));
        else {
          console.log('FreeClaude · Claude Code 本地工作区体检');
          console.log(`系统：${report.platform}/${report.arch}`);
          console.log(`时区：${report.timezone ?? '未知'} · 语言：${report.locale ?? '未知'}`);
          console.log(`找到 Claude 命令：${report.claudeCommandFound ? '是' : '否'}`);
          console.log(`默认配置目录存在：${report.defaultConfigPresent ? '是' : '否'}`);
          console.log(`CLAUDE_CONFIG_DIR 已设置：${report.configDirOverrideActive ? '是' : '否'}`);
          console.log(`外部认证环境变量存在：${report.authEnvOverridesPresent ? '是（可能覆盖工作区身份）' : '否'}`);
          console.log(`已管理工作区：${report.managedWorkspaces ?? '无法读取'} 个`);
          console.log(report.limitation);
        }
      } else if (action === 'list') {
        const list = listWorkspaces();
        if (outputJson) console.log(JSON.stringify(list.map(({ name, createdAt }) => ({ name, createdAt })), null, 2));
        else console.log(list.length ? list.map(({ name, createdAt }) => `- ${name}（${createdAt}）`).join('\n') : '暂无工作区。使用 workspace create <name> 创建。');
      } else if (action === 'create') {
        if (!name || argv.length > 3) throw new Error('用法：freeclaude workspace create <name>');
        const workspace = createWorkspace(name);
        console.log(`工作区已创建：${workspace.name}（仅创建独立空目录；未复制旧凭据）`);
        console.log(`使用命令：node bin/freeclaude.mjs workspace run ${workspace.name}`);
      } else if (action === 'inspect') {
        if (!name || argv.length > 3) throw new Error('用法：freeclaude workspace inspect <name>');
        const state = inspectWorkspace(name);
        console.log(outputJson ? JSON.stringify(state, null, 2) : `工作区：${state.name}\n${Object.entries(state.state).map(([k, v]) => `${k}: ${v ? '存在' : '未发现'}`).join('\n')}\n${state.note}`);
      } else if (action === 'run') {
        if (!name) throw new Error('用法：freeclaude workspace run <name> [-- Claude 命令参数]');
        const launch = getLaunchSettings(name);
        const otherArgs = argv.slice(3);
        const passthrough = otherArgs[0] === '--' ? otherArgs.slice(1) : otherArgs;
        console.log(`启动 Claude Code 工作区「${name}」；可能需要在该工作区重新进行官方登录。`);
        if (['ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN', 'ANTHROPIC_AUTH_TOKEN'].some(key => Boolean(process.env[key]))) {
          console.warn('注意：当前 Shell 设置了外部认证环境变量，可能覆盖独立工作区的登录身份；请自行检查。');
        }
        const child = spawn(launch.command, passthrough, { shell: false, stdio: 'inherit', env: launch.env });
        await new Promise((resolve, reject) => {
          child.once('error', (error) => reject(new Error(`无法启动 Claude Code（请先安装官方 CLI）：${error.message}`)));
          child.once('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); resolve(); });
        });
      } else {
        console.log(HELP);
      }
      break;
    }

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
