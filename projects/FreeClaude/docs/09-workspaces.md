# Claude Code 多工作区与环境体检｜FreeClaude v1.2

> 免费开源、零第三方依赖；这是本地配置隔离与诊断工具，**不是** CCBaga 的桌面版复刻，也不是账号封禁规避方案。

## 1. 原站的真实产品是什么？

研究对象：[claude.monk.party/zh/](https://claude.monk.party/zh/)。这是 CCBaga 的第三方介绍与实用指南，而非 Claude 官方服务。[CCBaga 原作者仓库](https://github.com/liseami/CCBaga) 公开采用 MIT 许可。其桌面端由 Rust/Tauri 2、React、配套浏览器组成，功能涵盖本地 Claude 身份归档与切换、系统环境调整和对比验证。原站说明它无法解封账号，不能保证账号安全。

我们的实现分为三个层级：

| 能力 | FreeClaude v1.2 | CCBaga 原项目 | 关键边界 |
| --- | --- | --- | --- |
| 本地 Claude Code 配置目录分离 | ✅ 官方 `CLAUDE_CONFIG_DIR` | ✅ 身份管理 | FreeClaude 不迁移现有账号凭据 |
| 浏览器时区、语言、平台检查 | ✅ 仅浏览器公开属性 | ✅ 配套浏览器检测 | 普通静态网页不能读取本机设置或服务端 IP |
| 本机 Claude CLI/工作区存在性 | ✅ 手动运行本地 CLI | ✅ 本地原生接口 | 不读取 Cookie、登录 Token |
| 出口 IP / ASN | ✅ 复用 FreeClaude `/check/` | ✅ 原生+浏览器对比 | IP 查询不能证明 Claude 服务端看见同样出口 |
| 加密身份归档/恢复 | ❌ | ✅ | 需要加密存储、恢复事务和原生权限 |
| 浏览器指纹修改、系统时区修改 | ❌ | ✅ | 不在本项目安全优先范围 |
| 封号规避/解封 | ❌ | ❌ | 必须遵守 Anthropic 官方服务条款 |

## 2. 一分钟实操

前提：Node.js 20+；如果要运行 `workspace run`，还需自己合法安装、配置官方 Claude Code。

```bash
git clone https://github.com/AIPMAndy/AIPMAndy.git
cd AIPMAndy/projects/FreeClaude
npm test
npm start
# 网页地址 http://127.0.0.1:4173/workspaces/
```

管理工作区：

```bash
node bin/freeclaude.mjs workspace doctor --json
node bin/freeclaude.mjs workspace create work
node bin/freeclaude.mjs workspace list
node bin/freeclaude.mjs workspace inspect work
node bin/freeclaude.mjs workspace run work
```

创建 `work` 后在 `~/.freeclaude/workspaces/work/` 留下 `.freeclaude-workspace.json` 标识。运行 `run work` 时，通过子进程环境变量设置 `CLAUDE_CONFIG_DIR`，继而让官方 `claude` CLI 使用对应配置目录。使用者自行完成官方认证。**不会把现有的 `~/.claude/` 或 `~/.claude.json` 原样复制到新目录。**

## 3. 只读体检到底测什么？

`doctor --json` 报告系统平台、处理器架构、时区、当前区域语言、CLI 可执行命令是否能在 PATH 找到、默认配置目录是否存在、是否已经设置 `CLAUDE_CONFIG_DIR`、由 FreeClaude 管理的工作区数量。输出不含电脑用户名、HOME 路径、配置文件内容或第三方 API 密钥。

网页可显示当前**浏览器**的时区、语言、平台、逻辑核心数、浏览器在线状态。如果用户将上述 JSON 粘贴到页面，只对比可比对的文本信号。两份读数可能来自不同设备；即使一致也不能作为账户可用性、匿名性、VPN 安全、DNS/WebRTC 不泄露或服务端风险的证明。

## 4. 安全限制

- `workspace create` 是显式动作，拒绝危险工作区名、已存在目录、非受管目录及符号链接；CLI 不提供清除、删除、导出身份或强制重置接口。
- `run` **不是虚拟机/沙箱**。依赖官方 `CLAUDE_CONFIG_DIR` 的配置与会话数据会放在不同目录，但 Shell 环境变量（例如 `ANTHROPIC_API_KEY`）、系统 Keychain、其他桌面 App、IDE 插件和组织策略等可能共享。如需强隔离，应使用经过审计的系统账户、容器/虚拟机及适当权限策略。
- 不借此绕开账号禁令、地区支持限制或订阅约束。`CLAUDE_CONFIG_DIR` 不改变你的地理位置、身份或网络出口。
- 网页没有后端登录、统计 SDK、第三方脚本、自动上传。**不要粘贴完整 Claude 设置文件**；只能粘贴脱敏 `workspace doctor --json` 报告。
- 若以后要开发加密备份，应单独进行威胁建模、加密密钥生命周期设计、跨平台恢复、异常回滚、权限边界和真实机器测试；不可直接搬运用户的凭据目录。

## 5. 资料与署名

1. [Claude Code 官方 Settings（含 CLAUDE_CONFIG_DIR）](https://code.claude.com/docs/en/settings) —— 多目录配置能力的主要官方依据。
2. [liseami/CCBaga 官方开源仓库](https://github.com/liseami/CCBaga) —— 产品思路、架构与技术边界参考，MIT；本版本没有复制 CCBaga 源码或分发安装程序。
3. [claude.monk.party/zh](https://claude.monk.party/zh/) —— CCBaga 的第三方中文使用指南，提供信息组织上的启发。站点自称与作者及 Anthropic 无关联。
4. [Claude 官方支持地区](https://support.claude.com/en/articles/8461763-where-can-i-access-claude) —— 账号地区资格以最新官方规则为准。

**独立性声明：** FreeClaude 为 AI 酋长 Andy / AIPMAndy 的独立开源工具箱，与 Anthropic、CCBaga 作者及 Monk 没有隶属或赞助关系。
