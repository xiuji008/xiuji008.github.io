

>文章简介：FossFLOW是一款创新的开源等距图表工具，专为技术文档设计。它通过立体视角将复杂的系统架构转化为直观的3D图表，支持拖放式操作和离线使用，让技术图表变得生动易懂。无需注册，数据安全存储在本地，并提供JSON导入导出功能。无论是Docker快速部署还是在线体验，FossFLOW都能为架构图、流程图注入立体活力，是提升技术文档表现力的得力助手。


你是否曾经为了绘制清晰的技术架构图或系统流程图而烦恼？是否觉得传统的平面图表难以表达复杂的层次关系？今天，我要向大家介绍一款令人惊艳的开源工具——**FossFLOW**，它能让你的技术图表瞬间变得立体、生动！



![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/31/cbc3aa407ffde04d9d5457c0ea03d25b.png)



## 🌟 什么是FossFLOW？

FossFLOW 是一款功能强大的、开源的渐进式 Web 应用（PWA），专为创建精美的等距图表而设计。它基于 React 和 Isoflow（现已 fork 并以 fossflow 名称发布到 NPM）库构建，完全在浏览器中运行，并支持离线使用，让你随时随地都能创作出专业级的技术图表！

github地址：[https://github.com/stan-smith/FossFLOW/](https://github.com/stan-smith/FossFLOW)

在线地址：[https://stan-smith.github.io/FossFLOW/](https://stan-smith.github.io/FossFLOW)

该项目目前在github上已有**17k** ⭐️star


![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/31/a22f63cad2fcf9e4a216635f265a5197.png)


## ✨ 主要特性

### 🎨 **立体图表，视觉升级**
- 创建令人惊叹的3D风格技术图表
- 等距视角让复杂的系统架构一目了然
- 拖放式操作，简单直观

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/31/52b9b575b24ef679b5e4205cdef7ec4d.png)

### 🔒 **隐私优先，安全可靠**
- 所有数据都存储在您的浏览器中
- 无需注册，无需上传
- 完全控制你的数据

### 🔄 **导入导出，轻松分享**
- JSON格式导入导出
- 快速分享你的设计
- 完整备份功能

## 🚀 快速上手

### 🐳Docker部署

创建docker-compose.yml文件，内容如下：

```yaml
services:
  fossflow:
    image: stnsmith/fossflow:latest
    container_name: fossflow
    ports:
      - "5010:80"
    volumes:
      # 如果要禁用服务端存储，可以注释掉这行
      - ./diagrams:/data/diagrams
    environment:
      - TZ=Asia/Shanghai
      # 如果要启用服务端存储，注释掉下面这行
      # - ENABLE_SERVER_STORAGE="false"
    restart: unless-stopped
```

在docker-compose.yml 同级命令下使用以下命令启动

```shell
docker-compose up -d
```

到此，我们就部署完了，在浏览器中输入地址就可以访问了



![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/31/18d17c3b8de91fbba2d331a8d037d2ad.png)



### 🌐在线体验

直接访问：[https://stan-smith.github.io/FossFLOW/](https://stan-smith.github.io/FossFLOW)

### 📱本地启动

```bash
# 克隆仓库
git clone https://github.com/stan-smith/FossFLOW
cd FossFLOW

# 安装依赖
npm install

# 启动开发服务器
npm start
```

## 🛠️ 使用指南

### 📈1. 创建图表
- 点击右上角"+"按钮打开组件库
- 从左侧拖放组件到画布
- 或右键网格选择"Add node"

### 🧩2. 连接组件
- 使用连接器显示组件关系
- 智能对齐，保持图表整洁
- 多层连接，表达复杂关系

### ✏️3. 自定义样式
- 更改颜色、标签和属性
- 调整位置和大小
- 添加说明文字

### 🎨4. 导航操作
- 鼠标滚轮放大缩小
- 点击拖动平移画布
- Ctrl+Z撤销，Ctrl+Y重做


## 🏗️ 技术栈

- **React** - 现代化的UI框架
- **TypeScript** - 类型安全的开发体验
- **Isoflow** - 强大的等距图表引擎
- **PWA** - 离线优先的Web应用架构

## 🚨缺点与不足

虽然该工具在基础功能方面表现良好，但在实际使用过程中仍存在一些明显的局限性与不足之处：

- 3D节点资源严重匮乏

  官方提供的3D节点类型极为有限，仅包含基础的几何形状和少数预设模型，无法满足复杂三维场景的构建需求。

- 第三方节点生态发展不完善

  第三方插件多为2D节点，在构建复杂三维场景时可能面临节点素材不足的问题。
  
![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/31/57b275039f430a84688399ef409076f9.png)

- 快捷操作方式还有待改进


## 📝 最后的话

在技术文档越来越重要的今天，一个清晰、直观的图表往往胜过千言万语。FossFLOW以其独特的等距视角，为技术图表带来了全新的可能性。无论你是架构师、开发者、技术作家还是项目经理，这款工具都值得一试。

最重要的是，它是完全免费和开源的！你可以在GitHub上找到所有源代码，自由使用、学习和改进。
