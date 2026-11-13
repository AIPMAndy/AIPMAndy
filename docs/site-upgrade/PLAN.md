# 星觉科技 · GitHub 知识网站升级作战计划

> 版本 v1.2 · 2026-11-14（Asia/Shanghai）· 负责人：AI 酋长 Andy · 本计划即执行进度账本。

## 一、唯一目标

把 GitHub 公开教程做成统一的、可信的、可实际使用的**知识产品矩阵**：高质量教程 + 可运行工具 + 可核验案例 + 精美 PDF + 清晰的个人/企业服务入口。以真实用户问题为中心，服务 SEO、GEO、品牌可信度与商业询盘，不承诺排名、销量或收益。

**统一公开信息（已由用户确认）**
- 个人微信：**AIPMAndy**；所有官网 CTA 提供「复制微信号」，复制成功才提示。
- 个人官网：[https://metaver.vip/](https://metaver.vip/)，个人服务：[https://metaver.vip/services](https://metaver.vip/services)。
- 公司官网：[https://www.a6no1.cn/](https://www.a6no1.cn/)；品牌名称：星觉科技 / AI 酋长 Andy。
- 公众号：AI 酋长 Andy（仅文字搜索入口，不编造二维码）。
- 平台：GitHub Pages（不是其他托管服务）；仓库与 Pages 必须一一可追溯。

## 二、固定信息架构（每站统一，不统一内容）

1. **首屏**：一句话写清「谁遇到什么问题 → 这里可以做成什么」，一主 CTA「开始实操」，一辅助 CTA「下载 PDF」。
2. **实操导航**：按目标/行业/角色分入口，不在首页展示几十段解释；正文保留完整深度，分层展开。
3. **可用工具**：每站至少一个有输入、有输出、有边界说明的小工具；优先计算器、路径选择器、诊断工作台或可编辑模板。
4. **证据案例**：分类为「本人可公开且可核验的项目实践」「第三方可追溯案例」「明确标注的教学模拟」；不把搜索/Stars 等同成交，不编造客户、Offer、收入、成功率。
5. **知识证据**：发布时间/最近核验日期、源链接、适用地区、限制、作者、方法论、可复现步骤。
6. **联系与信任**：顶部精简入口，页面底部完整品牌区：微信 AIPMAndy（可复制）/个人官网/公司官网/GitHub/公众号；不强制留资阅读。
7. **PDF**：网页与 PDF 同一个知识源，目录/页码/书签（可能时）/可点击超链接/微信与双官网；移动端阅读与打印验收。

## 三、设计语言 / 质量门槛

- 视觉：黑白灰为主、少量品牌蓝、完整响应式；拒绝大面积 AI 渐变、悬浮假数据、花哨徽章、密集堆砌卡片。
- 排版：每个可视区一个信息主焦点；桌面正文 70–80 字符宽；手机端不卡横向滚动，触控目标和对比度合格。
- 性能：静态优先、少 JS、无第三方追踪默认加载；测量 Core Web Vitals，不能凭感觉宣称 90+ 分。
- SEO：唯一 H1、准确 title/description、canonical、OG、robots/sitemap、内链/面包屑、404 检查。JSON-LD 仅标注页面真实可见事实。
- GEO：可引用的事实卡、来源与更新日期、FAQ 的准确答案、作者实体一致；llms.txt 可提供导航但不是排名保证。
- 转化：关键事件分「教程访问 → 工具使用 → PDF 点击 → 微信复制/服务页点击 → 真实线索」，没有用户授权不上传输入；转化率要用真实数据计算。
- 验收：生成器可复现、原有工具无回归、测试通过、链接有效、PDF 文本可选择且中文无乱码、GitHub Actions 部署成功且线上确认可访问。

## 四、执行流程（有状态的 loop）

**Stage 0 INVENTORY → Stage 1 REVIEW → Stage 2 BRANCH/EDIT → Stage 3 BUILD/TEST → Stage 4 MERGE/DEPLOY → Stage 5 LIVE/PDF QA → Stage 6 DONE**。

每个循环只处理能完成核验的一组仓库，优先 P0。先取最新 SHA 防止覆盖其他任务。识别源文件与生成文件，优先改源文件；若主站存在高风险变更，则用分支/PR，绝不强行覆盖。记录仓库、修改文件、测试、Commit/PR、网站/PDF 链接、剩余阻塞。没有成功部署，状态只能写「已提交/待上线验证」。

### 完成条件（Definition of Done）

- [ ] 关键功能真实可用；移动端、无障碍、兼容性初验通过
- [ ] 微信 AIPMAndy、个人官网、公司官网准确可见；链接与复制动作验收
- [ ] 首页缩短且正文可深度访问；案例分级、不编造业务业绩
- [ ] canonical/robots/sitemap/OG/结构化数据按需正确
- [ ] PDF 存在或明确记录为不适用；与网站同版本并通过视觉 QA
- [ ] CI 与 Pages 部署完成；线上页面与 PDF 可真实打开
- [ ] 记录 SHA、证据、完成日期及下一次维护计划

## 五、优先级与仓库/PDF 目录（首轮）

已检索到 128 个仓库；其中选出 33 个教程/知识站点完成**仓库目录级检查**：首轮有 PDF 文件 22 个，未发现 11 个；本轮已补 1 份，当前 23 个项目在仓库内有 PDF，10 个未发现。这不是 PDF 视觉或 Pages 上线验收。

| 阶段 | 仓库 | PDF 目录状态 | 网站状态 | 本轮核心改造 |
|---|---|---|---|---|
| P0 | [how-to-get-offer](https://github.com/AIPMAndy/how-to-get-offer) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 课程+求职工具；补 PDF 并缩短首页 |
| P0 | [chinese-international-student-career-guide](https://github.com/AIPMAndy/chinese-international-student-career-guide) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 全球地区导航/签证资格；检查国家差异与下载 |
| P0 | [chinese-international-student-ai-jobs](https://github.com/AIPMAndy/chinese-international-student-ai-jobs) | 仓库内有 PDF | 目录已审；线上与视觉待验 | AI 岗位证据生成与简历匹配 |
| P0 | [chinese-international-student-product-jobs](https://github.com/AIPMAndy/chinese-international-student-product-jobs) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 产品能力作品集/证据卡；压缩冗长首页 |
| P0 | [chinese-international-student-business-jobs](https://github.com/AIPMAndy/chinese-international-student-business-jobs) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 职能选择器；补 canonical 与结构化数据 |
| P0 | [local-business-ai-growth-handbook](https://github.com/AIPMAndy/local-business-ai-growth-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 商家诊断/预算测算；检查 PDF 与线上构建 |
| P0 | [restaurant-ai-customer-acquisition-handbook](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 餐饮获客 SOP/ROI 工具 |
| P0 | [ai-china-content-commerce-handbook](https://github.com/AIPMAndy/ai-china-content-commerce-handbook) | **PDF 已生成入库（628 KB）** | **新版与 PDF 均已通过 CI/Pages 部署；独立视觉验收待完成** | 完成首屏精简、品牌/联系信息、SEO/GEO、回归测试、30 章+37 公开案例 PDF |
| P1 | [ai-cross-border-ecommerce-playbook](https://github.com/AIPMAndy/ai-cross-border-ecommerce-playbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 地区选型+跨境单元经济 |
| P1 | [ai-knowledge-paid-acquisition-handbook](https://github.com/AIPMAndy/ai-knowledge-paid-acquisition-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 知识付费漏斗与报价工具 |
| P1 | [100m-in-5-years-handbook](https://github.com/AIPMAndy/100m-in-5-years-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 收入模型的假设边界；补 PDF |
| P1 | [geo-handbook](https://github.com/AIPMAndy/geo-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 可引用知识库/可信证据；补 PDF |
| P1 | [seo-handbook](https://github.com/AIPMAndy/seo-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 关键词工作台/检查清单；补 PDF |
| P1 | [xiaohongshu-income-handbook](https://github.com/AIPMAndy/xiaohongshu-income-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 平台约束/模板/PDF 同步 |
| P1 | [anthropic-claude-code-agent-handbook](https://github.com/AIPMAndy/anthropic-claude-code-agent-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | Agent 实操与版本日期 |
| P1 | [HowToMakeMoneyOnYouTube](https://github.com/AIPMAndy/HowToMakeMoneyOnYouTube) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 视频工作台/收益条件；补 PDF |
| P1 | [github-income-handbook](https://github.com/AIPMAndy/github-income-handbook) | 未在仓库发现 PDF | **改版已提交；内容校验和 Pages 部署成功，独立视觉待验** | 删除冗长说理区、首页导航/双官网/微信、组织实体结构化数据完成；待补 PDF |
| P1 | [threads-income-handbook](https://github.com/AIPMAndy/threads-income-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 内容实验/数据看板 |
| P1 | [x-income-handbook](https://github.com/AIPMAndy/x-income-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | X 转化漏斗/模板 |
| P1 | [chatgpt-income-handbook](https://github.com/AIPMAndy/chatgpt-income-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 交易路线与服务卡；补 PDF |
| P1 | [one-person-ai-income-guide](https://github.com/AIPMAndy/one-person-ai-income-guide) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 进度/业务计算器 |
| P1 | [how-to-earn-usd-from-china](https://github.com/AIPMAndy/how-to-earn-usd-from-china) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 合规条件/地区边界 |
| P1 | [HowToBeAnAICreator](https://github.com/AIPMAndy/HowToBeAnAICreator) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 创作者工作流/内容实操 |
| P2 | [ai-era-survival-guide](https://github.com/AIPMAndy/ai-era-survival-guide) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 岗位风险评估/行动计划；补 PDF |
| P2 | [grok-bot-handbook](https://github.com/AIPMAndy/grok-bot-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 教程平台版本核对 |
| P2 | [muse-guide](https://github.com/AIPMAndy/muse-guide) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 交互体验/案例 |
| P2 | [infj-career-growth-guide](https://github.com/AIPMAndy/infj-career-growth-guide) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 职业路径工具 |
| P2 | [intj-growth-guide](https://github.com/AIPMAndy/intj-growth-guide) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 成长工具与证据 |
| P2 | [how-to-survive-unemployment](https://github.com/AIPMAndy/how-to-survive-unemployment) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 失业流程与政策来源 |
| P2 | [how-to-job-hop-and-raise-salary](https://github.com/AIPMAndy/how-to-job-hop-and-raise-salary) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 薪酬换岗验证与证据 |
| P2 | [AI-Awareness-Club](https://github.com/AIPMAndy/AI-Awareness-Club) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 社群介绍与统一品牌；补 PDF |
| P2 | [AIPMAndy.github.io](https://github.com/AIPMAndy/AIPMAndy.github.io) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 矩阵入口门户；是否需 PDF 另定 |
| P2 | [Gemini-Canvas-Video-Kit](https://github.com/AIPMAndy/Gemini-Canvas-Video-Kit) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 视频制作可复现示例 |

## 六、进度记录

| 日期 | 项目/范围 | 已完成 | 尚未完成 |
|---|---|---|---|
| 2026-11-14 | 账号与 33 站首轮审计 | 获取 GitHub 仓库目录和 PDF 存在性；确认统一公开渠道；制定分级、测试与发布标准 | 逐站实际改版、PDF 视觉检查、线上 Pages 验收 |\n| 2026-11-14 | [ai-china-content-commerce-handbook](https://github.com/AIPMAndy/ai-china-content-commerce-handbook) | 更新 7 处源码/文档并修复测试依赖；提交 [2939c3c](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/commit/2939c3c250feded4530332a93a2a10bf21eca2a8)。[Actions #43463415568](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/actions/runs/43463415568) 测试和部署均 success。 | 独立网站渲染 QA、PDF 生成/下载及 PDF 校对未完成；**不能标为 DONE** |\n| 2026-11-14 | 持续升级任务 | 建立每 6 小时一轮的定期执行任务，从 P0 待办续做并写回本文件 | 各轮以真实提交/测试/Pages 验收为准 |

| 2026-11-14 | 内容电商 PDF 自动出版 | [PDF 构建提交 e3b0e03](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/commit/e3b0e03686fa7189ac1a08cb5dc0a005baf4e48b)，[Actions #43465443876](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/actions/runs/43465443876) 验证/部署成功；PDF 同步提交 main，网站与仓库各有 628,202 字节文件。 | PDF 独立逐页渲染/手机端验收待完成，当前不能标记 DONE。 |\n\n| 2026-11-14 | [github-income-handbook](https://github.com/AIPMAndy/github-income-handbook) | [提交 565d97a](https://github.com/AIPMAndy/github-income-handbook/commit/565d97a8642d7f7972064ef0bd5eba11635a59c7)：首页压缩、统一微信/双官网、Organization JSON-LD 与响应式，更新回归检查；[内容校验](https://github.com/AIPMAndy/github-income-handbook/actions/runs/43466251920)、[Pages 部署](https://github.com/AIPMAndy/github-income-handbook/actions/runs/43466251916) 均 success。 | 缺 PDF；独立线上视觉/交互 QA 待完成。 |\n
后续每次实际提交后，应补： `项目 | 状态 | 改动摘要 | Commit/PR | 测试 | Pages URL | PDF URL | 阻塞 | 下一步`。

## 七、迭代管理原则

1. 只把**核实过的结果**标成已完成；不能用「代码已写」代替「网站已上线」。
2. 不在别人可能仍在编辑的仓库上 force push，不以预设日期覆盖新提交。
3. 每轮先完成一个可验收产出（页面、功能、PDF 或 SEO），再下一个；重复性工作要做成可复用脚本/模板。
4. 跨站共性升级统一维护，但不把具体业务内容模板化得千篇一律。
5. 因并行任务/权限/仓库状态受阻时，说明阻塞并继续安全的下一项；所有网站完成后停止无意义修改，进入维护模式。

## 八、成功指标与业务边界

- 交付指标：已验收网站数 / 33；已验收 PDF 数 / 适用数；有效联系信息覆盖率；404/错误链接数。
- 体验指标：真实测试得到的 Core Web Vitals、可用性反馈、PDF 的移动端可读性。
- 商业指标：有来源的自然搜索流量、教程/工具使用、微信复制/服务入口点击、明确归因的有效咨询（不收集无同意的个人数据）。
- 原则：免费开源知识不以强制加微信为前提；B 端真实案例需获得可公开许可及证据；服务范围明确且不保结果。
