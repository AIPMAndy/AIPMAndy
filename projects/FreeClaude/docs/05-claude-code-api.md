# 05｜Claude Free、Claude Code、API，到底差在哪里？

| 类型 | 你实际上在使用什么 | 是否属于普通 Free 标配 |
|---|---|---|
| **Claude Free** | claude.ai 网页/应用中的个人对话能力、部分工具与文件功能 | ✅，但有限额 |
| **Claude Code** | 面向工程项目和终端/代码工作流的 Agent 能力 | ❌，以当前官方套餐说明为准 |
| **Claude API** | 通过平台开发者密钥调用 Claude 模型的服务 | ❌，独立于 Free 聊天额度；按 API 计费规则 |

## 如何判断自己的需求？

**只想生成一段代码、解释报错、梳理产品需求？** 先用 Claude Free 网页聊天试试。

**想在代码仓库里执行多步修改、运行测试、管理开发流程？** 才考虑 Claude Code 或其他可合法使用的工具。

**想在自己的网站、App 或 Agent 工作流中接入模型？** 需要阅读 Claude Console 与 API 的官方认证和计费文档，建立自己的开发者账号。不要以非官方方式转售或共享网页登录凭据。

## 一条最重要的安全规则

第三方软件集成应通过 Anthropic 推荐的 **Claude Console API Key** 或支持的云提供商进行授权；订阅计划授权不应被用作公开共享接口的替代品。

## 参考

- [官方定价](https://claude.com/pricing)
- [官方登录帮助：第三方工具认证说明](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account)
- [Claude Console](https://platform.claude.com/)
