

前不久我们项目验收，领导要求我整理一份代码结构及功能说明的Word文档。我借助 Cursor 只用了五分钟就生成好了内容，但在转换格式时却遇到了难题——尝试了好几个在线 Markdown 转 Word 的工具，导出的文档格式总是不尽如人意。

最近逛 GitHub 时，我偶然发现了一个叫 PasteMD 的开源项目。它是一款常驻系统托盘的小工具，能直接从剪贴板读取 Markdown 内容，通过 Pandoc 引擎转换为规范的 DOCX 格式，并自动插入到 Word 或 WPS 文档的光标位置，真正实现了“复制即粘贴，所见即所得”。

不知道你在写论文、做报告或者整理文档时，是否也曾为这些事头疼过：

从 ChatGPT、DeepSeek 等 AI 工具里复制出来的内容，一粘贴到 Word 里格式就全乱；

Markdown 表格怎么都粘贴不进 Excel，总是错位或丢失样式；

好好的数学公式，到了 Word 里却变成了一堆难以理解的 LaTeX 代码……

如果你也遇到过这些问题，那么 PasteMD 或许正是你一直在找的解决方案。

![](https://xiuji008.github.io/images/202601/pastemd-logo.png)

##  📚什么是PasteMD？

PasteMD是一个常驻系统托盘的小工具，它做了一件看似简单却极其实用的事情：**从剪贴板读取Markdown或网页内容，智能转换为Office文档格式，并自动插入到Word/WPS或Excel中**。

该项目目前github上的star⭐️情况 <img src="https://img.shields.io/github/stars/RICHQAQ/PasteMD" style="vertical-align: middle; display: inline-block; margin-right: 5px;">



github地址：[https://github.com/RICHQAQ/PasteMD](https://github.com/RICHQAQ/PasteMD)

文档地址：[https://pastemd.richqaq.cn/](https://pastemd.richqaq.cn/)

![](https://xiuji008.github.io/images/202601/pastemd-github.png)

![](https://xiuji008.github.io/images/202601/pastemd-doc.png)


## 🦆为什么你需要PasteMD？

### 1. AI对话内容一键规范化

现在大多数人尤其是客户都会在工作中用AI辅助写文档，但AI生成的Markdown内容直接粘贴到Word中效果很差。PasteMD通过强大的Pandoc引擎，将Markdown完美转换为DOCX格式，保持所有格式、样式甚至数学公式的完整性。

### 2. 解决核心md文档粘贴痛点

当你从 AI 网站复制带有 Markdown 格式的内容时，直接粘贴到 Word 会遇到：

- 数学公式乱码：$E=mc^2$ 变成普通文本，复杂公式完全不可读
- 格式丢失：粗体、斜体、代码块等格式全部消失
- 表格混乱：Markdown 表格粘贴后需要手动调整
- 代码显示问题：代码块没有语法高亮，显示混乱

**PasteMD 的解决方案**

1. 一键转换：按下热键（默认 Ctrl+Shift+B），自动完成转换和插入
2. 智能识别：自动判断剪贴板内容类型和当前应用
3. 格式完美：数学公式、代码块、表格等完美呈现
4. 无缝集成：内容直接插入到光标位置，无需手动操作

### 3. 全面兼容主流AI平台


| AI 网站 | 复制 Markdown<br/>（无公式） | 复制 Markdown<br/>（含公式） | 复制网页内容<br/>（无公式） | 复制网页内容<br/>（含公式） |
|---------|:----------------------------:|:----------------------------:|:---------------------------:|:---------------------------:|
| **Kimi** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ⚠️ 无法显示公式 |
| **DeepSeek** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **通义千问** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ⚠️ 无法显示公式 |
| **豆包\*** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **智谱清言<br/>/ChatGLM** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **ChatGPT** | ✅ 完美支持 | ⚠️ 公式显示为代码 | ✅ 完美支持 | ✅ 完美支持 |
| **Gemini** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **Grok** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |
| **Claude** | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 | ✅ 完美支持 |


## 🚀使用方法

1. 下载可执行文件（[Releases 页面：https://github.com/RICHQAQ/PasteMD/releases/](https://github.com/RICHQAQ/PasteMD/releases/)），之后点击安装即可。

![](https://xiuji008.github.io/images/202601/pastemd-release.png)

2. 打开 Word、WPS 或 Excel，光标放在需要插入的位置。

3. 复制 **Markdown** 或者 **网页内容** 到剪贴板，按下热键 **Ctrl+Shift+B**。

4. 转换结果会自动插入到文档中：
   - **Markdown 表格** → 自动粘贴到 Excel（如果 Excel 已打开）
   - **普通 Markdown**/**网页内容** → 转换为 DOCX 并插入 Word/WPS

5. 右下角会提示成功/失败。


- md转word

![](https://xiuji008.github.io/images/202601/pastemd-word.png)

- md转execl

![pastemd-execl.png](https://xiuji008.github.io/images/202601/pastemd-execl.png)

- html转word

![pastemd-html.png](https://xiuji008.github.io/images/202601/pastemd-html.png)

## 🌟 核心功能亮点

### 🎯 智能内容识别

自动识别剪贴板内容类型：

- Markdown 文本：标准 Markdown 语法
- HTML 富文本：从网页复制的内容
- Markdown 表格：自动识别并转换为 Excel
- .md 文件：从文件管理器复制的文件

### 📐 数学公式完美支持

- 支持行内公式：`$...$`
- 支持块级公式：`$$...$$`
- 自动修复常见 `LaTeX` 语法问题
- 兼容主流 AI 网站的公式格式

### 📊 表格格式保留

Excel 粘贴时完整保留：

- 粗体：**text**
- 斜体：*text*
- 删除线：~~text~~
- 行内代码：`code`
- 代码块：```code```
- 超链接：[text](url)

### 🎨 高度可定制

- 自定义全局热键
- 自定义样式模板（reference DOCX）
- 自定义 Pandoc 过滤器
- 自定义保存目录和文件保留策略
- 多语言支持（中文/英文）

### 🔄 智能兜底模式

当没有检测到目标应用时，可以：

- 自动打开：自动启动 Word 并插入内容
- 仅保存：保存为文件到指定目录
- 复制到剪贴板：转换为富文本复制到剪贴板
- 无操作：仅显示通知

## 🌿 结语

在AI辅助成为常态的今天，PasteMD填补了从AI对话到正式文档之间的最后一道鸿沟。它不仅仅是一个格式转换工具，更是提升工作效率的智能助手。

无论你是学生写论文，还是职场人士准备报告，PasteMD都能让你的写作流程更加顺畅。告别繁琐的格式调整，专注于内容创作本身。