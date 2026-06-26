# 摄影创作研究助手 Image Seed

这是《人工智能模型应用实践》课程项目。系统面向摄影创作前期研究，用户填写摄影主题、拍摄地点、拍摄对象、器材、影像风格、周期和交付形式后，页面生成一份可执行的摄影项目策划方案，并结合摄影师库、摄影书库和真实摄影素材给出参考资料。

本课程作业版不在本地网页中调用真实外部 API，也不写入 API Key。AI 分析由本地规则模拟，Coze 工作流文档按“扣子自带大模型节点 + 数据库查询 + 结果整合”的结构设计，登录扣子后可按配置搭建。

## 功能

- 登录页：输入用户名进入系统
- 首页：多字段摄影项目策划器，支持主题、地点、对象、器材、风格、周期、交付形式
- AI 分析结果页：展示标题、创作概念、方向、拍摄建议、视觉元素和呈现方式
- 拍摄执行页内容：生成拍摄日程、12 张成片清单、现场工具包和风险提醒
- 摄影师推荐页：展示数据库匹配摄影师
- 摄影书推荐页：展示数据库匹配摄影书
- 收藏页：使用浏览器 localStorage 模拟收藏表
- 历史记录页：使用浏览器 localStorage 模拟历史记录表
- 素材墙：展示项目内真实摄影相关图片素材

## 数据库

数据库文件：

```text
database/image_seed.sql
```

包含：

- `photographers`：20 条摄影师测试数据
- `photo_books`：20 条摄影书测试数据
- `favorites`：收藏表
- `history_records`：历史记录表，保存关键词、项目 brief 和生成结果

## Coze 工作流

工作流说明：

```text
docs/coze_workflow.md
docs/coze_workflow_config.json
```

Coze 设计使用“扣子自带大模型节点 - 摄影项目策划”，输入完整摄影项目 brief，输出创作方案、拍摄日程、成片清单、风险提醒和现场工具包。当前本地网页不依赖外部 API；课程展示时可按配置在 Coze 画布搭建。

已尝试使用用户提供的 Coze cookie 访问平台。当前可进入 Coze 开放平台 Playground，能够查看工作流、数据库等能力入口；点击创建资源时平台跳转到火山引擎登录页，需要账号二次登录后才能在画布中保存工作流。因此源码中提供完整工作流配置，不伪造已在线保存的工作流。

## 运行

公网访问：

```text
https://penguin-oo.github.io/image-seed/
```

直接打开：

```text
index.html
```

或启动本地静态服务：

```powershell
node server.cjs 8788 127.0.0.1
```

访问：

```text
http://127.0.0.1:8788/index.html
```

## 测试

```powershell
npm test
node --check src/core.js
node --check src/app.js
node --check server.cjs
```

## 素材来源

页面图片来自 Wikimedia Commons，来源记录见：

```text
assets/image_sources.json
```
