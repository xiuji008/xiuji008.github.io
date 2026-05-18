

在数字阅读时代，你是否遇到过这些困扰：购买的电子书散落在不同平台，想看的书找不到统一的地方管理；想把好书分享给家人朋友却受限于各种 DRM 保护？

如果你有以上烦恼，那么今天要介绍的开源项目 **Talebook** 或许正是你需要的解决方案。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/3fd04576aef0a73912ee33fefce316c4.png)


## 什么是 Talebook？

Talebook 是一个专为书籍爱好者打造的一站式私有电子书库解决方案。它集收藏、整理、阅读、转换、同步和智能分析于一体。通过 Docker 部署，您可以在 NAS、服务器或个人电脑上建立完全由自己掌控的数字图书馆。

github地址：[https://github.com/talebook/talebook](https://github.com/talebook/talebook)

文档地址：[https://mybooks.top/wiki.html](https://mybooks.top/wiki.html)


该项目在github 上已有 5.5k star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/7218b4e401050523776ed13c53c4cd75.png)

## 主要特点

这是一个基于Calibre的简单的个人图书管理系统，支持在线阅读。主要特点是：

- 美观的界面：由于Calibre自带的网页太丑太难用，于是基于Vue，独立编写了新的界面，支持PC访问和手机浏览；
- 支持多用户：为了网友们更方便使用，开发了多用户功能，支持豆瓣（已废弃）、QQ、微博、Github等社交网站的登录；
- 支持在线阅读：借助epub.js 库，支持了网页在线阅读电子书（章评功能开发中）；
- 支持批量扫描导入书籍；
- 支持邮件推送：可方便推送到Kindle；
- 支持OPDS：可使用KyBooks等APP方便地读书；
- 支持一键安装，网页版初始化配置，轻松启动网站；
- 优化大书库时文件存放路径，可以按字母分类、或者文件名保持中文；
- 支持快捷更新书籍信息：支持从百度百科、豆瓣搜索并导入书籍基础信息；
- 支持私人模式：需要输入访问码，才能进入网站，便于小圈子分享网站；


## 快速上手：Docker 一键部署

Talebook 最吸引人的地方之一就是部署极其简单。强烈推荐使用 Docker 方式：

**使用 docker-compose（推荐）：**

- 创建docker-compose.yml文件

```yaml
services:
  talebook:
    restart: always
    image: poxenstudio/talebook
    volumes:
      - ./books:/data
    ports:
      - "8082:80"
      - "8443:443"
    environment:
      - PUID=990
      - PGID=990
      - TZ=Asia/Shanghai
    depends_on:
      - douban-rs-api
  douban-rs-api:
    restart: always
    image: ghcr.io/cxfksword/douban-api-rs
```

- 启动容器

```shell
docker-compose up -d 
```

**使用原生 Docker：**

```bash
docker run -d --name talebook -p 8082:80 -v /你的数据目录:/data talebook/talebook
```

完成上述命令后，打开浏览器访问 `http://你的IP:8082`，按照初始化向导配置即可开始你的私人书库之旅。


## 使用

初始化配置：第一次部署完打开地址后需要做一些配置,如下

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/01ff759be14a02c64e6c67556ad12f45.png)

用配置后的用户密码登录


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/7b8795fd666277b7449080fa2efd46e9.png)


登录之后其余操作比较简单，导入图书之后就可以阅读了

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/a3f2392284f97de8bca9de8011ff8e08.png)

如果你没有图书资源，可以从这两个友链中下载需要的数据再导入去阅读

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/18/b7716b54400715746d5969fdaf35ffae.png)



## 写在最后

在数字版权意识日益增强的今天，拥有一个属于自己的、完全掌控的电子书库，不仅是对知识的整理，更是一种生活方式的表达。Talebook 以其简洁的部署、优雅的界面和强大的功能，成为了这个领域不可多得的好项目。

