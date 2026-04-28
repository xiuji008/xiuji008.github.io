


你是否渴望将自己的博客网站部署上线，却因高昂的服务器和域名费用、繁琐的配置流程而望而却步？你是否希望发布一个活动页面或图书介绍网站，却不愿购买服务器，也不想经历复杂的部署步骤？

最近在浏览 GitHub 时，我发现了一个很棒的项目——PinMe。
PinMe 的目标，就是把发布这件事简化成一句话：

「本地有一份静态资源，上传到网站发上去或者给我一个命令，我帮你发上去。」

不仅如此，这套发布方案还天生具备 “内容可验证” 与 “抗篡改” 的特点。
今天就来给大家推荐这个项目，相信它会让你的发布之路变得轻松又可靠！🚀


![](https://xiuji008.github.io/images/202601/pinme-pin-me.png)


## 🔍什么是PinMe？

PinMe 是一款零配置的前端部署工具。无需服务器、无需账号、无需设置。

无论是构建静态站点、使用 AI 生成页面，还是导出前端项目 — 只需一条命令或者拖动文件夹上传即可即时部署。

PinMe 将您的网站发布为可验证的内容，相比传统托管，能更有效地防止静默篡改和意外损坏。

您无需管理服务器、区域或运行时间。PinMe 为您处理可用性和持久性。


github地址： [https://github.com/glitternetwork/pinme](https://github.com/glitternetwork/pinme)


官网地址：[https://pinme.eth.limo/](https://pinme.eth.limo/)

该项目在github 有2.6k ⭐️star

![](https://xiuji008.github.io/images/202601/pinme-star.png)

## ✒️ 核心特性

### 🚀 极简部署

- 网页部署：进入网站，上传文件jar

- 命令行部署： 只需执行几行简单的命令

### 🔒 去中心化存储

PinMe基于IPFS（星际文件系统）技术，将你的网站内容存储在去中心化网络中。这意味着：

- 不可篡改：上传的内容会生成唯一的哈希值，确保内容完整性

- 永久访问：即使单个节点离线，你的网站仍然可以通过其他节点访问

- 全球加速：内容通过IPFS网络分布，实现就近访问

### 🆓 完全免费

目前PinMe提供免费的部署服务，支持：

- 单个文件最大200MB

- 整个目录最大1GB

![](https://xiuji008.github.io/images/202601/pinme-free.png)


## 🚂快速开始

###  🕸️ 网站上传部署（小白推荐）

浏览器打开网站：[https://pinme.eth.limo/](https://pinme.eth.limo/)

![](https://xiuji008.github.io/images/202601/pinme-web-use.png)

将你构建好的前端项目或者静态网页文件上传，上传成功之后会返回一个url地址（保存好此地址），使用此地址即可访问你的网站。

![](https://xiuji008.github.io/images/202601/pinme-web-image.png)

部署示例网站：https://34759bf5.pinit.eth.limo/

![](https://xiuji008.github.io/images/202601/pinme-web-example.png)

>注：建议使用github账号登录，登录之后每次上传有历史记录可以查看，历史记录中可以查询到我们的地址

![](https://xiuji008.github.io/images/202601/pinme-web-history551e3500ff20a9da.png)

###  🖥️ 命令行部署（开发推荐）

1. 准备环境

> 要求 Node.js 版本 ≥ 16.13.0

如果版本过低，先升级 Node。

2. 安装 PinMe CLI

使用 npm：

```bash
npm install -g pinme
```

3. 构建并上传

以常见的前端工程为例：

```bash
# Vite / React / Vue 项目，一般是：
npm run build

```

完成构建后，上传：

```bash
# 最常见的 dist 目录
pinme upload dist

```

命令执行成功后，你将得到：

1. 一个 IPFS 内容 hash
2. 一个预览页面链接：  
   `https://pinme.eth.limo/#/preview/*`

打开这个链接，就能在线访问你的站点。




## ⏳ PinMe CLI：常用命令一览

PinMe 主要通过 CLI 提供能力，整体命令集很简洁。

### ⬆️ 1. 上传（核心命令）

```bash
# 交互式上传（会让你选择要上传的目录/文件）
pinme upload

# 直接指定路径上传
pinme upload /path/to/file-or-directory

# 上传并绑定一个固定子域名（需要 AppKey & Plus 会员）
pinme upload dist --domain my-site
# 简写
pinme upload dist -d my-site
```

> 注意：  
> - 固定域名使用的是 `https://<name>.pinit.eth.limo` 这种形式  
> - 绑定固定域名需要 AppKey 且开通 Plus 会员；普通用户可以使用预览链接访问。

### 🔄 2. 查看上传历史

```bash
# 查看最近 10 条上传记录
pinme list
# 或简写
pinme ls

# 指定数量
pinme list -l 5

# 清空本地上传历史
pinme list -c
```

### ♻️ 3. 删除与清理

```bash
# 交互式删除（从历史中选择）
pinme rm

# 指定 IPFS hash 删除
pinme rm <IPFS_hash>
```

需要说明的是，`rm` 实际做的是从 PinMe 使用的 IPFS 节点中「取消 pin 并移除 ENS 记录」，并不意味着全网 IPFS 都会立刻删除内容。

### 🔓 4. 登录与身份（AppKey）

PinMe 使用 **AppKey** 来标识用户，用于：

- 账号登录
- 上传历史合并
- 固定域名绑定

appkey可在网页端 Account Information 页面查看

![](https://xiuji008.github.io/images/202601/pinme-web-appkey.png)

相关命令：

```bash
# 设置 AppKey
pinme set-appkey

# 查看当前 AppKey 信息（会做掩码处理）
pinme show-appkey
pinme appkey

# 登出并清除本地认证信息
pinme logout

# 查看当前账号拥有的域名
pinme my-domains
pinme domain
```

### 👁️‍🗨️ 5. 帮助信息

```bash
pinme help
```


## 📂 上传大小限制与存储说明

免费计划下的限制（以 README 为准）：

| 类型         | 限制    |
|--------------|---------|
| 单个文件     | 200 MB  |
| 整个目录总和 | 1 GB    |

上传后文件会存储在 IPFS 网络中，并通过 Glitter Protocol 的 IPFS 网关提供访问。

成功上传后你会获得：

1. IPFS 内容 hash
2. 预览链接：`https://pinme.eth.limo/#/preview/*`
3. 可选固定域名：`https://*.pinit.eth.limo`（需 Plus）

本地日志默认保存在：

- Linux / macOS: `~/.pinme/`
- Windows: `%USERPROFILE%\.pinme\`


❤️ 结语

PinMe代表了前端部署的未来方向——简单、快速、可靠。无论你是独立开发者、创业团队，还是大型企业，PinMe都能为你节省宝贵的时间和资源。

告别繁琐的服务器配置，拥抱一键部署的新时代。试试PinMe，体验前所未有的部署体验！

一句话总结：构建你的网站，运行pinme upload，然后就可以分享链接了。就这么简单。

