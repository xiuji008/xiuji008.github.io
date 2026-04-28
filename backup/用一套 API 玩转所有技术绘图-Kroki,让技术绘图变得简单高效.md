

在日常开发和文档写作中，我们经常会画各种图：时序图、架构图、流程图、数据模型图……,工具一堆：PlantUML、Mermaid、GraphViz、Excalidraw、diagrams.net、BPMN……,每种工具有自己的语法、自己的编辑器、自己的导出方式，集成到文档或自动化流程里往往很麻烦。

Kroki 想做的一件事，就是：

>用一套统一的 HTTP API，把各种“文本描述的图”统一渲染成图片（SVG / PNG / PDF）。

你可以把它理解成一个“图形渲染网关服务”：只要给它一段图形代码，它就帮你找对引擎、渲染好图，再把结果返回给你。

![](https://xiuji008.github.io/images/202601/kroki-cover.png)

## 💡 什么是Kroki？

Kroki 是一个开源项目，提供一个统一的 HTTP API，封装了多种绘图引擎，目前支持（包括但不限于）：

- BlockDiag 家族：BlockDiag、SeqDiag、ActDiag、NwDiag、PacketDiag、RackDiag  
- BPMN
- Bytefield
- C4（基于 PlantUML）
- D2
- DBML
- diagrams.net（实验性）
- Ditaa
- Erd
- Excalidraw
- GraphViz
- Mermaid
- Nomnoml
- Pikchr
- PlantUML
- SvgBob
- Symbolator
- UMLet
- Vega / Vega-Lite
- WaveDrom
- WireViz  
- ……后续还会不断扩展

官网与文档：

- 官网：<https://kroki.io/>
- 文档：<https://docs.kroki.io/>
- github地址：<https://github.com/yuzutech/kroki/>

该项目目前在github上已有3.9k ⭐️ star

![](https://xiuji008.github.io/images/202601/kroki-star.png)


## ⏫ 快速上手

### 🐳 Docker部署

最简单的体验方式是使用Docker：

```shell
docker run -d -p 3800:8000 yuzutech/kroki
```


### 📚 Docker Compose完整部署

对于需要完整功能的环境，可以使用docker-compose：

```yaml
services:
  core:
    image: yuzutech/kroki
    environment:
      - KROKI_MERMAID_HOST=mermaid
      - KROKI_BPMN_HOST=bpmn
      - KROKI_EXCALIDRAW_HOST=excalidraw
    ports:
      - "3800:8000"
  mermaid:
    image: yuzutech/kroki-mermaid
    expose:
      - "8002"
  bpmn:
    image: yuzutech/kroki-bpmn
    expose:
      - "8003"
  excalidraw:
    image: yuzutech/kroki-excalidraw
    expose:
      - "8004"
  # experimental!
  diagramsnet:
    image: yuzutech/kroki-diagramsnet
    expose:
      - "8005"
```


启动服务

```shell
docker-compose up -d 
```


等待启动即可


## 🧱 基本用法：给文本，拿图片


Kroki 暴露的是一个简单的 HTTP 接口，你可以用 GET 或 POST 来调用。

### ⬆️ 1. GET：URL 中携带编码后的图

Kroki 使用「deflate + base64」算法对图形描述进行压缩编码，然后放入 URL：

```http
GET /plantuml/svg/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000
```

这条请求的含义是：

- 使用 `plantuml` 引擎
- 输出格式为 `svg`
- 图形内容是解码后得到的那段文本（在这里被压缩 + base64 处理过）

优点：  

- 非常适合在 Markdown 文档、静态网页中直接嵌入图片链接。  

示例

```
![示例图](http://192.168.31.195:3800/seqdiag/svg/eNorTi1MyUxMV6jmUlBIKsovL04tUlDQtVMoT00CMsuAvOicxKTUHAVbBSV31xAF_WKIBv3isnT9pMTiVDMTpVhroGaEBpD2gqL85NTi4nxk7c75eUDpEoWS1Aogka-QmZuYnoqu2UZXF6HZGslRIAm4MmuuWgA13z1R)

```

![示例图](https://xiuji008.github.io/images/202601/kroki-get-example-url.svg)




缺点：  

- URL 会比较长，需要一个小工具/插件来帮你编码。

很多编辑器和工具（比如 Asciidoctor 插件）已经原生支持 Kroki，可以自动完成这一步。也可以在官网上编辑好之后直接复制。

![](https://xiuji008.github.io/images/202601/kroki-get-example.png)



### ⬇️ 2. POST JSON：最直观的方式

你也可以使用 `POST`，直接发 JSON，不需要自己做编码：

```http
POST /
Content-Type: application/json
Accept: image/svg+xml
```

```json
{
  "diagram_source": "Bob -> Alice : hello",
  "diagram_type": "plantuml",
  "output_format": "svg"
}
```

字段说明：

- `diagram_source`：图形描述源文本
- `diagram_type`：使用的引擎类型，比如 `plantuml`、`mermaid`、`graphviz` 等
- `output_format`：输出格式，比如 `svg`、`png`、`pdf` 等（具体支持情况与引擎有关）

非常适合：

- 后端服务调用 Kroki 渲染图
- CI 流水线脚本里直接用 `curl` 或 HTTP 客户端调用


![](https://xiuji008.github.io/images/202601/kroki-post-common.png)

### ⤵️ 3. POST 纯文本：用 Header 指定类型与格式

如果不想发 JSON，可以直接把图形描述当作纯文本发过去。

**方式 A：通过 `Accept` 指定输出格式**

```http
POST /plantuml
Accept: image/svg+xml
Content-Type: text/plain

Bob -> Alice : hello
```

含义：

- URL 中 `/plantuml` 表示使用 PlantUML 引擎
- `Content-Type: text/plain` 表示请求体是纯文本
- `Accept: image/svg+xml` 表示希望返回 SVG

**方式 B：在 URL 中指定输出格式**

```http
POST /plantuml/svg
Content-Type: text/plain

Bob -> Alice : hello
```

含义类似，只是把输出格式 `svg` 写在了路径里，这样就不需要设置 `Accept` 头了。



### 🔝 4. POST JSON + URL 格式：混合用法

也可以继续用 JSON，但把输出格式放 URL：

```http
POST /plantuml/svg
Content-Type: application/json
Accept: application/json
```

```json
{
  "diagram_source": "Bob -> Alice : hello"
}
```

你可以根据自己工程里的调用方式和习惯自由选择上面这些风格，本质都是同一套逻辑。


## ✳️ 总结

Kroki 把本来分散、各自为政的各种绘图库，统一包装成了一个**简单、统一的 HTTP 图形渲染服务**：

- 对使用者来说：
  - 不用关心底层是 PlantUML 还是 Mermaid，统一用 HTTP API 调。
  - 非常适合与 CI/CD、Docs-as-Code、Wiki、门户站点等集成。
- 对开发者 / 运维来说：
  - 核心是一个 Java 网关，配合一组 companion 容器。
  - 使用 Docker / docker-compose 就能比较轻松地部署。

如果你的团队已经在大量使用“文本描述的图”，又希望统一渲染方式、自动化集成，Kroki 是非常值得一试的基础设施组件。

