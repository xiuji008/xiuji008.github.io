

在这个信息爆炸的时代，你是否也面临着这样的困扰：打开微博、知乎、抖音，本想快速了解热点，却不自觉地陷入信息流中，半小时过去了，真正有价值的内容却没看到几条。各种算法推荐机制让我们被信息“投喂”，而不是主动“获取”。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/31/5d1515996acff18ec90421a4b506f858.png)

今天，我要向大家推荐一款开源神器——**TrendRadar**，它能帮助你告别无效刷屏，只看你真正关心的新闻资讯。

## 什么是 TrendRadar？

TrendRadar 是一个轻量级、易部署的热点新闻聚合与推送工具。它能够从知乎、抖音、B站、微博、百度、华尔街见闻等11个主流平台抓取热搜榜单，然后根据你设定的关键词进行智能筛选，最终将你最关心的内容推送到手机或邮箱。

项目的核心理念是：**“告别被算法推荐绑架，主动获取自己想要的信息”**。最快仅需30秒即可完成部署，让你从“人找信息”转变为“信息找人”。

github地址：[https://github.com/sansan0/TrendRadar](https://github.com/sansan0/TrendRadar)

该项目目前在github上已有`58.6k` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/31/83f67ad0ea1fe51a78b6ddcbb6b36b45.png)



## 核心亮点：它凭什么吸引人？

### 1. 极速部署，上手无门槛

TrendRadar 的设计目标就是“轻量，易部署”。无论你是技术小白还是资深开发者，都能轻松上手。

- **GitHub Actions 方案**：无需服务器，完全免费。Fork 项目后配置好推送密钥（如企业微信机器人），系统便会定时自动运行。
- **Docker 方案**：适合有 NAS 或个人服务器的用户，数据本地存储，更加稳定可靠。
- **本地运行**：也支持在 Windows、Mac、Linux 上直接运行。

### 2. 精准筛选，只关注你关心的

这是 TrendRadar 最核心的价值。你不需要看全网所有的热搜，只需要在 `frequency_words.txt` 文件中设置好关键词，它就会帮你“盯着”。

例如，如果你关注科技和投资，可以这样配置：
```txt
# 科技组
AI
人工智能
ChatGPT
+发布   # 必须同时包含“发布”

# 投资组
A股
特斯拉
比亚迪
!预测   # 排除包含“预测”的新闻
```
系统支持普通词、必须词（+）、过滤词（!）、数量限制（@），甚至支持正则表达式，让你拥有极高的定制自由度。

### 3. 三种智能推送模式，适应不同场景

根据你的使用习惯，TrendRadar 提供了三种推送模式：

- **当日汇总 (daily)**：适合普通用户，定时推送当天所有匹配的新闻，不错过任何动态。
- **当前榜单 (current)**：适合内容创作者，每次推送当下热度最高的新闻，帮助你捕捉实时风向。
- **增量监控 (incremental)**：适合投资者/交易员，只推送新出现的内容，零重复，避免信息干扰。

### 4. 多渠道多账号推送，消息直达

无论你习惯使用什么通讯工具，TrendRadar 都能覆盖。它支持：
- **企业微信**（并可配置推送到个人微信）
- **飞书**、**钉钉**
- **Telegram**
- **邮件**（自动识别 QQ、Gmail、163 等多种邮箱）
- **ntfy**（开源免费推送服务）
- **Bark**（iOS 专属）
- **Slack**
- 通用 Webhook（可对接 Discord、IFTTT 等）

更棒的是，它支持**多账号推送**。如果你想同时把新闻发给公司的几个部门群，只需要用分号把 Webhook 地址隔开即可。

### 5. AI 赋能，深度分析热点

这是 TrendRadar v5.0 之后引入的“杀手锏”功能。当你开启 AI 分析后，它不仅仅是转发新闻列表，而是像一个专业的分析师：
- **自动生成摘要**：将冗长的新闻列表总结成几句话。
- **情感倾向分析**：判断舆论是正面、负面还是争议。
- **跨平台关联**：发现同一个事件在不同平台的热度表现。
- **趋势预测**：分析话题是刚爆发还是已降温。

你还可以自定义 AI 的“人设”，让它扮演毒舌评论员或严谨的投研顾问。



## 如何开始？

### Docker 部署

下载项目，将 `config` 和 `output`  目录复制到部署目录下并创建`docker-compose.yml`文件,内容如下：

```yaml
services:
  trendradar:
    image: wantcat/trendradar:latest
    container_name: trendradar
    restart: unless-stopped

    ports:
      - "8088:${WEBSERVER_PORT:-8080}"

    volumes:
      - ./config:/app/config:ro
      - ./output:/app/output

    environment:
      - TZ=Asia/Shanghai
      # Web 服务器
      - WEBSERVER_PORT=${WEBSERVER_PORT:-8080}
      # 通知渠道
      - FEISHU_WEBHOOK_URL=${FEISHU_WEBHOOK_URL:-}
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN:-}
      - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID:-}
      - DINGTALK_WEBHOOK_URL=${DINGTALK_WEBHOOK_URL:-}
      - WEWORK_WEBHOOK_URL=${WEWORK_WEBHOOK_URL:-}
      - WEWORK_MSG_TYPE=${WEWORK_MSG_TYPE:-}
      # 邮件配置
      - EMAIL_FROM=${EMAIL_FROM:-}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD:-}
      - EMAIL_TO=${EMAIL_TO:-}
      - EMAIL_SMTP_SERVER=${EMAIL_SMTP_SERVER:-}
      - EMAIL_SMTP_PORT=${EMAIL_SMTP_PORT:-}
      # ntfy配置
      - NTFY_SERVER_URL=${NTFY_SERVER_URL:-https://ntfy.sh}
      - NTFY_TOPIC=${NTFY_TOPIC:-}
      - NTFY_TOKEN=${NTFY_TOKEN:-}
      # Bark配置
      - BARK_URL=${BARK_URL:-}
      # Slack配置
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL:-}
      # 通用Webhook配置
      - GENERIC_WEBHOOK_URL=${GENERIC_WEBHOOK_URL:-}
      - GENERIC_WEBHOOK_TEMPLATE=${GENERIC_WEBHOOK_TEMPLATE:-}
      # AI 配置（ai_analysis 和 ai_translation 共享模型配置）
      - AI_ANALYSIS_ENABLED=${AI_ANALYSIS_ENABLED:-}
      - AI_API_KEY=${AI_API_KEY:-}
      - AI_MODEL=${AI_MODEL:-}
      - AI_API_BASE=${AI_API_BASE:-}
      # 远程存储配置（S3 兼容协议）
      - S3_ENDPOINT_URL=${S3_ENDPOINT_URL:-}
      - S3_BUCKET_NAME=${S3_BUCKET_NAME:-}
      - S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID:-}
      - S3_SECRET_ACCESS_KEY=${S3_SECRET_ACCESS_KEY:-}
      - S3_REGION=${S3_REGION:-}
      # 运行模式
      - CRON_SCHEDULE=${CRON_SCHEDULE:-*/30 * * * *}
      - RUN_MODE=${RUN_MODE:-cron}
      - IMMEDIATE_RUN=${IMMEDIATE_RUN:-true}

  trendradar-mcp:
    image: wantcat/trendradar-mcp:latest
    container_name: trendradar-mcp
    restart: unless-stopped

    ports:
      - "${MCP_HOST:-127.0.0.1}:${MCP_PORT:-3333}:3333"

    volumes:
      - ./config:/app/config:ro
      - ./output:/app/output

    environment:
      - TZ=Asia/Shanghai
      - MCP_PORT=${MCP_PORT:-3333}
      
```

在docker-compose.yml 同级目录下使用以下命令启动

```bash
docker-compose up -d
```

到此，如果没问题的话项目就启动完成了，如果需要修改配置，则在config 下修改具体的配置信息，修改完成后重启容器即可

整个过程熟练后甚至不需要 30 秒。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/31/8a909b24b865b5ea1da11d9d33ac708f.png)




## 结语

TrendRadar 是一个真正将“主动权”交还给用户的开源项目。它没有复杂的界面，没有烦人的广告，只有纯粹、定制化的信息流。

如果你也受够了算法的“投喂”，希望在这个喧嚣的世界里拥有一片属于自己的信息净土，不妨试试 TrendRadar。




