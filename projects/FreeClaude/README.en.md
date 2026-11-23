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

## Claude Code workspaces (v1.2.0)

The new [`site/workspaces/`](site/workspaces/index.html) page generates commands for **local Claude Code configuration isolation** and compares sanitized CLI metadata with in-browser signals. Powered by the documented [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/settings) environment variable.

```bash
node bin/freeclaude.mjs workspace doctor --json
node bin/freeclaude.mjs workspace create my-work
node bin/freeclaude.mjs workspace list
node bin/freeclaude.mjs workspace inspect my-work
node bin/freeclaude.mjs workspace run my-work
```

The CLI does not read, copy, archive or delete existing Claude sessions, tokens or login information; it only creates self-managed empty directories. Operating-system credential stores and inherited environment variables are **not isolated**. Inspired by the product thinking of the independently developed MIT project [CCBaga](https://github.com/liseami/CCBaga), but not a code clone, affiliated product, ban bypass or identity migration tool. See [docs/09-workspaces.md](docs/09-workspaces.md).
