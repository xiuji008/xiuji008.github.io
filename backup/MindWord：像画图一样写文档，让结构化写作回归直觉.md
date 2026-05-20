> 把一句话逐层结构化扩展，变成可控、可编辑、可导出的成品文档。

你是否曾经遇到过这样的困境：

- 想写一篇文章，脑子里一团乱麻，不知从何下笔？
- 在思维导图里把结构画得清清楚楚，移植到 Word 或 Markdown 编辑器里却要重新调整半天？
- 修改了一个标题的层级，结果下面的十几个段落都要手动改缩进？


如果你对以上任何一个场景点头，那么今天要介绍的开源项目 **MindWord**，或许正是你一直在找的那个工具。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/20/da8fe1f5e7dfd54cb7998309c9e20975.png)


## 什么是 MindWord？

写作本质上是一个“**逐层结构化**”的过程。我们从一句模糊的想法开始，不断拆解、细化、重组，最终形成完整的文档。

但现有的工具往往把“**画结构**”和“**写正文**”割裂成两件完全不同的事情。

- **思维导图工具**：擅长梳理结构，但节点里的文字写多了就变得臃肿，导出后还需要大量排版。
- **传统文档工具**：擅长撰写正文，但调整结构极其繁琐，往往“牵一发而动毛”。

**MindWord** 的目标很简单：**解决写作结构化难、思路与正文脱节的问题**。

它把 Markdown 的标题/列表结构与思维导图节点做**一一映射**，实现“画完即写完、写完即可视化”的写作方式。你可以借助 AI 进行头脑风暴、拆解主题、变更结构，最后套用样式生成规范的 Word 文档——整个过程行云流水。

该项目虽然在github star 较少 ，目前只有 `9` star,但是这不妨碍他是一个很有帮助的项目。



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/20/11f63306d2f6a561b60a5385d34d20bf.png)


github 地址：[https://github.com/TimiKays/MindWord](https://github.com/TimiKays/MindWord)

文档地址：[https://mindword.dpdns.org/](https://mindword.dpdns.org/)

在线地址：[https://mindword.dpdns.org/app](https://mindword.dpdns.org/app)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/20/0cc10fb8da644634403ff9fededa9bb0.png)



## 功能亮点：不止是“思维导图+编辑器”

### 1. Markdown 编辑器——数据收集与初始化

MindWord 不是一个封闭的工具，它非常重视数据的**自由进出**。

- **多种数据来源**：直接粘贴 Markdown 纯文本、从网页复制的富文本（自动转成 Markdown）、甚至直接粘贴图片。
- **导入/导出**：支持标准的 `.md` 文件，如果文档里带图片，可以打包成 `.zip` 一键导入或导出。你可以反复修改，不用担心被工具绑架。
- **本地离线存储**：所有数据都存在你的浏览器里（IndexedDB），没有服务器，没有隐私泄露风险。

### 2. 思维导图画布——可视化同步编辑文档结构

这是 MindWord 最核心的体验。

- **树形节点定义**：Markdown 里的 1-6 级标题和有序/无序列表行，会作为思维导图的**节点标题**；其他普通文本则自动成为节点的**备注**。
- **双向同步编辑**：在左侧 Markdown 里修改，右侧导图实时更新；在右侧导图中拖拽或编辑节点，左侧文档结构也同步改变。**彻底告别“画完导图再手动重写文档”的苦日子**。
- **子级递归变更**：当你把一个父节点拖到另一个位置，它下面所有的子节点和对应的 Markdown 段落都会自动调整层级。再也不用一个个修改标题级别了。
- **节点选中指示器**：选中某个节点后，左侧编辑器和预览区会自动滚动并高亮对应行——让你在大纲和正文之间永远不会迷路。

### 3. AI 辅助生成（可选，需配置 API Key）

写作过程中的“卡壳”往往发生在需要细化某个节点的时候。

MindWord 提供了实用的 AI 能力（需自行配置 OpenAI 兼容的 API Key）：

- 选中一个节点，让 AI 一键生成子节点。
- 让 AI 为某个节点扩展或润色描述。
- 使用自然语言指令，比如“把这个节点扩展成 3 个子主题，并补充要点”。

> 隐私提示：AI 功能是**可选**的，需要你主动配置 Key，相关文本会发送到你配置的 AI 服务。除此之外，所有数据都留在本地。

### 4. Word 文件生成——从思路到正式文档的闭环

结构有了，内容有了，怎么交付给同事或客户？

MindWord 支持基于 Markdown 内容 + Word 模板生成规范的 `.docx` 文档：

- **预设模板**：开箱即用，一键生成。
- **自定义模板**：如果你公司有严格的 Word 样式规范，可以下载默认模板，修改样式集后再上传。系统会基于你的样式生成文档。

这对于经常要出 **PRD、设计方案、周报、学习笔记** 的人来说，简直是效率神器。


## 隐私与存储

- **默认**：所有文档与图片存储在本地浏览器的 IndexedDB 中，不上传任何服务器。
- **开源许可**：项目完全开源，你可以自托管，也可以根据自己需要修改。
- **AI 功能**：需要用户明确配置 API Key 后才可使用，相关文本仅发送到你配置的服务。

## 快速开始

### 在线使用

如果你不想部署或安装到本地的话可以使用作者提供的在线地址使用

在线地址：[https://mindword.dpdns.org/app](https://mindword.dpdns.org/app)

### Docker部署

如何你怕作者提供的在线地址消失或不稳定的话也可以自己使用Docker私有化部署,一下是部署步骤：

**1. 克隆/下载代码**

将代码克隆/下载到本地

**2. 添加Dockerfile文件**

在下载代码的父文件夹同级目录下添加`Dockerfile`文件，内容如下：

```
# 使用 nginx:1.21.5 作为基础镜像
FROM nginx:1.21.5


# 复制自定义 nginx 配置文件
# 假设 nginx.conf 在构建上下文目录下（与 MindWord-main 同级）
COPY nginx.conf /etc/nginx/nginx.conf 

# 复制静态文件到 nginx 默认的 html 目录
# 注意：如果 MindWord-main 文件夹内有 index.html，会被复制到 /usr/share/nginx/html/
COPY MindWord-main/ /usr/share/nginx/html/

# 可选：设置工作目录
WORKDIR /usr/share/nginx/html

# 暴露端口 80
EXPOSE 80

# 启动 nginx（前台运行）
CMD ["nginx", "-g", "daemon off;"]

```

我们构建的镜像是基于nginx 构建的，同时添加nginx的配置文件`nginx.conf`，内容如下：

```
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout 65;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/javascript application/json application/xml
               image/svg+xml font/ttf font/woff font/woff2;

    server {
        listen 80;
        server_name localhost;

        root   /usr/share/nginx/html;
        index  index.html;

        # 安全头
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;

        # Service Worker
        location /sw.js {
            add_header Cache-Control "no-cache";
            add_header Service-Worker-Allowed "/";
        }

        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|mp4)$ {
            expires 30d;
            add_header Cache-Control "public, immutable";
        }

        # HTML 文件不缓存（SPA 需要）
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-cache, must-revalidate";
        }

        # 主路由 - SPA fallback
        location / {
            try_files $uri $uri/ /index.html;
        }

        # 禁止访问隐藏文件
        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}


```

**3. 构建镜像**

在Dockerfile同级目录下执行一下命令构建镜像

```shell
docker build -t xj/mindwork:1.0   .
```

**4. 创建docker-compose.yml文件并启动容器**

镜像构建成功后，创建`docker-compose.yml`文件,内容如下：

```yaml
services:
  mindword:
  # 此镜像是我构建好之后推送到阿里云镜像仓库的，不想构建镜像的家人们可以直接使用
    image: registry.cn-hangzhou.aliyuncs.com/xjpublic/mindword:1.0
    container_name: mindword-app
    ports:
      - "38080:80"
    restart: unless-stopped
```

**注：`registry.cn-hangzhou.aliyuncs.com/xjpublic/mindword:1.0`镜像是我构建好之后推送到阿里云镜像仓库的，不想构建镜像的家人们可以跳过构建步骤直接使用**

使用以下命令启动容器

```shell
docker-compose up -d
```

**5. 使用**

服务启动后直接访问浏览器使用`http://192.168.31.195:38080/app.html`



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/20/287c38574a0bcc5a16aa02f0833fdf41.png)

虽然到处的word 还有很多问题，但思维导图的功能还是挺不错的


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/20/0eddf56389ee2700844ad9f48f5faa04.png)

如果像使用云端同步功能的话需要使用邮箱注册登录，登录之后有10M的云同步空间

像其他一些功能比较简单，家人们可自行尝试

## 写在最后

MindWord 不是一个试图取代 Word 或 Notion 的庞然大物，它更像一个**思维与文档之间的桥梁**。

它尊重你最习惯的写作方式（Markdown），也理解你结构化思考的本能（思维导图），还为你留好了通往正式交付物（Word）的最后一段路。最重要的是，**它不锁住你的数据**——随时可以带着干净的 Markdown 文件离开。

如果你也厌倦了在“画结构”和“写正文”之间来回搬运内容，不妨试试 MindWord。


