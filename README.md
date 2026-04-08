<a href="https://github.com/VoltAgent/awesome-design-md">
  <img width="1500" height="801" alt="awesome-design-md" src="https://github.com/user-attachments/assets/d012a0d2-cec3-4630-ba5e-acc339dbe6cf" />
</a>

<br/>
<br/>

<div align="center">
  <strong>面向中文用户的 DESIGN.md 资源集合与本地化浏览版本。</strong>
  <br />
  <br />
</div>

<div align="center">

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![DESIGN.md Count](https://img.shields.io/badge/DESIGN.md%20count-59-10b981?style=classic)
[![Last Update](https://img.shields.io/github/last-commit/fchangjun/awesome-design-md-cn?label=Last%20update&style=classic)](https://github.com/fchangjun/awesome-design-md-cn)

</div>

# Awesome DESIGN.md CN

复制一份 `DESIGN.md` 到你的项目里，告诉 AI Agent “按这个风格给我做一个页面”，就能更稳定地生成接近目标视觉语言的 UI。

这个仓库基于 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 做中文本地化整理。目标不是改变原项目定义，而是让原项目对中文用户更友好、更容易理解和使用。

目前仓库包含：

- `58` 个参考案例：来自原项目收录的公开网站风格参考
- `1` 个自定义案例：`awesome-design-md-cn` 自己沉淀出的资源库设计语言

## 快速入口

- 在线预览：[fchangjun.github.io/awesome-design-md-cn](https://fchangjun.github.io/awesome-design-md-cn/)
- 使用指南：[guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html)
- 原项目仓库：[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- 原项目 README：[README.md](https://github.com/VoltAgent/awesome-design-md/blob/main/README.md)

## 什么是 DESIGN.md？

[DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) 是 Google Stitch 提出的一个新概念。
它是一份给 AI Agent 读取的纯文本设计系统文档，用来帮助 AI 生成更一致的界面。

它本质上只是一个 Markdown 文件：

- 不需要 Figma 导出
- 不需要 JSON schema
- 不需要额外工具链

把它放进项目根目录之后，AI coding agent 或 Google Stitch 就能理解你的界面应该长什么样。
Markdown 也是 LLM 最擅长读取的格式，所以没有额外解析和配置成本。

| 文件 | 谁来读取 | 定义什么 |
|------|----------|----------|
| `AGENTS.md` | Coding agents | 项目应该怎么做 |
| `DESIGN.md` | Design agents | 项目应该长什么样 |

**这个仓库提供的是可直接使用的 `DESIGN.md` 文件**，这些文件来自对真实网站设计语言的整理。

## 每个 DESIGN.md 里有什么？

每份文件都遵循 [Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/)，并扩展了这些常用部分：

| # | 部分 | 说明 |
|---|------|------|
| 1 | Visual Theme & Atmosphere | 视觉气质、密度、设计哲学 |
| 2 | Color Palette & Roles | 语义色、十六进制值、功能角色 |
| 3 | Typography Rules | 字体族与完整层级规则 |
| 4 | Component Stylings | 按钮、卡片、输入框、导航及状态 |
| 5 | Layout Principles | 间距系统、网格、留白原则 |
| 6 | Depth & Elevation | 阴影体系与层级关系 |
| 7 | Do's and Don'ts | 设计边界与反模式 |
| 8 | Responsive Behavior | 断点、触控目标、折叠策略 |
| 9 | Agent Prompt Guide | 快速提示词与参考说明 |

每个站点目录通常包含：

| 文件 | 用途 |
|------|------|
| `DESIGN.md` | 设计系统说明，供 Agent 读取 |
| `preview.html` | 预览页，展示颜色、字号、按钮、卡片等 |
| `preview-dark.html` | 深色版本预览页 |

### 如何使用

1. 复制某个站点的 `DESIGN.md` 到你的项目根目录
2. 告诉你的 AI Agent 按它来生成界面

## 这个中文版本额外做了什么？

在保留原始 `DESIGN.md` 和预览资源的基础上，这个仓库增加了：

- 中文首页导航
- 中文搜索与分类筛选
- 中文设计系统详情页
- 中文使用指南
- 更适合中文用户的浏览与理解入口

## 收录内容

### 自定义案例

- [**awesome-design-md-cn**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/awesome-design-md-cn/) - 项目自定义案例。冷灰科技风、低疲劳浏览、左侧筛选、紧凑目录卡片

### AI 与机器学习

- [**Claude**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/claude/) - Anthropic 的 AI 助手。暖陶土色点缀，干净的编辑式排版
- [**Cohere**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/cohere/) - 企业 AI 平台。高饱和渐变、数据密集型控制台气质
- [**ElevenLabs**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/elevenlabs/) - AI 语音平台。深色电影感界面，音频波形视觉
- [**Minimax**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/minimax/) - AI 模型提供方。大胆深色界面与霓虹强调
- [**Mistral AI**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/mistral.ai/) - 开放权重 LLM 提供方。法式极简，偏紫色调
- [**Ollama**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/ollama/) - 本地运行 LLM。终端优先，黑白极简
- [**OpenCode AI**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/opencode.ai/) - AI 编码平台。开发者导向的深色主题
- [**Replicate**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/replicate/) - 通过 API 运行模型。清爽白底，偏代码导向
- [**RunwayML**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/runwayml/) - AI 视频生成。电影感深色 UI，媒体展示导向
- [**Together AI**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/together.ai/) - 开源 AI 基础设施。技术蓝图风格
- [**VoltAgent**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/voltagent/) - AI Agent 框架。深黑底、祖母绿强调、终端原生气质
- [**xAI**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/x.ai/) - xAI 实验室。极简黑白、未来感强

### 开发工具与平台

- [**Cursor**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/cursor/) - AI 代码编辑器。深色界面与渐变强调
- [**Expo**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/expo/) - React Native 平台。深色主题、紧凑字距、代码导向
- [**Linear**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/linear.app/) - 面向工程师的项目管理。极简、精确、紫色点缀
- [**Lovable**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/lovable/) - AI 全栈构建工具。 playful 渐变、友好的开发者气质
- [**Mintlify**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/mintlify/) - 文档平台。干净、绿色点缀、适合长阅读
- [**PostHog**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/posthog/) - 产品分析工具。品牌个性强、面向开发者的深色 UI
- [**Raycast**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/raycast/) - 效率启动器。深色 chrome 与高彩渐变强调
- [**Resend**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/resend/) - 邮件 API。极简深色主题与等宽字点缀
- [**Sentry**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/sentry/) - 错误监控。深色数据台，粉紫强调
- [**Supabase**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/supabase/) - 开源 Firebase 替代方案。深色祖母绿，代码优先
- [**Superhuman**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/superhuman/) - 高速邮件客户端。高级深色 UI，键盘优先
- [**Vercel**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/vercel/) - 前端部署平台。黑白精确感，Geist 字体
- [**Warp**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/warp/) - 现代终端。类 IDE 深色界面，块状命令 UI
- [**Zapier**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/zapier/) - 自动化平台。暖橙色，友好的插画驱动风格

### 基础设施与云

- [**ClickHouse**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/clickhouse/) - 高性能分析数据库。黄色点缀，技术文档风
- [**Composio**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/composio/) - 工具集成平台。现代深色与多彩集成图标
- [**HashiCorp**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/hashicorp/) - 基础设施自动化。企业级干净黑白风格
- [**MongoDB**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/mongodb/) - 文档数据库。绿色品牌识别，开发者文档导向
- [**Sanity**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/sanity/) - Headless CMS。红色强调，内容优先的编辑式布局
- [**Stripe**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/stripe/) - 支付基础设施。标志性紫色渐变，轻字重优雅风格

### 设计与效率

- [**Airtable**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/airtable/) - 表格与数据库混合工具。多彩、友好、结构化数据气质
- [**Cal.com**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/cal/) - 开源日程安排工具。中性干净，面向开发者
- [**Clay**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/clay/) - 创意工作室风格。自然形态、柔和渐变、强 art direction
- [**Figma**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/figma/) - 协作设计工具。多彩、活泼，但仍保持专业
- [**Framer**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/framer/) - 建站工具。黑蓝高对比，强调动效与设计感
- [**Intercom**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/intercom/) - 客服消息平台。友好的蓝色系统与对话式 UI
- [**Miro**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/miro/) - 视觉协作工具。亮黄色点缀，无限画布气质
- [**Notion**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/notion/) - 一体化工作空间。温和极简、衬线标题、柔和表面
- [**Pinterest**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/pinterest/) - 图片发现平台。红色强调、瀑布流、图片优先
- [**Webflow**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/webflow/) - 可视化建站。蓝色点缀、 polished marketing site 风格

### 金融科技与加密

- [**Coinbase**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/coinbase/) - 加密交易所。干净蓝色识别，强调可信与机构感
- [**Kraken**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/kraken/) - 加密交易平台。紫色深色界面，数据密集型 dashboard
- [**Revolut**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/revolut/) - 数字银行。精致深色界面，渐变卡片，金融科技精确感
- [**Wise**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/wise/) - 国际转账。明亮绿色点缀，清晰且友好

### 企业与消费品牌

- [**Airbnb**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/airbnb/) - 旅行平台。暖珊瑚色点缀，强摄影感，圆润 UI
- [**Apple**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/apple/) - 消费电子。高级留白，SF Pro，电影感视觉
- [**IBM**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/ibm/) - 企业技术品牌。Carbon 设计系统，结构化蓝色体系
- [**NVIDIA**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/nvidia/) - GPU 计算。绿色与黑色能量感，技术力量气质
- [**SpaceX**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/spacex/) - 航天科技。黑白强对比，全幅影像，未来感
- [**Spotify**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/spotify/) - 音乐流媒体。深色底上的高亮绿色，大胆排版
- [**Uber**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/uber/) - 出行平台。粗黑白对比、紧凑字距、都市感强

### 汽车品牌

- [**BMW**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/bmw/) - 豪华汽车品牌。深色高级表面，精确的德系工程感
- [**Ferrari**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/ferrari/) - 豪华汽车品牌。黑白编辑感极强，法拉利红极少量点缀
- [**Lamborghini**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/lamborghini/) - 豪华汽车品牌。纯黑舞台感、金色强调、张力极强
- [**Renault**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/renault/) - 法国汽车品牌。高能渐变、几何秩序、现代车展感
- [**Tesla**](https://github.com/fchangjun/awesome-design-md-cn/tree/main/design-md/tesla/) - 电动车品牌。极简克制、摄影驱动、产品展示优先

## 本地使用

直接打开 [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html) 即可预览。

重新同步源仓库内容：

```bash
npm run sync
```

如果源仓库不在默认的 `../awesome-design-md`：

```bash
node scripts/sync-source.mjs /path/to/awesome-design-md
```

## 目录结构

- [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html): 中文首页
- [guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html): 使用指南
- [data/designs.json](/Users/baba/Desktop/GitHub/awesome-design-md-cn/data/designs.json): 结构化数据
- [design-md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/design-md): 同步的原始设计资产
- [designs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/designs): 自动生成的详情页
- [scripts/sync-source.mjs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/scripts/sync-source.mjs): 同步与生成脚本
- [docs/PROJECT_PLAN.md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/docs/PROJECT_PLAN.md): 项目规划与后续待办

## 部署

仓库包含 GitHub Pages 工作流：
[.github/workflows/deploy-pages.yml](/Users/baba/Desktop/GitHub/awesome-design-md-cn/.github/workflows/deploy-pages.yml)

## 致敬与引用

- 原项目仓库：[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- 本仓库保留原始设计资产，并对浏览和理解体验做中文本地化增强
