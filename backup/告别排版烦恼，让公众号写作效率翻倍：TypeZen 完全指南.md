
> 一款让你专注内容创作，不再为格式折腾的开源神器



写公众号的人大概都有过这样的经历：在本地写好一篇文章，复制到微信编辑器后——字体变了、间距乱了、代码块挤成一团、图片飘到了不该去的地方……然后就是漫长的“手动调格式”时间，一两个小时折腾下来，比写文章本身还累。

Markdown 的流行很大程度上解决了“写”的问题，但微信公众平台并不原生支持 Markdown。于是，一个刚需诞生了：**把 Markdown 优雅地转换成微信公众号能识别的富文本**。

今天要介绍的开源项目 **TypeZen**，就是为此而生的解决方案。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/16/3253691b473a4900b48c3f1a26ee1e55.png)


## 一、TypeZen 是什么？

**TypeZen 是一款专为微信公众号设计的「Markdown 转微信排版」辅助工具。**

它的工作流程非常简单：

1. 用你最顺手的编辑器写好 Markdown
2. 粘贴到 TypeZen 编辑区
3. 可选：使用 AI 一键优化排版结构
4. 从 72 套精美模板中选一套
5. 点击复制，直接粘贴到公众号后台


该项目目前在github 上已有 35 star


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/16/63d3aaef41b4261f2a3bf8ed614a7dca.png)


**github地址**：[https://github.com/mspringjade/wechat-formatter](https://github.com/mspringjade/wechat-formatter)

**在线地址**：[https://typezen.online](https://typezen.online)



## 二、核心亮点速览

### 1. 72 套精美模板，6 大风格分类

模板是 TypeZen 最大的特色之一。项目内置了 72 套精心设计的排版模板，划分为 6 个风格类别：

| 风格分类 | 特点 | 适用场景 |
|---------|------|---------|
| **新粗野风** | 高饱和度色彩、粗黑边框、硬投影 | 潮流资讯、观点评论、品牌宣发 |
| **纯净极简风** | 无冗余元素、极致精简 | 深度阅读、文艺随笔、日记 |
| **沉稳商务风** | 严谨排版、专业色调 | 企业内刊、行业分析、报告 |
| **诗意文艺风** | 细腻排版、柔和配色 | 诗歌、散文、情感类内容 |
| **极客科技风** | 前卫渐变、模块化设计 | 技术博客、开发者资讯 |
| **欢庆节庆风** | 浓烈色彩、节日氛围 | 节日祝福、活动推广 |

每个模板都可以在此基础上进一步微调字号、行高、段落间距、首行缩进等细节，真正做到“千人千面”。

### 2. AI 一键排版：优化结构，不改内容

这是一个非常实用的功能。AI 排版的定位很清晰：**只优化 Markdown 结构，不改写任何原文内容**。

它能自动处理：
- 标题层级调整（比如把连续多个 `#` 标题合理分布）
- 空行规范化
- 列表格式统一
- 引用区块美化
- 加粗与分隔线优化

支持的服务商包括 **OpenRouter**（可调用免费模型），以及 OpenAI / Anthropic 兼容 API。AI 调用采用流式输出，排版结果实时显示，几乎没有等待感。

更重要的是：**API Key 仅保存在浏览器本地，不会上传到服务端**，安全有保障。

### 3. 完整的 Markdown 语法支持

TypeZen 由 `marked` 驱动，完整支持标准 Markdown 语法，并且针对微信公众号编辑器做了大量样式适配：

- **标题**（1-6级）：不同模板有独特的视觉表现
- **强调**：加粗配合荧光笔高亮，斜体有主题色搭配
- **引用**：精美的卡片式设计或警示框样式
- **列表**：有序/无序列表，不同主题有不同的标记符号
- **代码**：多行代码块 + 内联代码高亮，避免越界
- **分隔线**：虚线、实线、阴影效果，随主题变化
- **链接**：主题色下划线，手机端友好
- **图片**：自动添加圆角、阴影、描边，还支持**多图自动并排**（连续多张图片放在同一段落即可触发等宽并列布局）
- **内嵌 HTML**：支持原生 HTML 标签渲染

最贴心的一点：**支持直接在编辑区粘贴截图或复制图片**，无需额外上传操作。

### 4. 响应式三栏工作台

TypeZen 采用 Neo 风格的三栏布局：

- 左侧：Markdown 编辑区
- 中间：实时预览区（支持手机框预览）
- 右侧：模板选择 + 样式调节面板



### 5. 一键复制，零损失粘贴

微信公众平台只允许**内联样式**（inline CSS）。TypeZen 在复制时自动将所有样式转换为 `style=""` 属性，复制到公众号后台后样式完全保留，不会丢失任何格式细节。

## 三、技术栈一览

TypeZen 的技术选型紧跟前沿：


- 框架：Next.js 16.2.0 (App Router)
- UI：React 19.2.4 + Tailwind CSS 4
- 语言：TypeScript 5
- Markdown 解析：marked 17.0.4
- AI 能力：Vercel AI SDK 6 + @ai-sdk/openai + @ai-sdk/anthropic
- 图标：lucide-react + @lobehub/icons
- 代码检查：Biome


整套技术栈确保了项目的性能、可维护性和开发体验。

## 四、快速上手

### 本地运行

```bash
# 克隆项目
git clone https://github.com/mspringjade/wechat-formatter.git

# 进入目录
cd wechat-formatter

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 `http://localhost:3000` 即可体验。

### 生产部署

```bash
npm run build
npm run start
```

需要 Node.js 20.9.0 或更高版本。

## 五、Docker 构建及部署

尽管作者已经提供了在线地址供我们使用，但是有好多家人们还是习惯自己本地私有化部署，下边我就介绍下如何构建Docker镜像及部署

### Docker镜像构建

- 克隆项目

```bash
# 克隆项目
git clone https://github.com/mspringjade/wechat-formatter.git
```

- 在项目下创建Dockerfile 文件，内容如下：

```dockerfile
# 多阶段构建
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .

RUN npm ci --no-audit --no-fund && \
    npm run build && \
    npm prune --production && \
    npm cache clean --force && \
    rm -rf .next/cache node_modules/.cache

# 生产阶段
FROM node:21-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

# 只复制生产需要的文件
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]
```

- 构建镜像

在Dockerfile同级目录下执行打包命令

```shell
docker build -t xj/wechat-formatter:0.5.1  .
```

- 构建完成之后查看镜像

```shell
docker ps -a | grep wechat-formatter
```

如果构建正常的话就可以看到我们构建的镜像了





### docker-compose 部署

- 创建一个部署目录 `wechat-formatter`,在该目录下创建docker-compose.yml 文件，内容如下：

```yaml
services:
  wechat-formatter:
    image: registry.cn-hangzhou.aliyuncs.com/xjpublic/wechat-formatter:0.5.1
    container_name: wechat-formatter
    ports:
      - "43000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**注**：镜像`registry.cn-hangzhou.aliyuncs.com/xjpublic/wechat-formatter:0.5.1` 是我构建好之后推到阿里云镜像仓库的，如果家人们不想自己构建的话可以直接跳过构建镜像的步骤直接使用我构建的这个镜像

- 启动容器

在部署目录下运行以下命令启动服务

```shell
docker-compose up -d 
```

日志如下则启动就成功了

```shell
docker-compose logs -f 
```


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/16/5ecf05b8b58d37c01851e26fdc33354a.png)


### 页面访问

在浏览器中打开我们部署服务的ip和端口`http://192.168.31.195:43000/`就可以访问了 


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/16/bbf484e96d5d48d8cacf8e6c929f98ab.png)


使用较为简单，我们就不一一演示了


## 六、适用人群

- **公众号运营者**：提高排版效率，统一品牌视觉风格
- **技术博主**：代码块高亮、技术文章专业呈现
- **独立创作者**：不用懂 CSS 也能获得精美排版
- **企业新媒体团队**：模板统一，多人协作时风格一致
- **任何用 Markdown 写公众号的人**



## 结语

工欲善其事，必先利其器。TypeZen 的目标很简单：**让公众号创作者回归内容本身，把排版交给工具**。

如果你也是 Markdown 的重度用户，或者正在为公众号排版效率发愁，不妨试试 TypeZen。



