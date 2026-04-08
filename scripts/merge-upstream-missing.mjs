import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const upstreamRoot = path.resolve(cwd, process.argv[2] || "/tmp/awesome-design-md-upstream");
const targetRoot = cwd;
const targetDesignRoot = path.join(targetRoot, "design-md");
const targetDataDir = path.join(targetRoot, "data");
const targetDesignPagesRoot = path.join(targetRoot, "designs");

const extraRecords = [
  {
    slug: "ferrari",
    name: "ferrari",
    displayName: "Ferrari",
    nameZh: "法拉利",
    summaryZh: "意式超跑品牌官网，黑白编辑感与极少量跃马红强调",
    category: "品牌官网",
    tagsZh: ["汽车", "豪华"],
    styleKeywords: ["汽车", "豪华", "黑白编辑感", "跃马红强调"],
    aliases: ["ferrari", "法拉利", "汽车", "豪华"],
    useCases: ["品牌官网", "营销落地页", "企业介绍页"],
    previewLight: "design-md/ferrari/preview.html",
    previewDark: "design-md/ferrari/preview-dark.html",
    readmePath: "design-md/ferrari/README.md",
    designPath: "design-md/ferrari/DESIGN.md",
    positioningZh: "强调品牌气质、节奏和视觉记忆点，更适合营销和叙事表达。",
    bestFor: ["品牌官网", "营销落地页", "企业介绍页"],
    avoidFor: ["复杂运维后台", "高密度列表管理页"],
    aiChecklist: ["强化首屏和大标题表现", "控制信息数量", "让留白和图片承担更多表达"],
  },
  {
    slug: "lamborghini",
    name: "lamborghini",
    displayName: "Lamborghini",
    nameZh: "兰博基尼",
    summaryZh: "兰博基尼官网，纯黑舞台感与金色强调的极致张力",
    category: "品牌官网",
    tagsZh: ["汽车", "豪华"],
    styleKeywords: ["汽车", "豪华", "纯黑舞台感", "金色强调"],
    aliases: ["lamborghini", "兰博基尼", "汽车", "豪华"],
    useCases: ["品牌官网", "营销落地页", "企业介绍页"],
    previewLight: "design-md/lamborghini/preview.html",
    previewDark: "design-md/lamborghini/preview-dark.html",
    readmePath: "design-md/lamborghini/README.md",
    designPath: "design-md/lamborghini/DESIGN.md",
    positioningZh: "强调品牌气质、节奏和视觉记忆点，更适合营销和叙事表达。",
    bestFor: ["品牌官网", "营销落地页", "企业介绍页"],
    avoidFor: ["复杂运维后台", "高密度列表管理页"],
    aiChecklist: ["强化首屏和大标题表现", "控制信息数量", "让留白和图片承担更多表达"],
  },
  {
    slug: "renault",
    name: "renault",
    displayName: "Renault",
    nameZh: "雷诺",
    summaryZh: "雷诺官网，极具能量的渐变车展氛围与法式几何秩序",
    category: "品牌官网",
    tagsZh: ["汽车", "品牌"],
    styleKeywords: ["汽车", "品牌", "渐变车展氛围", "法式几何秩序"],
    aliases: ["renault", "雷诺", "汽车", "品牌"],
    useCases: ["品牌官网", "营销落地页", "企业介绍页"],
    previewLight: "design-md/renault/preview.html",
    previewDark: "design-md/renault/preview-dark.html",
    readmePath: "design-md/renault/README.md",
    designPath: "design-md/renault/DESIGN.md",
    positioningZh: "强调品牌气质、节奏和视觉记忆点，更适合营销和叙事表达。",
    bestFor: ["品牌官网", "营销落地页", "企业介绍页"],
    avoidFor: ["复杂运维后台", "高密度列表管理页"],
    aiChecklist: ["强化首屏和大标题表现", "控制信息数量", "让留白和图片承担更多表达"],
  },
  {
    slug: "tesla",
    name: "tesla",
    displayName: "Tesla",
    nameZh: "特斯拉",
    summaryZh: "特斯拉官网，极简摄影驱动的科技产品展示气质",
    category: "品牌官网",
    tagsZh: ["汽车", "科技"],
    styleKeywords: ["汽车", "科技", "极简摄影驱动", "科技产品展示"],
    aliases: ["tesla", "特斯拉", "汽车", "科技"],
    useCases: ["品牌官网", "营销落地页", "企业介绍页"],
    previewLight: "design-md/tesla/preview.html",
    previewDark: "design-md/tesla/preview-dark.html",
    readmePath: "design-md/tesla/README.md",
    designPath: "design-md/tesla/DESIGN.md",
    positioningZh: "强调品牌气质、节奏和视觉记忆点，更适合营销和叙事表达。",
    bestFor: ["品牌官网", "营销落地页", "企业介绍页"],
    avoidFor: ["复杂运维后台", "高密度列表管理页"],
    aiChecklist: ["强化首屏和大标题表现", "控制信息数量", "让留白和图片承担更多表达"],
  },
];

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function buildPrompt(record) {
  const primary = record.useCases[0] || "产品页面";
  return `参考 ${record.nameZh} / ${record.displayName} 的视觉语言，设计一个中文 ${primary}，保留其配色、字重层级、卡片样式和留白节奏，同时把标题长度、正文排版和信息密度调整为适合中文阅读的形式。`;
}

function detailPageTemplate(record) {
  const lightPreview = relativeFromDetail(record.previewLight);
  const darkPreview = relativeFromDetail(record.previewDark);
  const readmePath = relativeFromDetail(record.readmePath);
  const designPath = relativeFromDetail(record.designPath);
  const relatedLinks = renderRelatedLinks(record.relatedItems);
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
        <div class="brand-sub">中文 DESIGN.md 导航站</div>
      </div>
      <nav class="nav-links">
        <a class="nav-link" href="../../index.html">首页</a>
        <a class="nav-link" href="../../guide.html">使用指南</a>
      </nav>
    </header>

    <div class="breadcrumb">
      <a href="../../index.html">首页</a>
      <span>/</span>
      <span>${escapeHtml(record.category)}</span>
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
      当前页基于原始公开页面风格整理，仅作为设计语言参考，不代表官方设计系统。
    </p>
  </main>
  <script src="../../assets/site.js"></script>
</body>
</html>
`;
}

async function copyMissingDesignDirs() {
  await Promise.all(extraRecords.map(async (record) => {
    const sourceDir = path.join(upstreamRoot, "design-md", record.slug);
    const targetDir = path.join(targetDesignRoot, record.slug);
    await fs.cp(sourceDir, targetDir, { recursive: true });
  }));
}

async function main() {
  const existingJson = await fs.readFile(path.join(targetDataDir, "designs.json"), "utf8");
  const currentRecords = JSON.parse(existingJson);
  const existingBySlug = new Map(currentRecords.map((record) => [record.slug, record]));

  const merged = currentRecords.slice();
  for (const extra of extraRecords) {
    if (!existingBySlug.has(extra.slug)) {
      merged.push({
        ...extra,
        recommendedPromptZh: buildPrompt(extra),
      });
    }
  }

  merged.sort((a, b) => a.displayName.localeCompare(b.displayName));
  const mergedWithRelated = merged.map((record) => ({
    ...record,
    relatedItems: merged
      .filter((candidate) => candidate.slug !== record.slug && candidate.category === record.category)
      .slice(0, 3)
      .map((candidate) => ({
        slug: candidate.slug,
        nameZh: candidate.nameZh,
      })),
  }));

  await copyMissingDesignDirs();

  await fs.writeFile(path.join(targetDataDir, "designs.json"), `${JSON.stringify(mergedWithRelated, null, 2)}\n`);
  await fs.writeFile(path.join(targetDataDir, "designs.js"), `window.DESIGNS = ${JSON.stringify(mergedWithRelated, null, 2)};\n`);

  await Promise.all(extraRecords.map(async (record) => {
    const fullRecord = mergedWithRelated.find((item) => item.slug === record.slug);
    const pageDir = path.join(targetDesignPagesRoot, record.slug);
    await fs.mkdir(pageDir, { recursive: true });
    await fs.writeFile(path.join(pageDir, "index.html"), detailPageTemplate(fullRecord));
  }));

  console.log(`Merged ${extraRecords.length} missing upstream design systems from ${upstreamRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
