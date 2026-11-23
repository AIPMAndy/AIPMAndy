<div align="center">

# FreeClaude

**Claude 免费入门 · 网络环境检测 · Claude Code 多工作区 · 安全排查**

**开源免费 · 不收集账号信息 · 不依赖第三方浏览器 · 不承诺绕过限制**

[🚀 打开交互式指南](site/index.html) · [🧪 Claude 网络体检](site/check/index.html) · [🗂️ Claude 工作区](site/workspaces/index.html) · [📚 保姆级文档](docs/00-start-here.md) · [🛠️ 故障排查](docs/02-troubleshooting.md) · [🛡️ 安全](docs/03-security.md) · [🌐 English](README.en.md)

</div>

> **免责声明**：FreeClaude 是 AIPMAndy 维护的**非官方学习与排查项目**，与 Anthropic / Claude 没有隶属关系。项目免费、开源，**不代表 Claude 的付费服务、Claude Code 或 API 可无限免费使用**。遵守适用法律及 Anthropic 服务条款，支持地区以官方名单为准。

## 为什么做这个项目？

网络上有很多“教你零封号注册 Claude”的攻略，但最危险的一步往往不是页面怎么点，而是**购买陌生人账号、上传验证密钥、共享验证码，或把个人数据交给不可信浏览器**。FreeClaude 把复杂的教程缩减成一个**可验证、隐私优先的最小闭环**：

1. 判断自己是否具备**官方支持地区、年龄、本人可控制邮箱和电话号码**等条件。
2. 选择 **Google 登录 / 邮箱安全链接** 两种官方路径。
3. 碰到登录问题时根据症状**一步步排查**，而不是盲目更换指纹、设备或账号。
4. 利用 Claude Free 的现有功能完成实际任务，了解何时才需要升级。
5. 开发者运行可选的**只做连通性检查**的 `freeclaude doctor`，不访问你的账号、Cookie、密码或代理配置。

## 功能

| 模块 | 交付物 | 本地运行 |
| --- | --- | --- |
| 🧭 交互导航 | 5 分钟使用路径：检查资格 → 登录 → 体验功能 | ✅ |
| 🧯 诊断向导 | 邮件未收到、Google 授权、短信验证、封号、额度、Claude Code | ✅ |
| 🌐 Claude IP 网络体检 | 三路 HTTP IP 源、第三方 VPN/Tor 情报、ASN、WebRTC、设备环境、历史与报告；未知即未知 | ✅（主动检测） |
| 🗂️ Claude Workspaces | 独立 Claude Code 配置目录、受管工作区只读检查、本地/浏览器环境核对 | ✅（需主动运行 CLI） |
| 🧪 Network Doctor | 对官方域名做 DNS/HTTPS 基础连通性检测，无账号操作 | ✅ |
| 🧱 免费能力地图 | Free 与付费功能的边界，动态跳转官方价格页核对 | ✅ |
| 🧰 场景提示词 | 写作、研究、简历、代码解释、内容选题 | ✅ |
| 🛡️ 安全指南 | 第三方邮箱/浏览器、TOTP 秘钥、敏感截图避坑 | ✅ |
| 📚 保姆级教程 | 原创 Markdown，官方资料可追溯 | ✅ |

## 1 分钟启动

**看网站：** 在仓库里打开 `site/index.html`，或启动本地服务器。网络检测页包含 JavaScript 模块，**必须通过本地 HTTP 服务器或 HTTPS 访问**，不能依赖 `file://`：

```bash
node src/serve.mjs
# 主页 http://127.0.0.1:4173/
# Claude 网络检测页 http://127.0.0.1:4173/check/
# Claude 工作区页 http://127.0.0.1:4173/workspaces/
```

**看终端：** 需要 Node.js 20 或更新版本（依赖为 0）。

```bash
node bin/freeclaude.mjs checklist
node bin/freeclaude.mjs doctor
node bin/freeclaude.mjs links
node bin/freeclaude.mjs workspace doctor --json
node bin/freeclaude.mjs workspace create my-work
node bin/freeclaude.mjs workspace run my-work
node bin/freeclaude.mjs help
```

测试：

```bash
npm test
```

> `doctor` 只检查 DNS 和 HTTPS 连通性。它**无法判断账号是否安全、能否注册、是否被封，亦不能证明地域合规**。某些公司网络、证书代理或防火墙会造成假阳性或假阴性。

## 新增：Claude IP / 网络环境检测

**入口：** [FreeClaude Check — Claude 网络环境检测](site/check/index.html)。在本地执行 `npm start` 后打开 `/check/`。

这一页参考 [Net.Coffee 的 Claude 检测工具](https://ip.net.coffee/claude/)可观察到的布局和模块，使用独立编写的 HTML / CSS / JS，实现：

- 浏览器主动检测公开出口 IP（ipify）与地域/ASN（ipwho.is），Cloudflare Meta 可访问时补充第三视角。
- 读取 IP 情报提供方 IPSnapshot 对当前 IP 的 VPN、Tor、机房等属性，**没有数据就显示“未检测”**，不擅自解释为“安全”。
- 提供**明确公式的网络信息一致性参考分**：不是对原站私有风险算法的复制，更不是 Anthropic 官方的风控/封禁概率。
- 检测 Claude 与 Anthropic 静态资源的**有限连通性**（不能据此判断登录、地区许可或服务端 IP）。
- 用户主动点击后可做 WebRTC/STUN 深度检测；DNS 泄露需跳转专门的检测服务，**不会虚构 DNS 出口**。
- 本地显示时区、语言、浏览器、WebGL / Canvas 摘要；IP 默认隐藏，历史保存**默认关闭**，开启后仅保存至浏览器 localStorage。

**检测隐私说明：** 启动检测即表示你同意浏览器直接联系 `api.ipify.org` / `api64.ipify.org`、`ipwho.is`、`speed.cloudflare.com`、`ipsnapshot.com`、`claude.ai` 和 `anthropic.com`；这些服务会接触到连接它们时使用的 IP，FreeClaude 自身不设置服务端日志或分析 SDK。手动点 WebRTC 深度检测才会访问 Google 公共 STUN。请自行核对这些服务的使用条款及限额；`ipwho.is` 免费接口有配额/用途限制，生产化或商业部署建议使用经许可的数据源。IPSnapshot 的 Geo/ASN 内容标注来源 DB-IP Lite，遵守其 CC BY 4.0 署名要求。

**关键边界：** 静态网页无法证明 Claude **实际看到的出口 IP**，无法独立获取系统 DNS 解析器，也无法给出官方“安全分”。网络分流不同出口可能完全正常，不能直接解释为账号异常。有关技术限制和本项目实现详见 [检测技术说明](docs/08-network-check.md)。

## 新增：Claude Code 工作区管理（v1.2.0）

**入口：** [Claude Workspaces](site/workspaces/index.html)。运行 `npm start` 后进入 `/workspaces/`。

参考 [CCBaga](https://github.com/liseami/CCBaga) 的**产品思路**，我们新增独立原创、零第三方依赖的工作区启动器。它不是 CCBaga 原生桌面 App，也没有复制其浏览器运行时。采用 Anthropic 官方文档支持的 [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/settings) 配置方式：

```bash
node bin/freeclaude.mjs workspace doctor --json # 只读本机元信息，报告不含用户名路径、API Key 或凭据内容
node bin/freeclaude.mjs workspace create my-work # 在 ~/.freeclaude/workspaces/ 新建空配置目录
node bin/freeclaude.mjs workspace list # 列出自己创建的工作区
node bin/freeclaude.mjs workspace inspect my-work # 仅报告部分文件是否存在
node bin/freeclaude.mjs workspace run my-work # 设置 CLAUDE_CONFIG_DIR 并启动本地官方 claude 命令
```

- `create` **不会复制、移动、清空或删除**已有的 `~/.claude/`、`~/.claude.json` 或 Claude Desktop 数据；不自动安装、修改系统环境、浏览器或网络。
- `run` 只给子进程设置 `CLAUDE_CONFIG_DIR`，Claude 本身仍会按官方登录要求运行。你必须已自行安装官方 Claude Code CLI；工作区只是本地数据分离，不表示可以突破服务条款。
- 工作区不是安全容器：**系统 Keychain/凭据管理器、外部环境变量、编辑器插件和其他程序的数据仍可能共享**；适用于本地整理而非强制安全隔离。
- 工作区目录带专用标识；拒绝遍历路径、非托管目录与符号链接，避免误操作其他文件夹。v1.2.0 不包含身份归档/还原、浏览器指纹修改、批量账号或防封承诺。
- Web 端只读取浏览器公开环境属性。用户可以手工粘贴脱敏 `doctor --json` 输出对照时区与语言；数据只在当前浏览器中处理，不会发往 FreeClaude 服务器。`/check/` 仍提供可选的网络出口检测。

详细实现、风险边界和 CCBaga 对照见 [工作区设计与安全说明](docs/09-workspaces.md)。

## Claude Free 可以做什么？

根据 2026-11-17 核验的官方信息，Free 可用于网页/桌面/移动端对话、网页搜索、Artifacts、文档和部分文件/代码工作，也提供有限额度与最多 5 个 Projects（不同功能以实际账户界面和官方说明为准）。**Claude Code 通常需要包含该功能的付费计划；API/Console 费用与 Claude Free 订阅是不同的体系。**

- [官方套餐与实时价格](https://claude.com/pricing)
- [Claude Projects 官方说明](https://support.claude.com/en/articles/9517075-what-are-projects)
- [账号登录官方说明](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account)
- [支持地区](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)
- [电话验证](https://support.claude.com/en/articles/8287232-verify-your-phone-number)

## 如果你现在就卡住了

| 症状 | 第一动作 | 详细步骤 |
| --- | --- | --- |
| 没收到邮箱链接 | 检查垃圾箱、邮箱规则，按官方方式重新请求链接 | [登录指南](docs/01-registration.md) |
| Gmail 已登录仍不能进 Claude | 先看错误内容及 [官方状态页](https://status.claude.com/) | [故障排查](docs/02-troubleshooting.md) |
| 跨设备点击邮箱链接失败 | 在**发起请求的原设备**输入邮件中出现的代码 | [登录指南](docs/01-registration.md) |
| 收不到手机验证码 | 检查是否为支持地区的真实手机号，核实错误文本 | [故障排查](docs/02-troubleshooting.md) |
| 账号被限制/封禁 | 在原账号内查看官方申诉入口；不要购买新账号绕过 | [故障排查](docs/02-troubleshooting.md) |
| Free 提示额度已满 | 查看限额，等候恢复或按需求评估套餐 | [免费版攻略](docs/04-free-playbook.md) |
| 想免费用 Claude Code | 先区分网页 Claude Free、Claude Code 和 API | [Code 与 API](docs/05-claude-code-api.md) |

## 安全边界

FreeClaude **不会**提供：批量注册、验证码代收、身份冒用、账号买卖、指纹伪装或绕过地区/封禁规则的自动化脚本。不会下载或打包原始教程中的个人邮箱、第三方账号、二维码、OTP 秘钥及敏感截图。完整的材料审核和替代方案见 [原始资料审读](docs/06-source-audit.md)。

## 项目结构

```text
FreeClaude/
├── site/                 # 静态网站：引导+问题向导+提示词
│   ├── check/           # Claude 网络环境检测仪表盘（独立原创实现）
│   └── workspaces/      # Claude Code 工作区管理网页与环境核对
├── bin/freeclaude.mjs    # 终端入口
├── src/                  # 无依赖的网络诊断、工作区管理和静态服务器
├── test/                 # Node 内置测试
├── docs/                 # 原创保姆级教程
├── .github/workflows/    # CI
└── LICENSE               # MIT
```

## 部署到 GitHub Pages

这是零构建静态站。新建独立 GitHub 仓库 `FreeClaude` 并推送代码后，在 **Settings → Pages → Build and deployment → Deploy from a branch**，将发布目录设置为 `main` 分支的 `/site`（GitHub Pages 仅支持 `/` 或 `/docs`，因此推荐把 `site/` 内容复制到 `/docs` 后发布，或使用本仓库提供的 [GitHub Actions 工作流](.github/workflows/pages.yml)）。启用 `GitHub Actions` 发布源后，该工作流可部署 `site/`。具体按钮名称以 GitHub 当前 UI 为准。

## 官方资料 / 维护声明

项目内容于 **2026-11-17** 校对，平台政策会变化。遇到冲突以官方最新页面为准，参考链接收录于 [references.md](docs/references.md)。欢迎通过 Issue 反馈具体场景，但**不要提交密码、验证码、恢复码、邮箱登录链接、手机号码或完整 IP**。

---

**作者**：[@AIPMAndy](https://github.com/AIPMAndy) · [个人网站](https://metaver.vip/)  
**License**：MIT · **Slogan**：少走弯路，安全用 AI。
