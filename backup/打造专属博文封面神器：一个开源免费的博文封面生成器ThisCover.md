
> 颜值与实力并存，一分钟搞定社交媒体封面图

在日常内容创作中，封面图往往是吸引用户点击的第一道门槛。无论是公众号及博文推文、视频封面还是知识卡片，一张美观的封面图往往能事半功倍。

今天要给大家推荐一个开源项目——**ThisCover**，让你轻松搞定封面图制作。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/6911371bcc1bbd9463de55c52cbaa42c.png)


## 项目简介

**ThisCover** 是一个免费、漂亮的封面生成器，基于 [**rutikwankhade/CoverView**](https://github.com/rutikwankhade/CoverView) 二次开发。

项目进行了全面架构升级，采用现代化技术栈：

- **next.js v16**
- **react v19**
- **shadcn/ui**
- **tailwindcss v4**
- **lucide icons**

在原版基础上，此项目重点进行了**中文汉化** + 本土化功能定制和扩展，更贴合国内用户的使用习惯。

github地址：[https://github.com/weizwz/cover](https://github.com/weizwz/cover)

在线文档及使用地址：[https://cover.weizwz.com/](https://cover.weizwz.com/)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/aede32a0f19e5ff8f8f0ffaf231cb561.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/d94029c2ad525aeaf2f20d185eacd099.png)




## 核心功能一览

### 🎨 设计定制能力

| 功能 | 数量/特性 |
|------|-----------|
| 免费商用字体 | 29+ |
| 纹理主题 | 18+ |
| 常用画布比例 | 9+（1:1、16:9、4:3等） |
| 图标支持 | iconify 3000+，支持上传自定义图标 |

### 🖼️ 背景选项

支持多种背景类型：
- **纯色背景**
- **渐变色背景**
- **本地上传图片**
- **在线图片链接**
- Unsplash 图库集成

### 📸 输出功能

- 支持 **png、jpg、webp** 多种格式
- 输出放大倍数 **0.5x - 5x** 可调
- **复制图片到剪贴板**
- 保存配置到本地浏览器
- 清除按钮，一键重置配置

### ✨ 特色功能

- **左文右图主题**：支持图片和文本位置互换
- **手机预览主题**：图片可拉伸充满框架
- **桌面/手机预览**：背景图替换为真机效果图
- **首页展示**：功能介绍、常见问题、封面示例
- **一键使用**：示例图直接载入使用

## 环境配置

项目需要配置环境变量，在根目录创建 `.env` 文件：

```txt
NEXT_PUBLIC_API_ACCESS_KEY = 'xxxxx'
NEXT_PUBLIC_API_ICONIFY_URL = 'https://api.iconify.design'
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN = 'xxxxx'
```

> `NEXT_PUBLIC_API_ACCESS_KEY` 即 Unsplash API Key，需要到 [Unsplash Developers](https://unsplash.com/developers) 申请。

如果不需要 Cloudflare Analytics，请在 `src/app/layout.tsx` 中注释对应的 `Script`。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/29ddb956b9c1720ee60a252ccf6bc831.png)




## 项目亮点

1. **完全免费开源**：没有付费墙，没有水印限制
2. **隐私友好**：图片在本地处理，不上传服务器
3. **即开即用**：无需注册，打开就能用

## 如何部署及使用

### 在线使用

如果你没有编程或者部署基础，那么在线方式比较适合，直接打开使用即可。

在线文档及使用地址：[https://cover.weizwz.com/](https://cover.weizwz.com/)

### 本地启动

因为此项目是纯前端项目，本地需要用node环境，我是用的node版本为`v22.12.0`

1. 拉取项目

首先从github上拉去或下载项目

```shell
git clone https://github.com/weizwz/cover.git
# 或者cli
gh repo clone weizwz/cover
```

2. 配置.env

拉取完之后在项目下添加`.env` 文件，内容如下

```env
NEXT_PUBLIC_API_ACCESS_KEY = 'xxxxx'
NEXT_PUBLIC_API_ICONIFY_URL = 'https://api.iconify.design'
# cloudflare analytics，不用请注释 src/app/layout.tsx 中的 Script
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN = 'xxxxx'
```
>NEXT_PUBLIC_API_ACCESS_KEY 即 unsplash api，需要到官网申请 https://unsplash.com/developers   ,文章后边有章节介绍如何申请

3. 启动服务

项目包管理使用的是 `pnpm`,如果没有的话执行命令安装即可，所有命令如下：

```bash
# 安装 pnpm
npm install -g pnpm
# 下载依赖
pnpm install
# 启动项目
pnpm dev
# 打包构建
pnpm build
```

启动之后我们本地访问启动地址即可。


### Docker部署

此项目因为是一个纯前端项目，所以我们可以将打包之后的产物通过`nginx`镜像部署。我使用AI 对此项目进行了一些Docker和Github Pages 部署的改造。

需要自行打包的家人们可以拉去构建，地址如下：[https://github.com/xiuji008/cover](https://github.com/xiuji008/cover)

1. 编辑Dockerfile 文件,内容如下：

```dockerfile
# ========== Stage 1: Build ==========
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm 并安装依赖
RUN npm install -g pnpm && pnpm install

# 复制源码（构建时无需 .env，运行时注入）
COPY . .

# 构建静态导出
RUN pnpm build

# ========== Stage 2: Nginx ==========
FROM nginx:alpine

# 复制构建产物到 Nginx 静态目录
COPY --from=builder /app/out /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制运行时注入脚本
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

```

2. 构建镜像


```bash
docker build -t xj/cover:1.0.0 .
```

3. 创建docker-compose.yml文件

创建docker-compose.yml文件，内容如下：

```yaml
services:
  cover:
  # 以下是我构建好之后传入阿里云镜像仓库的镜像，若自行构建的话修改镜像即可
    image: registry.cn-hangzhou.aliyuncs.com/xjpublic/cover:1.0.0
    container_name: cover
    ports:
      - "5080:80"
    environment:
      - NEXT_PUBLIC_API_ACCESS_KEY=tnbwPq****_ap******
      - NEXT_PUBLIC_API_ICONIFY_URL=https://api.iconify.design
      - NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=xxxxx
    restart: unless-stopped

```

4. 启动项目

执行以下命令启动项目即可：

```bash
docker-compose up -d 
```

到此docker打包部署就完成了。


### Github Pages 部署

Github Pages 构建部署我做了部分修改，需要部署的家人们可以fock之后构建，地址如下：[https://github.com/xiuji008/cover](https://github.com/xiuji008/cover)

1. 通过以上地址fock 项目

.github\workflows\deploy.yml 文件

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build
        env:
          NEXT_PUBLIC_BASE_PATH: /cover
          NEXT_PUBLIC_API_ACCESS_KEY: ${{ secrets.NEXT_PUBLIC_API_ACCESS_KEY }}
          NEXT_PUBLIC_API_ICONIFY_URL: ${{ secrets.NEXT_PUBLIC_API_ICONIFY_URL }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

2. 添加项目环境变量

`Settings`  ---》  `Secrets and variables` ---》 `Repository secrets`

添加环境变量即可

- NEXT_PUBLIC_API_ACCESS_KEY
- NEXT_PUBLIC_API_ICONIFY_URL
- NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/ae6ce620e2ba99a268d92a5c2349359c.png)


3. 配置Github Pages

`Settings`  ---》  `Pages` ---》 `Build and deployment` 中  `Source` 选择`Github Actions` 即可

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/e4e0a5dca4ea0c5a819eba841c91a731.png)


4. 启动构建

`Settings`  ---》  `Actions`  点击运行即可自行部署

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/d03bb24c44dfb3b74233d80db42b0896.png)


我部署的Github Pages 地址：http://cover.xiuji.mynatapp.cc/


### 使用

整个过程流畅直观，无需任何设计基础。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/309f6691265457f09f78c11548cc8469.png)


首页也有一下模板，可以直接使用

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/9e74cd5bcb76ecb2e94afb4cee0fe31d.png)


## unsplash: API_ACCESS_KEY 注册

1. 打开 https://unsplash.com/ 登录，如果没有的话注册即可，国内邮箱即可注册，注册完成之后再邮箱中确认激活

2. 完成之后 点击Developers/API

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/69dd9c9ccca47e4ec48e5d74b98cfca0.png)


3. 点击 `Register as a developer`

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/9263b6c1bf475e21e7fcde4eaa284946.png)


4. 如果之前没有创建过应该的话创建一个应用

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/52ad2ad2f1e232c1515038b4b587ddd0.png)


5. 创建完成之后复制对应的信息即可

![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/30/a77802204adee767cafe7df1d06c223f.png)



## 写在最后

开源社区的魅力在于，一个好项目可以被无数人改进、延续。ThisCover 正是这样一个站在前人肩膀上、加入本土化思考的作品。

无论你是技术博主、内容创作者，还是单纯想要一张好看封面的普通用户，ThisCover 都值得一试。

