
如果你经常写技术博客、做架构设计文档，或者需要快速出图，一定体会过这种纠结：脑子里有清晰的系统结构，但落到画图工具里就是另一回事了——要么在 draw.io 里拖拽半天，要么跟 Mermaid 的 DSL 语法较劲。

最近在 GitHub 上看到一个叫 **fireworks-tech-graph** 的项目，它是一个Skill，核心能力很简单：**你用中文描述系统，它几秒钟生成可直接发布的 SVG + PNG 技术图**。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/17/5b0b41f41c20393e8fc85d87b7154aa3.png)


## fireworks-tech-graph 概述

`fireworks-tech-graph` 将自然语言描述转化为精美的 SVG 技术图，并通过 `cairosvg`（推荐）导出高分辨率 PNG，同时支持 `rsvg-convert` 与 `puppeteer` 作为备选方案。内置 **7 种模板风格** + **1 种 AI 手绘风格（Dark Luxury）**，深度覆盖 AI/Agent 领域常见图类型（RAG、Agentic Search、Mem0、Multi-Agent、Tool Call 流程等），并完整支持全部 14 种 UML 图类型。

github 地址：[https://github.com/yizhiyanhua-ai/fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph)

该项目目前再github 上已有`7.8k` star



![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/17/670120364c2ab0d016638015f6c18baa.png)





## 解决了什么问题？

很多人写技术文档时都会遇到一个很现实的问题：图很重要，但画图本身特别耗时间。

常见痛点包括：

- 脑子里有结构，但落到图里很慢
- Mermaid 适合快速表达，但视觉效果和复杂结构承载能力有限
- draw.io 虽然强，但手工拖拽成本高，不适合频繁改稿
- 当图要服务于 AI、Agent、RAG、Memory 这类新领域时，通用绘图工具缺少现成语义

fireworks-tech-graph 的价值在于：把“描述系统”直接转成“生成图”，而且不只是出 SVG，还能直接导出适合博客和文档嵌入的 PNG。

## 怎么用？

安装这个 Skill 只需要一行命令：

```bash
npx skills add yizhiyanhua-ai/fireworks-tech-graph
```

或者下载项目之后直接导入到你的AI 工具中

### 安装依赖

要导出 PNG，需要安装一个底层依赖。

- npm 安装

```bash
# 最高保真：puppeteer（真实 Chromium，体积较大）
npm install puppeteer
```

- pip 安装

```bash
# 推荐：cairosvg（CSS 支持最好）
pip install cairosvg
```

装完之后，直接在对话里用自然语言描述就行：

```txt
帮我话一张 github 开源项目https://github.com/yizhiyanhua-ai/fireworks-tech-graph     fireworks-tech-graph 工作流程图，使用中文，导出png
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/17/f19b05090961cc7ef51a245432e635c2.png)


Skill 会自动识别图类型、选定风格、生成 SVG，然后导出 1920px 的高清 PNG。

## 不只是“自动画图”

这个项目有几个设计上的亮点，让它区别于普通的绘图工具。

### 8 种视觉风格

它内置了 8 套精心设计的样式，不是统一画风，而是能根据使用场景切换。

| 风格 | 特点 | 适用场景 |
|------|------|----------|
| 扁平图标风 | 白底，彩色强调色 | 博客、技术文档 |
| 暗黑极客风 | 深色背景，霓虹配色 | GitHub README、开发者文章 |
| 工程蓝图风 | 深蓝底，网格线，青色描边 | 架构设计文档 |
| Notion 极简风 | 白底，单色箭头 | Notion、Confluence Wiki |
| 玻璃态卡片风 | 深色渐变，磨砂玻璃 | 产品官网、演讲 Keynote |
| Claude 官方风格 | 温暖奶油色背景 | Anthropic 风格图表 |
| OpenAI 官方风格 | 纯白背景，品牌配色 | OpenAI 风格图表 |
| 暗黑奢华风 | 深黑背景，香槟金点缀 | 展示型架构图 |

### 14 种图类型 + 完整 UML 支持

这个 Skill 不是简单模板替换，它会先对用户描述做图类型归类，然后应用对应的布局规则。

支持的图类型包括：架构图、数据流图、流程图、Agent 架构图、Memory 架构图、时序图、对比矩阵、时间线、思维导图。
<br>
<br>

| 类型 | 描述 | 关键布局规则 |
|------|------|-------------|
| **架构图** | 服务、组件、云基础设施 | 水平分层，自上而下 |
| **数据流图** | 数据在系统中的流向 | 每条箭头标注数据类型 |
| **流程图** | 决策树、流程步骤 | 菱形 = 决策，自上而下 |
| **Agent 架构图** | LLM + 工具 + 记忆 | 五层模型：输入/Agent/记忆/工具/输出 |
| **记忆架构图** | Mem0、MemGPT 风格 | 读/写路径分离，记忆层级分明 |
| **序列图** | API 调用链、时序交互 | 垂直生命线，水平消息箭头 |
| **对比图** | 功能矩阵、方案比较 | 列 = 系统，行 = 属性 |
| **思维导图** | 概念地图、发散思维 | 中心节点，贝塞尔曲线分支 |


<br>
<br>
完整的 14 种 UML 图（类图、组件图、部署图、包图、用例图、活动图、状态机图、序列图等）
<br>
<br>

| UML 类型 | 描述 | 推荐风格 |
|----------|------|----------|
| **类图** | 类、属性、方法、关系 | 风格 1, 4 |
| **组件图** | 软件组件和依赖关系 | 风格 1, 3 |
| **部署图** | 硬件节点和软件部署 | 风格 3 |
| **包图** | 包组织和依赖关系 | 风格 1, 4 |
| **复合结构图** | 类/组件的内部结构 | 风格 1, 3 |
| **对象图** | 对象实例和关系 | 风格 1, 4 |
| **用例图** | 参与者、用例、系统边界 | 风格 1 |
| **活动图** | 工作流、并行流程 | 风格 3 |
| **状态机图** | 状态转换和事件 | 风格 2, 3 |
| **序列图** | 时间顺序的消息交换 | 风格 2 |
| **通信图** | 对象交互和消息 | 风格 1, 2 |
| **时序图** | 状态随时间的变化 | 风格 2 |
| **交互概览图** | 高层交互流程 | 风格 1, 2 |
| **ER 图** | 实体关系数据模型 | 风格 1, 3 |

### AI/Agent 领域内建知识

对于 AI/Agent 相关场景，它内置了领域模式识别能力。RAG Pipeline、Agentic Search、Mem0 记忆架构、Multi-Agent 协作、Tool Call 流程这些常见 Pattern，不需要从零描述，直接说场景就能生成对应的领域图。

它还定义了一套语义形状词汇表：LLM 用双边框圆角矩形，Agent 用六边形，Vector Store 用带内环圆柱体；箭头颜色和虚线样式编码了写入、读取、异步、循环等语义。

### 输出与验证工具链

它提供了四个辅助脚本，让整个生成流程更稳定：

- `generate-diagram.sh`：验证 SVG 并导出 PNG
- `generate-from-template.py`：从模板快速创建起始 SVG
- `validate-svg.sh`：单独校验 SVG 语法
- `test-all-styles.sh`：批量测试所有风格



## 谁适合用？

- 经常写技术博客、产品文档、方案文档的人
- 经常需要画架构图、流程图、Agent 图，但不想每次都手动画的人
- 做 AI / Agent / RAG / Memory 相关内容输出的人
- 希望把“描述需求 → 生成图 → 嵌入文章”这条链路尽量标准化的人

## 写在最后

`fireworks-tech-graph`它把技术图这件事，从一次性手工劳动，变成了一种可以沉淀、复用、批量生成的 Skill 能力。在 AI/Agent 相关内容越来越多的背景下，这是一个很值得试一下的项目。