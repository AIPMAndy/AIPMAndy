# FreeClaude

An **unofficial, open-source and privacy-first guide** for getting started with Claude Free, troubleshooting legitimate sign-ins, understanding free-tier boundaries, and diagnosing basic network connectivity.

- **Try the offline website:** `site/index.html`
- **Troubleshooting:** `docs/02-troubleshooting.md`
- **Node.js 20+ CLI:** `node bin/freeclaude.mjs doctor`
- **Tests:** `npm test` (no dependencies)

FreeClaude **does not** grant Claude Pro/Code/API entitlements, bypass georestrictions or suspensions, create accounts, or collect credentials. Claude is an Anthropic trademark and this project is not endorsed by Anthropic. The public information was reviewed on 2026-11-17; verify changing conditions at [Claude Pricing](https://claude.com/pricing) and [Help Center](https://support.claude.com/).

MIT © 2026 [AIPMAndy](https://github.com/AIPMAndy).


## Claude network diagnostics (new)

Open [`site/check/index.html`](site/check/index.html) via `npm start`, then visit `http://127.0.0.1:4173/check/`. This original, source-available diagnostic dashboard is inspired by the observable functionality of Net.Coffee. It detects public HTTP exit IPs, IP geolocation / ASN, optional third-party security indicators, partial reachability and browser environment. DNS resolver leakage and Claude's server-observed IP **cannot** be verified from a stand-alone static website. No account access, credential collection or official account risk predictions. History is opt-in and local-only.
