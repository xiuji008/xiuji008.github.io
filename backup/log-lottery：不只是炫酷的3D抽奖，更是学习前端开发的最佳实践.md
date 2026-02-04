
>文章简介：年关将至，年会抽奖如何玩出新意？log-lottery 开源项目将传统抽奖升级为炫酷的3D球体视觉盛宴，更是一款融合 Vue3、Three.js、IndexedDB 等前沿技术的完整学习案例。它不仅支持奖品人员管理、界面定制与音乐配置，还提供在线体验、本地部署与 Docker 容器化等多种使用方式。无论是打造现场亮点，还是深入学习现代前端工程实践，这个项目都能为你带来惊喜与收获。


年关将至，各家公司已陆续开始筹备年会。活动现场灯火璀璨，无论是庆典还是其他聚会，抽奖环节往往是最令人心动的亮点。然而，若只是简单地搬出一个抽奖箱随手抽取，尤其是对于软件公司而言——是否显得不高大上呢？


但你有没有想过，一个看似简单的抽奖系统背后，其实可以承载丰富的前端开发技术与工程实践？今天我要向大家介绍的 log-lottery，正是这样一个将趣味性与技术深度巧妙融合的开源项目。它不仅拥有引人注目的 3D 视觉效果，更堪称现代前端技术栈的完整示范案例。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/f99efd1d4c35e9a7e295e318becbe469.png)




## 🎉 什么 log-lottery？

log-lottery是一个可配置可定制化的抽奖应用，炫酷3D球体，可用于年会抽奖等活动，支持奖品、人员、界面、图片音乐配置。log-lottery 最吸引人的特点无疑是其华丽的3D球体抽奖界面。当参与者名单以3D球体形式旋转、跳动时，那种视觉冲击力是传统抽奖系统无法比拟的。无论是在公司年会、校园活动还是其他庆祝场合，这个功能都能瞬间点燃现场气氛。



但 log-lottery 的魅力远不止于此。它更是一个精心设计的**学习项目**，展示了如何将多种现代前端技术有机结合，构建一个功能完整、体验优秀的Web应用。

**项目地址**：[https://github.com/LOG1997/log-lottery  ](https://github.com/LOG1997/log-lottery  )

**在线体验**：[https://lottery.to2026.xyz/log-lottery ](https://lottery.to2026.xyz/log-lottery ) 

该项目目前再github上已有 **3k**⭐️ star


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/7792e6619ce421c595745ff7c1d5c7d0.png)





## 🛠️ 技术栈亮点

log-lottery 采用了当前前端开发的主流技术栈：

- **Vue3** - 最新版的Vue框架，展示组合式API的最佳实践
- **Three.js** - 业界领先的3D图形库，实现惊艳的视觉效果
- **IndexedDB** - 浏览器本地数据库，实现数据的持久化存储
- **Pinia** - Vue的现代状态管理库
- **DaisyUI** - Tailwind CSS组件库，提供美观的UI基础

这个技术组合非常实用，是学习者了解现代Web开发架构的绝佳项目。


## 🔧 快速开始

### 🌐在线体验

直接访问官方提供的两个地址之一即可体验：

- https://lottery.to2026.xyz/log-lottery
- https://log1997.github.io/log-lottery/

###  🖥️本地开发

```bash
# 克隆项目
git clone https://github.com/LOG1997/log-lottery.git

# 安装依赖
pnpm i   或 npm install

# 启动开发服务器
pnpm dev   或 npm run dev

# 打包
pnpm build 或 npm run build
```

### 🐳Docker部署

- Docker run 运行

拉取镜像，从Docker Hub拉取镜像log-lottery
```bash
docker pull log1997/log-lottery:latest
```
运行容器
```
docker run -d --name log-lottery -p 9279:80 log1997/log-lottery:latest
```

- docker-compose 运行

创建docker-compose.yml文件

```yaml
services:
  log-lottery:
    image: log1997/log-lottery:latest
    container_name: log-lottery
    ports:
      - "9279:80"
    restart: unless-stopped

```

在docker-compose.yml 同级目录下运行以下命令启动

```bash
docker-compose up -d 
```


启动之后访问 http://localhost:9279/log-lottery/ 即可使用。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/df6cf7cecb81ee905c15ee1473607f62.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/23f5fdf0072f10d95ac454f3ab9b2d4a.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/28037b55654df1190c4a168abe9d57a3.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/8600571a50f2847ee03dbaf5f6410028.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/aacf3488092ab27321386c628cbf0faa.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/e5f3c6d97ae030d9899324cd2a17fb1f.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/62acbd14e8f754fce14d9e0607692c55.png)



## 📋 功能丰富且实用

### 1. 🧑‍🤝‍🧑完整的人员与奖品管理
- 通过Excel模板导入参与人员名单
- 自定义奖项设置（名称、人数、参与范围等）
- 抽奖结果导出到Excel，方便后续处理

### 2. 🎨高度可定制化界面
- 自定义标题、列数、卡片颜色
- 更换背景图片和首页图案
- 支持背景音乐上传和播放

### 3. 🚢多种部署方式
- **在线访问**：直接通过提供的链接使用
- **Docker部署**：一键容器化部署
- **本地安装包**：Windows平台可直接安装使用




## 🚀 学习价值

对于开发者来说，log-lottery 提供了多个学习维度：

### 1. 🎮3D Web应用开发
通过 Three.js 与 Vue3 的集成，你可以学习如何在Web应用中添加3D元素，这对于游戏开发、数据可视化等领域都有重要参考价值。

### 2. 💾本地数据持久化
项目使用 IndexedDB 存储配置和媒体文件，展示了如何在浏览器端实现复杂的数据管理，这对于离线应用和PWA开发非常有帮助。

### 3.🛠️ 完整的前端工程化实践
从开发、构建到部署，项目展示了完整的开发流程。特别是Docker支持，让你了解如何将前端应用容器化。



## 🌟结语

Log-Lottery 展示了一个看似简单的应用背后所蕴含的丰富技术内涵。它不仅是活跃年会气氛的实用工具，更是一件精心打磨的技术作品，一个极具学习价值的开源项目。

作为使用者，你可以：

- 获得一个免费、强大且高度可定制的抽奖系统
- 支持本地部署，确保活动数据完全自主可控
- 通过丰富的配置选项，灵活适应不同活动场景

作为学习者，你将能够：

- 深入剖析一个生产环境级的 Three.js 完整应用案例
- 掌握 IndexedDB 在前端复杂场景中的实战使用方法
- 理解基于 Vue 3 的现代化前端项目架构设计


无论你是为了下一次公司年会准备一个惊艳全场的抽奖环节，还是希望进一步提升个人前端技术实力，Log-Lottery 都是一个值得你投入时间深入探索的优秀项目。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/04/7aaa75f53b5e4e3b23df162c90de4372.png)

