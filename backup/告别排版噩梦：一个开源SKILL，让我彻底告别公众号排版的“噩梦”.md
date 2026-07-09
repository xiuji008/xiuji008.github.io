
每次写完文章，最烦的就是调格式。

Markdown 转成公众号代码不难，但转出来“能用”和“好看”之间，隔着一整个下午的微调——字号、行距、颜色、编号、引用卡片、代码块缩进……每篇文章都要重新来一遍，费时费力，而且效果全凭运气。

直到前两天在 GitHub 上刷到了这个项目，试了一下，决定安利给每一位被公众号排版折磨过的朋友。





![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/09/5ae35107e5b8b1bbc6e4b82a1fcf498f.png)




## 是什么

**gzh-design-skill**，一个专门为公众号排版设计的 Skill，面向 AI Agent（如 Claude Code、Codex、Cursor 等）使用。

你写完 Markdown，它按你选的主题，生成样式**全内联**的 HTML——粘贴到公众号编辑器后**格式不丢、样式不掉**。自动编章节号、标关键词下划线、配引言卡与目录、处理代码块和图片、合并作者签名，并用校验脚本兜住公众号平台的各种坑。

一句话总结：**你只管写内容，排版交给它。**

核心能力就一条：生成的 HTML 粘贴进公众号后台，**样式完整保留**，告别反复复制粘贴、一点点调的噩梦。

而它背后也不是套个模板就完事——组件库、校验脚本、主题体系，全都做了工程化封装。



GitHub 地址：  
[https://github.com/isjiamu/gzh-design-skill](https://github.com/isjiamu/gzh-design-skill)

目前已经收获了 **1.7k Star**，热度还在涨。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/09/ada0036a47137ef99c99e73d0035472a.png)



## 六套主题，覆盖绝大多数文章风格

内置 6 套精选主题，基本覆盖公众号常见的内容类型：

- **摸鱼绿**（默认）：教程、测评、清单、工具盘点  
- **红白色系**：深度分析、观点、力量感话题  
- **石墨极简风**：设计、科技评论、专业观点  
- **留白禅意风**：禅意、极简生活、深度随笔  
- **摸鱼票据风**：工具对比、创意评测  
- **橄榄手记**：内刊手记、深度评测、案例复盘  

每套主题都不是简单换个色，而是从标题、正文、引用、代码块到卡片样式都做了统一设计。选好主题，AI 自动按组件库装配，排版气质稳定、不飘。

如果你有自己的风格偏好，还可以用内置的**主题生成器**——一句话描述或上传一张参考图，AI 就能生成一套全新主题，存下来反复用。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/09/29bde79010df10a3909871cff1e98d2b.png)


## 为什么值得一试？

**格式不掉，粘贴即用**  
所有样式全内联，文字用 `<span leaf="">` 包裹，专门针对公众号编辑器限制做了适配。复制过去，不会散架。

**不挑模型，国产也能跑**  
排版逻辑沉淀在组件库和校验脚本里，不依赖特定模型。Claude、GPT、Gemini 能跑，DeepSeek、Kimi、通义千问、智谱 GLM 也都能跑出一致的效果。

**双关卡校验，确定性兜底**  
生成后自动校验，ERROR 清零才交付。不靠模型“记性好”，靠脚本查得出来。



## 快速开始

### 方式一：一行命令安装（推荐）

```bash
npx skills add https://github.com/isjiamu/gzh-design-skill
```

### 方式二：让 AI 自己装

对任意 Agent（Claude Code / Codex / Cursor 等）说一句：

> 请帮我查找并自动安装 https://github.com/isjiamu/gzh-design-skill 这个 skill

它会自行 clone 到对应 skills 目录并接入。

### 方式三：手动 clone

```bash
git clone https://github.com/isjiamu/gzh-design-skill.git ~/.claude/skills/gzh-design
```

装好后，直接对 Agent 说：

> 用摸鱼绿把这篇文章排成公众号 HTML：`article.md`

会生成两个html,一个是带预览、复制功能的

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/09/b8e5163c17378f8119f3304c9257e243.png)


## 总结

好看不是玄学。  
**好看是设计和规则的叠加。**

把规则写成文档，把文档做成组件库，把组件库交给 Agent 执行。

人去做更值得做的判断。

这大概就是作者把它开源的原因——让每个人都能把自己对排版的审美和理解，变成一套可维护、可复用、可验证的小系统。

如果你也受够了排版这件小事，不妨试试。  
——它不会让你失望。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/09/ccb00017377f1b59a464941eef55e36f.png)
