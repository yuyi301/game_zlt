# 失序法则（Disorder Protocol）- 可拓展游戏原型

本仓库提供一个可直接在浏览器运行的 2D 原型游戏，包含：

- **主角**：小羽（可配置角色）
- **系统化架构**：内容、战斗、事件、渲染、状态管理解耦
- **公司子 Agent 代理机制**：以“游戏公司 CEO 指挥下的部门 Agent”组织开发职责
- **AI 资产生产脚本**：通过 OpenAI Images API 按提示词生成透明背景 PNG

## 快速开始

1. 启动静态文件服务：

   ```bash
   cd web
   python -m http.server 8000
   ```

2. 浏览器打开：

   ```
   http://localhost:8000
   ```

## 目录结构

- `docs/`：CEO 视角说明与需求落地记录
- `web/`：前端游戏程序
  - `src/core/`：核心引擎（状态、事件总线、场景）
  - `src/systems/`：可插拔游戏系统
  - `src/content/`：剧情、角色、敌人、技能等数据
  - `src/agents/`：子 Agent 开发代理定义
  - `assets/`：图片资源（透明背景）
- `tools/`：AI 资源生成脚本

## 资源生成（透明背景）

```bash
export OPENAI_API_KEY=your_key
python tools/generate_assets.py
```

脚本会把图片写入 `web/assets/generated/`，并尽量保证透明背景。

## 扩展建议

- 在 `web/src/content/gameContent.js` 增加新章节与敌人池
- 新系统直接在 `web/src/systems/` 增加文件并注册到 `GameEngine`
- 新 UI 模块可在 `web/src/main.js` 中监听 `store.subscribe` 挂接
