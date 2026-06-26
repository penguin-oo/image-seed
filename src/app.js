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
    brief: {
      theme: '家庭记忆',
      location: '老小区和家中客厅',
      subject: '家人、旧物和居住空间',
      gear: '手机和微单',
      style: '家庭档案 / 纪实',
      duration: '3天',
      deliverable: '课程作业组图'
    },
    result: core.buildStudyResult({
      theme: '家庭记忆',
      location: '老小区和家中客厅',
      subject: '家人、旧物和居住空间',
      gear: '手机和微单',
      style: '家庭档案 / 纪实',
      duration: '3天',
      deliverable: '课程作业组图'
    }),
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
    const b = state.brief;
    return `
      <section class="hero">
        <div class="hero-copy">
          <p class="eyebrow">项目策划入口</p>
          <h2>输入真实拍摄条件，生成一份可执行的摄影计划</h2>
          <form id="researchForm" class="planner-form">
            <label>摄影主题<input name="theme" value="${escapeHtml(b.theme)}" placeholder="例如：家庭记忆" required></label>
            <label>拍摄地点<input name="location" value="${escapeHtml(b.location)}" placeholder="例如：老小区和家中客厅"></label>
            <label>拍摄对象<input name="subject" value="${escapeHtml(b.subject)}" placeholder="例如：家人、旧物和居住空间"></label>
            <label>器材<input name="gear" value="${escapeHtml(b.gear)}" placeholder="例如：手机和微单"></label>
            <label>影像风格
              <select name="style">
                ${['家庭档案 / 纪实', '街头摄影 / 黑白', '观念摄影 / 类型学', '城市景观 / 彩色', '私人影像 / 日记'].map(item => `<option ${item === b.style ? 'selected' : ''}>${item}</option>`).join('')}
              </select>
            </label>
            <label>拍摄周期
              <select name="duration">
                ${['1天', '3天', '1周', '2周'].map(item => `<option ${item === b.duration ? 'selected' : ''}>${item}</option>`).join('')}
              </select>
            </label>
            <label>交付形式
              <select name="deliverable">
                ${['课程作业组图', '小型摄影书', '展览墙', '作品集页面'].map(item => `<option ${item === b.deliverable ? 'selected' : ''}>${item}</option>`).join('')}
              </select>
            </label>
            <button type="submit">生成拍摄计划</button>
          </form>
          <div class="chips">
            ${['城市孤独', '家庭记忆', '夜间街头', '身体与空间', '乡村变迁', '青年亚文化'].map(item => `<button data-topic="${item}">${item}</button>`).join('')}
          </div>
        </div>
        <img src="${assets[0].file}" alt="${assets[0].label}">
      </section>
      <section class="workflow-band">
        ${['填写拍摄条件', '扣子自带大模型节点', '查询摄影师库', '查询摄影书库', '生成镜头清单', '收藏与历史'].map((item, index) => `
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
          <p class="eyebrow">扣子大模型工作流 / 本地演示</p>
          <h2>${escapeHtml(a.title)}</h2>
        </div>
        <button data-favorite="analysis">收藏方案</button>
      </header>
      <section class="brief-strip">
        ${[
          ['地点', a.brief.location],
          ['对象', a.brief.subject],
          ['器材', a.brief.gear],
          ['风格', a.brief.style],
          ['周期', a.brief.duration],
          ['交付', a.brief.deliverable]
        ].map(item => `<article><span>${item[0]}</span><strong>${escapeHtml(item[1])}</strong></article>`).join('')}
      </section>
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
      <section class="planner-output">
        <article>
          <h3>拍摄日程</h3>
          ${a.schedule.map(item => `<div class="timeline-row"><span>${escapeHtml(item.day)}</span><strong>${escapeHtml(item.task)}</strong><p>${escapeHtml(item.detail)}</p></div>`).join('')}
        </article>
        <article>
          <h3>12张成片清单</h3>
          <ol class="shot-list">${a.shotList.map(item => `<li><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.brief)}</span></li>`).join('')}</ol>
        </article>
        <article>
          <h3>现场工具包</h3>
          <div class="tag-cloud">${a.fieldKit.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>
        </article>
        <article>
          <h3>风险提醒</h3>
          <ul>${a.risks.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>
      </section>
      <section class="material-wall">
        <header>
          <p class="eyebrow">素材参考</p>
          <h3>真实摄影素材墙</h3>
        </header>
        <div>${state.result.assets.map(asset => `<figure><img src="${asset.file}" alt="${asset.label}"><figcaption>${asset.label}</figcaption></figure>`).join('')}</div>
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

  function runResearch(brief) {
    state.brief = { ...state.brief, ...brief };
    state.result = core.buildStudyResult(state.brief);
    const history = readJson(storageKeys.history, []);
    history.unshift({
      username: state.user.username,
      keyword: state.brief.theme,
      brief: state.brief,
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
      const form = new FormData(event.currentTarget);
      runResearch(Object.fromEntries(form.entries()));
    });
    global.document.querySelectorAll('[data-topic]').forEach(button => {
      button.addEventListener('click', () => runResearch({ theme: button.dataset.topic }));
    });
    global.document.querySelectorAll('[data-favorite]').forEach(button => {
      button.addEventListener('click', () => saveFavorite(button.dataset.favorite, button.dataset.id));
    });
  }

  render();
})(typeof window !== 'undefined' ? window : globalThis);
