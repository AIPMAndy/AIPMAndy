# Security Policy / 安全说明

FreeClaude intentionally has **no login system, tracking pixels, analytics, cookies, credentials storage or third-party scripts**. The optional `doctor` CLI makes DNS and HTTPS requests only to named official public service hosts; it never reads password managers, browser sessions, account tokens, VPN or proxy secrets.

Do not include PII, recovery codes, TOTP seeds, phone numbers, emails, bearer tokens, API keys, or cookies in issues. Report a suspected security problem privately using the repository's security advisory channel, if available.

Do not use this project to evade restrictions, sell shared accounts, or impersonate others. The source tutorial may include exposed 2FA material; its screenshots are intentionally not redistributed.
