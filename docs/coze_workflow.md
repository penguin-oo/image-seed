# Image Seed Coze 工作流设计

## 使用说明

本项目按课程要求保留“AI 大模型 + 数据库 + 工作流 + UI 界面”的完整结构。根据当前提交要求，本地 Web 页面不调用 DeepSeek 或其他外部 API，也不写入 API Key；AI 分析结果由 `src/core.js` 中的本地规则模拟。Coze 用于展示和说明可视化工作流节点设计，后续登录扣子工作台后可按本文件和 `coze_workflow_config.json` 直接搭建。

已尝试使用用户提供的 `www.coze.cn` cookie 进入扣子：可以访问 Coze 开放平台 Playground 和工作流/数据库接口说明；点击“创建”进入资源工作台时跳转到火山引擎登录页，需要手机号验证码或账号密码二次登录。因此当前交付中提供完整 Coze 工作流配置和搭建说明，不伪造已保存的线上工作流。

## 工作流名称

摄影创作研究助手 Image Seed Workflow

## 工作流定位

用户输入摄影主题关键词后，工作流生成摄影项目策划方案，并从摄影师库、摄影书库中查询相关参考资料，最后整合为可展示、可收藏、可记录历史的研究结果。

## 输入变量

| 变量 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `keyword` | string | 是 | 摄影主题关键词，例如“城市孤独”“家庭记忆”“夜间街头” |
| `username` | string | 否 | 用户名，用于收藏和历史记录归属 |

## 节点设计

1. 开始节点
   - 接收 `keyword` 和 `username`。

2. 大模型分析节点
   - 输入：`keyword`
   - 输出：项目标题、创作概念、创作方向、拍摄建议、视觉元素、呈现方式。
   - 本地演示版不调用外部 API，Coze 平台搭建时可使用平台内大模型节点。

3. 摄影师数据库查询节点
   - 查询表：`photographers`
   - 匹配字段：`style`、`keywords`、`intro`
   - 返回数量：3-5 位摄影师。

4. 摄影书数据库查询节点
   - 查询表：`photo_books`
   - 匹配字段：`title`、`theme`、`intro`
   - 返回数量：3-5 本摄影书。

5. 结果整合节点
   - 将 AI 分析、摄影师推荐、摄影书推荐组合为结构化 JSON。

6. 历史记录节点
   - 写入表：`history_records`
   - 保存用户名、关键词、生成结果和时间。

7. 输出节点
   - 输出完整摄影创作研究方案。

## 大模型提示词

```text
你是摄影创作研究助手。请根据用户输入的摄影主题关键词，生成一个适合课程项目的摄影创作研究方案。

用户关键词：{{keyword}}

请输出：
1. 项目标题
2. 创作概念
3. 三个创作方向
4. 拍摄建议
5. 可参考视觉元素
6. 呈现方式建议

要求：
- 语言专业但易懂
- 不要空泛
- 适合摄影创作课程作业
- 输出结构清晰
```

## 输出结构

```json
{
  "analysis": {
    "title": "项目标题",
    "concept": "创作概念",
    "directions": [],
    "shootingAdvice": [],
    "visualElements": [],
    "presentation": "呈现方式"
  },
  "photographers": [],
  "books": []
}
```

## 对应项目文件

- 工作流配置：`docs/coze_workflow_config.json`
- MySQL 数据库：`database/image_seed.sql`
- 本地 AI 风格分析逻辑：`src/core.js`
- Web UI：`index.html`、`styles.css`、`src/app.js`
