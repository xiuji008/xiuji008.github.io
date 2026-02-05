

最近我在逛GitHub时，发现了一个很有意思的项目——`Slidev`。如果用一句话来总结，那就是：
> 用 Markdown 写幻灯片，让技术分享更高效、更优雅。

今天就来给大家推荐一下这个项目。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/243673d5f56840b38eec194f6c8b7d5a.png)


## ❓为什么选择 Slidev？


作为开发者，我们经常需要做技术分享、产品演示或会议报告。传统的演示工具（如 PowerPoint、Keynote）虽然功能强大，但对于代码展示和实时编程演示往往力不从心。这就是 Slidev 诞生的原因——专为开发者设计的演示文稿工具。

Slidev（Slide + dev）结合了 Markdown 的简洁性和现代 Web 技术的强大功能，让你能够：

- 🎯 **专注于内容**，而不是样式调整
- 💻 **优雅地展示代码**，支持实时编辑
- 🚀 **快速启动和迭代**，享受即时热重载

github地址：[https://github.com/slidevjs/slidev](https://github.com/slidevjs/slidev)

在线地址： [https://sli.dev/new](https://sli.dev/new)

中文文档地址: [https://cn.sli.dev/](https://cn.sli.dev/)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/1ef49745429949901c8720855a0f1c37.png)



该项目目前在github上已有**44.1k** ⭐️star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/e03c679dc2b68f25834b4927693ec9e7.png)


## 🎯核心特性一览

### 📝 Markdown 驱动

用你熟悉的 Markdown 语法编写幻灯片，所有内容都在纯文本文件中，易于版本控制。


### 🧑‍💻 开发者友好功能
- **代码高亮**：内置语法高亮，支持多种编程语言
- **实时编程**：在演示过程中直接编辑和运行代码
- **终端模拟**：展示命令行操作的真实效果

### 🎨 强大的样式和主题系统
- **主题库丰富**：从官方和社区主题中选择，或轻松创建自己的主题
- **UnoCSS 集成**：使用原子化 CSS 工具快速定制样式
- **响应式设计**：自适应不同屏幕尺寸

### 🤹 交互式元素
- **嵌入 Vue 组件**：无缝集成交互式组件
- **动态内容**：在幻灯片中使用响应式数据
- **自定义布局**：创建复杂的幻灯片结构

### 🎙 专业演示功能
- **演讲者模式**：在单独窗口查看笔记和计时器
- **远程控制**：使用手机或其他设备控制幻灯片
- **画板功能**：在幻灯片上实时绘制和标注
- **录制功能**：内置录制和摄像头视图

### 📚 技术文档友好
- **LaTeX 支持**：完美的数学公式渲染
- **Mermaid 图表**：用文本描述创建流程图、序列图等
- **图标系统**：直接访问数千个图标

## ⚡快速开始

### 🌐在线体验

无需安装，直接在浏览器中体验：[sli.dev/new](https://sli.dev/new)

### 🖥️本地安装

确保已安装 Node.js (>=18)，然后运行：

```bash
# 如果你还没有安装 pnpm
npm i -g pnpm

pnpm create slidev

# 如果你希望使用单个 Markdown 文件作为幻灯片，可以全局安装 Slidev CLI：

pnpm i -g @slidev/cli

# 通过以下命令创建并启动幻灯片:

slidev slides.md
```

### 🐳Docker 安装

如果你需要快速的在容器上部署你的演示文稿，你可以使用由 tangramor 维护的预构建 docker 镜像。

github地址：[https://github.com/tangramor/slidev_docker](https://github.com/tangramor/slidev_docker)

我使用的是docker-compose启动的，以下是操作步骤

创建docker-compose.yml文件

```yaml
services:
  slidev:
    image: tangramor/slidev:latest
    container_name: slidev
    user: "node"
    ports:
      - "3030:3030"
    environment:
      - NPM_MIRROR=https://registry.npmmirror.com
    volumes:
      - ./data:/slidev
    stdin_open: true
    tty: true
```

在docker-compose.yml同级目录下创建挂载目录并授权

```bash
# 创建挂载目录
mkdir data
# 授权
sudo chmod -R 777 ./data
```

启动容器

```bash
docker-compose up -d 
```

查看日志

```bash
docker-compose logs -f 
```

如出现以下日志，则说明容器启动成功

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/424942a4e970d88c8b6065593ea1d749.png)


启动完成后我们在浏览器中打开地址

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/c5caaa4783416644789f66c5e2f57a98.png)

在页面上右击则可以看到操作选项

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/51fc931cdb960ef42714dd181056d3fe.png)

`show editor` ->编辑md内容

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/6e2f4eb92c9fd729c7790394f2798564.png)

`Shitf`+`右击` 打开本地功能

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/6580fc5817737eef4a9027ce9148c9a9.png)



其它以下语法，操作我们就不在此处介绍了，家人们自行尝试吧

## 🧩 生态系统

Slidev 拥有活跃的社区和丰富的资源：

- **官方文档**：多语言支持（中、英、法、西、俄、葡）
- **主题画廊**：大量现成主题可供选择
- **插件系统**：扩展 Slidev 的功能
- **VS Code 扩展**：提供更好的编辑体验



![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/05/5a87dfa66f1260a800583cad17cda83f.png)


## 📝结语

无论你是需要做一次技术分享，还是想要创建教学材料，Slidev 都能提供卓越的体验。它的设计理念完美契合开发者的思维方式：

1. **从简单开始**：用 Markdown 快速创建基础幻灯片
2. **专注于内容**：让工具处理样式和布局问题
3. **优雅演示**：享受流畅的演示体验和专业的外观

Slidev 不仅是一个工具，更是一种新的演示文稿创作哲学——将内容的简洁性和功能的强大性完美结合。


