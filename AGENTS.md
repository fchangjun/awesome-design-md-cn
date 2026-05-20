# AGENTS.md

## 项目定位

这是 `VoltAgent/awesome-design-md` 的中文本地化浏览仓库。核心内容是 `design-md/*/DESIGN.md`、明暗预览页、中文元数据和静态详情页。

## 同步规则

- 使用 `scripts/sync-source.mjs` 从上游同步案例，并生成 `data/designs.json`、`data/designs.js` 和 `designs/*/index.html`。
- 每次同步必须写入本地同步日期字段 `updatedAt`。新增或实际同步的案例使用执行同步时的本地日期；已有且未更新的案例保留本地最后修改日期，不能批量改成当天。
- 首页列表卡片必须在卡片顶部显式显示 `updatedAt`，格式为 `同步 YYYY-MM-DD`，用于区分内容同步批次。
- 每次同步必须更新 `README.md` 的“更新日志”，记录同步日期、新增案例、预览页补齐、列表页或数据结构变化；不能只更新收录列表。
- 新增上游案例时，必须同时保证以下文件存在：
  - `design-md/<slug>/DESIGN.md`
  - `design-md/<slug>/README.md`
  - `design-md/<slug>/preview.html`
  - `design-md/<slug>/preview-dark.html`
  - `designs/<slug>/index.html`
- 如果上游没有提供 `preview.html` 或 `preview-dark.html`，同步脚本必须按本仓库已有预览页规则生成本地预览，不能留下空白页、断链或只有文字的占位页。

## 预览页生成规则

缺失预览页时，生成的页面应遵循已有案例的 preview catalog 结构：

- 顶部导航：链接到 Colors、Typography、Buttons、Cards、Forms、Spacing、Radius、Elevation 等区块。
- Hero：展示 `Design System Inspired by <name>`、摘要和 DESIGN.md 入口。
- Colors：从 `DESIGN.md` 自动提取十六进制颜色，渲染色块、token 名和色值。
- Typography：展示 display、section、title、body、mono/caption 等层级样例。
- Buttons：展示 primary、secondary、ghost、pill/badge 等按钮样式。
- Cards：展示至少三张卡片，用于呈现摘要、关键词和 AI 使用建议。
- Forms：展示 default、focus、error、textarea 等表单状态。
- Spacing：展示 4、8、12、16、24、32、48、64 的 spacing scale。
- Radius：展示 4px、8px、12px、16px、999px 等 radius scale。
- Elevation：展示 flat、card、floating 三种层级。
- Footer：说明这是因上游缺失 preview HTML 而生成的本地预览。

## 保护规则

- 不覆盖已有手工预览页，除非页面带有 `data-generated-preview="awesome-design-md-cn"` 标记，或明显是同步脚本生成的旧兜底页。
- 不把详情页里的预览链接指向不存在的文件。
- 不把 README 链接写成本机绝对路径。
- 同步后必须检查记录数、重复 slug、文件存在性和脚本语法。

## 建议校验命令

```bash
node --check scripts/sync-source.mjs
node --check data/designs.js
node --check assets/index.js
node --check assets/site.js
```

```bash
node --input-type=module <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
const data = JSON.parse(fs.readFileSync('data/designs.json', 'utf8'));
const missing = [];
const seen = new Set();
const duplicates = [];
for (const record of data) {
  if (seen.has(record.slug)) duplicates.push(record.slug);
  seen.add(record.slug);
  for (const key of ['previewLight', 'previewDark', 'readmePath', 'designPath']) {
    if (!fs.existsSync(path.join(process.cwd(), record[key]))) missing.push(`${record.slug}:${key}`);
  }
  if (!fs.existsSync(path.join(process.cwd(), 'designs', record.slug, 'index.html'))) {
    missing.push(`${record.slug}:detail`);
  }
}
console.log({ records: data.length, duplicates, missing });
NODE
```
