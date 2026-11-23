# Security Policy / 安全说明

FreeClaude intentionally has **no login system, tracking pixels, analytics, cookies, credentials storage or third-party scripts**. The optional `doctor` CLI makes DNS and HTTPS requests only to named official public service hosts; it never reads password managers, browser sessions, account tokens, VPN or proxy secrets.

Do not include PII, recovery codes, TOTP seeds, phone numbers, emails, bearer tokens, API keys, or cookies in issues. Report a suspected security problem privately using the repository's security advisory channel, if available.

Do not use this project to evade restrictions, sell shared accounts, or impersonate others. The source tutorial may include exposed 2FA material; its screenshots are intentionally not redistributed.

## v1.2 Workspaces

The workspace launcher only manages directories marked as created by FreeClaude under `~/.freeclaude/workspaces`. Names are strictly validated, symlinks and unmanaged paths are rejected, and no deletion/archiving operation exists. The `doctor --json` output contains only coarse OS/browser metadata, presence booleans and a managed-workspace count, with no home path, user name, API key, cookies or file content. The webpage processes any pasted report locally.

The `run` command inherits the caller's process environment other than setting `CLAUDE_CONFIG_DIR`; it does **not** provide credential isolation from `ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`, OS keychains, sibling apps or managed enterprise settings. Confirm the shell context before using a workspace. No workflow in FreeClaude modifies system timezone, browser fingerprint, DNS, proxies, or Claude's account server state.
