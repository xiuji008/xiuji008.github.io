

在内容创作的世界里，图片处理常常是打断创作流程的“绊脚石”。写博客、做笔记、编写技术文档时，如何快速、优雅地上传并引用图片？今天我要向大家推荐一款堪称“神器”的开源工具——PicGo。

![](https://xiuji008.github.io/images/202601/picgo-logoly.png)

## ❓PicGo是什么？

PicGo是一款跨平台的桌面应用，致力于**将图片上传无缝集成到你的创作工作流中**。无论你是Markdown爱好者、技术博主，还是日常需要处理图片的创作者，PicGo都能让你彻底告别繁琐的上传步骤。

github地址：<https://github.com/Molunerfinn/PicGo>

官网地址：<https://picgo.app/>

文档地址：<https://docs.picgo.app/zh/>

该项目目前在github已有26.2k ⭐️ star

![](https://xiuji008.github.io/images/202601/picgo-start.png)

##  ✔️为什么你需要PicGo？

想象一下这个场景：你在写一篇技术博客，需要插入多张截图。传统流程是：
1. 截图保存
2. 打开浏览器
3. 登录图床
4. 上传图片
5. 复制链接
6. 回到编辑器粘贴

**PicGo将这个六步流程简化为一键操作**。

## 🎯核心功能亮点

###  📸 多维度上传方式
- **拖拽上传**：把图片直接拖到PicGo窗口
- **剪贴板粘贴**：截图后直接粘贴到PicGo
- **快捷键上传**：默认`Cmd/Ctrl+Shift+P`快速唤起
- **右键菜单上传**：在macOS/Windows上右键图片即可上传

###  🔗 智能链接处理
上传成功后，PicGo会自动将链接复制到剪贴板，并支持多种格式：
- Markdown格式：`![图片描述](链接)`
- HTML格式：`<img src="链接" alt="描述">`
- 原始URL
- 自定义模板

###  ☁️ 广泛的图床支持
PicGo原生支持主流图床平台：
- **国内云服务**：七牛云、腾讯云COS、又拍云、阿里云OSS
- **国际平台**：GitHub、SM.MS、Imgur
- **无限扩展**：通过插件支持AWS S3、Cloudflare R2、MinIO、chevereto等

###  🔌 强大的插件生态
PicGo拥有丰富的插件系统，你可以在[Awesome-PicGo](https://github.com/PicGo/Awesome-PicGo)中找到：
- 图片压缩插件
- 水印添加插件
- 文件名重命名插件
- Markdown图片迁移工具
- 更多第三方图床支持

###  💻 开发者友好特性
对于技术用户，PicGo提供了更多高级功能：
- **HTTP API支持**：v2.2.0+版本可通过HTTP请求调用上传
- **命令行接口**：完美集成到Shell脚本和CI/CD流程
```bash
# 一行命令上传图片
npx picgo upload /path/to/image.png
```
- **Node.js SDK**：轻松集成到你的应用中
```javascript
const { PicGo } = require('picgo')
const picgo = new PicGo()
picgo.upload(['/path/to/image.png'])
```

## 🚀无缝集成你的工作流

PicGo最大的优势在于“隐形”——它能在你几乎察觉不到的情况下工作：

### ✍️编辑器集成

通过原生支持或社区插件，PicGo可以与几乎所有主流编辑器无缝协作：
- **Obsidian**：知识管理神器
- **VS Code**：程序员的最爱
- **Typora**：优雅的Markdown编辑器
- **Neovim**：终端编辑器王者
- **MarkText**：开源Markdown编辑器
- **思源笔记**：新一代知识管理系统
- **Yank Note**：可扩展的Markdown编辑器

### 🔄零上下文切换

你不需要离开当前的编辑器窗口。只需截图、粘贴（或拖拽），PicGo在后台默默完成上传，并将格式化好的链接复制到剪贴板，你只需要粘贴即可。

## 📦安装与使用

### 📥多种安装方式

PicGo提供了丰富的安装渠道，确保无论你在哪个平台都能轻松获取：

| 平台 | 安装方式 |
|------|----------|
| Windows | Scoop: `scoop install picgo`<br>Chocolatey: `choco install picgo` |
| macOS | Homebrew: `brew install picgo --cask` |
| Linux | AUR: `yay -S picgo-appimage` |
| 所有平台 |GitHub Release:<https://github.com/Molunerfinn/PicGo/releases> |
| 国内用户 |山东大学镜像站:<https://mirrors.sdu.edu.cn/github-release/Molunerfinn_PicGo> |

### 🏃快速上手
1. 下载并安装PicGo
2. 配置你喜欢的图床（支持多种平台）
3. 开始享受一键上传的便捷

第一次使用可以参考官方[使用文档]<https://picgo.github.io/PicGo-Doc/guide/getting-started.html>。

我一直使用的是开源图床chevereto,以下是配置示例：

- 在picgo插件设置中查询`chevereto`插件并安装（搜索时只是用首字母搜索即可）
![](https://xiuji008.github.io/images/202601/picgo-plugin-chevereto.png)

- 在chevereto 中复制api-key（Dashboard->setting->api）

![](https://xiuji008.github.io/images/202601/picgo-chevereto-apikey.png)

- 在picgo 图床设置中设置chevereto 的参数

![](https://xiuji008.github.io/images/202601/picgo-chevereto-setting.png)

- 在上传区上传照片，在相册处查看及复制所需链接

![](https://xiuji008.github.io/images/202601/picgo-pictures.png)

- 在其它支持配置picgo的编辑器或者笔记软件中启用配置picgo

![](https://xiuji008.github.io/images/202601/picgo-yn-picgo.png)

- 配置完成后我们就直接可以在编译器或者笔记中通过 `CTRL+C`、`CTRL+V` 直接插入图片了

![](https://xiuji008.github.io/images/202601/picgo-upload-pic.png)


## 📱移动端支持

除了桌面端，PicGo生态还有移动端应用：
- flutter-picgo <https://github.com/PicGo/flutter-picgo>：支持Android和iOS
- PicHoro <https://github.com/Kuingsmile/PicHoro>：另一款Android应用



## 🎯结语

在效率至上的今天，每一秒的注意力都弥足珍贵。PicGo正是这样一款工具——它不追求花哨的功能，而是专注于解决创作者最实际的痛点：**让图片上传变得无感，让你专注于内容本身**。

无论你是技术博主、文档工程师，还是日常需要处理图片的创作者，PicGo都能显著提升你的工作效率。今天就试试吧，你会发现，原来图片管理可以如此简单优雅。

