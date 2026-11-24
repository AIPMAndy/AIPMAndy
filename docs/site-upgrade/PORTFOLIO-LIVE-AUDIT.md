# 全量公开网站运行质量分诊

运行入口：`python scripts/portfolio_live_audit.py --browser-limit 12`（需 Playwright 与 Chromium）。工作流 `.github/workflows/portfolio-live-audit.yml`。

- 以 GitHub 实时公开未归档仓库及 Pages 标记、唯一主计划公开仓库、真实根 sitemap 为候选来源；只检查 `https://aipmandy.github.io/`，不变更仓库可见性、不访问私有地址、不发送任何表单。工具站和教程站按实际上线地址去重，合法别名不擅自合并内容。
- 全候选执行真实 HTTP 首页检查，抽查可见 PDF 下载文件头；优先 P0 站做最多 12 个站点 × 360/390/1280px 的 Chromium 首页只读检查，记录 JS 运行时异常、溢出、截图及系统外观/减少动效模拟。第三方网络请求阻断，未进行真实辅助技术、完整业务流程或实际性能认证。
- Github Actions 产物 `portfolio-public-live-evidence` 包含实际时间、覆盖数、按故障优先排序的 `audit.json`、`audit.md`、截图。下一轮以真实失败/可复现缺陷选 1–3 站修复；不可把抽样无故障写作 DONE，不能以源码分数代替浏览器结果。原 33 站停止条件不被改变。
