


>简介：通过Docker部署PicGo Server版，实现一次配置、随处可用的高效图片管理方案。本文详细介绍了从构建自定义镜像到启动容器的完整流程，涵盖插件安装、图床配置等关键步骤，并特别提醒了安全注意事项。这一部署方式解决了多设备间配置不同步的痛点，让用户在公司、家庭等多场景下都能使用统一的图床服务，真正做到上传记录集中管理、配置云端同步。无论是个人创作者还是团队协作，都能通过Docker化部署获得更灵活、稳定的图片上传体验。

在前面的文章中，我们详细介绍了 PicGo 的各种强大功能。不过，许多用户在实际使用中会遇到一个共同的痛点：每台电脑都需要单独配置，对于经常在多台设备间切换的用户来说，确实不够方便。

今天，我将分享如何通过 Docker 在服务器上部署 PicGo 的 Server 版本，实现“一次配置，随处上传”，彻底解决多设备同步难题。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/24ef7a89433e2f82aadc4db61d31399a.png)


## 🐳 Docker 部署实战

### 🛠️ 构建自定义镜像

我选择 `node:22.11.0-alpine` 作为基础镜像进行构建，以下为完整的 Dockerfile 内容：

```dockerfile
# 使用轻量级 Node.js 镜像
FROM node:22.11.0-alpine
# 维护者信息
LABEL maintainer="xj"
# 全局安装 PicGo
RUN npm install picgo -g
# 暴露容器 HTTP 端口
EXPOSE 36677
# 设置容器启动命令
CMD ["picgo", "server", "--host", "0.0.0.0", "--port", "36677"]
```

构建镜像：

```bash
docker build -t xj/picgo:2.0.0 .
```

镜像构建完成后，我已将其上传至阿里云镜像仓库。你也可以直接使用该镜像：
`registry.cn-hangzhou.aliyuncs.com/xjpublic/picgo:2.0.0`

### ⚙️ 启动容器

创建 `docker-compose.yml` 文件，内容如下：

```yaml
services:
  picgo:
    # 可替换为阿里云镜像：registry.cn-hangzhou.aliyuncs.com/xjpublic/picgo:2.0.0
    image: xj/picgo:2.0.0
    container_name: picgo
    restart: unless-stopped
    ports:
      - "36677:36677"
    volumes:
      - ./data:/root/.picgo  # 挂载配置文件、插件等数据
```

在 `docker-compose.yml` 同级目录下执行以下命令启动容器：

```shell
docker-compose up -d
```

至此，PicGo 服务已成功启动。

### 🧩 插件下载与配置

服务启动后，我们需要进入容器内部下载并配置插件。执行以下命令进入容器：

```shell
docker exec -it <container_id> /bin/sh
```

使用 `picgo -v` 查看 PicGo 版本，也可通过 `picgo help` 查看更多命令用法。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/785186cfd60a606661fa7500163cfc04.png)

以我使用的 Chevereto 图床为例，我下载了两个插件：Chevereto 上传插件和文件重命名插件 `hashname`。具体操作如下：

```shell
# 下载 Chevereto 插件
picgo install chevereto
# 选择插件
picgo use plugins
# 设置上传器为 Chevereto
picgo set uploader chevereto
# 将 Chevereto 设为主图床
picgo use uploader chevereto
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/a52fe288fc0224b4f96eb6079bd1857a.png)

配置完成后，重启容器以使配置生效：

```shell
docker-compose restart
```

现在，你就可以在 Postman 或其他第三方工具中，通过配置 PicGo 服务地址来使用图床功能了。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/4a688c56169ea29d52527c2edfcbd0e5.png)

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/806d12111fce20eed0eb4ef2715491e7.png)

若需启用文件重命名功能，可配置 `hashname` 插件：

```shell
# 下载 Hashname 插件
picgo install hashname
# 启用插件作为 Transformer
picgo use transformer hashname
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/01/29/cf5f56ac7c6cee752e7fbeec987569a9.png)

至此，基于 Docker 的 PicGo 服务部署与基础配置已全部完成。

## 🚨 安全注意事项

1. **请勿在公网直接暴露服务**：除非仅用于临时测试，否则务必配置身份验证。
2. **定期更新镜像**：确保获得最新的安全修复与功能优化。
3. **限制访问 IP**：若仅在内部网络使用，建议设置 IP 白名单。
4. **定期备份配置**：避免因意外导致配置丢失。

## 🎉 总结

通过 Docker 部署 PicGo Server 版，我们彻底解决了多设备配置同步的痛点。现在，无论是在公司的办公电脑，还是家里的个人笔记本，只需访问统一的 PicGo 服务地址，即可实现：

- **统一配置**：所有设备共用一套图床与插件设置。
- **集中管理**：上传历史与图片库集中存储，便于查找与管理。


无论是个人创作还是团队协作，Docker 化部署让 PicGo 的使用变得更加灵活、稳定与高效。现在就动手部署属于你自己的 PicGo 服务吧！

