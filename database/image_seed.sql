CREATE DATABASE IF NOT EXISTS image_seed DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE image_seed;

DROP TABLE IF EXISTS history_records;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS photo_books;
DROP TABLE IF EXISTS photographers;

CREATE TABLE photographers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(60) NOT NULL,
  style VARCHAR(120) NOT NULL,
  keywords VARCHAR(255) NOT NULL,
  intro TEXT NOT NULL
);

CREATE TABLE photo_books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(160) NOT NULL,
  author VARCHAR(120) NOT NULL,
  theme VARCHAR(160) NOT NULL,
  intro TEXT NOT NULL
);

CREATE TABLE favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL,
  favorite_type VARCHAR(40) NOT NULL,
  favorite_content JSON NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE history_records (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(80) NOT NULL,
  keyword VARCHAR(120) NOT NULL,
  project_brief JSON NOT NULL,
  ai_result JSON NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO photographers (id, name, country, style, keywords, intro) VALUES
(1,'Henri Cartier-Bresson','法国','街头摄影 / 决定性瞬间','街头 城市 人物 观察 瞬间','以街头中的几何构图和瞬间捕捉著称，适合作为城市日常、公共空间与人物关系的参考。'),
(2,'Diane Arbus','美国','人像摄影 / 社会边缘','人像 身份 身体 边缘 凝视','关注身份、差异和被观看关系，适合研究人物肖像、社会边缘和自我呈现。'),
(3,'Nan Goldin','美国','私人影像 / 亲密关系','家庭 记忆 私人 亲密 青年','以私人生活和亲密关系影像著称，适合家庭记忆、青年文化和情感叙事主题。'),
(4,'Alec Soth','美国','纪实摄影 / 公路叙事','乡村 旅途 孤独 美国 景观','将人物、地点和文本线索组织成缓慢叙事，适合地方变迁、孤独和地理记忆。'),
(5,'Rinko Kawauchi','日本','日常诗性 / 细节摄影','日常 光线 细节 生命 温柔','擅长从微小事物中建立诗性观看，适合日常生活、微观细节和情绪化影像。'),
(6,'Stephen Shore','美国','新彩色摄影 / 城市景观','城市 路边 建筑 彩色 日常','以平静、准确的彩色景观记录美国日常空间，适合城市街区和公共环境研究。'),
(7,'William Eggleston','美国','彩色摄影 / 日常物件','彩色 物件 南方 日常 空间','将普通物件和场景转化为具有形式感的彩色影像，适合物件叙事和地方气质。'),
(8,'Bernd & Hilla Becher','德国','类型学摄影 / 工业建筑','建筑 类型学 工业 档案 系列','以系统化拍摄工业建筑闻名，适合做系列化、档案化和类型学摄影项目。'),
(9,'Andreas Gursky','德国','大尺幅摄影 / 全球化景观','城市 消费 空间 秩序 人群','用宏观视角观察现代空间与社会结构，适合商业空间、群体秩序和消费景观。'),
(10,'Hiroshi Sugimoto','日本','观念摄影 / 时间','时间 海景 剧场 观念 极简','通过长曝光和极简结构讨论时间、观看和记忆，适合观念化摄影创作。'),
(11,'Sally Mann','美国','家庭影像 / 湿版摄影','家庭 童年 身体 记忆 南方','以家庭、身体和成长经验为核心，适合私人叙事、童年记忆和身体主题。'),
(12,'Daido Moriyama','日本','街头摄影 / 粗颗粒','街头 夜晚 黑白 城市 欲望','高反差、粗颗粒的城市街头影像适合夜间街头、都市经验和情绪化表达。'),
(13,'Martin Parr','英国','纪实摄影 / 消费文化','消费 旅游 家庭 日常 彩色','用幽默和强烈色彩观察现代生活，适合消费文化、假日场景和社会习惯。'),
(14,'Cindy Sherman','美国','观念人像 / 身份扮演','身份 扮演 女性 肖像 观念','通过自我扮演讨论影像中的身份建构，适合身份、角色和视觉叙事主题。'),
(15,'Zhang Xiao','中国','当代纪实 / 城乡变迁','中国 乡村 城市 变迁 生活','关注中国社会空间与日常经验，适合城乡变迁、地方生活和当代景观研究。'),
(16,'Lu Guang','中国','社会纪实 / 环境议题','纪实 环境 社会 工业 现实','长期关注环境和社会现实议题，适合污染、工业化和社会观察方向。'),
(17,'Vivian Maier','美国','街头摄影 / 自我观看','街头 人物 反射 自画像 城市','以街头观察和反射中的自我形象著称，适合城市漫游和自我观看主题。'),
(18,'Todd Hido','美国','夜景摄影 / 情绪空间','夜晚 房屋 孤独 郊区 光线','用夜间房屋、车窗和低照度营造心理空间，适合孤独、居住和情绪风景。'),
(19,'Gregory Crewdson','美国','电影感摄影 / 场景叙事','电影感 场景 夜晚 郊区 叙事','以精心布景和电影式灯光构建悬疑场景，适合叙事摄影和场面调度。'),
(20,'Susan Meiselas','美国','纪实摄影 / 档案叙事','纪实 档案 冲突 社会 女性','重视影像、文本和历史档案的关系，适合社会议题、档案组织和叙事研究。');

INSERT INTO photo_books (id, title, author, theme, intro) VALUES
(1,'The Americans','Robert Frank','公路纪实 / 美国社会','以旅行视角观察美国社会，是摄影书叙事和社会观察的重要参考。'),
(2,'Sleeping by the Mississippi','Alec Soth','公路叙事 / 人与地方','将人物、地点和线索组织为开放叙事，适合地方研究和摄影项目结构参考。'),
(3,'The Ballad of Sexual Dependency','Nan Goldin','私人影像 / 亲密关系','以亲密关系和个人生活为核心，适合家庭、青年文化和私人记忆主题。'),
(4,'Uncommon Places','Stephen Shore','城市景观 / 新彩色摄影','用彩色摄影记录日常空间，适合城市、路边景观和日常建筑研究。'),
(5,'William Eggleston Guide','William Eggleston','彩色日常 / 物件叙事','展示日常物件和空间的色彩秩序，适合作为彩色摄影语言参考。'),
(6,'Immediate Family','Sally Mann','家庭影像 / 童年','围绕家庭、成长和身体经验展开，适合私人生活和家庭记忆项目。'),
(7,'Ravens','Masahisa Fukase','情绪叙事 / 黑白摄影','以乌鸦意象构建孤独和失落的情绪线索，适合象征性视觉元素研究。'),
(8,'Farewell Photography','Daido Moriyama','街头摄影 / 粗颗粒','高反差影像挑战传统观看，适合城市夜晚、欲望和碎片化经验。'),
(9,'Evidence','Larry Sultan & Mike Mandel','档案摄影 / 观念','重新组织档案图像产生新意义，适合资料影像和观念摄影研究。'),
(10,'American Surfaces','Stephen Shore','日记式摄影 / 旅途','以日记方式记录旅途中的食物、旅馆和街景，适合连续性拍摄方法。'),
(11,'Exiles','Josef Koudelka','流亡 / 黑白纪实','用强烈黑白影像表现漂泊与身份，适合迁移、边界和孤独主题。'),
(12,'Suburbia','Bill Owens','郊区生活 / 家庭','记录郊区家庭和社区生活，适合居住空间、家庭仪式和社会观察。'),
(13,'Tokyo','Daido Moriyama','城市街头 / 夜间','以东京街头为对象，适合都市碎片、夜晚和黑白视觉语言。'),
(14,'The Photographer’s Eye','John Szarkowski','摄影观看 / 形式分析','从构图、时间、边框等角度分析摄影语言，适合写创作方法说明。'),
(15,'Camera Lucida','Roland Barthes','摄影理论 / 记忆','讨论照片、记忆和刺点，适合支撑家庭记忆和私人影像的理论部分。'),
(16,'On Photography','Susan Sontag','摄影理论 / 社会观看','讨论摄影与社会、消费和观看权力的关系，适合研究型项目引用。'),
(17,'The Decisive Moment','Henri Cartier-Bresson','街头摄影 / 瞬间','强调构图与瞬间的结合，适合街头拍摄和行动捕捉主题。'),
(18,'Hold Still','Sally Mann','回忆录 / 家庭档案','结合家庭档案和个人叙述，适合影像、文字和记忆材料的组织。'),
(19,'Pictures From Home','Larry Sultan','家庭关系 / 图文叙事','用家庭照片、访谈和文本重构亲子关系，适合家庭记忆项目。'),
(20,'Boring Postcards','Martin Parr','日常图像 / 消费文化','重新观看普通明信片，适合日常图像、消费文化和视觉档案研究。');
