

如果你曾经让 AI 帮你做 PPT，大概率收获过这样的作品：配色辣眼睛、排版像 2003 年的 Word 艺术字、动画恨不得把所有特效都来一遍。

这不是 AI 的错——是它手里没有趁手的“兵器”。

今天介绍的这个开源项目 **html-ppt-skill**，就是专门解决这个问题的。它不是一个简单的模板库，而是一套完整的 **AgentSkill**，让 Claude Code、Cursor、OpenClaw 这类 AI 助手，真正理解怎么做出一份“能打”的 HTML 演示文稿。
![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/8ebbdd93f070819caf79044dc47114f2.png)




## 项目介绍

一款专业级的 AgentSkill，让 AI 做出真正能打的 HTML 演示文稿。 36 套主题、15 套完整 deck 模板、31 种页面布局、47 个动效 (27 个 CSS + 20 个 Canvas FX)，加上全新的 演讲者模式 —— 像素级 完美预览 + 逐字稿提词器 + 计时器。纯静态 HTML/CSS/JS，无需构建。

该项目在github 上已有 `5.4k` star

github地址: [https://github.com/lewislulu/html-ppt-skill](https://github.com/lewislulu/html-ppt-skill)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/e7f0fb5c95e29f19a99b741ce4c7ce73.png)


项目结构

```
html-ppt-skill/
├── SKILL.md                      agent 入口
├── README.md                     英文 README
├── README.zh-CN.md               本文件
├── references/                   详细文档
│   ├── themes.md                 36 主题 + 使用场景
│   ├── layouts.md                31 布局
│   ├── animations.md             27 CSS + 20 FX 目录
│   ├── full-decks.md             15 完整 deck 模板
│   ├── presenter-mode.md         🎤 演讲者模式 + 逐字稿指南
│   └── authoring-guide.md        完整工作流
├── assets/
│   ├── base.css                  共享 tokens + 基础组件
│   ├── fonts.css                 web 字体引入
│   ├── runtime.js                键盘导航 + 演讲者模式 + 总览
│   ├── themes/*.css              36 主题 token 文件
│   └── animations/
│       ├── animations.css        27 个命名 CSS 动画
│       ├── fx-runtime.js         进入 slide 自动初始化 [data-fx]
│       └── fx/*.js               20 个 Canvas FX 模块
├── templates/
│   ├── deck.html                 最小起步模板
│   ├── theme-showcase.html       iframe 隔离的主题 tour
│   ├── layout-showcase.html      全部 31 布局
│   ├── animation-showcase.html   47 动画 slide
│   ├── full-decks-index.html     15 deck gallery
│   ├── full-decks/<name>/        15 个 scoped 多页 deck 模板
│   └── single-page/*.html        31 个布局文件（带示例数据）
├── scripts/
│   ├── new-deck.sh               脚手架
│   ├── render.sh                 headless Chrome → PNG
│   └── verify-output/            56 张自测截图
└── examples/demo-deck/           完整可运行的示例 deck
```


## 一行命令，AI 瞬间拥有设计能力

安装简单到离谱：

```bash
npx skills add https://github.com/lewislulu/html-ppt-skill
```

或者下载项目直接导入到skills中。

装完之后，你的 AI 助手就掌握了这些能力：

- **36 套专业主题**——从极简白到赛博朋克，从学术论文到小红书图文
- **15 套完整 deck 模板**——投资人 pitch、产品发布、技术分享、周报……
- **31 种单页布局**——封面、目录、两栏、三栏、大引用、数据仪表盘、代码块……
- **47 个动效**——27 个 CSS 动画 + 20 个 Canvas 电影级特效

对 AI 说一句话，它就能给你一套完整的 HTML 幻灯片：

> “做一份 8 页的技术分享 slides，用 cyberpunk 主题”
> “把这段 outline 变成投资人 pitch deck”
> “做一个小红书图文，9 张，白底柔和风”

## 杀手级功能：演讲者模式

这是我最喜欢的新功能。在任何 deck 里按一下 `S` 键，就会弹出一个独立的演讲者窗口，包含 **4 个可拖拽、可调整大小的磁吸卡片**：

- 当前页预览
- 下一页预览
- 逐字稿
- 计时器

两个窗口通过 `BroadcastChannel` 双向同步翻页，完全零延迟。

更妙的是，预览卡片用的是 **`<iframe>` 加载同一份 HTML 文件**，只是加了 `?preview=N` 参数。这意味着预览看到的 CSS、主题、字体、排版，和观众看到的**像素级一致**——不会出现“预览好看，投出来崩了”的尴尬。

翻页时通过 `postMessage` 通知 iframe 切换 `.is-active` class，**不重新加载、不白屏、不闪烁**。

逐字稿部分也有讲究：每页 150–300 字，约 2–3 分钟的演讲节奏；用口语不用书面语；关键词加粗，过渡句独立成段。这不是让你照着念的讲稿，而是**提示信号**。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/bbb4e42ac3506733fb3a5b5df8b2d9ee.png)


## 36 套主题，每一套都有态度

这个项目的主题不是随便调几个颜色就完事。每一套都有明确的设计语言和使用场景：

- `minimal-white`——极简白，适合任何场合
- `cyberpunk-neon`——赛博霓虹，技术分享利器
- `xiaohongshu-white`——小红书白底杂志风
- `academic-paper`——学术论文风格，参考文献排版极工整
- `pitch-deck-vc`——投资人 pitch，数据突出
- `terminal-green`——终端绿，极客最爱

每个主题都是一份纯 CSS token 文件，换一行 `<link>` 就能给整份 deck 换皮。在 `theme-showcase.html` 里可以用 iframe 隔离的方式预览全部 36 套——每个预览都是真实的渲染结果，不是截图，不是色卡。

## 15 套完整 deck 模板，开箱即用

模板分为两类：

**从真实作品提炼的视觉语言（8 套）**：小红书白底杂志风、暗底+力导向知识图谱、蓝图/架构图风、终端 cyberpunk 风、紫色渐变卡、红/琥珀警示风、柔和马卡龙图文、方向键极简导航。

**通用场景脚手架（7 套）**：投资人 pitch、产品发布会、技术分享、周报、小红书图文（9 页 3:4）、教学模块，以及一套专门为演讲者模式设计的完整分享模板——**每一页都带 150–300 字的示例逐字稿**。

每个模板都是自包含的文件夹，用 scoped 的 CSS class，多个模板可以同时加载而不会互相污染。

## 31 种单页布局 + 47 个动效

布局库覆盖了 PPT 几乎所有的常见需求：封面、目录、章节分隔、项目符号、两栏/三栏、大引用、数据高亮、KPI 网格、表格、代码块、终端、流程图、时间线、路线图、思维导图、对比、优劣势、待办清单、甘特图、图片墙、各种图表、架构图、步骤图、CTA、致谢……

每个布局都带真实的示例数据，拖进 deck 立即看得到效果。

动效分成两层：**CSS 动画**负责轻量入场（淡入、弹入、打字机、霓虹光晕、流光、3D 翻转……），**Canvas FX** 负责电影级特效（粒子爆发、彩带、烟花、星空、代码雨、力导向知识图谱、神经网络脉冲、星座连线……）。进入 slide 时由 `fx-runtime.js` 自动初始化，不需要手动写一行代码。

## 零构建，纯静态

整个项目就是一套 HTML/CSS/JS 文件，没有 webpack、没有 npm build、没有依赖地狱。字体走 Google Fonts CDN，代码高亮用 highlight.js，图表用 Chart.js（都是可选）。打开就能跑，改完就能用。

键盘快捷键也很完整：`← →` 翻页、`F` 全屏、`S` 演讲者模式、`N` 底部 notes、`O` 总览网格、`T` 切换主题、`A` 循环演示动画、`#/N` 深链到指定页。

## 适合谁用？

- **AI 工具使用者**——让 Claude Code、Cursor 帮你做 PPT，而不是你自己从头写 HTML
- **技术演讲者**——需要一套干净、可控、可定制的幻灯片方案，不想碰 Keynote 或 PowerPoint
- **开发者**——想给自己的项目做一套好看的演示文稿，但又不想花时间调 CSS
- **内容创作者**——做小红书图文、产品宣发页、知识卡片


## 使用示例

以下是我使用workbuddy 生成并导出的图片


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/46551872374ef2ae29e7ce816a23f418.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/e78a627b44256c58fb029e6105d41aaa.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/4b500d9a79cdf9fee77f9cc23e9abeff.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/76a9cee59f5e0de2cd4e35b9a52b492a.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/91bf8225af7734ccd21dd25522b3d0f2.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/e7076a815b429b841fed2bf6c4357351.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/f56c3d85bf7cff34cbbe1712ac529360.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/d8033ce54e8d579ee7d0b44772701c60.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/c765d8107cf2fb6e4b23a13ab3677661.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/02/5fc6b8052e7ebc6331543ccaaa87f644.png)




## 写在最后

html-ppt-skill 打动我的地方在于：它不是一套“够用就行”的模板，而是一个**有设计态度**的Skills。字号规律、间距节奏、渐变、卡片处理——每一处都有资深设计师的默认值。你永远不会看到“PowerPoint 2006”那种味道的东西。



