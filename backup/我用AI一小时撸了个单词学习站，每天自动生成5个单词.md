


AI编程热度居高不下，我也一直在用CodeBuddy辅助开发。最近发现了一个有意思的功能——Skill（技能包），灵机一动：不如写个技能，每天自动生成英文单词并部署成网页，这样打开浏览器就能学。

说干就干，全程AI辅助，一个多小时就搞定了。过程分享给大家。

以下是项目地址及在线地址


在线访问：[https://xiuji008.github.io/everyday-english/](https://xiuji008.github.io/everyday-english/)

项目完全开源：[https://github.com/xiuji008/everyday-english](https://github.com/xiuji008/everyday-english)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/26/ea56f2cdae9079d0706bc966479c687f.png)


## 灵感来源

CodeBuddy的Skill功能可以定义一套自动化流程。比如我说“生成今日单词”，它会自动：

1. 读取配置（单词数量、Emoji池、格言库等）
2. 扫描已有单词，计算序号、去重
3. 随机选封面图和格言
4. 用AI生成5个单词（含音标、例句、记忆提示）
5. 保存为Markdown，按年月分目录
6. 推送到GitHub触发Pages部署

我每天都在学英语，但总要打开文件夹去看md文件，有点麻烦。作为一名程序员，第一反应是：**做成网页！**

## 技术方案

- **数据来源**：CodeBuddy Skill每天生成Markdown单词文件
- **项目结构**：`docs/YYYY/MM/` 按年月分组 + Vite前端
- **展示方式**：Vite + 纯JS单页应用，侧边栏日期导航
- **本地开发**：`npm run dev`，Vite动态读取md文件
- **部署方案**：GitHub Actions + GitHub Pages

## AI辅助开发过程

### 1. 项目初始化

AI生成了基础结构：

```
/everyday-english
  /docs                  # GitHub Pages目录
    /images              # 封面图
    /2026/05/            # 年月分组md文件
    words-index.json     # 生产环境索引
  /scripts               # 辅助脚本
  /skills                # CodeBuddy技能定义
  index.html / main.js / style.css
  vite.config.js
```

### 2. Vite开发服务器

AI写的Vite配置提供了三个API端点：

- `/api/words` → 列出所有单词文件
- `/api/word-content` → 返回md内容及前文解析
- `/api/random-image` → 随机选取封面图

本地开发时JS直接fetch这些API；部署后回退读取静态JSON和md文件。

### 3. 可折叠侧边栏 + Hero头部

侧边栏经历了几轮迭代：全英文深色 → 中文亮色 → 按月折叠（手风琴）→ 圆角徽章、渐变色激活态、Logo头像。

Hero头部从`docs/images/`随机选背景图，叠加前文信息（Emoji、分类、格言、标签），各有不同配色：

```
┌─────────────────────────────────┐
│         (随机封面图)             │
│  ✍️  第1篇                       │
│  2026-05-26-04 每日英语推荐        │
│  /English/Daily  ·  5月26日      │
│  「不积跬步，无以至千里」          │
│  英语学习  词汇积累  职场英语       │
└─────────────────────────────────┘
```

### 4. Markdown前文解析

单词文件头部含YAML前文，AI写了正则解析器：

```markdown
---
title: "2026-05-26-04 每日英语推荐"
tags: 英语学习,词汇积累,职场英语
emoji: ✍️
idiom: '不积跬步，无以至千里'
createDate: 2026-05-26
---
```

Windows上遇到行尾符`\r\n`的问题，修正后改用`\r?\n`解决。

### 5. CodeBuddy Skill 定义

用`SKILL.md`定义完整自动化流程（9个步骤），从读配置到推送到GitHub全自动。说一句“生成今日单词”或配置一个定时任务即可。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/26/e127ac9a9d3d1cb520919a13d2f0bcc4.png)


生成的单词文件格式：

```markdown
---
title: "2026-05-25-01 每日英语推荐"
tags: 英语学习,词汇积累,职场英语,生活用语
category: /English/Daily
emoji: "🌟"
idiom: '千里之行，始于足下'
cover: '![](./images/002.webp)'
createDate: 2026-05-25
---

# 2026-05-25-01 每日英语推荐

> 🌟 千里之行，始于足下

---

## 1. negotiate /nɪˈɡoʊʃieɪt/
**词性**：v. 谈判，协商，达成协议

**例句**：
> We need to negotiate a new contract with the supplier before the end of this quarter.
> 我们需要在本季度结束前与供应商协商一份新合同。

**记忆提示**：
neg（否定）+ oti（来自拉丁语 otium，意为"闲暇"）+ ate（动词后缀）→ 放下休闲去"谈判"。想想职场中为了争取更好的条件，不得不放下休闲时间去和人谈判。

---
```

## 最终成果

一个多小时后，我得到了：

- ✅ CodeBuddy Skill一键生成每日5个单词
- ✅ Vite本地开发服务器（`npm run dev`）
- ✅ 可折叠侧边栏按年月分组导航
- ✅ Hero头部随机背景图 + 前文信息
- ✅ 单词卡片展示（音标、词性、例句、记忆提示）
- ✅ 不同配色区分分类、格言、日期、标签
- ✅ GitHub Actions自动构建部署
- ✅ GitHub Pages在线访问

每天早上说一句“生成今日单词”或者自动化任务执行，5个新单词自动推送，打开书签就能学。碎片时间瞄几眼，日积月累词汇量自然增长。



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/26/0fb6b206a7fa6f3635fc7fcc7f835082.png)


## 一些思考

**关于AI编程**  
AI不是在抢饭碗，而是让我们能做更多事。以前懒得动手的小工具，现在想法到实现的距离被大大缩短。

**关于“吃自己的狗粮”**  
给自己做工具，每天用着还挺有成就感。

**关于持续学习**  
5个单词看似不多，一年就是1825个。每天进步一点点，时间会给你惊喜。

## 写在最后

在线访问：[https://xiuji008.github.io/everyday-english/](https://xiuji008.github.io/everyday-english/)

项目完全开源：[https://github.com/xiuji008/everyday-english](https://github.com/xiuji008/everyday-english)

不妨打开CodeBuddy，告诉AI你的想法。一小时之后，你可能会收获一个让自己惊喜的作品。