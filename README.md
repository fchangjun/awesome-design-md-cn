# awesome-design-md-cn

中文本地化的 `DESIGN.md` 导航站。

基于 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 的公开内容整理，保留原始 `DESIGN.md` 与预览资源，并补充中文搜索、分类、详情页和使用指南。

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

## Upstream

- Upstream: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- This project keeps the original assets and rebuilds the browsing experience for Chinese users.
