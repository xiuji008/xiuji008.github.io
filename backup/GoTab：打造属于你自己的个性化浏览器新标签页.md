
今天，刷github 的时候发现了一款开源项目——**GoTab 新标签页**，一款免费、清爽、功能齐全且可配置项极多的个性化新标签页解决方案。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/e398527007b9cd0a180f77b174d03f90.png)


## 什么是 GoTab？

GoTab 是 funtabs 新标签页的重构版本。开发者在早期自学阶段构建了第一版，随着技术成长，尤其是接触到 Redux 等更先进的状态管理工具后，决定对项目进行彻底重构。这次重构不仅让代码结构更加清晰，还引入了更强大的后端支持。

GoTab 采用 **Vite** 作为前端构建工具，确保极快的开发与加载体验；后端则由 **Golang** 编写，最终编译为一个轻量的二进制文件，部署极其简单。

**项目地址**：[https://github.com/dengxiwang/gotab-personal](https://github.com/dengxiwang/gotab-personal)
**官网**：[https://www.gotab.cn/](https://www.gotab.cn/)

**Demo 地址** ：[https://test.gotab.cn](https://test.gotab.cn)  
用户名：`admin`  
密码：`123456`

该项目目前在github 有 `277` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/c74fc2e971a33bb52a28ccdffd758ade.png)

## 为什么选择 GoTab？

### 1. 功能强大，应有尽有
GoTab 不仅仅是一个新标签页，更是一个完整的个人工作台。它提供了众多精美的小组件、聚合搜索、浏览器书签管理、卡片布局、双壁纸模式等，支持超高自定义程度，满足你的每一项需求。

### 2. 多端数据即时同步
支持多设备登录和数据即时同步，还内置了“时光机”功能，数据安全不丢失。即便离线，也能通过本地备份正常使用。

### 3. 极致个性化
支持标准与简约两种壁纸模式，动态切换随心所欲。卡片可自由拖拽排序，支持内网链接、滚动字幕等丰富样式，真正实现“我的主页我做主”。

### 4. 资源丰富
内置精心整理的海量优质网站资源库，支持用户提交分享，让发现好网站变得更容易。

### 5. 开源免费，私有化部署
GoTab 完全开源，你可以将它部署在自己的 NAS、云服务器或个人设备上，数据完全自主掌控，无需担心隐私泄露。

## Docker 部署（推荐）

### 准备工作

- 有Docker环境的服务器
- mysql 数据库（创建好数据库gotab）


### 创建docker-compose.yml

创建一个部署目录`gotab`,创建`docker-compose.yml`,内容如下：

```yaml
services:
  gotab-server:
    image: doxwant/gotab:latest
    container_name: gotab-server
    restart: always
    ports:
      - "18080:8080"
    environment:
      - SERVER_PORT=8080
    volumes:
      - ./uploads:/app/uploads
      - ./sourceStore:/app/sourceStore
      - ./config.toml:/app/config.toml
```

### 启动容器

在部署目录下创建配置文件`config.toml`,只需创建文件即可，创建完成后使用以下命令启动容器：

```shell
docker-compose up -d
```

启动之后查看日志 `docker-compose logs -f `,如下则服务启动正常

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/ce461c4672cf1f38bd52968ce840fc75.png)

### 完成配置

在浏览器中打开部署的服务地址,在页面上完成配置：

- 网站基本信息配置

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/7d07098c2b59cff90daa1102df284d48.png)


- mysql数据库配置

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/69a6ba6bab0f4b31ded66e684ca4ff94.png)

- 邮件服务配置

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/2663691d1f572744d873b965d30534c3.png)

到此，配置就完成了

### 使用

- 登录


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/476a9a80b630681165aee767b1b0c761.png)

- 壁纸配置


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/01e17322eb93fad3d79d8bc2d227117d.png)

- 管理后台配置


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/63c2e4ad6af4fe197b4a975d9cf1101a.png)


- 组件使用

作者提供的组件相对比较丰富

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/21/242fbdacb4aeffa44e195daed9be3726.png)



## 写在最后

GoTab 让每一次打开浏览器都成为一种享受。无论你是追求极致效率的工具控，还是喜欢折腾个性化的玩家，GoTab 都值得一试。赶快部署属于自己的新标签页吧！

