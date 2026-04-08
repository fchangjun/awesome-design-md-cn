# awesome-design-md-cn

中文本地化的 `DESIGN.md` 导航站。

基于 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 的公开内容整理，保留原始 `DESIGN.md` 与预览资源，并补充中文搜索、分类、详情页和使用指南。

## Links

- Online Preview: [fchangjun.github.io/awesome-design-md-cn](https://fchangjun.github.io/awesome-design-md-cn/)
- Guide: [guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html)
- Upstream Repo: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- Project Plan: [docs/PROJECT_PLAN.md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/docs/PROJECT_PLAN.md)

## What is DESIGN.md

`DESIGN.md` 是一份给 AI Agent 读取的纯文本设计系统说明。

它不依赖 Figma 导出、JSON schema 或专用工具，核心作用是把一个产品的视觉语言写成 AI 能稳定理解的约束，例如：

- 整体气质与视觉主题
- 配色与语义色角色
- 字体层级与排版规则
- 按钮、卡片、输入框、导航等组件样式
- 留白、网格、阴影和响应式原则

简单说：

- `AGENTS.md` 告诉 AI “怎么做”
- `DESIGN.md` 告诉 AI “做成什么感觉”

## What’s Inside

每个设计系统目录通常包含：

- `DESIGN.md`: 设计语言说明
- `preview.html`: 浅色预览
- `preview-dark.html`: 深色预览

这个仓库在原始资产之外，额外补了：

- 中文首页导航
- 中文分类、搜索与场景筛选
- 中文详情页
- 中文使用指南

## Collection

当前收录内容主要覆盖这些方向：

- AI 与 Machine Learning
  - Claude, Cohere, ElevenLabs, Minimax, Mistral, Replicate, Runway
- Developer Tools & Platforms
  - Cursor, Linear, Mintlify, Raycast, Sentry, Supabase, Vercel, Warp
- Infrastructure & Cloud
  - ClickHouse, HashiCorp, MongoDB, Sanity, Stripe
- Design & Productivity
  - Airtable, Figma, Framer, Intercom, Miro, Notion, Webflow
- Fintech & Crypto
  - Coinbase, Kraken, Revolut, Wise
- Enterprise & Consumer / Brand
  - Airbnb, Apple, IBM, NVIDIA, SpaceX, Spotify, Uber, BMW

完整列表请直接查看在线预览或首页筛选结果。

## Upstream

This project is a Chinese-localized navigation layer built on top of the original `awesome-design-md`.

- Original repository: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- Original README: [README.md](https://github.com/VoltAgent/awesome-design-md/blob/main/README.md)
- This repository keeps the original design assets and rebuilds the browsing experience for Chinese users.

## Features

- 中文首页导航
- 中文搜索与分类筛选
- 设计系统详情页
- 原始 `DESIGN.md` / `preview.html` / `preview-dark.html` 入口
- 静态站结构，支持本地直接预览和 GitHub Pages 部署

## Quick Start

本地直接打开 [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html) 即可预览。

重新同步源仓库内容：

```bash
npm run sync
```

如果源仓库不在默认的 `../awesome-design-md`：

```bash
node scripts/sync-source.mjs /path/to/awesome-design-md
```

## Structure

- [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html): 中文首页
- [guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html): 使用指南
- [data/designs.json](/Users/baba/Desktop/GitHub/awesome-design-md-cn/data/designs.json): 结构化数据
- [design-md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/design-md): 同步的原始设计资产
- [designs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/designs): 自动生成的详情页
- [scripts/sync-source.mjs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/scripts/sync-source.mjs): 同步与生成脚本
- [docs/PROJECT_PLAN.md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/docs/PROJECT_PLAN.md): 项目规划与后续待办

## Deploy

仓库包含 GitHub Pages 工作流：
[.github/workflows/deploy-pages.yml](/Users/baba/Desktop/GitHub/awesome-design-md-cn/.github/workflows/deploy-pages.yml)
