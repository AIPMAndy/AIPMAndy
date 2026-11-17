# 02｜登录失败、手机验证、封号与额度：按症状排查

> **原则**：先看官方错误文本与状态页，再检查个人环境，最后通过官方支持渠道解决。不要因为遇到风控提示，就开始更换大量新账号、伪装浏览器指纹或购买身份资料。

## A. 输入邮箱后收不到登录链接

**先确认**：是否为本人拥有、能够正常收发邮件的邮箱？

1. 搜索收件箱、垃圾箱、促销箱及邮箱过滤规则，看看是否被归档或隔离。
2. 等待短暂延迟后，通过 `https://claude.ai/` 官方入口重新发起登录。
3. 使用**最新**邮件中的链接；不要把它复制给别人。
4. 学校或企业邮箱可能受到 IT 邮件安全策略影响，请联系邮箱管理员。
5. 如果是在手机打开链接、电脑发起登录，请返回发起请求的原设备输入邮件生成的验证码。

参考：[Log in to your Claude account](https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account)。

## B. Google 授权弹窗失败或账号不匹配

1. 确认访问的是 `https://claude.ai/`（不要在陌生第三方网页输入 Google 密码）。
2. 查看 [官方服务状态](https://status.claude.com/)，避免把平台服务故障误判为自己的设备问题。
3. 检查弹窗是否选错了个人/工作 Google 账号。
4. 若授权关系出现异常，可根据官方登录帮助文章中的步骤检查 `https://myaccount.google.com/connections`，撤销 Claude 的 Google 授权后重新授权。**此操作会改变授权状态**，先确认该账号归你本人所有。

## C. 收不到手机验证码

1. 先核对 [官方支持地区](https://support.claude.com/en/articles/8461763-where-can-i-access-claude)。
2. 核对国家代码、号码是否为可收短信的本人真实号码。
3. 查看官方页面对号码类型、重发间隔和错误信息的具体要求。
4. 遇到无法完成验证的情况，使用 [官方手机验证说明](https://support.claude.com/en/articles/8287232-verify-your-phone-number) 中的支持路径。

**不要**使用接码平台、虚拟身份或第三方共享手机号绕过验证。

## D. 账号被封、被冻结、限制访问

1. 记录提示发生的日期、错误信息与操作步骤，**不要**向公开论坛提交姓名、邮箱、token、原始截图。
2. 如果认为是误判，按 [官方申诉说明](https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals) 登录受限制账号，在限制页找到申诉入口。
3. 检查是否有地区资格、年龄、服务条款、账户共享或滥用行为的相关问题。
4. 不承诺“申诉必过”、也没有“永久不封号”的技术保证。

## E. 网页打不开或载入异常

分清三个层次：

| 层次 | 表现 | 能做的验证 |
|---|---|---|
| 服务端 | 多人同时无法使用、官方公告故障 | [status.claude.com](https://status.claude.com/) |
| 本机网络 | DNS 无法解析、TLS/HTTPS 错误 | `node bin/freeclaude.mjs doctor` |
| 账户/资格 | 网页可打开，但要求验证或提示受限 | 官方账号支持渠道 |

`doctor` 只验证 DNS/HTTPS 是否有连接，无法判断是否符合服务地区政策，也不会自动更换 IP、浏览器指纹或代理。

## F. 提示免费额度已用完

**免费不等于无限**。使用额度受会话长度、模型、复杂度及功能等因素影响。先查看产品实际显示的额度恢复提示；尽量用完整、明确的指令减少重复对话。高频用量再评估 [官方套餐](https://claude.com/pricing)。

参考：[How do usage and length limits work?](https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work)。

## G. Claude Code 不支持 Free / API 需要 Key

Claude Code 是面向代码仓库/终端的独立工作流，并非普通 Free 网页对话的标配权益。API 是另一个计费与授权体系，不能把网页登录凭据作为公共 API 服务提供给他人。详情参见 [05｜Claude Code 与 API](05-claude-code-api.md)。
