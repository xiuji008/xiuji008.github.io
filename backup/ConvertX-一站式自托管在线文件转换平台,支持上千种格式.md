


你是否曾经为了转换一个文件格式，在电脑上安装各种臃肿的软件，或者将敏感文件上传到第三方在线转换网站？如果你正在寻找一个既能保护隐私、又能满足多样化转换需求的自托管解决方案，那么 **ConvertX** 就是为你量身打造的工具。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/20/convertx-page.png)

## 💥什么是 ConvertX？

ConvertX 是一个功能强大的自托管在线文件转换器。它最大的亮点是 **支持超过一千种不同的文件格式转换**，涵盖了文档、图像、视频、电子书、3D模型等多种类型。该项目采用 TypeScript、Bun 和 Elysia 等现代技术栈开发，旨在为用户提供一个安全、高效、可完全掌控的本地化文件处理中心。

github地址：<https://github.com/C4illin/ConvertX>

该项目在github 已有15.3k ⭐star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/20/convertx-github-star.png)

## ☀️ 核心特性

*   **海量格式支持：** 支持上千种格式互转，几乎能满足所有日常及专业需求。
*   **批量处理：** 可以一次性上传并转换多个文件，显著提升工作效率。
*   **隐私安全：** 自托管意味着你的文件数据永远不会离开你自己的服务器，非常适合处理敏感或机密文档。
*   **多用户账户：** 支持为团队成员或家庭成员创建独立的账户，共享服务又保持个人文件历史隔离。
*   **开源免费：** 完全开源，代码透明，可自由部署和修改。

## 🎠强大的转换引擎阵容

ConvertX 的强大能力源于其背后整合的众多业界知名的开源转换工具，它们共同构成了一个超级转换工厂：

| 工具 | 用途 | 支持输入格式数 | 支持输出格式数 |
| :--- | :--- | :--- | :--- |
| **FFmpeg** | 音视频处理 | ~472种 | ~199种 |
| **ImageMagick / GraphicsMagick** | 图像处理 | 412种 | 313种 |
| **LibreOffice** | 办公文档 | 41种 | 22种 |
| **Pandoc** | 文档格式（如Markdown） | 43种 | 65种 |
| **Calibre** | 电子书 | 26种 | 19种 |
| **Inkscape** | 矢量图形 | 7种 | 17种 |
| **Assimp** | 3D模型资产 | 77种 | 23种 |
| **Vips / libheif / libjxl** | 高性能图像与HEIF/JPEG XL格式 | 58种 | 38种 |
| ... 以及更多 | 包括 SVG、LaTeX、Outlook邮件、联系人文件等 | | |

这个列表清晰地展示了 ConvertX 的格式覆盖广度。无论是常见的 `.pdf`、`.docx`、`.mp4`、`.jpg`，还是相对小众的格式，它都有很大可能支持。

## 🏍️快速部署指南

使用 Docker 部署 ConvertX 是极其简单的过程，只需几分钟即可拥有自己的转换服务。

1.  **准备 `docker-compose.yml` 文件：**

```yaml
services:
  convertx:
  # 此服务的镜像3.59GB，国内下载比较慢，需要的家人们可以使用我转存阿里云镜像仓库的镜像
    image: registry.cn-hangzhou.aliyuncs.com/xjpublic/convertx
    container_name: convertx
    restart: unless-stopped
    ports:
      - "10000:3000"
    environment: 
      - ACCOUNT_REGISTRATION=false # true或false，首账户创建不受影响（例如若只需单账户可保持false）
      - JWT_SECRET=aLongAndSecretStringUsedToSignTheJSONWebToken1234 # 默认使用randomUUID()生成
      - HTTP_ALLOWED=true # 若要使用http访问，则设置为true
      - ALLOW_UNAUTHENTICATED=true  # 允许未登录用户使用服务，仅限本地环境设为true
      - AUTO_DELETE_EVERY_N_HOURS=24 # 每N小时检查并删除超过N小时的旧文件，设为0可禁用
    volumes:
      - ./data:/app/data
```


🐳**Docker 镜像**

每次发布时会更新 `:latest` 标签，每次推送到主分支时会更新 `:main` 标签。常规使用推荐使用 `:latest` 标签。

镜像可在 [GitHub Container Registry](https://github.com/C4illin/ConvertX/pkgs/container/ConvertX) 和 [Docker Hub](https://hub.docker.com/r/c4illin/convertx) 获取。

| 镜像                                    | 说明                                |
| --------------------------------------- | ----------------------------------- |
| `image: ghcr.io/c4illin/convertx`      | GitHub Container Registry 上的最新发布版本 |
| `image: ghcr.io/c4illin/convertx:main` | GitHub Container Registry 上的最新提交     |
| `image: c4illin/convertx`              | Docker Hub 上的最新发布版本               |
| `image: c4illin/convertx:main`         | Docker Hub 上的最新提交                  |

此服务的镜像3.59GB，国内下载比较慢，需要的家人们可以使用我转存阿里云镜像仓库的镜像`registry.cn-hangzhou.aliyuncs.com/xjpublic/convertx`

2.  **启动服务：**

    在 `docker-compose.yml` 文件所在目录下运行：
```bash
docker-compose up -d
```

3.  **初始化账户：**
    在浏览器中访问 `http://你的服务器IP:3000`。**第一个注册的用户将自动成为管理员**。

就这么简单！你已经成功搭建了一个功能完备的在线文件转换平台。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/20/convertx-firstpage.png)


![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/20/convertx-convertx.png)


### 🛞环境变量

所有变量均为可选，但建议设置 JWT_SECRET。

| 变量名                         | 默认值                                             | 描述                                                                                                                                                         |
| ------------------------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| JWT_SECRET                     | 未设置时使用 randomUUID() 生成的值                 | 用于签名 JSON Web Token 的长而保密的字符串                                                                                                                    |
| ACCOUNT_REGISTRATION           | false                                              | 是否允许用户注册账户                                                                                                                                         |
| HTTP_ALLOWED                   | false                                              | 是否允许 HTTP 连接，仅在本地环境中设置为 true                                                                                                                   |
| ALLOW_UNAUTHENTICATED          | false                                              | 是否允许未认证用户使用服务，仅在本地环境中设置为 true                                                                                                           |
| AUTO_DELETE_EVERY_N_HOURS      | 24                                                 | 每隔 n 小时检查并删除超过 n 小时的文件，设置为 0 以禁用                                                                                                         |
| WEBROOT                        |                                                    | 根路径地址，例如设置为 "/convert" 后，网站将通过 "example.com/convert/" 访问                                                                                   |
| FFMPEG_ARGS                    |                                                    | 传递给 ffmpeg 输入文件的参数，例如 `-hwaccel vaapi`。有关硬件加速的更多信息，请参阅 https://github.com/C4illin/ConvertX/issues/190。                           |
| FFMPEG_OUTPUT_ARGS             |                                                    | 传递给 ffmpeg 输出文件的参数，例如 `-preset veryfast`                                                                                                         |
| HIDE_HISTORY                   | false                                              | 是否隐藏历史记录页面                                                                                                                                         |
| LANGUAGE                       | en                                                 | 用于格式化日期字符串的语言，需使用 [BCP 47 语言标签] 指定                                                       |
| UNAUTHENTICATED_USER_SHARING   | false                                              | 是否在所有未认证用户之间共享转换历史记录                                                                                                                       |
| MAX_CONVERT_PROCESS            | 0                                                  | 允许的最大并发转换进程数。设置为 0 表示无限制。                                                                                                                 |


## 🌅总结

**ConvertX 完美地解决了一个核心痛点：在保障数据隐私的前提下，提供堪比甚至超越商业云服务的文件格式转换能力。** 无论你是个人用户，想要一个干净、无广告、不限次数的本地转换工具；还是团队或组织，需要在内网部署一个安全的文件处理服务，ConvertX 都是一个极具吸引力的选择。

其基于 Docker 的一键式部署、详尽的配置选项和活跃的开源生态，使得从试用、部署到长期维护都变得非常轻松。如果你厌倦了在多个在线转换网站间跳转，或是对云服务的数据安全心存顾虑，不妨现在就尝试部署一个属于你自己的 ConvertX。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/20/convertx-logo.png)
