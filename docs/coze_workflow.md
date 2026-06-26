# Image Seed Coze 工作流设计

## 使用说明

本项目按课程要求保留“AI 大模型 + 数据库 + 工作流 + UI 界面”的完整结构。本地 Web 页面不写入 DeepSeek 或其他外部 API Key，课程演示页用 `src/core.js` 模拟与 Coze 工作流一致的结构化输出。

Coze/扣子平台部分采用“扣子自带大模型节点”，登录扣子工作台后可按本文件和 `coze_workflow_config.json` 搭建，不需要在本地网页接入真实大模型 API。

已尝试使用用户提供的 `www.coze.cn` cookie 进入扣子：可以访问 Coze 开放平台 Playground 和工作流、数据库能力说明；点击“创建”进入资源工作台时跳转到火山引擎登录页，需要手机号验证码或账号密码二次登录。因此当前交付中提供完整 Coze 工作流配置和搭建说明，不伪造已保存的线上工作流。

## 工作流名称

摄影创作研究助手 Image Seed Workflow

## 工作流定位

用户填写摄影主题、拍摄地点、拍摄对象、器材、风格、周期和交付形式后，工作流通过扣子自带大模型节点生成可执行的摄影项目策划方案，并从摄影师库、摄影书库中查询相关参考资料，最后整合为可展示、可收藏、可记录历史的研究结果。

## 输入变量

| 变量 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `theme` | string | 是 | 摄影主题，例如“家庭记忆”“城市孤独”“夜间街头” |
| `location` | string | 否 | 拍摄地点，例如“老小区和家中客厅” |
| `subject` | string | 否 | 拍摄对象，例如“家人、旧物和居住空间” |
| `gear` | string | 否 | 使用器材，例如“手机和微单” |
| `style` | string | 否 | 影像风格，例如“家庭档案 / 纪实” |
| `duration` | string | 否 | 拍摄周期，例如“3天” |
| `deliverable` | string | 否 | 交付形式，例如“课程作业组图” |
| `username` | string | 否 | 用户名，用于收藏和历史记录归属 |

## 节点设计

1. 开始节点
   - 接收 `theme`、`location`、`subject`、`gear`、`style`、`duration`、`deliverable` 和 `username`。

2. 扣子自带大模型节点 - 摄影项目策划
   - 输入：完整项目 brief。
   - 输出：项目标题、创作概念、创作方向、拍摄建议、视觉元素、呈现方式、拍摄日程、12 张成片清单、风险提醒、现场工具包。
   - 本地演示版不调用外部 API；Coze 平台搭建时选择扣子内置大模型节点即可。

3. 摄影师数据库查询节点
   - 查询表：`photographers`
   - 匹配字段：`style`、`keywords`、`intro`
   - 返回数量：5 位摄影师。

4. 摄影书数据库查询节点
   - 查询表：`photo_books`
   - 匹配字段：`title`、`theme`、`intro`
   - 返回数量：5 本摄影书。

5. 结果整合节点
   - 将大模型分析、摄影师推荐、摄影书推荐和素材资源组合为结构化 JSON。

6. 历史记录节点
   - 写入表：`history_records`
   - 保存用户名、关键词、项目 brief、生成结果和时间。

7. 输出节点
   - 输出完整摄影创作研究方案。

## 大模型提示词

```text
你是摄影创作研究助手 Image Seed。请根据用户填写的摄影项目 brief，生成一个适合课程作业和真实拍摄执行的摄影创作研究方案。

主题：{{theme}}
拍摄地点：{{location}}
拍摄对象：{{subject}}
器材：{{gear}}
影像风格：{{style}}
拍摄周期：{{duration}}
交付形式：{{deliverable}}

请输出以下结构：
1. 项目标题
2. 创作概念
3. 三个创作方向
4. 至少四条拍摄建议
5. 可参考视觉元素
6. 呈现方式建议
7. 拍摄日程
8. 12 张成片清单，每张说明拍摄内容
9. 风险提醒
10. 现场工具包

要求：
- 语言专业但易懂
- 计划必须具体可执行
- 不要只写空泛概念
- 适合摄影创作课程作业
- 输出结构清晰，便于页面展示
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
    "presentation": "呈现方式",
    "schedule": [],
    "shotList": [],
    "risks": [],
    "fieldKit": []
  },
  "photographers": [],
  "books": [],
  "assets": []
}
```

## 对应项目文件

- 工作流配置：`docs/coze_workflow_config.json`
- MySQL 数据库：`database/image_seed.sql`
- 本地 AI 风格分析逻辑：`src/core.js`
- Web UI：`index.html`、`styles.css`、`src/app.js`
