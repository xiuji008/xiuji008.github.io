



在这个数字化的时代，我们每个人工作或者学习中都需要记住数十甚至上百个账号密码。写在文档或者纸上容易丢，使用商业密码管理器又要花钱……如果你也有这些困扰，那么今天我要介绍的这个开源项目，可能会成为你的工作生活中的管家。

![password-xl-logo.md.png](https://xiuji008.github.io/images/202601/password-xl-logo.png)

## 🚀 认识 password-XL：你的私有密码管家

**password-XL** 是一款 开源的密码管理工具，专注于：

- 🔐 安全可靠：支持私有部署，数据完全由用户掌控
- 🎨 界面美观：现代化 UI，支持多端使用
- 🧩 功能丰富：覆盖个人与团队常见密码管理场景
- 🏠 部署灵活：支持官网即用、Docker、Jar、NAS 等多种部署方式

无论是个人使用，还是在 NAS / 服务器中自建私有密码库，password-XL 都可以满足你的需求。

项目地址：[https://github.com/peng0105/password-xl](https://github.com/peng0105/password-xl)

![password-xj-github.png](https://xiuji008.github.io/images/202601/password-xj-github.png)

## 🐳 docker-compose部署

此项目使用docker整体部署较为简单

### 第一步： 创建docker-compose.yml文件

在服务器上创建部署目录 `password-xj`,在此目录下创建docker-compose.yml文件，内容如下：

```yml
services:
  password-xl-service:
    image: ccr.ccs.tencentyun.com/password-xl/password-xl-service:latest
    container_name: password-xl-service
    restart: unless-stopped
    ports:
      - "9080:8080"
    volumes:
      - ./data:/password-xl-service
```

### 第二步： 启动容器，修改挂载目录权限

在docker-compose.yml的同级目录下使用以下命令启动容器

```shell
docker-compose up -d
```

启动之后修改挂载目录权限

```shell
sudo chmod -R 777 ./data
```

查看启动日志

```shell
docker-compose logs -f
```

启动日志中有初始话的主密码和用户，需要记住，在登录的时候使用

![password-xl-start-log.png](https://xiuji008.github.io/images/202601/password-xl-start-log.png)

到此，我们的服务就部署完了


## 💻 使用

在浏览器中打开我们的服务地址访问服务http://ip:port

### 登录

在登录页使用私有服务登录，账号密码在启动日志中有打印
![password-xk-login.png](https://xiuji008.github.io/images/202601/password-xk-login.png)


![password-xj-login-serve.png](https://xiuji008.github.io/images/202601/password-xj-login-serve.png)

登录之后需要设置图形密码

![password-xl-imagep.png](https://xiuji008.github.io/images/202601/password-xl-imagep.png)

### 使用

正常使用较为简单，有密码和笔记

![password-xl-padd.png](https://xiuji008.github.io/images/202601/password-xl-padd.png)

![password-xl-list.png](https://xiuji008.github.io/images/202601/password-xl-list.png)

![password-xl-note.png](https://xiuji008.github.io/images/202601/password-xl-note.png)


### 修改用户及主密码

页面上不支持修改主密码及用户，若需要修改主密码及用户，则需要修改服务挂载目录下的`password-xl.toml`文件中的信息，然后重启容器即可生效

![password-xl-puinfo.png](https://xiuji008.github.io/images/202601/password-xl-puinfo.png)







## 💎结语

password-XL是一款极具潜力的开源密码管理工具，它在隐私保护、成本控制和技术创新方面表现出色，特别适合对数据主权有要求的用户。

然而，与成熟的商业产品相比，在用户体验、生态完善度和企业功能方面仍有提升空间。对于普通用户，如果不怕折腾且重视隐私，password-XL是绝佳选择；对于追求极致便利和全面功能的企业用户，可能需要等待其进一步发展。

总的来说，password-XL代表着开源密码管理工具的正确方向——安全、可控、透明。 随着社区的壮大和功能的完善，它有望成为更多人信赖的密码管理解决方案。


## ❗❗❗ 重要安全提示
> [!NOTE]
> 【重要安全提示】请务必妥善保管个人银行卡密码及重要软件密码，切勿向他人泄露或使用简单易猜的密码组合。定期更换密码，避免多账户共用同一密码。

