

>文章简介：Leantime是一款专为非专业项目经理设计的开源项目管理工具，在Jira的臃肿和Trello的简化之间找到了完美平衡。它集成了战略规划、敏捷看板、甘特图、知识管理、工时跟踪等全面功能，支持Docker一键部署。无论是创业团队还是企业部门，Leantime都能以极低的学习成本，让每位成员轻松参与项目协作。告别过度复杂的工具，用这款轻量而强大的神器，为你的2026年项目计划保驾护航。

岁末已至，农历新年过后，2025年就将正式告别。回顾这一年，仿佛仍是一事无成；转眼迈入2026，我决心启动一个开源项目的计划。正所谓“工欲善其事，必先利其器”，为此我调研了一些轻量级的开源项目管理工具，最终在GitHub上发现了这个项目——实在忍不住想推荐给大家！

![](https://xiuji008.github.io/images/202601/leantime-logo.png)

你是否也曾受困于复杂的项目管理工具？是否觉得Jira虽然功能强大却过于沉重，Trello简洁易用却又稍显功能不足？今天，我想为大家推荐一款优秀的开源解决方案——Leantime。它在丰富功能与流畅体验之间取得了很好的平衡，尤其适合非专业项目经理使用。

## ❓什么是Leantime？

Leantime是一个专为**非专业项目经理**设计的开源项目管理系统。它独特地结合了战略规划、项目管理和执行跟踪，让团队中的每个人都能轻松上手使用。

github地址：[https://github.com/Leantime/leantime](https://github.com/Leantime/leantime)

官网地址：[https://leantime.io/](https://leantime.io/)

文档地址：[ https://docs.leantime.io/]( https://docs.leantime.io/)

该项目在github上已有9k ⭐️star

![](https://xiuji008.github.io/images/202601/leantime-star.png)

## 🔍核心功能一览

### 🗂️任务管理

- 多种视图：看板、甘特图、表格、列表和日历视图
- 无限子任务和依赖关系管理
- 里程碑管理
- 敏捷冲刺管理
- 时间跟踪和工时表

### 📋项目规划
- 项目仪表板和状态报告
- 目标和指标跟踪
- 精益画布和商业模式画布
- SWOT分析画布
- 风险分析工具

### 🧠信息知识管理
- Wiki文档系统
- 创意看板
- 项目回顾工具
- 文件存储（支持S3或本地文件系统）
- 屏幕和网络摄像头录制功能
- 全面的评论讨论系统

### ⚙️管理功能
- 简易安装部署
- 多用户角色和项目权限管理
- 双因素认证
- LDAP和OIDC集成
- 可扩展的插件系统和API
- Slack、Mattermost、Discord集成
- 支持20多种语言



## 🚀安装部署

此项目可从release 发布页面下载安装包到本地安装，我们此处使用的是docker部署

### 🐳Docker部署（推荐）

- 需要先创建mysql 数据库 leantime

- 创建docker-compose.yml文件，内容如下：

```yaml
services:
  leantime:
    image: leantime/leantime:latest
    container_name: leantime
    restart: unless-stopped
    ports:
      - "2080:8080"
    environment:
      - LEAN_DB_HOST=192.168.31.195:3306
      - LEAN_DB_USER=root
      - LEAN_DB_PASSWORD=xj123456
      - LEAN_DB_DATABASE=leantime
      - LEAN_EMAIL_RETURN=xiuji008@qq.com
```
- 在docker-compose.yml 同级目录下使用以下命令启动项目

```shell
docker-compose up -d
```
到此，基础部署就已经完成了

## ✨上手体验 

在浏览器中打开我们部署的地址来访问项目，首次需要先设置管理员

- 设置管理员

![](https://xiuji008.github.io/images/202601/leantime-set-administrator.png)

- 设置密码、主题等等

![](https://xiuji008.github.io/images/202601/leantime-set-password.png)

- 主页

![](https://xiuji008.github.io/images/202601/leantime-firstpage.png)

- 设置中文、日期、时区等

![](https://xiuji008.github.io/images/202601/leantime-set-language.png)


- 其它项目、里程碑、蓝图、代办、看板等等功能我们就不一一列举了，家人们可以先自己部署完试验下

![](https://xiuji008.github.io/images/202601/leantime-project.png)




## 📝总结

Leantime是一个真正为用户考虑的项目管理工具。它不仅在功能上能够满足企业级需求，更重要的是，它在易用性和包容性方面做得非常出色。无论你是小型创业团队还是大型企业，无论你的团队成员技术背景如何，Leantime都能提供出色的项目管理体验。

## 💬今日闲谈

刷短视频时看到一句话，颇有意思：

**把“责任”二字看得太重，就是对自我最大的暴力——过度负责，是病，得治。**

确实如此。如今我们做事，似乎总在两个极端间摇摆——不是“过度负责”，就是“不负责任”。而真正要做的，恰恰是在两者之间找到平衡：认真负责却不越界，勇于承担却不盲从。

![](https://xiuji008.github.io/images/202601/leantime-speak.png)



