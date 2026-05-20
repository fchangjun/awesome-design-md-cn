import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

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
const syncDate = process.env.SYNC_DATE || new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const nameZhMap = {
  airbnb: "爱彼迎",
  airtable: "Airtable",
  apple: "苹果",
  binance: "币安",
  bmw: "宝马",
  "bmw-m": "BMW M",
  bugatti: "布加迪",
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
  mastercard: "万事达卡",
  meta: "Meta",
  minimax: "MiniMax",
  mintlify: "Mintlify",
  miro: "Miro",
  "mistral.ai": "Mistral",
  mongodb: "MongoDB",
  nike: "Nike",
  notion: "Notion",
  nvidia: "英伟达",
  ollama: "Ollama",
  "opencode.ai": "OpenCode",
  pinterest: "Pinterest",
  playstation: "PlayStation",
  posthog: "PostHog",
  raycast: "Raycast",
  renault: "雷诺",
  replicate: "Replicate",
  resend: "Resend",
  revolut: "Revolut",
  runwayml: "Runway",
  sanity: "Sanity",
  sentry: "Sentry",
  shopify: "Shopify",
  slack: "Slack",
  spacex: "SpaceX",
  spotify: "Spotify",
  starbucks: "星巴克",
  stripe: "Stripe",
  supabase: "Supabase",
  superhuman: "Superhuman",
  "together.ai": "Together AI",
  tesla: "特斯拉",
  theverge: "The Verge",
  uber: "Uber",
  vercel: "Vercel",
  vodafone: "沃达丰",
  voltagent: "VoltAgent",
  warp: "Warp",
  webflow: "Webflow",
  wired: "WIRED",
  wise: "Wise",
  "x.ai": "xAI",
  zapier: "Zapier",
};

const displayNameMap = {
  airbnb: "Airbnb",
  airtable: "Airtable",
  apple: "Apple",
  binance: "Binance",
  bmw: "BMW",
  "bmw-m": "BMW M",
  bugatti: "Bugatti",
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
  mastercard: "Mastercard",
  meta: "Meta",
  minimax: "MiniMax",
  mintlify: "Mintlify",
  miro: "Miro",
  "mistral.ai": "Mistral AI",
  mongodb: "MongoDB",
  nike: "Nike",
  notion: "Notion",
  nvidia: "NVIDIA",
  ollama: "Ollama",
  "opencode.ai": "OpenCode",
  pinterest: "Pinterest",
  playstation: "PlayStation",
  posthog: "PostHog",
  raycast: "Raycast",
  renault: "Renault",
  replicate: "Replicate",
  resend: "Resend",
  revolut: "Revolut",
  runwayml: "Runway",
  sanity: "Sanity",
  sentry: "Sentry",
  shopify: "Shopify",
  slack: "Slack",
  spacex: "SpaceX",
  spotify: "Spotify",
  starbucks: "Starbucks",
  stripe: "Stripe",
  supabase: "Supabase",
  superhuman: "Superhuman",
  "together.ai": "Together AI",
  tesla: "Tesla",
  theverge: "The Verge",
  uber: "Uber",
  vercel: "Vercel",
  vodafone: "Vodafone",
  voltagent: "VoltAgent",
  warp: "Warp",
  webflow: "Webflow",
  wired: "WIRED",
  wise: "Wise",
  "x.ai": "xAI",
  zapier: "Zapier",
};

const recordOverrides = {
  binance: {
    summaryZh: "加密交易平台。黑黄高对比、交易数据紧迫感、深色金融界面。",
    category: "金融科技",
    tagsZh: ["金融", "加密", "交易", "深色"],
    styleKeywords: ["Binance Yellow", "黑黄高对比", "交易数据", "深色金融"],
    useCases: ["官网落地页", "交易产品页", "数据控制台"],
  },
  "bmw-m": {
    summaryZh: "BMW 高性能子品牌。赛车运动三色强调、黑底摄影、工程感排版。",
    category: "品牌官网",
    tagsZh: ["汽车", "赛车", "豪华", "性能"],
    styleKeywords: ["M 三色", "黑底摄影", "赛车运动", "工程感"],
    useCases: ["品牌官网", "营销落地页", "汽车产品页"],
  },
  bugatti: {
    summaryZh: "超豪华跑车品牌。纯黑电影感、克制单色、纪念碑式大标题。",
    category: "品牌官网",
    tagsZh: ["汽车", "豪华", "黑白", "摄影"],
    styleKeywords: ["纯黑画布", "超豪华", "全幅摄影", "纪念碑式标题"],
    useCases: ["品牌官网", "营销落地页", "奢侈品产品页"],
  },
  mastercard: {
    summaryZh: "全球支付网络。暖米色画布、胶囊圆角、圆形轨道叙事。",
    category: "金融科技",
    tagsZh: ["金融", "支付", "品牌", "圆角"],
    styleKeywords: ["暖米色", "胶囊圆角", "圆形轨道", "编辑感"],
    useCases: ["官网落地页", "支付产品页", "品牌页面"],
  },
  meta: {
    summaryZh: "Meta 消费硬件商店。摄影优先、黑白双 CTA、Meta 蓝购买动作。",
    category: "品牌官网",
    tagsZh: ["科技", "消费电子", "摄影", "电商"],
    styleKeywords: ["摄影优先", "Meta Blue", "产品卡片", "双 CTA"],
    useCases: ["品牌官网", "产品详情页", "电商商品页"],
  },
  nike: {
    summaryZh: "运动零售品牌。黑白高对比、超大写标题、全幅运动摄影。",
    category: "品牌官网",
    tagsZh: ["运动", "零售", "品牌", "摄影"],
    styleKeywords: ["黑白高对比", "超大写标题", "运动摄影", "零售卡片"],
    useCases: ["品牌官网", "营销落地页", "电商商品页"],
  },
  playstation: {
    summaryZh: "游戏主机零售与内容平台。蓝色 CTA、三段式明暗画布、游戏视觉主导。",
    category: "内容平台",
    tagsZh: ["游戏", "消费科技", "内容", "电商"],
    styleKeywords: ["PlayStation Blue", "明暗分段", "游戏视觉", "胶囊 CTA"],
    useCases: ["内容社区", "活动专题页", "产品介绍页"],
  },
  shopify: {
    summaryZh: "电商平台。深色电影感营销与浅色交易界面并行，绿色商业强调。",
    category: "内容与建站",
    tagsZh: ["电商", "建站", "商业", "绿色"],
    styleKeywords: ["深色电影感", "商业绿色", "电商平台", "浅色交易界面"],
    useCases: ["产品官网", "模板市场", "编辑器界面"],
  },
  slack: {
    summaryZh: "团队协作消息工具。紫色品牌底、柔和渐变首屏、产品界面组合展示。",
    category: "效率协作",
    tagsZh: ["协作", "消息", "SaaS", "紫色"],
    styleKeywords: ["深紫品牌色", "柔和渐变", "产品界面展示", "胶囊 CTA"],
    useCases: ["SaaS 后台", "工作台", "产品介绍页"],
  },
  starbucks: {
    summaryZh: "咖啡零售品牌。暖奶油底、四层绿色系统、圆润门店标识感。",
    category: "品牌官网",
    tagsZh: ["零售", "咖啡", "品牌", "绿色"],
    styleKeywords: ["暖奶油底", "Starbucks Green", "圆润按钮", "门店标识"],
    useCases: ["品牌官网", "营销落地页", "服务介绍页"],
  },
  theverge: {
    summaryZh: "科技媒体。近黑编辑画布、酸性薄荷与紫色强调、杂志化高密度信息流。",
    category: "内容平台",
    tagsZh: ["媒体", "科技", "内容", "杂志"],
    styleKeywords: ["近黑画布", "酸性薄荷", "紫色强调", "高密度信息流"],
    useCases: ["内容社区", "推荐流页面", "活动专题页"],
  },
  vodafone: {
    summaryZh: "全球电信品牌。沃达丰红 CTA、巨大大写标题、影像分段叙事。",
    category: "品牌官网",
    tagsZh: ["电信", "品牌", "红色", "企业"],
    styleKeywords: ["Vodafone Red", "大写标题", "影像分段", "企业品牌"],
    useCases: ["品牌官网", "营销落地页", "企业介绍页"],
  },
  wired: {
    summaryZh: "科技杂志。纸白编辑版式、黑色字标、窄高衬线标题与高密度文章排版。",
    category: "内容平台",
    tagsZh: ["媒体", "杂志", "科技", "内容"],
    styleKeywords: ["纸白画布", "编辑版式", "窄高衬线", "高密度排版"],
    useCases: ["内容社区", "推荐流页面", "文章详情页"],
  },
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

function titleFromSlug(slug) {
  return slug
    .split(/[.-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function listSourceDesignDirs() {
  const entries = await fs.readdir(sourceDesignRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function parseReadmeCollection(readmeText) {
  const records = new Map();
  let currentSection = "";

  for (const line of readmeText.split(/\r?\n/)) {
    const sectionMatch = line.match(/^###\s+(.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      continue;
    }

    const itemMatch = line.match(/^- \[\*\*(.*?)\*\*\]\(https:\/\/getdesign\.md\/([^/]+)\/design-md\) - (.*)$/);
    if (!itemMatch) continue;

    records.set(itemMatch[2], {
      name: itemMatch[2],
      displayName: itemMatch[1],
      desc: itemMatch[3],
      tags: currentSection ? [currentSection] : [],
    });
  }

  return records;
}

function parseFrontMatterDescription(content) {
  const oneLineMatch = content.match(/^description:\s*"?([^"\n]+)"?\s*$/m);
  if (oneLineMatch) {
    return oneLineMatch[1].trim();
  }

  const blockMatch = content.match(/^description:\s*\|\s*\n((?:\s{2,}.+\n?)+)/m);
  if (!blockMatch) {
    return "";
  }

  return blockMatch[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

async function loadExistingReferenceRecords() {
  try {
    const existingDataPath = path.join(targetDataDir, "designs.json");
    const existingData = JSON.parse(await fs.readFile(existingDataPath, "utf8"));
    return new Map(existingData
      .filter((record) => (record.group || "reference") === "reference")
      .map((record) => [record.slug, {
        name: record.slug,
        displayName: record.displayName,
        tags: record.tagsZh || [],
        desc: record.summaryZh || "",
        updatedAt: record.updatedAt,
      }]));
  } catch (error) {
    if (String(error.message || "").includes("ENOENT")) {
      return new Map();
    }
    throw error;
  }
}

async function getGitLastModifiedDate(relativePath) {
  try {
    const { stdout } = await execFileAsync("git", ["log", "-1", "--format=%cs", "--", relativePath], {
      cwd: targetRoot,
    });
    return stdout.trim();
  } catch {
    return "";
  }
}

async function resolveLocalUpdatedAt(slug, existingUpdatedAt) {
  const gitDate = await getGitLastModifiedDate(`design-md/${slug}/DESIGN.md`);
  return gitDate || existingUpdatedAt || syncDate;
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

  const existingRecords = await loadExistingReferenceRecords();
  const sourceDirs = await listSourceDesignDirs();
  let readmeRecords = new Map();

  try {
    const sourceReadme = await fs.readFile(path.join(sourceRoot, "README.md"), "utf8");
    readmeRecords = parseReadmeCollection(sourceReadme);
  } catch (error) {
    if (!String(error.message || "").includes("ENOENT")) {
      throw error;
    }
  }

  return Promise.all(sourceDirs.map(async (slug) => {
    const override = recordOverrides[slug] || {};
    const existing = existingRecords.get(slug);
    const readme = readmeRecords.get(slug);

    if (existing && !override.summaryZh && !override.tagsZh) {
      return {
        ...existing,
        updatedAt: override.updatedAt || await resolveLocalUpdatedAt(slug, existing.updatedAt),
      };
    }

    let desc = override.summaryZh || readme?.desc || existing?.desc || "";
    if (!desc) {
      try {
        const designContent = await fs.readFile(path.join(sourceDesignRoot, slug, "DESIGN.md"), "utf8");
        desc = parseFrontMatterDescription(designContent);
      } catch (error) {
        if (!String(error.message || "").includes("ENOENT")) {
          throw error;
        }
      }
    }

    return {
      name: slug,
      displayName: override.displayName || readme?.displayName || existing?.displayName || titleFromSlug(slug),
      tags: override.tagsZh || existing?.tags || readme?.tags || [],
      desc,
      updatedAt: override.updatedAt || await resolveLocalUpdatedAt(slug, existing?.updatedAt),
    };
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

async function buildCustomRecord() {
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
    updatedAt: await resolveLocalUpdatedAt(customCaseSlug),
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

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (String(error.message || "").includes("ENOENT")) {
      return false;
    }
    throw error;
  }
}

function normalizeHexColor(value) {
  const match = String(value || "").match(/#(?:[0-9a-fA-F]{3}){1,2}\b/);
  if (!match) return "";

  const color = match[0].toLowerCase();
  if (color.length === 4) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }
  return color;
}

function isNeutralHex(color) {
  const hex = normalizeHexColor(color).slice(1);
  if (hex.length !== 6) return true;

  const channels = [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  const spread = Math.max(...channels) - Math.min(...channels);
  const brightness = channels.reduce((sum, channel) => sum + channel, 0) / channels.length;

  return spread < 18 || brightness < 28 || brightness > 238;
}

function extractDesignColors(content) {
  const colors = [];
  const seen = new Set();

  const addColor = (name, value) => {
    const color = normalizeHexColor(value);
    if (!color || seen.has(color)) return;
    seen.add(color);
    colors.push({ name: String(name || "color").trim(), value: color });
  };

  const colorBlockMatch = content.match(/^colors:\s*\n((?:\s{2,}.+\n?)+)/m);
  if (colorBlockMatch) {
    for (const line of colorBlockMatch[1].split(/\r?\n/)) {
      const match = line.match(/^\s{2,}([a-zA-Z0-9_-]+):\s*["']?(#[0-9a-fA-F]{3,6})["']?/);
      if (match) {
        addColor(match[1], match[2]);
      }
    }
  }

  for (const match of content.matchAll(/\*\*([^*\n]+)\*\*[^#\n]*(#[0-9a-fA-F]{3,6})/g)) {
    addColor(match[1], match[2]);
  }

  return colors.slice(0, 12);
}

async function readDesignColors(record) {
  try {
    const designContent = await fs.readFile(path.join(targetRoot, record.designPath), "utf8");
    return extractDesignColors(designContent);
  } catch (error) {
    if (String(error.message || "").includes("ENOENT")) {
      return [];
    }
    throw error;
  }
}

function previewPageTemplate(record, mode, colors = []) {
  const isDark = mode === "dark";
  const accent = colors.find((color) => !isNeutralHex(color.value))?.value || (isDark ? "#8ab4ff" : "#3457d5");
  const colorSwatches = colors.length
    ? colors.map((color) => `
    <div class="color-swatch">
      <div class="color-swatch-block" style="background:${escapeHtml(color.value)}"></div>
      <div class="color-swatch-info">
        <div class="color-swatch-name">${escapeHtml(color.name)}</div>
        <div class="color-swatch-hex">${escapeHtml(color.value)}</div>
        <div class="color-swatch-role">Token from DESIGN.md</div>
      </div>
    </div>
      `).join("")
    : `
    <div class="color-swatch">
      <div class="color-swatch-block" style="background:${accent}"></div>
      <div class="color-swatch-info">
        <div class="color-swatch-name">Accent</div>
        <div class="color-swatch-hex">${accent}</div>
        <div class="color-swatch-role">Generated fallback</div>
      </div>
    </div>
  `;
  const keywordItems = renderList((record.styleKeywords || []).slice(0, 5));
  const checklistItems = renderList((record.aiChecklist || []).slice(0, 4));
  const pageBg = isDark ? "#0f1117" : "#ffffff";
  const panelBg = isDark ? "#171b24" : "#ffffff";
  const softBg = isDark ? "#202634" : "#f5f7fb";
  const text = isDark ? "#f7f8fb" : "#111827";
  const muted = isDark ? "#9aa4b2" : "#667085";
  const line = isDark ? "#303746" : "#e5e7eb";
  const shadow = isDark
    ? "rgba(0,0,0,0.28) 0px 14px 36px"
    : "rgba(15,23,42,0.08) 0px 12px 30px";

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Design System Preview: ${escapeHtml(record.displayName)} (${isDark ? "Dark" : "Light"})</title>
<style>
  :root {
    --page: ${pageBg};
    --panel: ${panelBg};
    --surface: ${softBg};
    --text: ${text};
    --secondary: ${muted};
    --border: ${line};
    --accent: ${accent};
    --shadow-card: ${shadow};
    --radius-card: 16px;
    --radius-control: 999px;
    --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "SF Mono", "JetBrains Mono", ui-monospace, monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: var(--page); color: var(--text); font-family: var(--font-sans); font-size: 15px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
  .nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 14px 28px; background: var(--page); border-bottom: 1px solid var(--border); }
  .nav-brand { color: var(--text); font-size: 14px; font-weight: 700; text-decoration: none; }
  .nav-links { display: flex; gap: 18px; list-style: none; flex-wrap: wrap; }
  .nav-links a { color: var(--secondary); font-size: 13px; font-weight: 600; text-decoration: none; }
  .nav-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 14px; border-radius: var(--radius-control); background: var(--accent); color: ${isNeutralHex(accent) ? "var(--page)" : "#ffffff"}; font-size: 13px; font-weight: 700; text-decoration: none; }
  .hero { padding: 72px 28px 64px; text-align: center; }
  .hero h1 { color: var(--text); font-size: clamp(40px, 7vw, 76px); font-weight: 700; line-height: 0.98; letter-spacing: 0; margin-bottom: 18px; }
  .hero h1 span { color: var(--accent); }
  .hero p { max-width: 700px; margin: 0 auto 28px; color: var(--secondary); font-size: 18px; }
  .hero-buttons, .button-row { display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; }
  .btn-primary, .btn-secondary, .btn-ghost, .btn-pill { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 18px; border-radius: var(--radius-control); font-size: 14px; font-weight: 700; text-decoration: none; }
  .btn-primary { background: var(--accent); color: ${isNeutralHex(accent) ? "var(--page)" : "#ffffff"}; }
  .btn-secondary { background: var(--text); color: var(--page); }
  .btn-ghost { border: 1px solid var(--border); color: var(--text); background: transparent; }
  .btn-pill { min-height: 30px; background: var(--surface); color: var(--secondary); }
  .section { max-width: 1180px; margin: 0 auto; padding: 56px 28px; }
  .section-divider { border: none; border-top: 1px solid var(--border); }
  .section-label { color: var(--secondary); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
  .section-title { font-size: 30px; line-height: 1.2; margin-bottom: 24px; }
  .color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
  .color-group-label { color: var(--secondary); font-weight: 700; margin: 0 0 12px; }
  .color-swatch { overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius-card); background: var(--panel); box-shadow: var(--shadow-card); }
  .color-swatch-block { height: 76px; border-bottom: 1px solid var(--border); }
  .color-swatch-info { padding: 12px; }
  .color-swatch-name { font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .color-swatch-hex { color: var(--secondary); font-family: var(--font-mono); font-size: 12px; }
  .color-swatch-role { color: var(--secondary); font-size: 11px; margin-top: 3px; }
  .type-sample { padding-bottom: 20px; margin-bottom: 22px; border-bottom: 1px solid var(--border); }
  .type-meta { color: var(--secondary); font-family: var(--font-mono); font-size: 12px; margin-top: 7px; }
  .button-item { text-align: center; }
  .button-label { color: var(--secondary); font-size: 12px; margin-top: 7px; }
  .card-grid, .elevation-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .card, .elevation-card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-card); }
  .card-media { height: 148px; background: linear-gradient(135deg, var(--accent), var(--surface)); }
  .card-body { padding: 18px; }
  .card h3 { font-size: 18px; margin-bottom: 6px; }
  .card p, .form-state-label, .elevation-desc, ul { color: var(--secondary); }
  .card-badge { display: inline-flex; min-height: 24px; padding: 0 10px; align-items: center; border-radius: var(--radius-control); background: var(--surface); color: var(--secondary); font-size: 12px; font-weight: 700; margin-bottom: 10px; }
  .form-group { max-width: 430px; margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
  .form-input, .form-textarea { width: 100%; border: 1px solid var(--border); border-radius: 10px; background: var(--panel); color: var(--text); font: inherit; padding: 12px 14px; outline: none; }
  .form-input--focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(127,127,127,0.16); }
  .form-input--error { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.16); }
  .form-textarea { min-height: 90px; resize: vertical; }
  .spacing-row, .radius-row { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; }
  .spacing-item, .radius-item { text-align: center; }
  .spacing-block { height: 28px; margin-bottom: 6px; border-radius: 4px; background: var(--accent); }
  .spacing-value, .radius-label { color: var(--secondary); font-family: var(--font-mono); font-size: 11px; }
  .radius-box { width: 64px; height: 64px; margin-bottom: 6px; background: var(--accent); }
  .radius-context { color: var(--secondary); font-size: 10px; }
  .elevation-card { min-height: 120px; padding: 20px; text-align: center; }
  .elevation-label { font-size: 15px; font-weight: 700; margin-bottom: 6px; }
  .prompt { padding: 18px; border-radius: var(--radius-card); background: var(--surface); color: var(--secondary); }
  .footer { padding: 28px; text-align: center; border-top: 1px solid var(--border); color: var(--secondary); font-size: 13px; }
  .footer a { color: var(--accent); }
  @media (max-width: 760px) { .nav-links { display: none; } .section { padding: 42px 18px; } .hero { padding: 54px 18px; } .card-grid, .elevation-grid { grid-template-columns: 1fr; } }
</style>
</head>
<body data-generated-preview="awesome-design-md-cn">
<nav class="nav">
  <a class="nav-brand" href="../../index.html">awesome-design-md-cn</a>
  <ul class="nav-links">
    <li><a href="#colors">Colors</a></li>
    <li><a href="#typography">Typography</a></li>
    <li><a href="#buttons">Buttons</a></li>
    <li><a href="#cards">Cards</a></li>
    <li><a href="#forms">Forms</a></li>
    <li><a href="#spacing">Spacing</a></li>
    <li><a href="#radius">Radius</a></li>
    <li><a href="#elevation">Elevation</a></li>
  </ul>
  <a class="nav-cta" href="../../designs/${escapeHtml(record.slug)}/index.html">详情页</a>
</nav>

<section class="hero">
  <h1>Design System<br>Inspired by <span>${escapeHtml(record.displayName)}</span></h1>
  <p>A design token catalog generated from DESIGN.md. Colors, typography, components, spacing, radius, and elevation are visualized for quick comparison.</p>
  <div class="hero-buttons">
    <a class="btn-primary" href="DESIGN.md">Open DESIGN.md</a>
    <a class="btn-ghost" href="${isDark ? "preview.html" : "preview-dark.html"}">${isDark ? "Light Preview" : "Dark Preview"}</a>
  </div>
</section>

<hr class="section-divider">

<section class="section" id="colors">
  <div class="section-label">01 / Colors</div>
  <h2 class="section-title">Color Palette</h2>
  <div class="color-group-label">Extracted tokens</div>
  <div class="color-grid">${colorSwatches}</div>
</section>

<hr class="section-divider">

<section class="section" id="typography">
  <div class="section-label">02 / Typography</div>
  <h2 class="section-title">Typography Scale</h2>
  <div class="type-sample"><div style="font-size:48px; font-weight:700; line-height:1;">Display Heading</div><div class="type-meta">Display — 48px / 700 / 1.00</div></div>
  <div class="type-sample"><div style="font-size:32px; font-weight:650; line-height:1.15;">Section Heading</div><div class="type-meta">Section — 32px / 650 / 1.15</div></div>
  <div class="type-sample"><div style="font-size:20px; font-weight:700; line-height:1.25;">Component Title</div><div class="type-meta">Title — 20px / 700 / 1.25</div></div>
  <div class="type-sample"><div style="font-size:15px; color:var(--secondary);">${escapeHtml(record.summaryZh)}</div><div class="type-meta">Body — 15px / 400 / 1.55</div></div>
  <div class="type-sample"><div style="font-family:var(--font-mono); font-size:12px; color:var(--secondary);">category: ${escapeHtml(record.category)}</div><div class="type-meta">Mono caption — 12px / token metadata</div></div>
</section>

<hr class="section-divider">

<section class="section" id="buttons">
  <div class="section-label">03 / Buttons</div>
  <h2 class="section-title">Button Variants</h2>
  <div class="button-row">
    <div class="button-item"><a class="btn-primary" href="#">Primary action</a><div class="button-label">Accent primary</div></div>
    <div class="button-item"><a class="btn-secondary" href="#">Secondary</a><div class="button-label">Text contrast</div></div>
    <div class="button-item"><a class="btn-ghost" href="#">Ghost</a><div class="button-label">Outlined</div></div>
    <div class="button-item"><a class="btn-pill" href="#">${escapeHtml(record.category)}</a><div class="button-label">Pill badge</div></div>
  </div>
</section>

<hr class="section-divider">

<section class="section" id="cards">
  <div class="section-label">04 / Cards</div>
  <h2 class="section-title">Card Examples</h2>
  <div class="card-grid">
    <article class="card"><div class="card-media"></div><div class="card-body"><span class="card-badge">更新于 ${escapeHtml(record.updatedAt || syncDate)}</span><h3>${escapeHtml(record.nameZh)}</h3><p>${escapeHtml(record.summaryZh)}</p></div></article>
    <article class="card"><div class="card-media" style="opacity:.78"></div><div class="card-body"><span class="card-badge">${escapeHtml(record.category)}</span><h3>风格关键词</h3><ul>${keywordItems}</ul></div></article>
    <article class="card"><div class="card-media" style="opacity:.56"></div><div class="card-body"><span class="card-badge">Agent Guide</span><h3>AI 使用建议</h3><ul>${checklistItems}</ul></div></article>
  </div>
</section>

<hr class="section-divider">

<section class="section" id="forms">
  <div class="section-label">05 / Forms</div>
  <h2 class="section-title">Form Elements</h2>
  <div class="form-group"><label class="form-label">Default input</label><input class="form-input" type="text" placeholder="Search style references"><div class="form-state-label">Default</div></div>
  <div class="form-group"><label class="form-label">Focused input</label><input class="form-input form-input--focus" type="text" value="${escapeHtml(record.displayName)}"><div class="form-state-label">Focus</div></div>
  <div class="form-group"><label class="form-label">Error input</label><input class="form-input form-input--error" type="text" value="Missing token"><div class="form-state-label">Error</div></div>
  <div class="form-group"><label class="form-label">Prompt</label><textarea class="form-textarea">${escapeHtml(record.recommendedPromptZh)}</textarea></div>
</section>

<hr class="section-divider">

<section class="section" id="spacing">
  <div class="section-label">06 / Spacing</div>
  <h2 class="section-title">Spacing Scale</h2>
  <div class="spacing-row">
    ${[4, 8, 12, 16, 24, 32, 48, 64].map((value) => `<div class="spacing-item"><div class="spacing-block" style="width:${value}px"></div><div class="spacing-value">${value}</div></div>`).join("")}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="radius">
  <div class="section-label">07 / Radius</div>
  <h2 class="section-title">Border Radius</h2>
  <div class="radius-row">
    ${[
      ["4px", "Fine controls"],
      ["8px", "Buttons"],
      ["12px", "Inputs"],
      ["16px", "Cards"],
      ["999px", "Pills"],
    ].map(([value, label]) => `<div class="radius-item"><div class="radius-box" style="border-radius:${value}"></div><div class="radius-label">${value}</div><div class="radius-context">${label}</div></div>`).join("")}
  </div>
</section>

<hr class="section-divider">

<section class="section" id="elevation">
  <div class="section-label">08 / Elevation</div>
  <h2 class="section-title">Elevation</h2>
  <div class="elevation-grid">
    <article class="elevation-card" style="box-shadow:none"><div class="elevation-label">Flat</div><div class="elevation-desc">No elevation</div></article>
    <article class="elevation-card"><div class="elevation-label">Card</div><div class="elevation-desc">var(--shadow-card)</div></article>
    <article class="elevation-card" style="box-shadow:0 24px 60px rgba(0,0,0,.18)"><div class="elevation-label">Floating</div><div class="elevation-desc">Large overlay</div></article>
  </div>
</section>

<hr class="section-divider">

<section class="section">
  <div class="section-label">09 / Agent Prompt Guide</div>
  <h2 class="section-title">Recommended Prompt</h2>
  <div class="prompt">${escapeHtml(record.recommendedPromptZh)}</div>
</section>

<footer class="footer">
  Generated because upstream did not provide preview HTML. Follows the existing preview catalog structure used by this repository.
</footer>
</body>
</html>
`;
}

function readmeTemplate(record) {
  return `# ${record.displayName} Inspired Design System

${record.summaryZh}

This directory contains a \`DESIGN.md\` reference synced from the upstream \`awesome-design-md\` collection.
It is not an official design system.

## Files

| File | Description |
|------|-------------|
| \`DESIGN.md\` | Design system documentation for AI agents |
| \`preview.html\` | Local light preview generated by awesome-design-md-cn |
| \`preview-dark.html\` | Local dark preview generated by awesome-design-md-cn |

## 中文使用建议

${record.recommendedPromptZh}
`;
}

async function ensureReadmeFiles(records) {
  await Promise.all(records.map(async (record) => {
    const readmePath = path.join(targetRoot, record.readmePath);

    await fs.mkdir(path.dirname(readmePath), { recursive: true });

    if (!(await pathExists(readmePath))) {
      await fs.writeFile(readmePath, readmeTemplate(record));
    }
  }));
}

async function shouldWritePreview(filePath) {
  if (!(await pathExists(filePath))) {
    return true;
  }

  const content = await fs.readFile(filePath, "utf8");
  return content.includes('data-generated-preview="awesome-design-md-cn"') ||
    (content.includes("Design System Preview") &&
      content.includes("推荐提示词") &&
      content.includes("风格关键词"));
}

async function ensurePreviewFiles(records) {
  await Promise.all(records.map(async (record) => {
    const lightPath = path.join(targetRoot, record.previewLight);
    const darkPath = path.join(targetRoot, record.previewDark);
    const colors = await readDesignColors(record);

    await fs.mkdir(path.dirname(lightPath), { recursive: true });

    if (await shouldWritePreview(lightPath)) {
      await fs.writeFile(lightPath, previewPageTemplate(record, "light", colors));
    }

    if (await shouldWritePreview(darkPath)) {
      await fs.writeFile(darkPath, previewPageTemplate(record, "dark", colors));
    }
  }));
}

async function main() {
  const sourceDesigns = await loadSourceDesigns();

  let records = sourceDesigns.map((item) => {
    const slug = item.name;
    const override = recordOverrides[slug] || {};
    const tagsZh = override.tagsZh || item.tags || [];
    const nameZh = override.nameZh || nameZhMap[slug] || item.name;
    const displayName = override.displayName || displayNameMap[slug] || item.displayName || titleFromSlug(slug);
    const summaryZh = override.summaryZh || item.desc || "";
    const category = override.category || pickCategory(tagsZh, slug);
    const useCases = override.useCases || pickUseCases(tagsZh);
    const styleKeywords = override.styleKeywords || unique(tagsZh.concat(summaryZh.split(/[，、+ ]/).slice(0, 3)));
    const aliases = unique([
      slug,
      slug.replace(/\./g, ""),
      slug.replace(/[.-]/g, ""),
      nameZh,
      displayName,
      ...(tagsZh || []),
      ...(override.aliases || []),
    ]);

    return enrichRecord({
      slug,
      name: slug,
      displayName,
      nameZh,
      group: "reference",
      summaryZh,
      category,
      tagsZh,
      styleKeywords,
      aliases,
      useCases,
      previewLight: `design-md/${slug}/preview.html`,
      previewDark: `design-md/${slug}/preview-dark.html`,
      readmePath: `design-md/${slug}/README.md`,
      designPath: `design-md/${slug}/DESIGN.md`,
      updatedAt: override.updatedAt || item.updatedAt || syncDate,
    });
  });

  records = records.map((record) => ({
    ...record,
    recommendedPromptZh: buildPrompt(record),
  }));

  records.push(await buildCustomRecord());

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
  await ensureReadmeFiles(records);
  await ensurePreviewFiles(records);

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
