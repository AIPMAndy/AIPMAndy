# 00｜FreeClaude 入门路线（5 分钟开始）

> 本教程于 2026-11-17 校验官方资料；界面、地区、套餐可能随时调整。任何情况下都**不要求你向 FreeClaude 提供邮箱、手机号、密码、验证码、TOTP 密钥或 API Key**。

## 先判断 3 件事

1. **能不能合法使用？** 查看 [官方支持地区](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)，只有在官方支持的地点才应创建和使用 Claude。官方要求使用者年满 18 岁。
2. **账号是不是自己能长期控制？** 准备你自己的邮箱（可通过 Google 账户登录，或用邮箱安全登录链接）。新账号的电话验证按官方页面操作，不能用匿名接码平台代替。
3. **你需要哪种 Claude？** 只想聊天/写文章/读文件，先用 Claude Free。若需要 Claude Code、API 或更大用量，先看 [官方价格页](https://claude.com/pricing)。

## 正确开始

**第 1 步**：用自己信任的现代浏览器访问 `https://claude.ai/`。

**第 2 步**：选择「Continue with Google」或「Continue with email」，按官方界面要求完成授权、邮箱安全链接及必要身份验证。

**第 3 步**：如果注册页面要求手机验证，使用符合官方规则、本人可以接收短信的手机号码。官方说明参见 [Verify your phone number](https://support.claude.com/en/articles/8287232-verify-your-phone-number)。

**第 4 步**：成功进入 Claude 后先做下面一个真实任务；不要一开始就购买账号或升级套餐。

### 三个快速练习

- **办公**：给 Claude 一段不含隐私的会议纪要，要求输出「决策 / 责任人 / 截止日期 / 风险」。
- **求职**：提供岗位 JD 和真实经历，让 Claude 帮你提取岗位能力要求、暴露简历缺口，不代编数据。
- **创作**：给 Claude 一个真实场景，让它输出短文结构、可核实事实清单和标题假设。

## 遇到问题，从哪查起？

| 问题 | 正确入口 |
|---|---|
| 收不到邮件、登录链接无效 | [01 账号与登录](01-registration.md) |
| Google 登录 / 手机验证失败 | [02 故障排查](02-troubleshooting.md) |
| 购买账号、指纹浏览器、2FA 密钥是否安全 | [03 账号与隐私安全](03-security.md) |
| 免费版功能与使用额度 | [04 免费版玩法](04-free-playbook.md) |
| Claude Code / API 免费吗 | [05 Code 与 API](05-claude-code-api.md) |
| 15 页原教程有哪些需要纠正的地方 | [06 原材料审读](06-source-audit.md) |
| 复制即用的提示词 | [07 实战提示词](07-prompts.md) |

## 终端工具（非必需）

只想自查电脑能否访问官方域名，可安装 Node.js 20+ 并在项目目录运行：

```bash
node bin/freeclaude.mjs doctor
```

工具只检查 DNS 与 HTTPS **连通性**，不是 VPN 教程，也不验证账号资格；连通性正常不代表你所在地区可注册。
