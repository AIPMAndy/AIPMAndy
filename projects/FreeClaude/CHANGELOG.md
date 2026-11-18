# Changelog

## 1.0.0 — 2026-11-17

- 首发：静态交互式官网、故障诊断向导、免费套餐与 Code/API 边界说明
- 无依赖 `freeclaude` CLI：checklist / doctor / links / help
- 来源审查：剔除第三方凭据、2FA 密钥与指纹规避内容
- 原创中文保姆级指南、提示词与官方资料表
- Node.js 测试与 GitHub Actions Pages 部署工作流

## v1.1.0 — Claude network check

- Added a Net.Coffee-inspired, independently implemented network diagnostics dashboard at `/check/` (IP, ASN, optional third-party security intelligence, reachability, WebRTC, local device details and history).
- Added privacy gating, masking and explicit unknown states; documented the impossibility of proving Claude's real server-observed IP with a static client.
- Added a plain-language score formula, expanded automated tests, and fixed local server support for `.mjs` modules and subdirectory index pages.
