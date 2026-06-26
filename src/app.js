(function initImageSeed(global) {
  const core = global.ImageSeedCore;
  if (!core) return;

  const storageKeys = {
    user: 'image_seed.user',
    favorites: 'image_seed.favorites',
    history: 'image_seed.history'
  };

  const routes = [
    { id: 'home', label: '首页' },
    { id: 'analysis', label: 'AI分析' },
    { id: 'photographers', label: '摄影师' },
    { id: 'books', label: '摄影书' },
    { id: 'favorites', label: '收藏' },
    { id: 'history', label: '历史' }
  ];

  let state = {
    user: readJson(storageKeys.user, null),
    keyword: '城市孤独',
    result: core.buildStudyResult('城市孤独'),
    route: 'login'
  };

  function readJson(key, fallback) {
    try {
      const value = global.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    global.localStorage.setItem(key, JSON.stringify(value, null, 2));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function app() {
    return global.document.getElementById('app');
  }

  function render() {
    const root = app();
    root.innerHTML = state.user ? layout() : loginPage();
    bindEvents();
  }

  function loginPage() {
    return `
      <section class="login-shell">
        <img class="login-bg" src="assets/photos/hero-darkroom.jpg" alt="摄影暗房">
        <div class="login-panel">
          <p class="eyebrow">IMAGE SEED</p>
          <h1>摄影创作研究助手</h1>
          <p>输入一个用户名，进入摄影主题研究工作台。</p>
          <form id="loginForm" class="login-form">
            <input id="username" type="text" placeholder="例如：student01" required>
            <button type="submit">进入系统</button>
          </form>
        </div>
      </section>
    `;
  }

  function layout() {
    return `
      <div class="workspace">
        <aside class="sidebar">
          <div>
            <p class="eyebrow">IMAGE SEED</p>
            <h1>摄影创作研究助手</h1>
          </div>
          <nav>
            ${routes.map(route => `
              <button class="${state.route === route.id ? 'active' : ''}" data-route="${route.id}">${route.label}</button>
            `).join('')}
          </nav>
          <div class="user-box">
            <span>当前用户</span>
            <strong>${escapeHtml(state.user.username)}</strong>
            <button data-logout>退出</button>
          </div>
        </aside>
        <section class="content">
          ${pageContent()}
        </section>
      </div>
    `;
  }

  function pageContent() {
    if (state.route === 'home') return homePage();
    if (state.route === 'analysis') return analysisPage();
    if (state.route === 'photographers') return photographersPage();
    if (state.route === 'books') return booksPage();
    if (state.route === 'favorites') return favoritesPage();
    if (state.route === 'history') return historyPage();
    return homePage();
  }

  function homePage() {
    const assets = core.getVisualAssets();
    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">主题研究入口</p>
          <h2>把一个摄影关键词变成可执行的创作方案</h2>
          <form id="researchForm" class="search-row">
            <input id="keywordInput" value="${escapeHtml(state.keyword)}" placeholder="输入摄影主题，例如：家庭记忆">
            <button type="submit">开始研究</button>
          </form>
          <div class="chips">
            ${['城市孤独', '家庭记忆', '夜间街头', '身体与空间', '乡村变迁', '青年亚文化'].map(item => `<button data-topic="${item}">${item}</button>`).join('')}
          </div>
        </div>
        <img src="${assets[0].file}" alt="${assets[0].label}">
      </section>
      <section class="workflow-band">
        ${['用户输入关键词', 'Coze大模型分析', '查询摄影师库', '查询摄影书库', '整合研究方案', '收藏与历史'].map((item, index) => `
          <article>
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${item}</strong>
          </article>
        `).join('')}
      </section>
      <section class="image-strip">
        ${assets.slice(1, 6).map(asset => `<img src="${asset.file}" alt="${asset.label}">`).join('')}
      </section>
    `;
  }

  function analysisPage() {
    const a = state.result.analysis;
    return `
      <header class="page-head">
        <div>
          <p class="eyebrow">AI创作分析</p>
          <h2>${escapeHtml(a.title)}</h2>
        </div>
        <button data-favorite="analysis">收藏方案</button>
      </header>
      <section class="analysis-grid">
        <article class="large-panel">
          <h3>创作概念</h3>
          <p>${escapeHtml(a.concept)}</p>
        </article>
        <article>
          <h3>创作方向</h3>
          <ol>${a.directions.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
        </article>
        <article>
          <h3>拍摄建议</h3>
          <ul>${a.shootingAdvice.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>
        <article>
          <h3>视觉元素</h3>
          <div class="tag-cloud">${a.visualElements.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        </article>
        <article>
          <h3>呈现方式</h3>
          <p>${escapeHtml(a.presentation)}</p>
        </article>
      </section>
    `;
  }

  function photographersPage() {
    return `
      <header class="page-head">
        <div>
          <p class="eyebrow">数据库推荐</p>
          <h2>相关摄影师</h2>
        </div>
      </header>
      <section class="cards">
        ${state.result.photographers.map(item => personCard(item)).join('')}
      </section>
    `;
  }

  function personCard(item) {
    return `
      <article class="data-card">
        <span>${escapeHtml(item.country)}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="muted">${escapeHtml(item.style)}</p>
        <p>${escapeHtml(item.intro)}</p>
        <button data-favorite="photographer" data-id="${item.id}">收藏摄影师</button>
      </article>
    `;
  }

  function booksPage() {
    return `
      <header class="page-head">
        <div>
          <p class="eyebrow">数据库推荐</p>
          <h2>相关摄影书</h2>
        </div>
      </header>
      <section class="cards">
        ${state.result.books.map(item => bookCard(item)).join('')}
      </section>
    `;
  }

  function bookCard(item) {
    return `
      <article class="data-card book">
        <span>${escapeHtml(item.theme)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="muted">${escapeHtml(item.author)}</p>
        <p>${escapeHtml(item.intro)}</p>
        <button data-favorite="book" data-id="${item.id}">收藏摄影书</button>
      </article>
    `;
  }

  function favoritesPage() {
    const favorites = readJson(storageKeys.favorites, []);
    return `
      <header class="page-head">
        <div>
          <p class="eyebrow">本地数据库模拟</p>
          <h2>收藏内容</h2>
        </div>
      </header>
      <section class="list-panel">
        ${favorites.length ? favorites.map(item => `
          <article>
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.type)} / ${escapeHtml(item.createdAt.slice(0, 10))}</span>
            <p>${escapeHtml(item.summary)}</p>
          </article>
        `).join('') : '<p class="empty">暂无收藏，先收藏一个方案、摄影师或摄影书。</p>'}
      </section>
    `;
  }

  function historyPage() {
    const history = readJson(storageKeys.history, []);
    return `
      <header class="page-head">
        <div>
          <p class="eyebrow">生成记录</p>
          <h2>历史记录</h2>
        </div>
      </header>
      <section class="list-panel">
        ${history.length ? history.map(item => `
          <article>
            <strong>${escapeHtml(item.keyword)}</strong>
            <span>${escapeHtml(item.createdAt.slice(0, 19).replace('T', ' '))}</span>
            <p>${escapeHtml(item.title)}</p>
          </article>
        `).join('') : '<p class="empty">暂无历史记录，在首页输入主题后会自动保存。</p>'}
      </section>
    `;
  }

  function runResearch(keyword) {
    state.keyword = keyword;
    state.result = core.buildStudyResult(keyword);
    const history = readJson(storageKeys.history, []);
    history.unshift({
      username: state.user.username,
      keyword,
      title: state.result.analysis.title,
      result: state.result.analysis,
      createdAt: new Date().toISOString()
    });
    writeJson(storageKeys.history, history.slice(0, 20));
    state.route = 'analysis';
    render();
  }

  function saveFavorite(type, id) {
    const favorites = readJson(storageKeys.favorites, []);
    let item;
    if (type === 'analysis') {
      item = {
        type,
        title: state.result.analysis.title,
        summary: state.result.analysis.concept
      };
    } else if (type === 'photographer') {
      const p = state.result.photographers.find(entry => String(entry.id) === String(id));
      item = { type, title: p.name, summary: `${p.country} / ${p.style}` };
    } else {
      const b = state.result.books.find(entry => String(entry.id) === String(id));
      item = { type, title: b.title, summary: `${b.author} / ${b.theme}` };
    }
    favorites.unshift({
      id: `fav-${Date.now()}`,
      username: state.user.username,
      createdAt: new Date().toISOString(),
      ...item
    });
    writeJson(storageKeys.favorites, favorites.slice(0, 30));
    state.route = 'favorites';
    render();
  }

  function bindEvents() {
    global.document.getElementById('loginForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const username = global.document.getElementById('username').value.trim();
      if (!username) return;
      state.user = { username };
      writeJson(storageKeys.user, state.user);
      state.route = 'home';
      render();
    });
    global.document.querySelectorAll('[data-route]').forEach(button => {
      button.addEventListener('click', () => {
        state.route = button.dataset.route;
        render();
      });
    });
    global.document.querySelector('[data-logout]')?.addEventListener('click', () => {
      global.localStorage.removeItem(storageKeys.user);
      state.user = null;
      state.route = 'login';
      render();
    });
    global.document.getElementById('researchForm')?.addEventListener('submit', event => {
      event.preventDefault();
      runResearch(global.document.getElementById('keywordInput').value.trim() || '城市孤独');
    });
    global.document.querySelectorAll('[data-topic]').forEach(button => {
      button.addEventListener('click', () => runResearch(button.dataset.topic));
    });
    global.document.querySelectorAll('[data-favorite]').forEach(button => {
      button.addEventListener('click', () => saveFavorite(button.dataset.favorite, button.dataset.id));
    });
  }

  render();
})(typeof window !== 'undefined' ? window : globalThis);
