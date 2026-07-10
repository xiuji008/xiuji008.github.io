

> 当静态的 README 文件拥有了动态的打字效果，你的 README 主页便有了生命力。



在一些开源项目上，README 文件是项目的门面，也是开发者展示个人品牌的重要窗口。一个好的 README 不仅能清晰传达项目信息，更能给访客留下深刻印象。`readme-typing-svg` 正是这样一个能让你 README “活”起来的开源工具——它通过动态生成 SVG 图片，模拟出打字机逐字打印的效果，让原本静态的文字变得生动有趣。

本文将首先介绍 `readme-typing-svg` 的功能与用法，然后重点分享我们对该项目进行的一系列本地化改造，使其适合中文用户和本地部署场景。

![](http://readmesvg.xiuji.mynatapp.cc?font=Fira+Code&duration=3000&pause=2000&center=true&vCenter=true&width=435&lines=%5B%5B4336f7%5D%5D%5B%5Bfont%3DRocknRoll+One%5D%5D%5B%5Bsize%3D30%5D%5D%E4%BF%AE%5B%5B36adf7%5D%5D%5B%5Bfont%3DRocknRoll+One%5D%5D%5B%5Bsize%3D40%5D%5D%5B%5Bweight%3D700%5D%5D%E5%B7%B1%5B%5B19d016%5D%5D%5B%5Bsize%3D50%5D%5Dxj)



## 什么是 Readme Typing SVG？

`readme-typing-svg` 是一个基于 PHP 开发的 Web 服务，它能够根据 URL 参数动态生成带有打字动画效果的 SVG 图片。你只需要在链接中定义好要显示的文字行、字体、颜色等参数，服务就会返回一个动态的 SVG 图片，非常适合嵌入 README、项目仓库介绍或个人博客中。

原项目github地址：[https://github.com/DenverCoder1/readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg)

原项目demo地址：[https://readme-typing-svg.demolab.com/demo/](https://readme-typing-svg.demolab.com/demo/)


该项目目前在github上已有`9k` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/10/c0c6e5438c32e5ebd106d8dce7925cdc.png)



### 快速上手

使用这个工具非常简单，只需两步：

1.  **构建链接**：在 `?lines=` 参数后填入你的文字内容，用 `;` 分隔不同行，用 `+` 或 `%20` 表示空格。
2.  **嵌入 README**：将构建好的链接以图片形式嵌入到你的 Markdown 文件中。

例如，下面的代码会生成一个包含两行文字的动态 SVG：

```markdown
[![Typing SVG](https://readme-typing-svg.demolab.com/?lines=第一行文字;第二行文字)](https://git.io/typing-svg)
```

### 丰富的配置选项

`readme-typing-svg` 提供了丰富的参数，让你能精细控制 SVG 的样式和行为。

| 参数           | 说明                                       | 类型      | 示例                     |
| :------------- | :----------------------------------------- | :-------- | :----------------------- |
| `lines`        | 要显示的文字，用 `;` 分隔行，`+` 代表空格 | string    | `Hello+World;你好+世界`  |
| `font`         | 字体系列（默认 `monospace`）              | string    | `Fira+Code`              |
| `color`        | 文字颜色（默认 `36BCF7`）                 | string    | `22C55E`                 |
| `background`   | 背景颜色（默认 `00000000` 透明）         | string    | `0D1117`                 |
| `center`       | 是否水平居中（默认 `false`）              | boolean   | `true` 或 `false`        |
| `vCenter`      | 是否垂直居中（默认 `false`）              | boolean   | `true` 或 `false`        |
| `duration`     | 单行打字持续时间（毫秒，默认 `5000`）     | integer   | `4000`                   |
| `pause`        | 行间暂停时长（毫秒，默认 `0`）            | integer   | `1000`                   |
| `width`        | SVG 宽度（像素，默认 `400`）              | integer   | `780`                    |
| `letterSpacing`| 字母间距（默认 `normal`）                 | string    | `2px`                    |

## 为什么需要本地化改造？

原版 `readme-typing-svg` 功能强大，但直接在国内使用或进行深度定制时，会遇到几个痛点：

1.  **中文字体支持有限**：原版默认集成的 Google Fonts 列表对中文字体支持不足，导致中文字体要么无法渲染，要么回退到系统默认字体，效果不尽如人意。

2.  **Google Fonts 访问不畅**：由于网络原因，在国内直接访问 `fonts.googleapis.com` 获取字体可能缓慢或失败，影响 SVG 的生成和展示。

3.  **缺少便捷的协作工具**：对于设计或内容协作场景，缺乏直观的可视化编辑和快速预览功能。

4.  **字体管理不便**：原版字体文件与配置分散，且未考虑 Docker 等容器化部署的持久化需求。

针对上述问题，我们对原项目进行了本地化改造，让它在国内环境使用更顺畅，功能更强大。


改造后的github地址： [https://github.com/xiuji008/readme-typing-svg](https://github.com/xiuji008/readme-typing-svg)



## 如何部署与使用

改造后的项目提供了Docker镜像`registry.cn-hangzhou.aliyuncs.com/xj_lew/readme-typing-svg:1.0`，家人们可以使用Docker部署，以下是部署步骤。


1. 创建`docker-compose.yml` 文件

```yaml
services:
  readme-typing-svg:
    image: registry.cn-hangzhou.aliyuncs.com/xj_lew/readme-typing-svg:1.0
    container_name: readme-typing-svg
    ports:
      - "6000:80"
    environment:
      # 对应 Dockerfile 中的 $PORT，Apache 监听的容器内端口
      PORT: "80"
    volumes:
      # 字体目录持久化（fonts.json + 上传/内置 ttf）
      - ./fonts:/var/www/html/src/fonts
    restart: unless-stopped
```

2. 创建挂载目录`fonts`及配置`json`

```shell

 # 创建文件夹
mkdir fonts
 # 赋权限
chmod -R 777 fonts
cd fonts
 # 添加配置数据
vim fonts.json
```

`fonts.json` 内容如下：

```json
{
    "google": [
        "Roboto",
        "Open Sans",
        "Lato",
        "Montserrat",
        "Oswald",
        "Source Sans 3",
        "Raleway",
        "PT Sans",
        "Noto Sans",
        "Ubuntu",
        "Poppins",
        "Nunito",
        "Work Sans",
        "Rubik",
        "Quicksand",
        "Karla",
        "Merriweather",
        "Playfair Display",
        "Lora",
        "Crimson Text",
        "Lobster",
        "Pacifico",
        "Dancing Script",
        "Caveat",
        "Indie Flower",
        "Comic Neue",
        "Bangers",
        "Anton",
        "Bebas Neue",
        "Abril Fatface",
        "Permanent Marker",
        "Press Start 2P",
        "Fira Code",
        "JetBrains Mono",
        "Source Code Pro",
        "Courier Prime",
        "Cinzel",
        "Archivo Black",
        "Orbitron",
        "Teko",
        "Zilla Slab",
        "Creepster",
        "Monoton",
        "VT323",
        "Noto Sans SC",
        "Noto Serif SC",
        "Ma Shan Zheng",
        "ZCOOL XiaoWei",
        "ZCOOL KuaiLe",
        "Liu Jian Mao Cao",
        "Long Cang",
        "Zhi Mang Xing",
        "ZCOOL QingKe HuangYou",
        "Noto Sans TC",
        "Noto Serif TC",
        "Noto Sans HK",
        "Noto Serif HK",
        "LXGW WenKai TC",
        "LXGW WenKai Mono TC",
        "Klee One",
        "Zen Maru Gothic",
        "Zen Old Mincho",
        "Zen Kaku Gothic New",
        "Zen Kaku Gothic Antique",
        "IBM Plex Sans JP",
        "Iansui",
        "Yusei Magic",
        "Dela Gothic One",
        "Huninn",
        "Shippori Mincho",
        "Shippori Mincho B1",
        "Sawarabi Mincho",
        "Sawarabi Gothic",
        "Noto Sans JP",
        "Noto Serif JP",
        "Yuji Syuku",
        "Yuji Boku",
        "RocknRoll One",
        "Reggae One",
        "M PLUS Rounded 1c",
        "M PLUS 1p",
        "Kosugi",
        "Kosugi Maru",
        "BIZ UDPGothic",
        "BIZ UDPMincho"
    ],
    "local": {
    },
    "css_base": "https://fonts.googleapis.cn"
}
```

3. 启动容器

```shell
docker-compose up -d 
```


4. 浏览器中使用项目



![](http://chevereto.xiuji.mynatapp.cc/images/2026/07/10/b1fc62d495215e8cd52e7a1d7e4cc980.png)







## 总结

`readme-typing-svg` 是一个极具创意的开源项目，为静态的 README 注入了动态的灵魂。我们基于它进行的本地化改造，是针对**中文用户的实际痛点**（字体、网络）和**更高效的创作场景**（可视化编辑、自包含导出、字体管理）进行了深度优化。

改造后的项目不仅在国内环境下使用更流畅，而且功能更强大、易用性更高。无论你是想在 GitHub 上打造一个令人眼前一亮的个人主页，还是为你的开源项目增添一份专业与趣味，都值得一试。