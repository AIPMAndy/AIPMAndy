# 官方资料与事实核验台账

**最近手工核验：2026-11-17**。此页面是来源记录，不保证永久有效，建议每月复核一次。

| 项目中的关键事实 | 来源 | 复核提示 |
|---|---|---|
| Claude 具有免费套餐，Free 使用有限额；Claude Code 非 Free 标准权益 | [Plans & Pricing](https://claude.com/pricing) | 不引用无法验证的“免费消息条数”，套餐功能可能变更 |
| Google 与邮箱安全链接是官方登录途径；不同设备可能要求在原设备输入代码 | [Log in to your Claude account](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account) | 查看官网当前授权步骤 |
| 创建账号要求位于支持地区，手机号码须符合条件，不能绕过手机验证 | [Verify your phone number](https://support.claude.com/en/articles/8287232-verify-your-phone-number) | 电话规则和支持地区可能变更 |
| 实际支持的国家/地区名单 | [Where can I access Claude?](https://support.claude.com/en/articles/8461763-where-can-i-access-claude) | 不在仓库维护静态名单，直接跳官方 |
| Free Projects 数量目前最多 5 个 | [What are projects?](https://support.claude.com/en/articles/9517075-what-are-projects) | Beta 变化要复核 |
| 额度与上下文长度属于不同限制 | [How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work) | 用户套餐及使用情况不同 |
| 封禁误判应通过限制页官方申诉流程处理 | [Safeguards warnings and appeals](https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals) | 申诉入口以官网为准 |
| 官方运行状态 | [Claude Status](https://status.claude.com/) | 实时查询，不缓存历史状态作为今日结果 |
| 消费者使用最低年龄、账户凭据共享限制 | [Consumer Terms](https://claude.com/legal/consumer-terms) | 涉及法律条款，请以所在地和官方条款为准 |

## 本仓库的非官方推断

- “只用自己拥有的邮箱、少装不必要扩展、保护 TOTP 原始密钥”等安全建议是一般信息安全最佳实践，而非 Anthropic 特定封禁原因的证明。
- `freeclaude doctor` 的 HTTPS 连通性可帮助分辨一类本地网络故障，但无法证明地理位置或用户身份是否合规。
- 原上传教程的全部经验性风控结论没有被当成已验证事实直接引用。
