import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const cwd = process.cwd();
const sourceRoot = path.resolve(cwd, process.argv[2] || "../awesome-design-md");
const targetRoot = cwd;

const sourceIndexPath = path.join(sourceRoot, "index.html");
const sourceDesignRoot = path.join(sourceRoot, "design-md");
const targetDesignRoot = path.join(targetRoot, "design-md");
const targetDataDir = path.join(targetRoot, "data");
const targetDesignPagesRoot = path.join(targetRoot, "designs");
const customCaseSlug = "awesome-design-md-cn";
const customRelatedSlugs = ["figma", "notion", "vercel"];

const nameZhMap = {
  airbnb: "爱彼迎",
  airtable: "Airtable",
  apple: "苹果",
  bmw: "宝马",
  cal: "Cal",
  claude: "Claude",
  clay: "Clay",
  clickhouse: "ClickHouse",
  cohere: "Cohere",
  coinbase: "Coinbase",
  composio: "Composio",
  cursor: "Cursor",
  elevenlabs: "ElevenLabs",
  expo: "Expo",
  ferrari: "法拉利",
  figma: "Figma",
  framer: "Framer",
  hashicorp: "HashiCorp",
  ibm: "IBM",
  intercom: "Intercom",
  kraken: "Kraken",
  lamborghini: "兰博基尼",
  "linear.app": "Linear",
  lovable: "Lovable",
  minimax: "MiniMax",
  mintlify: "Mintlify",
  miro: "Miro",
  "mistral.ai": "Mistral",
  mongodb: "MongoDB",
  notion: "Notion",
  nvidia: "英伟达",
  ollama: "Ollama",
  "opencode.ai": "OpenCode",
  pinterest: "Pinterest",
  posthog: "PostHog",
  raycast: "Raycast",
  renault: "雷诺",
  replicate: "Replicate",
  resend: "Resend",
  revolut: "Revolut",
  runwayml: "Runway",
  sanity: "Sanity",
  sentry: "Sentry",
  spacex: "SpaceX",
  spotify: "Spotify",
  stripe: "Stripe",
  supabase: "Supabase",
  superhuman: "Superhuman",
  "together.ai": "Together AI",
  tesla: "特斯拉",
  uber: "Uber",
  vercel: "Vercel",
  voltagent: "VoltAgent",
  warp: "Warp",
  webflow: "Webflow",
  wise: "Wise",
  "x.ai": "xAI",
  zapier: "Zapier",
};

const displayNameMap = {
  airbnb: "Airbnb",
  airtable: "Airtable",
  apple: "Apple",
  bmw: "BMW",
  cal: "Cal",
  claude: "Claude",
  clay: "Clay",
  clickhouse: "ClickHouse",
  cohere: "Cohere",
  coinbase: "Coinbase",
  composio: "Composio",
  cursor: "Cursor",
  elevenlabs: "ElevenLabs",
  expo: "Expo",
  ferrari: "Ferrari",
  figma: "Figma",
  framer: "Framer",
  hashicorp: "HashiCorp",
  ibm: "IBM",
  intercom: "Intercom",
  kraken: "Kraken",
  lamborghini: "Lamborghini",
  "linear.app": "Linear",
  lovable: "Lovable",
  minimax: "MiniMax",
  mintlify: "Mintlify",
  miro: "Miro",
  "mistral.ai": "Mistral AI",
  mongodb: "MongoDB",
  notion: "Notion",
  nvidia: "NVIDIA",
  ollama: "Ollama",
  "opencode.ai": "OpenCode",
  pinterest: "Pinterest",
  posthog: "PostHog",
  raycast: "Raycast",
  renault: "Renault",
  replicate: "Replicate",
  resend: "Resend",
  revolut: "Revolut",
  runwayml: "Runway",
  sanity: "Sanity",
  sentry: "Sentry",
  spacex: "SpaceX",
  spotify: "Spotify",
  stripe: "Stripe",
  supabase: "Supabase",
  superhuman: "Superhuman",
  "together.ai": "Together AI",
  tesla: "Tesla",
  uber: "Uber",
  vercel: "Vercel",
  voltagent: "VoltAgent",
  warp: "Warp",
  webflow: "Webflow",
  wise: "Wise",
  "x.ai": "xAI",
  zapier: "Zapier",
};

const categoryRules = [
  { match: ["民宿", "旅行"], category: "品牌官网" },
  { match: ["金融", "支付", "银行", "汇款", "加密"], category: "金融科技" },
  { match: ["AI", "大模型", "音频", "视频"], category: "AI 产品" },
  { match: ["开发", "终端", "部署", "数据库", "后端", "文档", "DevOps", "API", "监控", "云", "开源"], category: "开发工具" },
  { match: ["协作", "笔记", "项目管理", "效率", "白板", "日历", "预约", "自动化"], category: "效率协作" },
  { match: ["建站", "无代码", "CMS", "内容"], category: "内容与建站" },
  { match: ["社交", "音乐", "图片", "流媒体"], category: "内容平台" },
  { match: ["汽车", "航天", "科技", "企业", "探索", "豪华"], category: "品牌官网" },
];

const scenarioRules = [
  { match: ["民宿", "旅行"], items: ["品牌官网", "活动专题页", "服务介绍页"] },
  { match: ["金融", "支付", "银行", "汇款", "加密"], items: ["官网落地页", "支付产品页", "数据控制台"] },
  { match: ["AI", "大模型", "音频", "视频"], items: ["AI 工具官网", "模型平台", "功能介绍页"] },
  { match: ["开发", "终端", "部署", "数据库", "后端", "文档", "DevOps", "API", "监控", "云"], items: ["开发者官网", "文档站", "控制台后台"] },
  { match: ["协作", "笔记", "项目管理", "效率", "白板", "日历", "预约"], items: ["SaaS 后台", "工作台", "产品介绍页"] },
  { match: ["建站", "无代码", "CMS", "内容"], items: ["产品官网", "模板市场", "编辑器界面"] },
  { match: ["社交", "音乐", "图片", "流媒体"], items: ["内容社区", "推荐流页面", "活动专题页"] },
  { match: ["汽车", "航天", "科技", "企业", "探索", "豪华"], items: ["品牌官网", "营销落地页", "企业介绍页"] },
];

const categoryProfiles = {
  "AI 产品": {
    positioning: "强调前沿感、速度感和产品未来感，适合把能力和差异点讲清楚。",
    bestFor: ["AI 工具官网", "模型能力介绍", "产品功能落地页"],
    avoidFor: ["强表格化后台", "政企风审批系统"],
    checklist: ["突出核心能力和模型价值", "让功能区块清晰分组", "避免页面装饰压过信息层级"],
  },
  "开发工具": {
    positioning: "重视结构清晰、可读性和文档感，适合开发者和 B 端产品。",
    bestFor: ["开发者官网", "文档站", "控制台后台"],
    avoidFor: ["强娱乐化内容页", "情绪导向的品牌叙事页"],
    checklist: ["保证标题层级明确", "让按钮和代码区块保持克制", "优先确保信息扫描效率"],
  },
  "效率协作": {
    positioning: "强调秩序感、工作流和信息组织，适合 SaaS 和工作台场景。",
    bestFor: ["工作台首页", "团队协作产品页", "SaaS 后台"],
    avoidFor: ["纯品牌大片式营销页", "重情绪化视觉实验页面"],
    checklist: ["重视内容块编排", "表单和列表要易扫读", "中文标题长度要控制在稳妥范围"],
  },
  "金融科技": {
    positioning: "强调专业、可信和精致的信息表达，适合价格、数据和支付流程较多的页面。",
    bestFor: ["支付产品页", "定价页", "数据控制台"],
    avoidFor: ["轻社交内容页", "卡通化活动页"],
    checklist: ["强化数据和价格的对齐感", "避免装饰元素影响可信度", "CTA 要明确且节制"],
  },
  "内容与建站": {
    positioning: "强调模块化展示和模板感，适合展示产品能力、模板和编辑体验。",
    bestFor: ["建站工具官网", "模板市场", "编辑器产品页"],
    avoidFor: ["金融级数据台", "过于严肃的企业门户"],
    checklist: ["让案例和模板展示更直观", "保留适度视觉变化", "避免区块密度过高"],
  },
  "内容平台": {
    positioning: "强调流动感、内容展示效率和活跃度，适合内容消费和社区产品。",
    bestFor: ["内容社区", "推荐流页面", "活动专题页"],
    avoidFor: ["表单密集型后台", "高度理性的文档站"],
    checklist: ["优先突出封面和内容卡片", "降低单屏信息负担", "避免全部模块同质化"],
  },
  "品牌官网": {
    positioning: "强调品牌气质、节奏和视觉记忆点，更适合营销和叙事表达。",
    bestFor: ["品牌官网", "营销落地页", "企业介绍页"],
    avoidFor: ["复杂运维后台", "高密度列表管理页"],
    checklist: ["强化首屏和大标题表现", "控制信息数量", "让留白和图片承担更多表达"],
  },
  "精选风格": {
    positioning: "适合做通用参考，先看预览再决定是否采纳。",
    bestFor: ["产品官网", "品牌页面", "界面参考"],
    avoidFor: ["对行业规范要求很强的系统"],
    checklist: ["先看预览是否接近目标气质", "按中文场景二次调整信息密度", "不要直接全量照搬"],
  },
};

function extractDesignsArray(indexHtml) {
  const match = indexHtml.match(/const designs = \[(.*?)\];/s);
  if (!match) {
    throw new Error("Failed to locate designs array in source index.html");
  }
  return vm.runInNewContext(`[${match[1]}]`);
}

async function loadSourceDesigns() {
  try {
    const sourceIndex = await fs.readFile(sourceIndexPath, "utf8");
    return extractDesignsArray(sourceIndex);
  } catch (error) {
    if (!String(error.message || "").includes("ENOENT")) {
      throw error;
    }
  }

  const existingDataPath = path.join(targetDataDir, "designs.json");
  const existingData = JSON.parse(await fs.readFile(existingDataPath, "utf8"));
  return existingData
    .filter((record) => (record.group || "reference") === "reference")
    .map((record) => ({
      name: record.slug,
      tags: record.tagsZh || [],
      desc: record.summaryZh || "",
    }));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickCategory(tags, slug) {
  if (slug === "linear.app") return "效率协作";
  for (const rule of categoryRules) {
    if (rule.match.some((keyword) => tags.includes(keyword))) {
      return rule.category;
    }
  }
  return "精选风格";
}

function pickUseCases(tags) {
  for (const rule of scenarioRules) {
    if (rule.match.some((keyword) => tags.includes(keyword))) {
      return rule.items;
    }
  }
  return ["产品官网", "品牌页面", "界面参考"];
}

function buildPrompt(record) {
  const primary = record.useCases[0] || "产品页面";
  return `参考 ${record.nameZh} / ${record.displayName} 的视觉语言，设计一个中文 ${primary}，保留其配色、字重层级、卡片样式和留白节奏，同时把标题长度、正文排版和信息密度调整为适合中文阅读的形式。`;
}

function buildCustomRecord() {
  return {
    slug: customCaseSlug,
    name: customCaseSlug,
    displayName: customCaseSlug,
    nameZh: "本站风格",
    summaryZh: "冷灰科技风的中文 DESIGN.md 资源库界面，强调低疲劳浏览、侧栏筛选和紧凑目录卡片。",
    category: "自定义案例",
    group: "custom",
    tagsZh: ["中文", "科技", "资源库", "筛选", "目录"],
    styleKeywords: ["冷灰科技风", "低疲劳浏览", "左侧筛选", "紧凑目录卡片"],
    aliases: [
      customCaseSlug,
      "awesome design md cn",
      "本站风格",
      "中文资源库",
      "资源库界面",
    ],
    useCases: ["设计资源库", "导航目录页", "工具聚合页"],
    previewLight: `design-md/${customCaseSlug}/preview.html`,
    previewDark: `design-md/${customCaseSlug}/preview-dark.html`,
    readmePath: `design-md/${customCaseSlug}/README.md`,
    designPath: `design-md/${customCaseSlug}/DESIGN.md`,
    positioningZh: "用于高密度内容浏览的中文科技风资源库，强调低疲劳、清晰筛选和稳定层级。",
    bestFor: ["设计资源库", "风格导航页", "文档索引页", "工具聚合页"],
    avoidFor: ["高情绪品牌大片页", "娱乐化活动落地页"],
    aiChecklist: ["优先降低颜色刺激和纯白疲劳", "把筛选放在稳定且常驻的位置", "卡片保持紧凑，主次信息明确"],
    recommendedPromptZh: "参考 awesome-design-md-cn 的视觉语言，设计一个中文设计资源库或风格索引页：使用浅冷灰底与深色首屏，整体只保留少量冷蓝强调；左侧使用常驻筛选栏，右侧使用紧凑目录卡片；中文标题和正文保持克制，不堆大段文案，不使用高饱和彩色块，让页面在长时间浏览时仍然低疲劳、清晰且有科技感。",
  };
}

function enrichRecord(baseRecord) {
  const profile = categoryProfiles[baseRecord.category] || categoryProfiles["精选风格"];
  return {
    ...baseRecord,
    positioningZh: profile.positioning,
    bestFor: unique([...(baseRecord.useCases || []), ...(profile.bestFor || [])]).slice(0, 4),
    avoidFor: profile.avoidFor || [],
    aiChecklist: profile.checklist || [],
  };
}

function relativeFromDetail(targetPath) {
  return `../../${targetPath}`;
}

function renderTags(items) {
  return (items || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function renderList(items) {
  return (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderRelatedLinks(items) {
  return (items || []).map((item) => `
    <a class="nav-link" href="../${escapeHtml(item.slug)}/index.html">${escapeHtml(item.nameZh)}</a>
  `).join("");
}

function detailPageTemplate(record) {
  const lightPreview = relativeFromDetail(record.previewLight);
  const darkPreview = relativeFromDetail(record.previewDark);
  const readmePath = relativeFromDetail(record.readmePath);
  const designPath = relativeFromDetail(record.designPath);
  const relatedLinks = renderRelatedLinks(record.relatedItems);
  const breadcrumbLabel = record.group === "custom" ? "自定义案例" : record.category;
  const footerText = record.group === "custom"
    ? "当前页是 awesome-design-md-cn 项目自定义案例，用于沉淀本站自己的界面语言与中文产品设计规范。"
    : "当前页基于原始公开页面风格整理，仅作为设计语言参考，不代表官方设计系统。";
  const titleMarkup = record.nameZh === record.displayName
    ? escapeHtml(record.nameZh)
    : `${escapeHtml(record.nameZh)}<br>${escapeHtml(record.displayName)}`;
  const heroTags = renderTags((record.tagsZh || []).slice(0, 4));

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(record.nameZh)} · awesome-design-md-cn</title>
  <meta name="description" content="${escapeHtml(record.summaryZh)}">
  <link rel="stylesheet" href="../../assets/site.css">
</head>
<body class="page-detail">
  <main class="page-shell">
    <header class="topbar">
      <div class="brand-lockup">
        <div class="brand-name">awesome-design-md-cn</div>
        <div class="brand-sub">中文 DESIGN.md 资源库</div>
      </div>
      <nav class="nav-links">
        <a class="nav-link" href="../../index.html">首页</a>
        <a class="nav-link" href="../../guide.html">使用指南</a>
      </nav>
    </header>

    <div class="breadcrumb">
      <a href="../../index.html">首页</a>
      <span>/</span>
      <span>${escapeHtml(breadcrumbLabel)}</span>
      <span>/</span>
      <span>${escapeHtml(record.nameZh)}</span>
    </div>

    <section class="hero-shell detail-hero" style="margin-top: 14px;">
      <div class="eyebrow">${escapeHtml(record.category)}</div>
      <div class="hero-grid">
        <div class="detail-hero-copy">
          <h1 class="hero-title">${titleMarkup}</h1>
          <p class="hero-subtitle">${escapeHtml(record.summaryZh)} ${escapeHtml(record.positioningZh)}</p>
          <div class="mini-tags" style="margin-top: 16px;">${heroTags}</div>
          <div class="hero-actions" style="margin-top: 24px;">
            <a class="button button-primary" href="${lightPreview}" target="_blank" rel="noreferrer">打开浅色预览</a>
            <a class="button button-secondary" href="${darkPreview}" target="_blank" rel="noreferrer">打开深色预览</a>
            <button class="button button-ghost" type="button" data-copy="${escapeHtml(record.recommendedPromptZh)}" data-copy-success="提示词已复制">复制提示词</button>
          </div>
        </div>
        <div class="detail-hero-side">
          <article class="detail-hero-note">
            <strong>推荐页面类型</strong>
            <p>${escapeHtml(record.useCases.join(" / "))}</p>
          </article>
          <div class="detail-hero-stats">
            <article class="detail-stat">
              <strong>${escapeHtml(record.category)}</strong>
              <span>中文分类</span>
            </article>
            <article class="detail-stat">
              <strong>${record.tagsZh.length}</strong>
              <span>核心标签</span>
            </article>
            <article class="detail-stat">
              <strong>${record.relatedItems.length}</strong>
              <span>相近风格</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="detail-grid">
        <div class="stack">
          <article class="panel detail-panel">
            <div class="section-head">
              <div>
                <h2 class="section-title">推荐提示词</h2>
                <p class="section-copy">这是针对中文产品场景整理后的可直接使用版本。</p>
              </div>
            </div>
            <div class="prompt-box">
              <code>${escapeHtml(record.recommendedPromptZh)}</code>
            </div>
            <div class="prompt-actions" style="margin-top: 14px;">
              <button class="button button-primary" type="button" data-copy="${escapeHtml(record.recommendedPromptZh)}" data-copy-success="提示词已复制">复制这段提示词</button>
              <a class="button button-secondary" href="${designPath}" target="_blank" rel="noreferrer">查看 DESIGN.md</a>
            </div>
          </article>

          <article class="panel detail-panel">
            <div class="section-head">
              <div>
                <h2 class="section-title">预览画面</h2>
                <p class="section-copy">先看预览确认配色、留白和组件感觉，再决定是否采用。</p>
              </div>
            </div>
            <div class="iframe-wrap">
              <iframe class="preview-frame" src="${lightPreview}" title="${escapeHtml(record.nameZh)} preview"></iframe>
            </div>
          </article>

          <div class="split-grid">
            <article class="panel">
              <h2 class="section-title">适合做什么</h2>
              <ul class="list-clean">${renderList(record.bestFor)}</ul>
            </article>
            <article class="panel">
              <h2 class="section-title">不太适合什么</h2>
              <ul class="list-clean">${renderList(record.avoidFor)}</ul>
            </article>
          </div>
        </div>

        <div class="stack detail-sidebar">
          <article class="panel detail-panel">
            <h2 class="section-title">快速信息</h2>
            <div class="info-list" style="margin-top: 14px;">
              <div class="info-row">
                <strong>中文名</strong>
                <span>${escapeHtml(record.nameZh)}</span>
              </div>
              <div class="info-row">
                <strong>原品牌名</strong>
                <span>${escapeHtml(record.displayName)}</span>
              </div>
              <div class="info-row">
                <strong>风格关键词</strong>
                <span>${escapeHtml(record.styleKeywords.join(" / "))}</span>
              </div>
              <div class="info-row">
                <strong>推荐场景</strong>
                <span>${escapeHtml(record.useCases.join(" / "))}</span>
              </div>
            </div>
          </article>

          <article class="panel detail-panel">
            <h2 class="section-title">给 AI 的使用建议</h2>
            <ul class="list-clean" style="margin-top: 14px;">${renderList(record.aiChecklist)}</ul>
          </article>

          <article class="panel detail-panel">
            <h2 class="section-title">文件入口</h2>
            <div class="link-row" style="margin-top: 14px;">
              <a class="button button-secondary" href="${readmePath}" target="_blank" rel="noreferrer">README</a>
              <a class="button button-secondary" href="${designPath}" target="_blank" rel="noreferrer">DESIGN.md</a>
              <a class="button button-secondary" href="${darkPreview}" target="_blank" rel="noreferrer">深色预览</a>
            </div>
          </article>

          <article class="panel detail-panel">
            <h2 class="section-title">同类风格</h2>
            <div class="nav-links" style="margin-top: 14px;">
              ${relatedLinks || '<span class="muted">当前暂无更多同类推荐。</span>'}
            </div>
          </article>

          <article class="panel detail-panel">
            <h2 class="section-title">标签速览</h2>
            <div class="mini-tags" style="margin-top: 14px;">${renderTags(record.tagsZh)}</div>
          </article>
        </div>
      </div>
    </section>

    <p class="footer">
      ${escapeHtml(footerText)}
    </p>
  </main>
  <script src="../../assets/site.js"></script>
</body>
</html>
`;
}

async function main() {
  const sourceDesigns = await loadSourceDesigns();

  let records = sourceDesigns.map((item) => {
    const slug = item.name;
    const tagsZh = item.tags || [];
    const nameZh = nameZhMap[slug] || item.name;
    const category = pickCategory(tagsZh, slug);
    const useCases = pickUseCases(tagsZh);
    const aliases = unique([slug, slug.replace(/\./g, ""), nameZh, ...(tagsZh || [])]);

    return enrichRecord({
      slug,
      name: slug,
      displayName: displayNameMap[slug] || slug,
      nameZh,
      group: "reference",
      summaryZh: item.desc,
      category,
      tagsZh,
      styleKeywords: unique(tagsZh.concat(item.desc.split(/[，、+ ]/).slice(0, 3))),
      aliases,
      useCases,
      previewLight: `design-md/${slug}/preview.html`,
      previewDark: `design-md/${slug}/preview-dark.html`,
      readmePath: `design-md/${slug}/README.md`,
      designPath: `design-md/${slug}/DESIGN.md`,
    });
  });

  records = records.map((record) => ({
    ...record,
    recommendedPromptZh: buildPrompt(record),
  }));

  records.push(buildCustomRecord());

  records = records.sort((a, b) => {
    if (a.group !== b.group) return a.group === "custom" ? -1 : 1;
    return a.displayName.localeCompare(b.displayName);
  });

  const recordMap = new Map(records.map((record) => [record.slug, record]));
  records = records.map((record) => {
    const relatedCandidates = record.group === "custom"
      ? customRelatedSlugs
        .map((slug) => recordMap.get(slug))
        .filter(Boolean)
      : records.filter((candidate) => (
        candidate.slug !== record.slug &&
        candidate.group === "reference" &&
        candidate.category === record.category
      )).slice(0, 3);

    return {
      ...record,
      relatedItems: relatedCandidates.map((candidate) => ({
        slug: candidate.slug,
        nameZh: candidate.nameZh,
      })),
    };
  });

  await fs.mkdir(targetDataDir, { recursive: true });
  await fs.rm(targetDesignPagesRoot, { recursive: true, force: true });
  await fs.mkdir(targetDesignPagesRoot, { recursive: true });
  await fs.cp(sourceDesignRoot, targetDesignRoot, { recursive: true });

  const jsonOutput = `${JSON.stringify(records, null, 2)}\n`;
  const jsOutput = `window.DESIGNS = ${JSON.stringify(records, null, 2)};\n`;

  await fs.writeFile(path.join(targetDataDir, "designs.json"), jsonOutput);
  await fs.writeFile(path.join(targetDataDir, "designs.js"), jsOutput);

  await Promise.all(records.map(async (record) => {
    const pageDir = path.join(targetDesignPagesRoot, record.slug);
    await fs.mkdir(pageDir, { recursive: true });
    await fs.writeFile(path.join(pageDir, "index.html"), detailPageTemplate(record));
  }));

  console.log(`Synced ${records.length} design systems from ${sourceRoot}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
