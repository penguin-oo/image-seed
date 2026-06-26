const photographers = [
  { id: 1, name: 'Henri Cartier-Bresson', country: '法国', style: '街头摄影 / 决定性瞬间', keywords: '街头 城市 人物 观察 瞬间', intro: '以街头中的几何构图和瞬间捕捉著称，适合作为城市日常、公共空间与人物关系的参考。' },
  { id: 2, name: 'Diane Arbus', country: '美国', style: '人像摄影 / 社会边缘', keywords: '人像 身份 身体 边缘 凝视', intro: '关注身份、差异和被观看关系，适合研究人物肖像、社会边缘和自我呈现。' },
  { id: 3, name: 'Nan Goldin', country: '美国', style: '私人影像 / 亲密关系', keywords: '家庭 记忆 私人 亲密 青年', intro: '以私人生活和亲密关系影像著称，适合家庭记忆、青年文化和情感叙事主题。' },
  { id: 4, name: 'Alec Soth', country: '美国', style: '纪实摄影 / 公路叙事', keywords: '乡村 旅途 孤独 美国 景观', intro: '将人物、地点和文本线索组织成缓慢叙事，适合地方变迁、孤独和地理记忆。' },
  { id: 5, name: 'Rinko Kawauchi', country: '日本', style: '日常诗性 / 细节摄影', keywords: '日常 光线 细节 生命 温柔', intro: '擅长从微小事物中建立诗性观看，适合日常生活、微观细节和情绪化影像。' },
  { id: 6, name: 'Stephen Shore', country: '美国', style: '新彩色摄影 / 城市景观', keywords: '城市 路边 建筑 彩色 日常', intro: '以平静、准确的彩色景观记录美国日常空间，适合城市街区和公共环境研究。' },
  { id: 7, name: 'William Eggleston', country: '美国', style: '彩色摄影 / 日常物件', keywords: '彩色 物件 南方 日常 空间', intro: '将普通物件和场景转化为具有形式感的彩色影像，适合物件叙事和地方气质。' },
  { id: 8, name: 'Bernd & Hilla Becher', country: '德国', style: '类型学摄影 / 工业建筑', keywords: '建筑 类型学 工业 档案 系列', intro: '以系统化拍摄工业建筑闻名，适合做系列化、档案化和类型学摄影项目。' },
  { id: 9, name: 'Andreas Gursky', country: '德国', style: '大尺幅摄影 / 全球化景观', keywords: '城市 消费 空间 秩序 人群', intro: '用宏观视角观察现代空间与社会结构，适合商业空间、群体秩序和消费景观。' },
  { id: 10, name: 'Hiroshi Sugimoto', country: '日本', style: '观念摄影 / 时间', keywords: '时间 海景 剧场 观念 极简', intro: '通过长曝光和极简结构讨论时间、观看和记忆，适合观念化摄影创作。' },
  { id: 11, name: 'Sally Mann', country: '美国', style: '家庭影像 / 湿版摄影', keywords: '家庭 童年 身体 记忆 南方', intro: '以家庭、身体和成长经验为核心，适合私人叙事、童年记忆和身体主题。' },
  { id: 12, name: 'Daido Moriyama', country: '日本', style: '街头摄影 / 粗颗粒', keywords: '街头 夜晚 黑白 城市 欲望', intro: '高反差、粗颗粒的城市街头影像适合夜间街头、都市经验和情绪化表达。' },
  { id: 13, name: 'Martin Parr', country: '英国', style: '纪实摄影 / 消费文化', keywords: '消费 旅游 家庭 日常 彩色', intro: '用幽默和强烈色彩观察现代生活，适合消费文化、假日场景和社会习惯。' },
  { id: 14, name: 'Cindy Sherman', country: '美国', style: '观念人像 / 身份扮演', keywords: '身份 扮演 女性 肖像 观念', intro: '通过自我扮演讨论影像中的身份建构，适合身份、角色和视觉叙事主题。' },
  { id: 15, name: 'Zhang Xiao', country: '中国', style: '当代纪实 / 城乡变迁', keywords: '中国 乡村 城市 变迁 生活', intro: '关注中国社会空间与日常经验，适合城乡变迁、地方生活和当代景观研究。' },
  { id: 16, name: 'Lu Guang', country: '中国', style: '社会纪实 / 环境议题', keywords: '纪实 环境 社会 工业 现实', intro: '长期关注环境和社会现实议题，适合污染、工业化和社会观察方向。' },
  { id: 17, name: 'Vivian Maier', country: '美国', style: '街头摄影 / 自我观看', keywords: '街头 人物 反射 自画像 城市', intro: '以街头观察和反射中的自我形象著称，适合城市漫游和自我观看主题。' },
  { id: 18, name: 'Todd Hido', country: '美国', style: '夜景摄影 / 情绪空间', keywords: '夜晚 房屋 孤独 郊区 光线', intro: '用夜间房屋、车窗和低照度营造心理空间，适合孤独、居住和情绪风景。' },
  { id: 19, name: 'Gregory Crewdson', country: '美国', style: ' staged photography / 电影感', keywords: '电影感 场景 夜晚 郊区 叙事', intro: '以精心布景和电影式灯光构建悬疑场景，适合叙事摄影和场面调度。' },
  { id: 20, name: 'Susan Meiselas', country: '美国', style: '纪实摄影 / 档案叙事', keywords: '纪实 档案 冲突 社会 女性', intro: '重视影像、文本和历史档案的关系，适合社会议题、档案组织和叙事研究。' }
];

const photoBooks = [
  { id: 1, title: 'The Americans', author: 'Robert Frank', theme: '公路纪实 / 美国社会', intro: '以旅行视角观察美国社会，是摄影书叙事和社会观察的重要参考。' },
  { id: 2, title: 'Sleeping by the Mississippi', author: 'Alec Soth', theme: '公路叙事 / 人与地方', intro: '将人物、地点和线索组织为开放叙事，适合地方研究和摄影项目结构参考。' },
  { id: 3, title: 'The Ballad of Sexual Dependency', author: 'Nan Goldin', theme: '私人影像 / 亲密关系', intro: '以亲密关系和个人生活为核心，适合家庭、青年文化和私人记忆主题。' },
  { id: 4, title: 'Uncommon Places', author: 'Stephen Shore', theme: '城市景观 / 新彩色摄影', intro: '用彩色摄影记录日常空间，适合城市、路边景观和日常建筑研究。' },
  { id: 5, title: 'William Eggleston Guide', author: 'William Eggleston', theme: '彩色日常 / 物件叙事', intro: '展示日常物件和空间的色彩秩序，适合作为彩色摄影语言参考。' },
  { id: 6, title: 'Immediate Family', author: 'Sally Mann', theme: '家庭影像 / 童年', intro: '围绕家庭、成长和身体经验展开，适合私人生活和家庭记忆项目。' },
  { id: 7, title: 'Ravens', author: 'Masahisa Fukase', theme: '情绪叙事 / 黑白摄影', intro: '以乌鸦意象构建孤独和失落的情绪线索，适合象征性视觉元素研究。' },
  { id: 8, title: 'Farewell Photography', author: 'Daido Moriyama', theme: '街头摄影 / 粗颗粒', intro: '高反差影像挑战传统观看，适合城市夜晚、欲望和碎片化经验。' },
  { id: 9, title: 'Evidence', author: 'Larry Sultan & Mike Mandel', theme: '档案摄影 / 观念', intro: '重新组织档案图像产生新意义，适合资料影像和观念摄影研究。' },
  { id: 10, title: 'American Surfaces', author: 'Stephen Shore', theme: '日记式摄影 / 旅途', intro: '以日记方式记录旅途中的食物、旅馆和街景，适合连续性拍摄方法。' },
  { id: 11, title: 'Exiles', author: 'Josef Koudelka', theme: '流亡 / 黑白纪实', intro: '用强烈黑白影像表现漂泊与身份，适合迁移、边界和孤独主题。' },
  { id: 12, title: 'Suburbia', author: 'Bill Owens', theme: '郊区生活 / 家庭', intro: '记录郊区家庭和社区生活，适合居住空间、家庭仪式和社会观察。' },
  { id: 13, title: 'Tokyo', author: 'Daido Moriyama', theme: '城市街头 / 夜间', intro: '以东京街头为对象，适合都市碎片、夜晚和黑白视觉语言。' },
  { id: 14, title: 'The Photographer’s Eye', author: 'John Szarkowski', theme: '摄影观看 / 形式分析', intro: '从构图、时间、边框等角度分析摄影语言，适合写创作方法说明。' },
  { id: 15, title: 'Camera Lucida', author: 'Roland Barthes', theme: '摄影理论 / 记忆', intro: '讨论照片、记忆和刺点，适合支撑家庭记忆和私人影像的理论部分。' },
  { id: 16, title: 'On Photography', author: 'Susan Sontag', theme: '摄影理论 / 社会观看', intro: '讨论摄影与社会、消费和观看权力的关系，适合研究型项目引用。' },
  { id: 17, title: 'The Decisive Moment', author: 'Henri Cartier-Bresson', theme: '街头摄影 / 瞬间', intro: '强调构图与瞬间的结合，适合街头拍摄和行动捕捉主题。' },
  { id: 18, title: 'Hold Still', author: 'Sally Mann', theme: '回忆录 / 家庭档案', intro: '结合家庭档案和个人叙述，适合影像、文字和记忆材料的组织。' },
  { id: 19, title: 'Pictures From Home', author: 'Larry Sultan', theme: '家庭关系 / 图文叙事', intro: '用家庭照片、访谈和文本重构亲子关系，适合家庭记忆项目。' },
  { id: 20, title: 'Boring Postcards', author: 'Martin Parr', theme: '日常图像 / 消费文化', intro: '重新观看普通明信片，适合日常图像、消费文化和视觉档案研究。' }
];

const visualAssets = [
  { id: 'hero', file: 'assets/photos/hero-darkroom.jpg', label: '暗房研究场景' },
  { id: 'film', file: 'assets/photos/camera-film.jpg', label: '胶片与负片' },
  { id: 'contact', file: 'assets/photos/contact-sheet.jpg', label: '接触印样' },
  { id: 'book', file: 'assets/photos/photo-book.jpg', label: '摄影书资料' },
  { id: 'street', file: 'assets/photos/street-camera.jpg', label: '街头摄影师' },
  { id: 'archive', file: 'assets/photos/archive-table.jpg', label: '档案化影像' },
  { id: 'gallery', file: 'assets/photos/gallery-wall.jpg', label: '展览呈现' },
  { id: 'studio', file: 'assets/photos/portrait-studio.jpg', label: '摄影器材' },
  { id: 'negative', file: 'assets/photos/film-negative.jpg', label: '胶片包装' },
  { id: 'research', file: 'assets/photos/research-desk.jpg', label: '暗房工作台' }
];

const databaseSchema = {
  engine: 'MySQL 8.0',
  tables: {
    photographers: ['id', 'name', 'country', 'style', 'keywords', 'intro'],
    photo_books: ['id', 'title', 'author', 'theme', 'intro'],
    favorites: ['id', 'username', 'favorite_type', 'favorite_content', 'created_at'],
    history_records: ['id', 'username', 'keyword', 'ai_result', 'created_at']
  }
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function tokenize(keyword) {
  const base = String(keyword || '').trim();
  const map = {
    城市孤独: ['城市', '孤独', '夜晚', '街头', '空间'],
    家庭记忆: ['家庭', '记忆', '私人', '亲密', '童年'],
    夜间街头: ['夜晚', '街头', '城市', '黑白', '光线'],
    身体与空间: ['身体', '空间', '身份', '肖像', '观念'],
    乡村变迁: ['乡村', '变迁', '地方', '纪实', '中国'],
    青年亚文化: ['青年', '私人', '身份', '街头', '生活']
  };
  return [...new Set([base, ...(map[base] || base.split(/\s+|,|，/).filter(Boolean))])];
}

function scoreText(item, terms, fields) {
  const text = fields.map(field => item[field]).join(' ');
  return terms.reduce((total, term) => total + (text.includes(term) ? 3 : 0), 0) +
    terms.reduce((total, term) => total + (Array.from(term).some(char => text.includes(char)) ? 1 : 0), 0);
}

function recommendPhotographers(keyword, limit = 5) {
  const terms = tokenize(keyword);
  return photographers
    .map(item => ({ ...item, matchScore: scoreText(item, terms, ['style', 'keywords', 'intro']) }))
    .sort((a, b) => b.matchScore - a.matchScore || a.id - b.id)
    .slice(0, limit)
    .map(({ matchScore, ...item }) => item);
}

function recommendBooks(keyword, limit = 5) {
  const terms = tokenize(keyword);
  return photoBooks
    .map(item => ({ ...item, matchScore: scoreText(item, terms, ['title', 'author', 'theme', 'intro']) }))
    .sort((a, b) => b.matchScore - a.matchScore || a.id - b.id)
    .slice(0, limit)
    .map(({ matchScore, ...item }) => item);
}

function generateResearch(keyword) {
  const topic = String(keyword || '城市孤独').trim() || '城市孤独';
  const terms = tokenize(topic);
  const title = `《${topic}的影像研究计划》`;
  const concept = `本项目将“${topic}”转化为一个摄影创作研究主题，通过连续拍摄、资料收集和图像排序，观察个体经验与社会空间之间的关系。作品不追求单张照片的奇观，而强调一组图像如何共同建立情绪、线索和叙事节奏。`;
  const directions = [
    `围绕“${terms[1] || topic}”寻找可重复拍摄的场景，建立清晰的系列结构。`,
    `把人物、空间和物件作为三类线索，分别记录状态、环境和细节。`,
    `结合文字记录、地图或旧照片材料，让作品具有研究档案感。`
  ];
  const shootingAdvice = [
    '选择固定时间段拍摄，例如清晨、黄昏或夜间，保持光线气质一致。',
    '采用中景和近景交替的方式，让空间关系与细节信息同时出现。',
    '每次拍摄后进行小样筛选，记录保留理由，形成可复盘的创作日志。',
    '避免只拍“好看”的画面，优先捕捉能说明主题的动作、物件和环境痕迹。'
  ];
  const visualElements = ['窗口', '走廊', '背影', '反光', '旧照片', '路灯', '空椅子', '手写文字', '胶片颗粒', '墙面标记'];
  const presentation = '建议以 12-18 张组图、短文字说明和资料页组合呈现，可制作小型摄影书或展览墙。';
  return {
    usesExternalApi: false,
    workflowModel: 'Coze 大模型节点 / 课程演示工作流',
    keyword: topic,
    title,
    concept,
    directions,
    shootingAdvice,
    visualElements,
    presentation,
    generatedAt: new Date().toISOString()
  };
}

function buildStudyResult(keyword) {
  const analysis = generateResearch(keyword);
  return {
    analysis,
    photographers: recommendPhotographers(keyword),
    books: recommendBooks(keyword),
    assets: getVisualAssets().slice(0, 6)
  };
}

function getPhotographers() {
  return clone(photographers);
}

function getPhotoBooks() {
  return clone(photoBooks);
}

function getVisualAssets() {
  return clone(visualAssets);
}

function getDatabaseSchema() {
  return clone(databaseSchema);
}

const api = {
  getPhotographers,
  getPhotoBooks,
  getVisualAssets,
  getDatabaseSchema,
  generateResearch,
  recommendPhotographers,
  recommendBooks,
  buildStudyResult
};

if (typeof window !== 'undefined') {
  window.ImageSeedCore = api;
}

if (typeof module !== 'undefined') {
  module.exports = api;
}
