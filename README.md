# awesome-design-md-cn

`awesome-design-md-cn` 是面向中文用户重构的 `DESIGN.md` 导航项目。

它保留原始 `DESIGN.md` 和预览资源，同时补充中文优先的信息架构、搜索方式、分类标签、使用场景和提示词入口。项目既可以作为 GitHub 内容仓库维护，也可以直接作为静态网页预览使用。

详细规划见 [docs/PROJECT_PLAN.md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/docs/PROJECT_PLAN.md)。
后续首页视觉与交互待办也已记录在 [docs/PROJECT_PLAN.md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/docs/PROJECT_PLAN.md) 的 backlog 小节中。

## 当前已完成

- 初始化新仓库
- 接入原始 `design-md` 资源目录
- 生成中文元数据文件 `data/designs.json`
- 生成本地可直接打开的 `data/designs.js`
- 重写中文首页 [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html)
- 新增使用指南页 [guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html)
- 自动生成 54 个设计系统详情页 `designs/<slug>/index.html`

## 目录说明

- [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html)：中文首页，支持搜索、分类和场景筛选
- [guide.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/guide.html)：中文使用指南
- [data/designs.json](/Users/baba/Desktop/GitHub/awesome-design-md-cn/data/designs.json)：结构化数据源
- [data/designs.js](/Users/baba/Desktop/GitHub/awesome-design-md-cn/data/designs.js)：本地静态预览使用的数据脚本
- [design-md](/Users/baba/Desktop/GitHub/awesome-design-md-cn/design-md)：同步过来的原始设计资产
- [designs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/designs)：自动生成的中文详情页
- [assets/site.css](/Users/baba/Desktop/GitHub/awesome-design-md-cn/assets/site.css)：站点通用样式
- [assets/index.js](/Users/baba/Desktop/GitHub/awesome-design-md-cn/assets/index.js)：首页交互逻辑
- [assets/site.js](/Users/baba/Desktop/GitHub/awesome-design-md-cn/assets/site.js)：通用复制提示词等交互
- [scripts/sync-source.mjs](/Users/baba/Desktop/GitHub/awesome-design-md-cn/scripts/sync-source.mjs)：从源仓库同步数据和资源的脚本

## 本地使用

直接打开 [index.html](/Users/baba/Desktop/GitHub/awesome-design-md-cn/index.html) 即可浏览。

如果需要重新从原仓库同步内容，在项目根目录执行：

```bash
npm run sync
```

默认会做两件事：

- 复制源仓库中的 `design-md/`
- 根据源首页数据生成 `data/designs.json`、`data/designs.js` 和 `designs/<slug>/index.html`

如果源仓库不在默认的 `../awesome-design-md`，也可以手动指定路径：

```bash
node scripts/sync-source.mjs /your/source/path
```

## 部署

仓库已经补上 GitHub Pages 工作流 [.github/workflows/deploy-pages.yml](/Users/baba/Desktop/GitHub/awesome-design-md-cn/.github/workflows/deploy-pages.yml)。

默认行为：

- 推送到 `main` 分支时自动部署
- 部署目录为仓库根目录
- 已添加 `.nojekyll`，适合当前纯静态站结构

## 当前原则

- 以新增和增强为主，不改写原始设计资产
- 先做静态站能力，再考虑是否框架化
- 优先解决中文用户的理解、检索和使用门槛

## 致敬与引用

本项目基于原仓库 `awesome-design-md` 的公开内容进行中文本地化整理与导航体验重构。

- 原项目仓库：[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)
- 当前版本保留原始 `DESIGN.md`、预览页与目录资产，并在外层增加中文信息架构、筛选、详情页和使用指南

感谢原作者整理这套高质量的 `DESIGN.md` 设计系统参考集合。
