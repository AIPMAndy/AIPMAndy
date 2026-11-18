# FreeClaude Check：网络环境检测的真实能力与边界

> 2026-11-18 · FreeClaude v1.1.0 · 独立原创实现，参考 [`ip.net.coffee/claude/`](https://ip.net.coffee/claude/) 可观察的产品结构与功能类别。没有复制原站私有代码、评分算法或品牌素材。

## 目标与入口

目标：帮助用户排查**自己浏览器访问网络的出口信息**，不是提供 Anthropic 官方评分、封号预测、身份伪装或绕过地区限制。入口 `site/check/`，本地运行 `npm start` 后访问 `http://127.0.0.1:4173/check/`；也可在独立 GitHub Pages 项目中把 `site/` 作为静态根目录部署。

## 能力矩阵与数据准确性

| 检测项 | 实际来源/方式 | 确认程度 | 无数据时处理 |
| --- | --- | --- | --- |
| 浏览器常规 HTTP 出口 IP | `api.ipify.org`（IPv4 优先）/ `api64.ipify.org` 备用 | 该服务从自己服务器观察到的 IP | 显示不可用 |
| 地理位置、城市、ASN、ISP | `https://ipwho.is/` | 第三方 IP 库的估算，可滞后/误差 | 显示未知 |
| Cloudflare 观察 IP | `https://speed.cloudflare.com/meta` | 成功且跨域允许时的 Cloudflare 观测值 | 显示跨域/网络限制，不填造 IP |
| Claude AI 真实观测 IP | 需要 `claude.ai` 服务端配合的回显 | **本静态页无法独立获取** | 明确显示无法直接读取 |
| 网络信息一致性参考分 | 本项目公开公式，对比两个 IP 观察和浏览器时区 | **只是信息一致性，不是信任/风险分** | 缺少两个独立 IP 来源时为 `—` |
| VPN、Tor、机房、风险相关字段 | `https://ipsnapshot.com/api/ip/{IP}`（只针对常规 HTTP 出口查询） | 第三方情报；可能误判 | 无字段显示“未检测”，不将其视为安全 |
| IP 的住宅/机房属性 | IPSnapshot `is_datacenter` | 只能判断是否被此源标为机房，不能直接证明“住宅” | 未分类 |
| Claude / Anthropic 资源可请求 | 浏览器发起 `no-cors` 静态资源请求 | 仅能说明请求在该浏览器被接受，**不能判断账户、API 或服务状态** | 显示未能确认 |
| DNS 解析器 IP / 泄露 | 需要专门的 DNS 出口服务器配合 | 本静态页不能直接检测系统 DNS | 引导到专门检测网站 |
| WebRTC 公网候选地址 | 用户手动触发 `RTCPeerConnection` STUN 探测 | 可能被浏览器 mDNS、隐私设置、NAT 阻止 | “未发现”不等于“无泄露” |
| 浏览器环境 | 浏览器自身提供的语言、时区、触屏、UA、WebGL、Canvas 摘要 | 在浏览器隐私策略允许范围内 | 未提供/不可获取 |
| 历史 | 浏览器 `localStorage` | 可在本机复看；不同设备、无痕模式不共享 | 默认关闭，手动开启 |

### 环境信息一致性参考分（纯函数 `environmentScore()`）

基础 70 分（只有 IPify 与 ipwho.is 两个来源均有 IP 才计算）：

- 两者一致：`+20`；不同 `-20`。
- 浏览器时区字符串与 ipwho.is 的时区相同：`+10`。
- 如取得 Cloudflare IP，且不同于 IPify：`-10`。
- 如用户手动取得 WebRTC STUN 公网候选地址，且有不同于 IPify 的地址：`-10`。
- 最终裁切到 `0..100`；缺少两个来源则 `—`。

**解释必须写在界面上：** 这只是为了观察几路网络数据是否一致，地理分流、设备多网卡、时区语言偏好会造成正常差异。不能把 100 分说成“可信”、把低分说成“封号”。它与 Net.Coffee 的信任评分和 Anthropic 的风控系统**没有可验证的对应关系**。

## 隐私/安全设计

1. 不自动探测：用户点击“开始检测”后才联系第三方；IP 默认隐藏。
2. 不收集密码、验证码、Cookie、Token、OTP、Claude 账号等字段。
3. STUN 只有独立的“深度检测”点击才能触发，使用 `stun.l.google.com:19302`；这会向 Google 的 STUN 服务器发送 UDP 请求。
4. 默认不存储历史；用户勾选后只将摘要写入其浏览器 `localStorage`，可清除。
5. 复制报告遵循当前“隐藏 IP”状态。浏览器 Canvas 摘要仅本地计算，不写入历史、不上传给 FreeClaude。
6. 使用安全的 DOM 文本渲染，第三方响应不作为 HTML 注入。

## 数据来源与许可

- [IPify](https://www.ipify.org/)：公开 IP 回显。
- [ipwho.is](https://ipwhois.io/documentation)：公开 IP 地理和 ASN 数据。免费接口有用途和用量限制，商用需要核实服务协议。
- [Cloudflare Speed metadata](https://speed.cloudflare.com/)：元信息，部分浏览器可能因 CORS 无法读取。
- [IPSnapshot / IPNOVA](https://ipsnapshot.com/ip-lookup-api)：可公开浏览器访问的第三方 IP 安全/类型情报接口，按其公开文档的免密额度使用。**地理/ASN 数据归属于 DB-IP Lite，CC BY 4.0，特此署名。**
- [Claude 官方服务状态](https://status.claude.com/)：官方网站自行核查。
- [dnsleaktest](https://www.dnsleaktest.com/)：站外 DNS 深度检测，不由 FreeClaude 代跑。

## 验收

在根目录运行 `npm test`；浏览器里访问 `http://127.0.0.1:4173/check/`，验证：未点击检测不发出 IP 请求、点击后出现真实来源或未知、开关隐藏 IP、复制报告、可选存储与清除、移动端三列收缩、深浅色模式。浏览器无网络或 API 失败时必须保留清晰的未知状态。

**项目风险边界：** 不能保证 Claude 账号注册、验证、订阅、避免封号，也不提供通过伪装指纹、绕过身份/地区限制的脚本。
