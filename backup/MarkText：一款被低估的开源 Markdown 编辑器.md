

> 如果你还在用臃肿的富文本编辑器写文档，或者对 Typora 的商业化策略感到不满，MarkText 值得你认真了解一次。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/1781961413976.png)


## 什么是 MarkText？

**MarkText** 是一款专注于速度与易用性的开源 Markdown 编辑器，由开发者Jocs及社区贡献者共同维护，采用 **MIT 许可证** 完全免费开放。

- GitHub 仓库：[https://github.com/marktext/marktext](https://github.com/marktext/marktext)
- 文档地址：[ https://marktext.me/]( https://marktext.me/)
- 下载地址：[https://github.com/marktext/marktext/releases/latest](https://github.com/marktext/marktext/releases/latest)

该项目目前在github 上已有 `57.6k` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/dbc50589456f7bb6c8cf2038a6bc6694.png)


它的核心理念只有一句话：

> "A simple and elegant open-source markdown editor that focused on speed and usability."
> 
> 简洁、优雅，专注速度与易用性。





## 安装指南

MarkText 支持 Linux x64、macOS x64/arm64、Windows x64/arm64，覆盖主流设备架构。


### Windows（需要 Windows 10 / 11）

**方式一：包管理器安装（推荐）**

```bash
# 使用 Winget（Windows 11 内置）
winget install marktext

# 使用 Chocolatey
choco install marktext
```

**方式二：手动安装**

前往 [Release 页面](https://github.com/marktext/marktext/releases/latest) 下载 `marktext-win-x64-0.19.0-setup.exe`，运行安装向导，支持单用户安装或全机安装。

安装之后默认是英文页面，设置中文步骤如下：

`File` --> `Preferences`  --> `Language`  -->`简体中文`

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/5a7a87fb946f3acc7a8714503017267b.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/97383334880a5e36b83a72e557c4e08e.png)



## 核心功能详解

### 1. 所见即所得（WYSIWYG）实时预览

MarkText 最大的特点是真正意义上的 **实时预览**——你输入 `**加粗**`，光标离开后立即渲染为 **加粗**，不存在左右分栏的割裂感。整个界面干净无干扰，让你专注于写作本身，而不是在工具栏和预览窗口之间反复切换。

这种交互方式与 Typora 类似，但 MarkText 是完全免费开源的。



### 2. 全面的 Markdown 规范支持

MarkText 不只是支持基础 Markdown，它覆盖了三大主流规范：

| 规范                                 | 说明                           |
| ---------------------------------- | ---------------------------- |
| **CommonMark Spec**                | 最严格的标准化 Markdown 规范，确保跨平台一致性 |
| **GitHub Flavored Markdown (GFM)** | 支持表格、任务列表、删除线等 GitHub 扩展语法   |
| **Pandoc Markdown**（部分支持）          | 面向学术写作的扩展格式                  |

无论你是写技术文档、博客还是学术笔记，MarkText 都能准确渲染。


### 3. Markdown 扩展能力

除了基础规范，MarkText 还支持以下扩展功能：

- **KaTeX 数学公式**：直接在文档中渲染 LaTeX 数学表达式
  
  ```
  $$E = mc^2$$
  ```
  
  → 渲染为标准数学公式，适合理工科写作

- **Front Matter**：支持 YAML Front Matter 元数据，方便与 Hugo、Jekyll 等静态博客框架配合使用

- **Emoji 表情**：输入 `:smile:` 即渲染为 😄，书写更生动


- **内联快捷键**：段落样式和内联样式均有快捷方式，不需要频繁移开双手


### 4. 三种编辑模式

MarkText 提供三种截然不同的编辑体验，适配不同场景：

#### 源码模式（Source Code mode）

显示原始 Markdown 语法，适合喜欢掌控细节的用户或需要精确调试格式时使用。

#### 打字机模式（Typewriter mode）

当前编辑行始终保持在屏幕垂直中央，无论文档有多长，视线焦点永远不会偏移。长文写作时减少颈部疲劳，专注感极强。

#### 专注模式（Focus mode）

当前所在段落高亮显示，其余段落自动淡化为灰色。帮助你屏蔽干扰，只关注正在写的这一段，特别适合初稿撰写或深度创作。



### 5. 多套主题

视觉偏好因人而异，MarkText 内置多套主题：

- **Cadmium Light** — 明亮清爽，日间使用舒适
- **Material Dark** — 深色护眼，夜间写作首选
- 其他多个内置主题可在设置中切换



### 6. 导出为 HTML 和 PDF

写完的文档可以一键导出为：

- **HTML**：保留所有格式，适合网页发布
- **PDF**：保留排版布局，适合打印或分发

这对于需要输出正式文档的场景非常实用，无需借助第三方工具。



### 7. 从剪贴板直接粘贴图片


截图后直接 `Ctrl+V` 粘贴到编辑器，MarkText 会自动将图片根据配置保存到本地或上传到图床并插入引用链接，省去了手动保存图片文件再引用的繁琐步骤。

图片保存策略有三种

- 上传到云端（picgo配置图床）

- 辅助到文件夹

- 使用绝对路径


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/c439003e0ea99d015a8b475b4231c244.png)


我是通过`picgo` 配置的`chevereto` 图床使用的，前置条件，本地有`npm`环境，以下是配置步骤

1. 选择 粘贴或拖拽图片到 MarkText 后的默认行为 为 `上传到云端`，图片上传器选择 `PicGo`

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/450d8ac9ddcbb275c73ebc428b641cd1.png)

2. 安装 `picgo`

```shell
npm install picgo -g
```

3. 安装 `Chevereto` 插件

```shell
picgo install cheveretov4
```

4. 配置上传信息

```shell
picgo set uploader
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/2cacac78d813992004d564590a5fb92f.png)

选择`chevereto4`

配置上传url 和api key 

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/3d880dd745a0d320df3a9845d8989b3d.png)

5. 测试上传

```shell
picgo upload /path/to/image.png
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/90677d12e3d27a3d2ee8438e2a2da949.png)


6. 截图后直接 `Ctrl+V` 粘贴到编辑器即可自动上传到图床

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/20/200e274f6d592fd2f73f8f7bf4078d1c.png)


## 适合谁使用？

- **技术博客作者**：日常写 Markdown 文章，需要简洁高效的工具
- **开发者**：写 README、文档、技术笔记
- **学生 / 研究者**：需要 KaTeX 数学公式支持
- **Typora 用户**：不想为编辑器付费，又需要同等体验的平替方案
- **开源爱好者**：认同 MIT 精神，希望使用并支持自由软件



## 总结

MarkText 是一款 **被严重低估** 的编辑器。它没有 Obsidian 的插件生态，也没有 Notion 的协作能力，但它做到了很多编辑器没做好的事：**把写 Markdown 这件事本身做到极致**。

干净的界面、流畅的实时预览、体贴的三种编辑模式、完整的规范支持，再加上 MIT 开源免费——如果你是一个纯粹的写作者，MarkText 就是你需要的那个工具。


