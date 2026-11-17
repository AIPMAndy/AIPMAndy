/** FreeClaude browser-side content. No analytics, cookies or network calls. */
const problems = {
  email: {
    title: '没收到登录邮件',
    steps: [
      '确认使用的是自己能够长期访问的邮箱，并检查垃圾邮件、促销邮件、邮箱规则或隔离邮件。',
      '通过 claude.ai 官方页面重新发起邮箱登录请求；只使用最新的登录链接，不要把它转发给他人。',
      '如果在另一台设备点击邮件链接，按照邮件提示在最初发起登录的设备输入验证码。企业/学校邮箱可询问邮件管理员。'
    ],
    link: 'https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account',
    linkText: '官方：登录 Claude'
  },
  google: {
    title: 'Google 登录失败',
    steps: [
      '先在 Claude 官方状态页确认是否存在登录故障或维护。',
      '确认选择的是你自己的正确 Google 账户；在官方登录弹窗中完成验证，不向第三方提供密码或验证码。',
      '如提示已授权或绑定错误，按 Claude 帮助中心的“撤销 Google 连接后重新授权”章节处理，不尝试购买账号或伪造身份。'
    ],
    link: 'https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account',
    linkText: '官方：Google 登录帮助'
  },
  phone: {
    title: '手机验证失败',
    steps: [
      '确认本人所在地和手机号码满足 Claude 官方支持地区要求；官方要求可接收短信的有效手机号码。',
      '检查国际区号、输入号码和最新验证码；若未收到，可在官方界面按提示重试。',
      '不要使用接码平台、他人号码、网络虚拟号码或试图绕过验证；仍无法完成时按官方帮助文档联系支持。'
    ],
    link: 'https://support.claude.com/en/articles/8287232-verify-your-phone-number',
    linkText: '官方：手机验证说明'
  },
  account: {
    title: '账号被限制或封禁',
    steps: [
      '保留官方错误提示与发生时间，不要上传包含密码、邮箱链接、验证码的原始截图。',
      '若判断是误封，在原账号登录后的限制页面查找官方申诉入口；并检查使用政策和支持地区要求。',
      '不要购买陌生人账号、创建伪造身份或用指纹伪装试图规避既有封禁。申诉结果由官方决定。'
    ],
    link: 'https://support.claude.com/en/articles/8241253-safeguards-warnings-and-appeals',
    linkText: '官方：封禁与申诉'
  },
  access: {
    title: 'Claude 网页无法访问',
    steps: [
      '先查官方状态页，区分服务故障和自己的设备、浏览器或网络问题。',
      '确认你身处官方支持地区，并核对系统时间、浏览器更新、DNS/HTTPS 连接与本地安全软件的错误提示。',
      '可在自己的电脑上运行开源命令 `node bin/freeclaude.mjs doctor` 检测基础连通性；检测结果不代表账号/地区合规，也不提供限制绕过。'
    ],
    link: 'https://status.claude.com/',
    linkText: 'Claude 实时状态'
  },
  limit: {
    title: 'Claude Free 额度已用完',
    steps: [
      'Free 有使用限制，长对话、复杂任务、模型和功能会影响使用量，不保证固定条数。',
      '先结束非必要的长任务，等待界面展示的额度恢复；用更完整的单条提示减少反复追问。',
      '只有当真实使用频率证明需要时，才到官网比对 Pro 等套餐；不要相信“无限免费 Claude”账号。'
    ],
    link: 'https://support.claude.com/en/articles/11647753-how-do-usage-and-length-limits-work',
    linkText: '官方：额度说明'
  },
  code: {
    title: '想使用 Claude Code',
    steps: [
      '先确认需求：只是让 AI 解释代码、生成代码片段，可先体验 Claude Free 的对话功能。',
      '如果需要 Claude Code 的终端/仓库操作体验，应核实当前包含 Claude Code 的官方付费计划。',
      'API 与网页版订阅不是同一额度池；第三方工具应使用合规的 API Key，不要“转卖”订阅登录凭据。'
    ],
    link: 'https://claude.com/pricing',
    linkText: '官方：套餐与 Claude Code'
  },
  security: {
    title: '担心账号与隐私安全',
    steps: [
      '如果你曾向第三方提供 Google 密码、邮箱登录链接、TOTP 密钥或验证码，应立即检查账户活动与授权应用。',
      '对可能泄露的凭据及时撤销授权、更新密码、重置相关 2FA，并检查恢复选项和重要账户。',
      '不要继续使用来历不明的共享邮箱、共享 Claude 账号或可读取 Cookie 的陌生浏览器环境。'
    ],
    link: 'https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account',
    linkText: '官方：账户与授权管理'
  }
};

const promptTemplates = [
  {icon:'↗', title:'写出有证据的观点',summary:'把一个普通观点变成有判断、有证据、有行动建议的短文。',text:'你是严谨的内容编辑。请基于我的观点【填写】，写一篇 350 字以内的中文文章。要求：第一句就是判断；至少提供 2 条可检查的事实或明确标记为待验证；解释一个常见的错误假设；结尾给出读者今天能执行的一步。不要虚构经历和数据。'},
  {icon:'⌘', title:'把需求拆成任务',summary:'将模糊想法变成开发者能直接接手的 PRD 与验收标准。',text:'你是一名高级 AI 产品经理。我的想法是【填写】。请先写清目标用户、核心场景和不做什么；再给出最小 MVP 的 3 项功能、关键流程、边界条件、验收标准，以及最应该先验证的 1 个假设。不要空泛的增长建议。'},
  {icon:'✧', title:'准备一次真正的面试',summary:'用结构化案例替代背诵套话，识别岗位能力缺口。',text:'你是一名严格但公正的面试官。岗位 JD：【粘贴】；我的背景：【填写】。请提取关键能力，依次提出 5 个最能区分候选人的问题，给出优秀回答需要包含的事实和证据，并指出我目前缺少哪些信息。不要代替我编造项目经历。'},
  {icon:'▣', title:'解释陌生代码',summary:'看懂一个代码仓库最重要的入口、数据流和风险点。',text:'你是一名资深工程师。请阅读以下代码/目录【粘贴】。用初学者能懂的话说明：1）它解决什么问题；2）执行入口；3）核心数据流；4）三个潜在故障点；5）如何写最小验证测试。如果信息不足，直接列出还需要的文件。'},
  {icon:'⊕', title:'省时研究一个工具',summary:'不被营销话术带偏，从约束和真实场景判断值不值得用。',text:'我正在评估工具【名称】用于【真实场景】。请分成：官方可验证功能、必须付费的边界、隐私与迁移成本、替代路径、最小一小时体验方案。对不确定的价格与功能请标记“需要官网核验”，不要假设。'}
];

const optionButtons = [...document.querySelectorAll('.issue-option')];
const title = document.getElementById('result-title');
const steps = document.getElementById('result-steps');
const count = document.getElementById('result-count');
const link = document.getElementById('result-link');
let currentIssue = 'email';

function renderIssue(key) {
  const entry = problems[key];
  if (!entry) return;
  currentIssue = key;
  optionButtons.forEach((b) => {
    const selected = b.dataset.issue === key;
    b.classList.toggle('is-selected', selected);
    b.setAttribute('aria-pressed', String(selected));
  });
  title.textContent = entry.title;
  count.textContent = `${entry.steps.length} STEPS`;
  steps.replaceChildren(...entry.steps.map((step) => {
    const li = document.createElement('li');
    li.textContent = step;
    return li;
  }));
  link.href = entry.link;
  link.firstChild.textContent = `${entry.linkText} `;
}
optionButtons.forEach((button) => button.addEventListener('click', () => renderIssue(button.dataset.issue)));
renderIssue(currentIssue);

const promptContainer = document.getElementById('prompt-cards');
promptTemplates.forEach((entry) => {
  const article = document.createElement('article'); article.className = 'prompt-card';
  const icon = document.createElement('span'); icon.className = 'prompt-icon'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = entry.icon;
  const heading = document.createElement('h3'); heading.textContent = entry.title;
  const desc = document.createElement('p'); desc.textContent = entry.summary;
  const copyButton = document.createElement('button'); copyButton.type = 'button'; copyButton.textContent = '复制提示词 ↗';
  copyButton.addEventListener('click', () => copyText(entry.text));
  article.append(icon, heading, desc, copyButton); promptContainer.appendChild(article);
});

document.getElementById('copy-steps').addEventListener('click', () => {
  const item = problems[currentIssue];
  const text = `${item.title}\n${item.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n官方参考：${item.link}`;
  copyText(text);
});

let toastTimeout;
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement('textarea');
      input.value = text; input.style.position = 'fixed'; input.style.opacity = '0';
      document.body.appendChild(input); input.select();
      if (!document.execCommand('copy')) throw new Error('copy failed');
      input.remove();
    }
    showToast('已复制到剪贴板');
  } catch {
    showToast('复制受浏览器限制，请用本地服务器打开网页');
  }
}
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message; toast.hidden = false;
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.hidden = true, 2800);
}
