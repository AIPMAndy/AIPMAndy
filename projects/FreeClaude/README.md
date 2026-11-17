<div align="center">

# FreeClaude

**Claude 免费入门 · 登录故障自查 · 账号安全避坑 · 本地环境诊断**

**开源免费 · 不收集账号信息 · 不依赖第三方浏览器 · 不承诺绕过限制**

[🚀 打开交互式指南](site/index.html) · [📚 保姆级文档](docs/00-start-here.md) · [🛠️ 故障排查](docs/02-troubleshooting.md) · [🛡️ 安全](docs/03-security.md) · [🌐 English](README.en.md)

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
| 🧪 Network Doctor | 对官方域名做 DNS/HTTPS 基础连通性检测，无账号操作 | ✅ |
| 🧱 免费能力地图 | Free 与付费功能的边界，动态跳转官方价格页核对 | ✅ |
| 🧰 场景提示词 | 写作、研究、简历、代码解释、内容选题 | ✅ |
| 🛡️ 安全指南 | 第三方邮箱/浏览器、TOTP 秘钥、敏感截图避坑 | ✅ |
| 📚 保姆级教程 | 原创 Markdown，官方资料可追溯 | ✅ |

## 1 分钟启动

**看网站：** 直接用浏览器打开 `site/index.html`。也可运行本地服务：

```bash
node src/serve.mjs
# 打开 http://localhost:4173
```

**看终端：** 需要 Node.js 20 或更新版本（依赖为 0）。

```bash
node bin/freeclaude.mjs checklist
node bin/freeclaude.mjs doctor
node bin/freeclaude.mjs links
node bin/freeclaude.mjs help
```

测试：

```bash
npm test
```

> `doctor` 只检查 DNS 和 HTTPS 连通性。它**无法判断账号是否安全、能否注册、是否被封，亦不能证明地域合规**。某些公司网络、证书代理或防火墙会造成假阳性或假阴性。

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
├── bin/freeclaude.mjs    # 终端入口
├── src/                  # 无依赖的网络诊断和静态服务器
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
