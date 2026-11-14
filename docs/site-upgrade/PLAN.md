# 星觉科技 · GitHub 知识网站升级作战计划

> 版本 v1.8 · 2026-11-14（Asia/Shanghai）· 负责人：AI 酋长 Andy · 本计划即执行进度账本。

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

已检索到 128 个仓库；其中选出 33 个教程/知识站点完成**仓库目录级检查**：首轮有 PDF 文件 22 个，未发现 11 个；本轮已补 1 份，截至本轮，26 个项目在仓库内有 PDF，7 个尚未发现（仅存在性，不代表质量完成）。这不是 PDF 视觉或 Pages 上线验收。

| 阶段 | 仓库 | PDF 目录状态 | 网站状态 | 本轮核心改造 |
|---|---|---|---|---|
| P0 | [how-to-get-offer](https://github.com/AIPMAndy/how-to-get-offer) | **82 页 PDF 仓库/Pages 已发布，82 页自动 QA 已通过；人工视觉待验** | **本轮新增桌面/手机视口 Chromium 真实交互回归：[Browser #43585775608](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43585775608)、[Pages #43585775618](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43585775618) 均 success；实际 iOS/Android 待验** | 新增 390/360/1280px 截图、100 任务状态持久化/搜索、岗位录入、CSV 导出、HTML 转义、无横向溢出自动检查；源码与 PDF 不改，另外增加上线 HTTP/SHA 校验 [398828b](https://github.com/AIPMAndy/how-to-get-offer/commit/398828b8d841195a49c80a00166d1c37b7155ce6) 待最终工作流完成 |
| P0 | [chinese-international-student-career-guide](https://github.com/AIPMAndy/chinese-international-student-career-guide) | **PDF 已在线发布；当前 SHA 81 页结构 QA 和全页总览通过，逐页高倍率/实机验收待补** | **源码驱动 SEO 与 Pages 成功；50 页 metadata/SEO 和 8 个线上资源验证通过；完整视觉/移动实测待补** | 已添加 canonical/OG/JSON-LD、绝对 sitemap/robots、双官网和服务入口；保留地区筛选与模板，后续补手机浏览器 QA 及地区规则复核 |
| P0 | [chinese-international-student-ai-jobs](https://github.com/AIPMAndy/chinese-international-student-ai-jobs) | **109 页 PDF 已公开；线上 SHA 与历史逐页 QA 的 SHA 一致** | **源码驱动网站改版、SEO/GEO 完整性检查、Pages 与技术案例 CI 成功；移动端复验待补** | 52 页 canonical/OG/JSON-LD + sitemap/robots；来源打包链已恢复；继续核验移动浏览器、岗位链接更新与出版包视觉质量 |
| P0 | [chinese-international-student-product-jobs](https://github.com/AIPMAndy/chinese-international-student-product-jobs) | **128 页 PDF 已入库，逐页视觉与哈希记录可查** | **源码重建 + 全页 SEO/GEO + GitHub Pages + 下载校验均成功** | 补 WebPage JSON-LD、OG、三个关联专题/服务入口；修复源码 ZIP 遗漏 site/home.html，并在 CI 重打包；iOS/Android 真机及新岗位有效性仍待周期复核 |
| P0 | [chinese-international-student-business-jobs](https://github.com/AIPMAndy/chinese-international-student-business-jobs) | **180 页 PDF 完整视觉 QA 已记录，仓库与线上有成品** | **全部章节 canonical/OG/JSON-LD、源码重建、站内链接、PDF 下载与 Pages 验证成功** | 修复首页旧发布提示并添加跨专题入口；CI 改为从最新内容生成网站与 ZIP；iOS/Android 真机和动态招聘规则仍需复核 |
| P0 | [local-business-ai-growth-handbook](https://github.com/AIPMAndy/local-business-ai-growth-handbook) | **71 页 PDF 已校验并随 Pages 发布，SHA 一致** | **本轮源码升级与线上 PDF/首页校验成功；手机/全页视觉待验** | 已补首页 PDF 下载、robots/llms 导航、PDF 校验与三页预览；后续真机测试 |
| P0 | [restaurant-ai-customer-acquisition-handbook](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook) | **47 页 PDF 已镜像到网站目录、线上 SHA 一致** | **首页/PDF/SEO/CI 与线上校验成功；手机/全页视觉待验** | 已补 PDF 下载、canonical/OG/JSON-LD 与结构、链接和视觉样张 QA |
| P0 | [ai-china-content-commerce-handbook](https://github.com/AIPMAndy/ai-china-content-commerce-handbook) | **40 页 PDF 已仓库/Pages 同步，628203 字节；全页自动 QA 零错误/警告；人工视觉待验** | **CI/Pages 成功；手机真机仍待验** | 本轮补 PDF 全页渲染 QA 与可下载产物，产物 [#43556619737](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/actions/runs/43556619737) |
| P1 | [ai-cross-border-ecommerce-playbook](https://github.com/AIPMAndy/ai-cross-border-ecommerce-playbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 地区选型+跨境单元经济 |
| P1 | [ai-knowledge-paid-acquisition-handbook](https://github.com/AIPMAndy/ai-knowledge-paid-acquisition-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 知识付费漏斗与报价工具 |
| P1 | [100m-in-5-years-handbook](https://github.com/AIPMAndy/100m-in-5-years-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 收入模型的假设边界；补 PDF |
| P1 | [geo-handbook](https://github.com/AIPMAndy/geo-handbook) | **新增86页PDF，906732字节，从56份源文件生成；全页自动QA零错误/警告** | **网站源码SEO/GEO/PDF上线；六个实际线上URL HTTP 200 且 SHA-256 匹配** | 补 PDF、全站 JSON-LD/公司/服务入口、根 canonical 与 sitemap、CI 自动测试；高倍率人工视觉和真机仍需补 |
| P1 | [seo-handbook](https://github.com/AIPMAndy/seo-handbook) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 关键词工作台/检查清单；补 PDF |
| P1 | [xiaohongshu-income-handbook](https://github.com/AIPMAndy/xiaohongshu-income-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | 平台约束/模板/PDF 同步 |
| P1 | [anthropic-claude-code-agent-handbook](https://github.com/AIPMAndy/anthropic-claude-code-agent-handbook) | 仓库内有 PDF | 目录已审；线上与视觉待验 | Agent 实操与版本日期 |
| P1 | [HowToMakeMoneyOnYouTube](https://github.com/AIPMAndy/HowToMakeMoneyOnYouTube) | 未在仓库发现 PDF | 目录已审；线上与视觉待验 | 视频工作台/收益条件；补 PDF |
| P1 | [github-income-handbook](https://github.com/AIPMAndy/github-income-handbook) | **本轮新增 63 页 PDF（20 章 Markdown、3 份来源研究、13 份模板）入库并上线；159 书签、194 链接、63/63 页自动渲染与文本/边界 QA 通过；人工高倍率待验** | **[Pages+PDF QA #43585933169](https://github.com/AIPMAndy/github-income-handbook/actions/runs/43585933169) success，首页/PDF/sitemap/robots 在线 HTTP 200，PDF SHA-256 与仓库一致；实体移动端待验** | 将 [源文档生成器](https://github.com/AIPMAndy/github-income-handbook/blob/main/scripts/build_pdf.py)、[全页检查](https://github.com/AIPMAndy/github-income-handbook/blob/main/scripts/pdf_quality_gate.py)、PDF 下载 CTA、无强制留资服务入口入库；逐页人工审核和移动端回归待办 |
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
| 2026-11-14 | [how-to-get-offer](https://github.com/AIPMAndy/how-to-get-offer) | [改版提交 d43fac0](https://github.com/AIPMAndy/how-to-get-offer/commit/d43fac03034992bfd8b481ed00c73c5f22882794) / [PDF 流水线 40297f1](https://github.com/AIPMAndy/how-to-get-offer/commit/40297f181e2bc93c9d6e1e7620c2b5c590d0e322) / [PDF 自动提交 905a4ae](https://github.com/AIPMAndy/how-to-get-offer/commit/905a4ae3cd6e51f47490a5082407bf0ab11169d0)；[内容 CI 成功](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43471717216)，[PDF 构建与 Pages 部署成功](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43471717215)；公开 PDF 1,298,524 字节、44 篇正文、100 项任务。 | 尚需独立浏览器/阅读器视觉、移动端和 PDF 逐页 QA，不可标为全部 DONE。 |\n
| 2026-11-14 | [chinese-international-student-business-jobs](https://github.com/AIPMAndy/chinese-international-student-business-jobs) | [提交 77c45ce](https://github.com/AIPMAndy/chinese-international-student-business-jobs/commit/77c45ce20c540b8aa67a162f009b20145415df72)：7 文件含源码/生成首页双版本、统一 CSS、canonical/OG/JSON-LD、robots、llms.txt、52 URL sitemap；[Pages #43472389231](https://github.com/AIPMAndy/chinese-international-student-business-jobs/actions/runs/43472389231) 成功。 | 独立浏览器视觉 QA、手机端体验、PDF 逐页验收仍需完成。 |\n
后续每次实际提交后，应补： `项目 | 状态 | 改动摘要 | Commit/PR | 测试 | Pages URL | PDF URL | 阻塞 | 下一步`。

| 2026-11-14 | [chinese-international-student-career-guide](https://github.com/AIPMAndy/chinese-international-student-career-guide) | 起始 main `36bbda1`，源码生成器提交 [a2fd76d](https://github.com/AIPMAndy/chinese-international-student-career-guide/commit/a2fd76dff9548643c11ac0ca8eaaa485d69058d1)，SEO 回归检查 [d3f7d42](https://github.com/AIPMAndy/chinese-international-student-career-guide/commit/d3f7d4286f17df971558a3ff649e30f55bcf9e62)，来源触发 Pages 工作流 [f629b32](https://github.com/AIPMAndy/chinese-international-student-career-guide/commit/f629b32eda80c73ab3e439ec8751afc67d6fbd26)；[Pages #43519219464](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43519219464) **success**：50 个 HTML 页、50 sitemap URL、SEO 与站内链接检查零错误；[正式站点](https://aipmandy.github.io/chinese-international-student-career-guide/)及首页、章节、CSS、JS、[PDF](https://aipmandy.github.io/chinese-international-student-career-guide/downloads/chinese-international-student-career-guide.pdf)、XLSX、2 个 ZIP 共 8 个资源 HTTP 200、SHA-256 与该工作流的构建产物一致。PDF 检查器更新 [1d21c31](https://github.com/AIPMAndy/chinese-international-student-career-guide/commit/1d21c3178d335527a822dea9f42140d2dbcfbf51)；[PDF CI #43519672476](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43519672476) **success**，当前线上 PDF SHA `053a5340…`、81 页、50 书签、122 内链、191 外链、字体与联系人/双官网校验零错误。已下载 41 组双页渲染并总览全部页面，放大审阅封面、地区页、简历模板、末页；[QA 记录](https://github.com/AIPMAndy/chinese-international-student-career-guide/blob/main/docs/pdf-current-qa-2026-11-14.md) 与 [CI 产物](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43519672476/artifacts/14082377823) 可追溯。 | **尚未 DONE**：当前 PDF 高倍率逐页视觉审阅、iOS/安卓与桌面实际交互/浏览器排版、各地区工作资格最新规则的独立复核待完成；旧 PDF 视觉记录绑定另一 SHA `f1f3a332…`，不可替代新文件。下一轮优先 P0 AI/product 留学生站点与本页残项。 |

| 2026-11-14 | [chinese-international-student-ai-jobs](https://github.com/AIPMAndy/chinese-international-student-ai-jobs) | 从 main SHA `027ad008a6d9761beac8af0123b7b2e84f0acb44` 检查源码、构建、Pages、PDF；[SEO 构建器 9a33276](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/commit/9a3327631038c1bfe1caf1138371538db9c3db06) + [全页 SEO 验证 a1015d5](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/commit/a1015d51b5bf0f7d6fe1221ab673ec3776fac184)，新增 52 页 canonical/OG/JSON-LD、author/company 事实、sitemap/robots、服务入口。升级 [Pages 工作流 7bfe19c](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/commit/7bfe19ccc19ba8f443a5a4e8d46c76ddfb0857b6) 为源码构建、发布后 SHA 比对；[Pages #43520404300](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43520404300) **success**，SEO 检查 52 页零错误，本站首页、岗位、地区、PDF、2 ZIP、sitemap、robots、CSS、JS 共 10 个线上 URL HTTP 200 且 SHA 一致。初版新源码导致旧 ZIP 校验 stale input，已通过 [0785a74](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/commit/0785a7434cf5a8989de629261b8ade4b75fa5167) 修复为源构建→重打包→现产物核验，[教学案例 CI #43520496459](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43520496459) **success**；[新提交 Pages #43520496423](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43520496423) **success**。线上 [PDF](https://aipmandy.github.io/chinese-international-student-ai-jobs/downloads/chinese-international-student-ai-jobs-guide.pdf) 973,178 字节 SHA `f07ee347…`，与仓库的 109 页 PDF 全页视觉与链接校验记录 SHA 相同。 | **暂不标 DONE**：最新文档提交 `4469d33` 对应 [技术案例 CI #43520662270](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43520662270) 与 [Pages #43520662211](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43520662211) 均 **success**，并重新核对线上 10 URL SHA；实体手机 Safari/Android 实测、岗位/身份材料动态规则核验未完成。下一轮 P0 优先产品留学生专题或其他未处理站点。 |

| 2026-11-14 | [local-business-ai-growth-handbook](https://github.com/AIPMAndy/local-business-ai-growth-handbook) | 源码提交 [431b093](https://github.com/AIPMAndy/local-business-ai-growth-handbook/commit/431b0937977a2ed72a6b91ec53d10adc3a1e4103) 增加首页、顶部导航、资源卡的 PDF 下载入口，构建时按 edition.json 校验 SHA 并打包到 Pages；QA/发布提交 [35b0aff](https://github.com/AIPMAndy/local-business-ai-growth-handbook/commit/35b0afff8e20147883ac6a31785fd22b04126ada)，[Actions #43540414905](https://github.com/AIPMAndy/local-business-ai-growth-handbook/actions/runs/43540414905) **success**（源/网页 PDF 文件一致，71 页、139 书签、214 链接；[站点](https://aipmandy.github.io/local-business-ai-growth-handbook/)与[网页 PDF](https://aipmandy.github.io/local-business-ai-growth-handbook/downloads/local-business-ai-growth-handbook-guide.pdf) 发布后 HTTP/SHA 校验）。已肉眼看封面、中间页、末页，两个官网二维码均解出准确域名。 | **尚未 DONE**：全部 71 页逐页高倍率、Safari/Android 实机、文中第三方来源与外链新鲜度复核；不把三页抽查当全书视觉通过。 |

| 2026-11-14 | [restaurant-ai-customer-acquisition-handbook](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook) | [首页升级 8b216ca](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook/commit/8b216cac22ea7abacadea635acc506e82880946d) 加 PDF 下载和 canonical/OG/JSON-LD，[PDF 镜像 94b141e](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook/commit/94b141efa2b7728f54faed2cad22bbf909af171a) 将原 PDF blob 复用至 site/downloads 供离线/Pages 使用，[QA+线上校验 662b274](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook/commit/662b274ab966a97f3a5342002f24ddaa8f1e7706)，[Actions #43540340939](https://github.com/AIPMAndy/restaurant-ai-customer-acquisition-handbook/actions/runs/43540340939) **success**（PDF 47 页、141 书签、76 链接；[站点](https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/)和[网页 PDF](https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/downloads/restaurant-ai-customer-acquisition-handbook-guide.pdf) 发布后 HTTP/SHA 校验）。已肉眼看封面、中间页、末页，两官网二维码可解码。 | **尚未 DONE**：全部 47 页逐页高倍率、手机真实点击/排版、餐饮平台动态规则更新复核。 |

### 2026-11-14 · 四个留学生求职专题工程发布闭环（本轮实时验收）

**文档与源码包同步后的最终再验收**：全局 [#43541687546](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43541687546)、产品 [#43541649914](https://github.com/AIPMAndy/chinese-international-student-product-jobs/actions/runs/43541649914)、AI [#43540845338](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43540845338)、商科 [#43541683251](https://github.com/AIPMAndy/chinese-international-student-business-jobs/actions/runs/43541683251) 均为 `completed/success`，流程均包含 GitHub Pages 部署与线上资源验证。此处证明 4/4 工程交付，不是 iOS/Android 真机、未覆盖国家的政策或全部 PDF 高倍率人工审阅已完成。


- **全局求职**：[仓库](https://github.com/AIPMAndy/chinese-international-student-career-guide) · [网站](https://aipmandy.github.io/chinese-international-student-career-guide/) · [81 页 PDF](https://aipmandy.github.io/chinese-international-student-career-guide/downloads/chinese-international-student-career-guide.pdf)。新增三个已确认存在的专业专题站内入口；[源码提交 f3f3e72](https://github.com/AIPMAndy/chinese-international-student-career-guide/commit/f3f3e72d159788a2f20d59cf1861522d6b3e9b90) 与 [Pages #43540839393](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43540839393) 均可读且工作流成功；历史 [PDF QA #43519672476](https://github.com/AIPMAndy/chinese-international-student-career-guide/actions/runs/43519672476) 成功。**剩余**：当前 PDF 全页高倍率人工逐页审阅、真实 Safari/Android、地区规定变更复核。
- **产品岗位**：[仓库](https://github.com/AIPMAndy/chinese-international-student-product-jobs) · [网站](https://aipmandy.github.io/chinese-international-student-product-jobs/) · [128 页 PDF](https://aipmandy.github.io/chinese-international-student-product-jobs/downloads/product-jobs-guide-v1.0.0.pdf)。更新首页结构化数据、SEO、关联项目和服务入口；修复源 ZIP 遗漏 `site/home.html`，改为从源码打包、构建并逐页校验。最终提交 [f10968551](https://github.com/AIPMAndy/chinese-international-student-product-jobs/commit/f10968551a4e301df55b9d41cf720a241c83be00) 对应 [Pages #43541350687](https://github.com/AIPMAndy/chinese-international-student-product-jobs/actions/runs/43541350687) **success**，涵盖源码重建、ZIP 完整性、章节 JSON-LD/sitemap、PDF 签名和线上文件 SHA-256。128 页 PDF 全页视觉审阅记录 `verification/pdf-visual-coverage.json` 仍有效；未改 PDF 二进制。**剩余**：真机 Safari/Android 与各地区申请规则的动态复核。
- **AI 技术岗位**：[仓库](https://github.com/AIPMAndy/chinese-international-student-ai-jobs) · [网站](https://aipmandy.github.io/chinese-international-student-ai-jobs/) · [109 页 PDF](https://aipmandy.github.io/chinese-international-student-ai-jobs/downloads/chinese-international-student-ai-jobs-guide.pdf)。补专业专题导航，原有可运行技术案例及 109 页 PDF 保持不变；[提交 b774ed86](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/commit/b774ed863837f78874dbd0059a1bcc9c6e136d6f)、[Pages #43540845338](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43540845338) 及 [技术 CI #43540845335](https://github.com/AIPMAndy/chinese-international-student-ai-jobs/actions/runs/43540845335) **success**。**剩余**：真机 Safari/Android 与有变更的招聘原文复核。
- **商科岗位**：[仓库](https://github.com/AIPMAndy/chinese-international-student-business-jobs) · [网站](https://aipmandy.github.io/chinese-international-student-business-jobs/) · [180 页 PDF](https://aipmandy.github.io/chinese-international-student-business-jobs/downloads/business-careers-guide.pdf)。去掉“尚待建仓”的旧提示；升级全 53 页来源生成 SEO、跨专题/咨询链接、源码重建与归档；最终提交 [64830e2b](https://github.com/AIPMAndy/chinese-international-student-business-jobs/commit/64830e2bee5b9ce59656d3859656f85448603345) 对应 [Pages #43541343110](https://github.com/AIPMAndy/chinese-international-student-business-jobs/actions/runs/43541343110) **success**：源码构建、全页 metadata/JSON-LD、下载 PDF、线上哈希验收通过。仓库 `VERIFY.md` 已有 180 页视觉 QA 记录，本轮未改 PDF。**剩余**：真机 Safari/Android 与具体地区当季工作资格和岗位复核。

**工程交付判断**：四个站点和 PDF 具备公开可用的首版，四站最新 Pages 成功，自动验证覆盖源码、静态站点和下载。**严格全量 DONE 尚未满足**：跨设备实体真机浏览、高倍率剩余 PDF 页面审阅（全局册）及部分动态就业规则无法仅靠 CI 证明。后续只处理明确剩余验收问题；不要重做四个站。

### 2026-11-14 · 本轮三站真实交付（进入 Stage 5，均未标 DONE）

| 项目 | 完成的修改 / Commit | CI 与实测证据 | Pages / PDF | 阻塞与下一步 |
|---|---|---|---|---|
| how-to-get-offer（P0） | 源码 [70b5789](https://github.com/AIPMAndy/how-to-get-offer/commit/70b57897e501d4dfadc203567eb415891d11a571) 与 CI [98378ff](https://github.com/AIPMAndy/how-to-get-offer/commit/98378ff3df19a5af9793de0d9eab7c607cfb302c)；main 98378ff；新增 PDF 全页自动 QA、图片联系表、JSON 结果 | [Pages & QA #43556546313](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43556546313) success；82 页、199 个书签、75742 个提取字符、0 错误/警告；[完整逐页预览与报告](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43556546313/artifacts/14098801605) | [网站](https://aipmandy.github.io/how-to-get-offer/) / [PDF](https://aipmandy.github.io/how-to-get-offer/pdf/how-to-get-offer-guide.pdf)；Pages 部署成功，本轮未独立跑站外 SHA | 需人工高倍率逐页视觉、Safari/Android 真机与原有任务工具实机回归；自动缩略图不可代替人工签字 |
| ai-china-content-commerce-handbook（P0） | [5da6a7b](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/commit/5da6a7b2a1feb149c9243350b2ad3d9b57c8defd) / [17961f5](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/commit/17961f54ee9f81dcb23501720d9990d1035f58f6)，机器人同步 PDF [672c456](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/commit/672c456566c7a16cae5b50a33657edfeb1ca5b0f)；main 672c456；新增全页 QA/视觉产物 | [Pages+QA #43556619737](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/actions/runs/43556619737) success；40 页、140 书签、32004 字符、SHA-256 前缀 9fb6b40f、0 错误/警告；[QA 图+报告](https://github.com/AIPMAndy/ai-china-content-commerce-handbook/actions/runs/43556619737/artifacts/14098472503) | [网站](https://aipmandy.github.io/ai-china-content-commerce-handbook/) / [PDF](https://aipmandy.github.io/ai-china-content-commerce-handbook/downloads/ai-china-content-commerce-handbook.pdf)；本轮 Pages 部署成功，尚无独立在线 SHA 复核 | 逐页放大审阅、手机真机、经营/平台规则来源新鲜度核查 |
| geo-handbook（P1，原缺 PDF） | 源码生成器 [76387a7](https://github.com/AIPMAndy/geo-handbook/commit/76387a7a9a0ed1d9e87e9ec233738bc007c0d23b)，工作流修复 [cc2a4b3](https://github.com/AIPMAndy/geo-handbook/commit/cc2a4b38ef237e34fd97c5085cbf7faf063c6529)，线上验收 [8c50d31](https://github.com/AIPMAndy/geo-handbook/commit/8c50d314b7468d739eed681b5228b6d163e82d31)，60 页 metadata 全检 [e969144](https://github.com/AIPMAndy/geo-handbook/commit/e969144b7dd25e319aa6e16df50ffcb7629d339d)；PDF 机器人入库 [75bc2a5](https://github.com/AIPMAndy/geo-handbook/commit/75bc2a56d4176416e7eccf9a467e0de0d2af2cb5)；main e969144 | [首次 PDF 发布 #43557003894](https://github.com/AIPMAndy/geo-handbook/actions/runs/43557003894)、[六个 URL 线上哈希 #43557145528](https://github.com/AIPMAndy/geo-handbook/actions/runs/43557145528)、[完整 SEO 回归 #43557187254](https://github.com/AIPMAndy/geo-handbook/actions/runs/43557187254) 全部 success；86 页/444 书签/70882 字符/0 错警；[86页 QA 图与报告](https://github.com/AIPMAndy/geo-handbook/actions/runs/43557187254/artifacts/14097794705) | [网站](https://aipmandy.github.io/geo-handbook/) / [新增 PDF](https://aipmandy.github.io/geo-handbook/downloads/geo-handbook-guide.pdf)；首页、课程、依据、sitemap、robots、PDF 六 URL 真正从线上 HTTP 200 且 SHA-256 相符 | 86 页人工高倍率审阅、真机和来源日期复核；项目路径 robots.txt 不代表域名根 robots.txt |

**验收边界与失败复盘：** 每页 PDF 已在 CI 自动渲染为 PNG 并提取文本，自动结果全部通过，但未做人工逐页高倍率及真机验收，三站都不可记 DONE。GEO 初轮曾因并发 main 更新（正常非快进拒绝，无 force）和 PDF 在站内链接校验之后生成而失败；后续修复并以最终成功流水线及在线 6 URL 校验为准。Actions 产物有保存期限，仓库 PDF 和 Pages 正式 URL 持续保留。其他重点站点继续推进，不进入停止/维护。

### 2026-11-14 · 本轮增量交付：P0 回归保护 + P1 新 PDF（均为 Stage 5，未标 DONE）

| 站点 | 新增产物与 Commit | 测试 / 上线证据 | 仍需完成 |
|---|---|---|---|
| [how-to-get-offer](https://github.com/AIPMAndy/how-to-get-offer) · P0 | [浏览器端到端脚本 e5ff5cc](https://github.com/AIPMAndy/how-to-get-offer/commit/e5ff5ccf0726f3df9b6d58608f0d31c80bf3f335)、[浏览器 CI 1777e55](https://github.com/AIPMAndy/how-to-get-offer/commit/1777e558259731dd58e497d9c6e732980515cc7d)、[兼容 Ubuntu 修复 bd4936d](https://github.com/AIPMAndy/how-to-get-offer/commit/bd4936d4fc622971b4b2ca68241202ee22301e7a)、[异步状态修复 9a8bc46](https://github.com/AIPMAndy/how-to-get-offer/commit/9a8bc462983efa97728e9d8332d32da234f0d74b)、[Pages 实际线上 SHA 检查 398828b](https://github.com/AIPMAndy/how-to-get-offer/commit/398828b8d841195a49c80a00166d1c37b7155ce6)；无新增虚构案例，原工具未改。 | [Browser #43585775608](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43585775608) **success**（390/360/1280px，任务打卡/重载、岗位记录与 CSV、复制微信动作、XSS 转义和横向溢出）；[截图产物](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43585775608/artifacts/14109982422)；[Pages #43585775618](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43585775618) **success**；[站点](https://aipmandy.github.io/how-to-get-offer/) / [82 页 PDF](https://aipmandy.github.io/how-to-get-offer/pdf/how-to-get-offer-guide.pdf)。 | 新线上 HTTP/SHA 校验工作流 [#43586025537](https://github.com/AIPMAndy/how-to-get-offer/actions/runs/43586025537) 本表写入时仍在运行；真实 Safari/iOS 与 Android、82 页高倍率逐页人工视觉及原工具实际触屏回归未签字；不能标 DONE。 |
| [github-income-handbook](https://github.com/AIPMAndy/github-income-handbook) · P1（原缺 PDF） | [Markdown→PDF 生成器 2c9927d](https://github.com/AIPMAndy/github-income-handbook/commit/2c9927d49781a27c74e0686a69be6264bb15e562)、[PDF 全页 QA bc29505](https://github.com/AIPMAndy/github-income-handbook/commit/bc295059a5f3fd9f0976ed9b55a66109f9c61f47)、[PDF 构建/提交/部署 CI ffdbe7e](https://github.com/AIPMAndy/github-income-handbook/commit/ffdbe7e4c7d32e2e99b468367a6499d385c10b95)、[下载 CTA 77fb90f](https://github.com/AIPMAndy/github-income-handbook/commit/77fb90fcb25fc9ea8de807d75b44da85546dd2e5)、[线上哈希验收 c018e60](https://github.com/AIPMAndy/github-income-handbook/commit/c018e60a653cfbe5aa35cca7b784c206da0ea72e)。 PDF 已由 GitHub Actions 入库，非仅 CI 临时文件。 | [发布 + QA + 线上检查 #43585933169](https://github.com/AIPMAndy/github-income-handbook/actions/runs/43585933169) **success**；**63 页 / 159 书签 / 194 链接 / 63 页全渲染，0 个自动错误**；首页/robots/sitemap/PDF 四个真实线上 URL HTTP 200，线上 PDF SHA-256 = `a170b4393351343694e158d2dcafce143a9d628a0456ca10475e29383fa0fbca` 与 [仓库 edition.json](https://github.com/AIPMAndy/github-income-handbook/blob/main/pdf/edition.json) 一致；[网站](https://aipmandy.github.io/github-income-handbook/) / [新 PDF](https://aipmandy.github.io/github-income-handbook/pdf/github-income-handbook.pdf)。 | 全页**人工高倍率**视觉签字、真实手机 PDF 阅读/按钮点击、外链日期和来源复查；不把自动渲染等于人工 QA，更不声称商业收益。 |

**覆盖更新：**原本 25/33 个有 PDF，本轮首次补全 github-income-handbook，现为 **26/33**；还有 7 个仓库待补或确定不适用。这是覆盖数，**不是 26 个站点 DONE**。后续按 P0 残余实机与高倍率验收优先；实机不可执行时推进 P1 缺 PDF 的 seo-handbook / 100m-in-5-years-handbook，绝不伪造签字。

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
