

在数字阅读日益普及的今天，找到一款真正好用、功能全面且尊重用户隐私的电子书阅读器并不容易。今天要介绍的 Readest，或许正是你一直在寻找的那个答案。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/3dcbc16bf8d85c720737aee85b9b3d5b.png)


## 什么是 Readest？

Readest 是一款免费开源的 EPUB 和 PDF 电子书阅读器，专为深度沉浸式阅读而打造。在 macOS、Windows、Linux、Android、iOS 和 Web 上享受高亮标注、笔记、分屏阅读、文本转语音和云同步功能。

简单来说，无论你使用什么设备，Readest 都能让你的电子书阅读之旅变得更加舒适和高效。

github地址： [https://github.com/readest/readest](https://github.com/readest/readest)

文档地址： [https://readest.com/zh](https://readest.com/zh)

web地址： [https://web.readest.com/](https://web.readest.com/)

该项目目前在github上已有 19.4k star


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/bf7199ac68b18e2cfa60a83ff4921991.png)


## 核心亮点：功能全面到令人惊喜

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/ddd8701d4801548a6b862f810f79b7e1.png)


## 安装部署

官网文档中有提供windows、linux、ios、Android的安装包，可根据自己的需求下载，也有提供web端的地址，可直接在浏览器中使用。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/b00647ddf7e49f96c8e55d32a3ad0ef2.png)

### docker-compose 部署

作者也提供了docker私有化部署的镜像，可私有化部署web端，以下是部署步骤

- 创建部署目录及docker-compose.yml文件，内容如下：

```yml
services:
  readest:
    image: aliuq/readest:latest
    container_name: readest
    ports:
      - "3300:3000"
    restart: unless-stopped
```

- 在部署目录下启动容器

```shell
docker-compose up -d
```
使用以上命令启动容器

- 在浏览器中访问服务

http://192.168.31.195:3300/


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/bcaf01da796f440b2011956ff38261dc.png)


### web端使用

- 登录

我是用的是github账号登录

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/254544116d29bae4373b56689d673a84.png)


登录之后就可以做到多端同步了

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/f3b38f2c27be7c57d639e3205f26b2aa.png)

免费的同步空间是500M，基本也够用了

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/09/6848c89cd0540167f3f5be61d9a6c6f6.png)


其余使用的技巧家人们就自行尝试


## 总结

Readest 是一款难得的开源精品——它不仅功能全面、设计现代，更重要的是它尊重用户、坚持开放。无论你是普通读者、学生学者，还是技术爱好者，Readest 都能为你的阅读生活增添一份舒适与便利。



