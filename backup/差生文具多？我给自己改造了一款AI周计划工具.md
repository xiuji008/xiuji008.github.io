

> 今年以来，感觉记忆力直线下降，啥事前脚说完，后脚就忘掉。但对于我们差生来说，不是记忆力减弱了，也不是执行力不高，而是——没有一款好用的待办事项记录软件。

最近逛GitHub的时候，发现了一款极简的开源待办项目WeekToDo，在此基础上用AI做了一些个性化改造，今天介绍给家人们。

当然，文具再多，执行力还得从自身出发。但至少，先把工具准备好。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/a639a49c6bcad3f345ff2d0ce28079cc.png)


## 为什么需要它？

你有没有这样的经历：

> 媳妇交代三件事，转头就只记得半件。  
> 手机备忘录记了十几条，但从来不打开看。  
> 每天忙忙碌碌，到晚上回想起来却觉得啥也没干。  
> 工具换了一个又一个，最后都在桌面吃灰。

我尝试过各种待办工具，最后没一个用起来的。

直到我看到WeekToDo。

## WeekToDo是什么？

WeekToDo是一款免费开源的极简每周计划应用，核心理念就三个词：**极简、本地、周视图**。

它有这些特点：

- **以周为单位**：不是日视图那种碎片化视角，而是让你从整周的高度规划时间
- **数据在本地**：所有任务存在浏览器或本地存储，不经过任何云端服务器
- **跨平台**：Web版、Windows、Mac、Linux全支持
- **功能刚刚好**：待办列表、子任务、拖拽排序、任务颜色、循环任务、Markdown支持

原项目github 地址：[https://github.com/manuelernestog/weektodo](https://github.com/manuelernestog/weektodo)
原项目 Demo 地址：[https://app.weektodo.me/](https://app.weektodo.me/)

该项目目前在github 已有 `2.1k` star


![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/28151fbb72f68307ccfc5cb61d3b8e6d.png)

原项目Demo 

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/064a1bf2550299d2006ca802ec782a78.png)


## 我改造了什么？

工具虽好，但总觉得少了点什么。于是基于v2.2.0版本，我动手做了一套改造。

改造后项目github 地址：[https://github.com/xiuji008/weektodo](https://github.com/xiuji008/weektodo)

改造后的Demo地址：[https://xiuji008.github.io/weektodo/](https://xiuji008.github.io/weektodo/)


### 1. AI生成待办、周总结

这是我最满意的部分。以前每天早上要花10-15分钟梳理当天的任务，现在：

- 在周视图标题栏点一下 **“AI生成周待办”**
- 输入需求：比如 *“本周需要完成项目周报、整理季度数据、预约客户会议”*
- AI自动帮你拆解任务、分配优先级、安排到合适的时间

对于自定义列表也支持AI生成，流式输出，实时预览JSON结果，确认后一键应用。支持颜色标签、时间、优先级等丰富属性。

每周也可以使用AI 生成周总结，作为一周的复盘。

AI服务支持OpenAI、DeepSeek、Moonshot（月之暗面）、Qwen（通义千问）、SiliconFlow，以及任何兼容OpenAI格式的API。数据只经过你配置的API，不会泄露给第三方。

### 2. 五级优先级系统 

改造了原有的三级优先级，引入L1~L5五级定义，让任务等级更清晰：

| 等级 | 标签 | 处理时效 | 视觉颜色 |
|------|------|----------|---------|
| **L1** | 今日必保 | 今天必须完成 | 🔴 红色 |
| **L2** | 今日主攻 | 今天优先推进 | 🟠 橙色 |
| **L3** | 本周排期 | 本周内完成即可 | 🔵 蓝色 |
| **L4** | 有空再做 | 本月内考虑 | 🟢 绿色 |
| **L5** | 未来待定 | 不承诺本月完成 | ⚪ 灰色 |

不同优先级采用不同字号，L1最大、L5最小，一眼就能看出任务轻重缓急。AI生成时也会根据任务性质智能分配优先级。

### 3. S3数据同步

本地存储虽然安全，但换电脑数据迁移麻烦。我加入了S3兼容的云同步：

- 支持AWS S3、MinIO、Cloudflare R2、Backblaze B2
- 手动同步 + 自动同步（启动拉取 + 变化推送）
- 历史版本管理，可以随时恢复到某个时间点的数据

API凭证只存本地，不经过任何中间服务。

**注：** 如果是github pages 部署，则s3 地址需配置呈https 请求

### 4. 心情跟踪 

在日历下方加了一个心情跟踪器，每天可以记录多个心情表情。回头翻看时，能大概回忆起来那周的状态——是焦虑的一周，还是平静的一周。


### 5. Docker部署

添加了原项目的docker镜像及个性化改造之后的docker镜像。

原项目构建的镜像 `registry.cn-hangzhou.aliyuncs.com/xj_lew/weektodo:2.2.0`

改造之后的项目构建的镜像 `registry.cn-hangzhou.aliyuncs.com/xj_lew/weektodo:3.0.0`

### 6. GitHub Pages自动部署 🚀

推送代码到main分支，自动构建并部署到GitHub Pages，Web版本随时可用。

github pages 地址： [https://xiuji008.github.io/weektodo/](https://xiuji008.github.io/weektodo/)


## 功能对比

| 功能 | 原版 | 改造版 |
|------|------|--------|
| AI生成待办 | ❌ | ✅ |
| L1~L5五级优先级 | ❌ | ✅ |
| S3云同步 | ❌ | ✅ |
| 心情追踪 | ❌ | ✅ |
| 周总结 | ❌ | ✅ |
| Docker镜像 | ❌ | ✅ |
| 自动部署 | ❌ | ✅ |
| 中文支持 | ✅ | ✅ 更完善 |

## 快速上手

Docker 部署

1. 创建 `docker-compose.yml` 文件,内容如下：

```yaml
services:
  weektodo:
  # 原项目镜像  registry.cn-hangzhou.aliyuncs.com/xj_lew/weektodo:2.2.0
    image: registry.cn-hangzhou.aliyuncs.com/xj_lew/weektodo:3.0.0
    container_name: weektodo
    restart: unless-stopped
    ports:
      - "18000:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 1m30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

2. 创建`nginx.conf` 文件，内容如下：

```conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression for static assets
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # No index listing
    autoindex off;

    # Cache static assets with hashed filenames
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing — all paths fall back to index.html
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, must-revalidate";
    }
}
```


3. 启动容器

```shell
docker-compose up -d 
```

4. 查看日志

```shell
docker-compose logs -f 
```

如出现以下日志，则服务正常启动


![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/3cc392ff753bbca35798df7a50d0a9f1.png)

5. 访问服务

在浏览器中输入地址访问服务

- s3 服务同步数据配置

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/842974c39df7e61f9d18ccd7c597b2ae.png)

- ai 配置

ai 内置了一些常用厂商的api地址，也可以自己配置兼容OpenAI格式的API, 待办提示词也可以配子

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/a23abc83476524ad857e2613068c94b2.png)



- AI 待办使用

AI 这个功能还是挺方便的，媳妇给我安排任务怕我忘记了，还专门拉了个群设置群公告让我记者，可是我转头依旧忘，尤其是看到一大堆文字的时候连看完都困难，现在可以直接粘贴过来拆分成待办，很清晰。

媳妇发布的任务

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/6d2535a4be6752599b474949018d6c87.png)

拆分待办


![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/22612ecfc1f18e8182bc96fdbcf22569.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/46706d397c6f9dc0433c98882f804d7c.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/05687559a6c27e0e6e19026bece21a53.png)


- 周总结

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/08/c33136a870baffaa7d9436b4e66350ad.png)



## 一些感触

改造完这个工具，我最大的感触是：**工具永远只是工具，真正的执行力还得靠自己。**

差生文具多，这句话我是认的。但反过来说，好的文具至少能让你在学习的路上少一些摩擦力。一个好用的待办工具，能帮你：

- 把大脑里的任务清空，释放认知负担
- 用更少的时间规划，把精力留给执行
- 通过周总结获得正反馈，形成良性循环

但如果你打开了软件却不记录，记录了却不执行，执行了却不复盘——那换成什么工具都没用。

## 写在最后

这次改造让我再次体会到开源的价值。站在前人的肩膀上，用代码把自己想要的功能“长”出来，这种感觉很棒。

感谢原项目作者的开源贡献。

如果你也是那个“记忆力不太好”的差生，欢迎试试这个工具。也欢迎去原项目点个Star，或者fork我的版本自己折腾。

**工具准备好了，剩下的——就看我们自己了。**