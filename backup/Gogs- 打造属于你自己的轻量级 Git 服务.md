

在软件开发的世界里，Git 已经成为版本控制的事实标准。GitHub、GitLab 等平台提供了强大的托管服务，但有时候，我们需要一个完全属于自己的私有 Git 仓库——可能是为了代码安全，可能是为了定制化需求，可能是为了集成到现有服务中，也可能只是想在自己的服务器上搭建一个个人代码库。开源gitlab有点重，最近我在GitHub上发现了一个轻量级项目`Gogs`。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/929cd0a82fac7319779c372267b22fa6.png)


## 什么是 Gogs？

Gogs 是一个用 Go 语言编写的自助 Git 托管服务。它的目标是以最简单、最轻松的方式搭建一个简单、稳定且可扩展的 Git 服务。得益于 Go 语言的跨平台特性，Gogs 可以在 Linux、macOS、Windows 以及基于 ARM 的系统上以独立的二进制文件运行。

该项目在github上已有`47.5k` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/bfbc9f4d921334bb2158df740463eeca.png)


github地址：[https://github.com/gogs/gogs](https://github.com/gogs/gogs)

文档地址: [https://gogs.io/](https://gogs.io/)



## 为什么选择 Gogs？

### 轻量级，低资源占用

Gogs 最吸引人的特点就是轻量。有人在仅有 64MB 内存的 Docker 容器中运行 Gogs！对于团队协作，2 个 CPU 核心和 512MB 内存就足够起步了。

### 功能丰富，不输大厂

别看 Gogs 轻量，该有的功能一个都不少：

- **用户面板**：用户仪表板、个人资料和活动时间线
- **多协议访问**：支持 SSH、HTTP 和 HTTPS 协议访问仓库
- **完整的管理功能**：用户、组织和仓库管理
- **Webhook**：支持 Slack、Discord、钉钉等
- **Git 钩子**：Git hooks、部署密钥和 Git LFS
- **协作功能**：工单（Issues）、合并请求（Pull Requests）、Wiki、受保护分支
- **仓库迁移**：从其他代码托管平台迁移和镜像仓库
- **Web 编辑器**：在线编辑仓库文件和 Wiki
- **多格式渲染**：支持 Jupyter Notebook 和 PDF 渲染
- **多认证方式**：SMTP、LDAP、反向代理、GitHub.com、GitHub Enterprise，支持两步验证
- **多语言支持**：超过 31 种语言的本地化

### 数据库支持丰富

Gogs 支持多种数据库后端：PostgreSQL、MySQL、SQLite3，以及任何支持这些协议的数据库。

## Docker 部署：5 分钟快速上手

以下是Docker具体的部署步骤：

### 第一步：拉取镜像

```bash
docker pull gogs/gogs
```

### 第二步：创建docker-compose.yml文件

创建一个部署目录`gogs`,在该目录下创建docker-compose.yml文件，内容如下：

```yaml
services:
  gogs:
    image: gogs/gogs
    container_name: gogs
    ports:
      - "10022:22"
      - "10880:3000"
    volumes:
      - ./data:/data
    restart: unless-stopped

```

这里解释一下各个参数的含义：
- `- "10022:22"`：将宿主机的 10022 端口映射到容器的 22 端口（SSH 服务）
- `- "10880:3000"`：将宿主机的 10880 端口映射到容器的 3000 端口（Web 服务）
- `- ./data:/data`：将宿主机的 `./data` 目录挂载到容器的 `/data` 目录


### 第三步：运行容器

```bash
docker-compose up -d 
```

出现如下内容则说明启动成功

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/06/9adba0170e9e0a3082ebcfb7f5fe21ae.png)




### 第四步：初始配置

启动容器后，通过浏览器访问 `http://你的服务器IP:10880` 进入安装页面。

我们需要先创建好所需要的数据库，我使用的是mysql


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/a6f992f9311f9405006c8993c76a474f.png)



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/2cb341c9bdf9e97f6e16e1da9318abe5.png)



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/f57bd8106948f804a6288a584a2568d2.png)




![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/bfbc9f4d921334bb2158df740463eeca.png)



### 第五步：使用

使用相对来说比较简单，此处不多做讲解

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/512bad13666682323a4d48b561d6f5ff.png)




## 常见问题与解决方案

### 1. 内置 SSH 服务器不推荐

在 Docker 容器内使用内置 SSH 服务器不被推荐。建议使用映射到宿主机的 SSH 端口（如示例中的 10022）。

## 其他方式部署

还有其他二进制包部署等方式，家人们可参考一下文章

使用 Gogs 搭建自己的 Git 服务器：[https://blog.mynook.info/post/host-your-own-git-server-using-gogs/](https://blog.mynook.info/post/host-your-own-git-server-using-gogs/)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/08/e3ec5dd980ebc8e1fcbeff82cfa5974d.png)


## 结语

Gogs 是一个小而美的 Git 服务解决方案。无论你是想在个人服务器上搭建私有的代码仓库，还是为小团队提供一个轻量级的代码协作平台，Gogs 都是一个值得考虑的选择。

它的简洁并不意味着功能的缺失，相反，Gogs 在保持轻量的同时，提供了 Git 托管服务所需的核心功能。加上 Docker 的一键部署，你可以在几分钟内拥有一个属于自己的 Git 服务。
