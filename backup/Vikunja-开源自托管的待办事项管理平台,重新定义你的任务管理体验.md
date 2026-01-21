


在数字化时代，我们每天都要处理无数的任务和项目。无论是工作上的项目规划，还是生活中的购物清单，一个优秀的待办事项管理工具都能让我们的生活更加有序高效。今天，我要向大家介绍一款功能简洁实用、完全开源的自托管任务管理平台——Vikunja。

![](https://xiuji008.github.io/images/202601/vikunja-logo.png)

## 🧠 什么是Vikunja？

Vikunja是一个用Go语言编写的开源待办事项应用程序，旨在帮助个人和团队更好地组织生活和工作。它的设计理念是“简单而不简陋”——提供了丰富的功能，同时保持了直观的用户体验。

与许多商业任务管理工具不同，Vikunja是完全开源的（采用AGPL-3.0许可证），这意味着你可以完全控制自己的数据，无需担心隐私问题或供应商锁定。

- github地址：<https://github.com/go-vikunja/vikunja>

- 官网地址：<https://vikunja.io/>

- 在线演示： <https://try.vikunja.io/>

- 文档地址：<https://vikunja.io/docs/>

该项目目前在github上已有3.1k ⭐️star

![](https://xiuji008.github.io/images/202601/vikunja-star.png)

## 🗣️核心特性亮点

### 🌟 多功能任务管理
Vikunja不仅仅是一个简单的待办事项清单。它支持：
- **列表和看板视图**：灵活切换不同视图方式
- **子任务和依赖关系**：创建复杂的任务层次结构
- **标签和筛选器**：轻松组织和查找任务
- **截止日期和提醒**：确保不会错过重要事项
- **附件支持**：上传相关文件和图片

### 🔗 团队协作功能
- **项目共享**：与团队成员协作完成任务
- **评论系统**：在任务上进行讨论
- **权限管理**：精细的访问控制

### 📱 全平台支持
- **Web界面**：现代化的响应式设计
- **移动应用**：Android和iOS应用
- **API驱动**：完整的REST API支持
- **第三方集成**：可与现有工作流集成

安装包地址：<https://dl.vikunja.io/desktop/>

## 🫖技术架构

Vikunja采用现代化的技术栈构建：

- **后端**：Go语言，性能优异
- **前端**：Vue.js，响应式设计
- **数据库支持**：PostgreSQL、MySQL/MariaDB、SQLite
- **API文档**：Swagger/OpenAPI自动生成

## 🍵部署方式多样化

Vikunja提供了灵活的部署选项，适应不同用户的需求,我们选择的是docker部署：

### 🐳 Docker部署（推荐）


最简单的部署方式，提供完整的docker-compose配置示例(我是用的是sqllite)：

```yaml
services:
  vikunja:
    image: vikunja/vikunja
    environment:
      VIKUNJA_SERVICE_JWTSECRET: vikunja
      VIKUNJA_SERVICE_PUBLICURL: http://192.168.31.195:3456/
    ports:
      - 3456:3456
    volumes:
      - ./files:/app/vikunja/files
      - ./db:/db
    restart: unless-stopped
```

创建过载目录并授权

```shell

mkdir $PWD/files $PWD/db

chown 1000 $PWD/files $PWD/db
```

启动服务

```shell
docker-compose up -d 
```



## 🔧配置灵活性

### 🧿数据库支持
- **PostgreSQL**（推荐用于生产环境）
- **MySQL/MariaDB**
- **SQLite**（适合个人使用或轻量级部署）

### 💾缓存系统

对于高负载环境，Vikunja支持Redis作为缓存后端：

```yaml
VIKUNJA_REDIS_ENABLED: 1
VIKUNJA_REDIS_HOST: 'redis:6379'
VIKUNJA_CACHE_ENABLED: 1
VIKUNJA_CACHE_TYPE: redis
```


## ✳️ 开始使用

首次使用需要先注册用户

- 注册用户

![](https://xiuji008.github.io/images/202601/vikunja-register.png)

- 首页

![](https://xiuji008.github.io/images/202601/vikunja-firstpage.png)

![](https://xiuji008.github.io/images/202601/vikunja-firstpage-todo.png)

- 创建团队、标签、创建项目

- 添加代办、设置代办

![](https://xiuji008.github.io/images/202601/vikunja-todo-setting.png)

- 列表、甘特图、看板、表格

![](https://xiuji008.github.io/images/202601/vikunja-gtt.png)

## 🌑结语

Vikunja代表了一种新的任务管理理念——强大而不复杂，功能丰富而不臃肿。它既适合个人用户管理日常任务，也适合团队协作完成复杂项目。

无论你是注重隐私的个人用户，还是需要自托管解决方案的企业，Vikunja都值得一试。它的开源本质意味着你永远不必担心供应商锁定或突然的功能变更。

在这个数据隐私日益重要的时代，拥有一个既能满足功能需求又能保障数据安全的任务管理工具变得越来越重要。Vikunja正是在这样的需求下应运而生，为用户提供了一个完美的解决方案。

![](https://xiuji008.github.io/images/202601/vikunja-logoly.png)

## 🐟今日摸鱼小贴士：带薪拉屎

据民间不完全统计，每天“带薪如厕”30分钟，一年下来就相当于为自己“创造”了11天的带薪假期。这种“无中生假”的艺术，堪称当代职场人的隐秘福利，也是年轻工作者在规则之内、为自己争取片刻呼吸的权利。现在，你懂了吗？

![](https://xiuji008.github.io/images/202601/moyu.jpg)


