(function () {
  const designs = Array.isArray(window.DESIGNS) ? window.DESIGNS : [];
  const featuredSlugs = ["figma", "notion", "stripe", "vercel"];
  const preferredScenarios = [
    "品牌官网",
    "产品官网",
    "官网落地页",
    "营销落地页",
    "开发者官网",
    "文档站",
    "控制台后台",
    "SaaS 后台",
    "工作台",
    "AI 工具官网",
    "支付产品页",
    "数据控制台",
  ];
  const state = {
    query: "",
    category: "全部",
    scenario: "全部",
  };

  const heroCount = document.getElementById("hero-count");
  const categoryCount = document.getElementById("category-count");
  const scenarioCount = document.getElementById("scenario-count");
  const categoryChips = document.getElementById("category-chips");
  const scenarioChips = document.getElementById("scenario-chips");
  const featuredGrid = document.getElementById("featured-grid");
  const cardGrid = document.getElementById("card-grid");
  const resultCount = document.getElementById("result-count");
  const searchInput = document.getElementById("search-input");
  const clearFiltersButton = document.getElementById("clear-filters");

  function unique(items) {
    return [...new Set(items)];
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(text) {
    return String(text || "").toLowerCase().trim();
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const haystack = [
      item.name,
      item.displayName,
      item.nameZh,
      item.summaryZh,
      item.category,
      ...(item.tagsZh || []),
      ...(item.aliases || []),
      ...(item.useCases || []),
      ...(item.bestFor || []),
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  }

  function filterDesigns() {
    const query = normalize(state.query);
    return designs.filter((item) => {
      const categoryPass = state.category === "全部" || item.category === state.category;
      const scenarioPass = state.scenario === "全部" || (item.useCases || []).includes(state.scenario);
      return categoryPass && scenarioPass && matchesQuery(item, query);
    });
  }

  function renderChips(target, values, activeValue, onClick) {
    target.innerHTML = values.map((value) => `
      <button type="button" class="chip${value === activeValue ? " active" : ""}" data-value="${escapeHtml(value)}">${escapeHtml(value)}</button>
    `).join("");

    target.querySelectorAll("[data-value]").forEach((button) => {
      button.addEventListener("click", () => onClick(button.getAttribute("data-value")));
    });
  }

  function createDetailLink(item) {
    return `designs/${item.slug}/index.html`;
  }

  function renderFeatured() {
    const featured = featuredSlugs
      .map((slug) => designs.find((item) => item.slug === slug))
      .filter(Boolean);

    featuredGrid.innerHTML = featured.map((item) => `
      <article class="card featured-card">
        <div class="card-kicker">Featured</div>
        <div class="card-head">
          <div>
            <h3 class="card-title">${escapeHtml(item.nameZh)}</h3>
            <p class="card-subtitle">${escapeHtml(item.displayName)}</p>
          </div>
          <span class="badge">${escapeHtml(item.category)}</span>
        </div>
        <p class="muted">${escapeHtml(item.summaryZh)}</p>
        <div class="mini-tags">${(item.tagsZh || []).slice(0, 2).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <div class="link-row">
          <a class="button button-secondary" href="${escapeHtml(createDetailLink(item))}">查看详情</a>
          <a class="button button-ghost" href="${escapeHtml(item.previewLight)}" target="_blank" rel="noreferrer">打开预览</a>
        </div>
      </article>
    `).join("");
  }

  function renderCards(items) {
    if (!items.length) {
      cardGrid.innerHTML = `
        <div class="empty-state">
          没有找到匹配的设计系统。可以试试中文行业词、品牌名，或者清空筛选重新浏览。
        </div>
      `;
      return;
    }

    cardGrid.innerHTML = items.map((item) => `
      <article class="card">
        <div class="card-kicker">System</div>
        <div class="card-head">
          <div>
            <h3 class="card-title">${escapeHtml(item.nameZh)}</h3>
            <p class="card-subtitle">${escapeHtml(item.displayName)}</p>
          </div>
          <span class="badge">${escapeHtml(item.category)}</span>
        </div>
        <p class="muted">${escapeHtml(item.summaryZh)}</p>
        <div class="card-meta">
          <span>${escapeHtml((item.tagsZh || []).slice(0, 1).join(""))}</span>
          <span>${escapeHtml((item.useCases || []).slice(0, 1).join(""))}</span>
        </div>
        <div class="card-actions">
          <a class="card-action card-action-primary" href="${escapeHtml(createDetailLink(item))}">查看详情</a>
          <a class="card-action" href="${escapeHtml(item.previewLight)}" target="_blank" rel="noreferrer">打开预览</a>
        </div>
      </article>
    `).join("");
  }

  function renderCategoryChips(categories) {
    renderChips(categoryChips, categories, state.category, (value) => {
      state.category = value;
      renderCategoryChips(categories);
      render();
    });
  }

  function renderScenarioChips(scenarios) {
    renderChips(scenarioChips, scenarios, state.scenario, (value) => {
      state.scenario = value;
      renderScenarioChips(scenarios);
      render();
    });
  }

  function render() {
    const filtered = filterDesigns();
    heroCount.textContent = String(designs.length);
    categoryCount.textContent = String(unique(designs.map((item) => item.category)).length);
    scenarioCount.textContent = String(unique(designs.flatMap((item) => item.useCases || [])).length);
    resultCount.textContent = `共 ${filtered.length} 个结果。`;
    renderCards(filtered);
  }

  function init() {
    const categories = ["全部"].concat(unique(designs.map((item) => item.category)));
    const allScenarios = unique(designs.flatMap((item) => item.useCases || []));
    const scenarios = ["全部"].concat(preferredScenarios.filter((item) => allScenarios.includes(item)));

    renderFeatured();
    renderCategoryChips(categories);
    renderScenarioChips(scenarios);
    render();

    searchInput.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
    });

    clearFiltersButton.addEventListener("click", () => {
      state.query = "";
      state.category = "全部";
      state.scenario = "全部";
      searchInput.value = "";
      renderCategoryChips(categories);
      renderScenarioChips(scenarios);
      render();
    });
  }

  init();
})();
