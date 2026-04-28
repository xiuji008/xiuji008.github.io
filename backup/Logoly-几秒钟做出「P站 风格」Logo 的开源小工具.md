

很多人做个人主页、公众号封面、技术分享 PPT，都会遇到一个共同问题：  
**想要一个眼前一亮的 Logo，但又不会设计，也懒得打开 PS / Figma。**

Logoly 就是为这种场景而生的一个开源项目：  
一个可以在线生成 **P站 / OnlyFans 风格 Logo** 的小工具，只需要改几个字、调调颜色，几秒钟就能导出一张“似曾相识”的趣味 Logo。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-example5.png)


## 👁️‍🗨️ Logoly 是什么？

Logoly 的作者给它的定义是：

> **A Simple Online Logo Generator for People Who Want to Design Logos Easily.**  
> —— 让任何人都能轻松做 Logo 的在线生成器。

它最早因为可以生成类似 p站 风格的 Logo 在社区火了一把，后来又加入了 OnlyFans 风格的样式，逐渐变成一个 **“恶搞 / 表情包 / 个人小品牌”** 都能用的小工具。

特点概括一下：

- 在线使用，无需安装，打开网页就能玩
- 生成 P站 / OnlyFans 风格的 Logo
- 支持自定义文字内容
- 支持自定义颜色和字体大小
- 一键导出 PNG / SVG 两种格式
- 开源，基于 WTFPL 2 授权，几乎「想怎么玩就怎么玩」

github地址： [https://github.com/bestony/logoly](https://github.com/bestony/logoly)
在线体验：[https://www.logoly.pro/](https://www.logoly.pro/)

该项目目前在github 上已有 7.9k ⭐️star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-star.png)



## 🎯 功能一览

### 1. 两种经典风格：P站风格 & OnlyFans


你可以一键做出这两种在互联网上辨识度极高的 Logo 风格，用来做：

- 朋友圈/微博的整活配图  
- 技术分享 PPT 中的彩蛋  
- 团队内部的梗图或文化海报  
- 个人主页 / 博客上的趣味 Logo 等

风格本身非常强烈，但文字是你自定义的，可以天马行空。

> 注意：Logoly 本身不涉及任何成人内容，只是借鉴了这些品牌 Logo 的视觉风格。

### 2. 自定义文字内容

页面中有一个文本输入框，只需要：

1. 把默认的文字改成你想要的（英文、数字、甚至中文都可以尝试）
2. 实时预览 Logo 效果

很适合搞一些有梗、容易被记住的短词。

### 3. 自定义颜色和字体大小


你可以自由调整：

- 左右两段文字的颜色
- 中间色块的背景色（具体视当前主题而定）
- 整体字号大小，用来适配不同场景（比如头像 vs 横幅）

简单几下滑动/点选，就能做出风格迥异的变体。

### 4. 导出 PNG / SVG

完成之后，点击 **Export** 按钮可以导出两种格式：

- **PNG**：适合直接作为图片使用（社交头像、封面图、PPT、聊天表情等）
- **SVG**：矢量格式，放大不会糊，适合用在网页、印刷、再加工设计中

对于前端开发者来说，SVG 的可编辑性也很友好，可以进一步嵌入到自己的项目里。


## 在线使用教程：4 步搞定一个 Logo

作者已经把使用流程总结成 4 步，实际体验下来也确实非常简单：

1. 打开网站：  
   访问 [https://logoly.pro/](https://logoly.pro/)
2. 编辑文字：  
   把默认的文本替换成你想要的单词/短句
3. 调整样式：  
   - 修改颜色
   - 调整字体大小
4. 导出图片：  
   点击 **Export** 按钮，选择 PNG 或 SVG 导出

整个过程基本不需要学习成本，几乎是「一看就会」。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-online-example.png)

以下是我生成的一些案例

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-example1.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-example2.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/16/logoly-example3.png)


## ✏️ 面向开发者：如何在本地运行 Logoly？



### 环境要求

项目对 Node / npm 版本有明确要求：

- Node.js **18+**
- npm **10+**  
  （官方说明：**只支持 npm 作为包管理器**，请不要提交其他管理器生成的 lockfile）

也就是说：

- 不建议使用 yarn / pnpm / Bun 来跑这个项目，以免锁文件不一致、CI 失败。
- CI 流水线里也是基于 npm 的脚本执行。

### 本地跑起来的步骤

在命令行中依次执行：

```bash
# 1. 克隆仓库
git clone https://github.com/bestony/logoly.git
cd logoly

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

启动成功后，在浏览器里访问提示的本地地址（通常是 `http://localhost:xxxx`），就能看到 Logoly 的开发版界面。

修改源码后即可实时看到效果。  
开发完成后，可以进行构建：

```bash
npm run build
```

### docker部署



如果你想使用docker部署，则只需要启动一个nginx 容器，将构建后的dist目录下的文件及文件夹挂载到容器中即可,不会部署nginx的家人们可以搜索下博主的历史文章，有介绍docker 部署nginx 及配置的博文。







## 🦆 总结

如果你：

- 需要一个有辨识度的 Logo，又不想折腾复杂设计工具  
- 想给项目、团队或朋友做一个带梗的图标  
- 想找一个小而美的前端开源项目学习 / 贡献

那么 Logoly 非常值得收藏一下。

- 在线生成：<https://logoly.pro/>
- 源码仓库：<https://github.com/bestony/logoly>

你可以先用线上版做几个 Logo 玩玩。