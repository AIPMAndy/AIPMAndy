# 发布 FreeClaude 为独立 GitHub 仓库

> 当前项目根目录已具备完整独立仓库结构，建议公开仓库名：`AIPMAndy/FreeClaude`，可见性 `public`，默认分支 `main`。

## 方法一：GitHub 网页上传

1. GitHub → New repository → Repository name `FreeClaude` → Public → Create repository。
2. 从本项目 ZIP 解压后将**项目根目录内全部文件**上传到独立仓库根目录（需保留 `.github/` 等隐藏目录）。不要把 ZIP 文件本身当作源码上传。
3. 校验根目录存在 `README.md`, `site/index.html`, `package.json`, `LICENSE`。
4. Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**，推送后 `pages.yml` 会将 `site/` 部署为网站。
5. 在 Actions 中确认 `CI` 测试通过与 `Deploy website` 成功，访问部署地址实际检查导航、诊断、复制按钮、手机页面。

## 方法二：使用本机 git

```bash
cd FreeClaude
npm test
git init -b main
git add .
git commit -m "feat: launch FreeClaude v1.0"
git remote add origin git@github.com:AIPMAndy/FreeClaude.git
git push -u origin main
```

> 在执行 git push 前，先**通过 GitHub 创建同名空仓库**。仅使用你自己有权限的 GitHub 身份；不要在仓库中上传用户原始教程或凭据。

## 上线验收

- [ ] 单独的 `AIPMAndy/FreeClaude` 仓库真实存在
- [ ] README 正确显示；LICENSE 为 MIT
- [ ] CI 通过，Pages 在线可访问
- [ ] 8 类排障结果可切换，5 个提示词可复制
- [ ] 移动端无横向溢出
- [ ] 没有第三方账号、邮箱、验证码、密钥和指纹规避内容
