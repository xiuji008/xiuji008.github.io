
在信息爆炸的时代，无论是个人还是团队，都需要一个高效的方式来组织和访问常用网址。今天逛github时发现了一款开源导航站项目——**Go Nav**。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/22/54a95b2964b53102aa47cf90e55cdcaa.png)




## 项目概览

一个简洁高效的个人/团队导航站，基于 Next.js 16、React 19、HeroUI v3 和 Tailwind CSS v4 构建。项目使用 JSON 配置驱动内容和布局，支持前台导航、后台管理、图片上传、备份还原和 Docker 部署。

项目提供了两种部署形态，灵活适应不同场景：
- **Server 模式**：保留后台管理、API、上传和备份能力，适合自用或团队维护
- **Static 模式**：导出纯静态前台页面，适合 GitHub Pages、对象存储、CDN 等无后台场景



**GitHub 仓库**：[https://github.com/dengxiwang/go-nav](https://github.com/dengxiwang/go-nav)

**官网**：[https://www.gotab.cn](https://www.gotab.cn)

**项目预览**：[https://nav.gotab.cn](https://nav.gotab.cn)


该项目目前在github上有 `24` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/22/f16f7a9cc5eddd55115effed37b908eb.png)


## 功能特性

- **配置驱动**：通过 `data/nav.json` 和 `data/website.json` 管理站点信息、布局、搜索、广告、插件和分类数据。
- **多级导航**：分类支持递归嵌套，二级分类自动以标签页展示。
- **站内搜索**：前端本地搜索支持标题、描述、标签和分类名命中。
- **外部搜索引擎**：可配置百度、Bing、Google 等搜索 URL，使用 `{query}` 作为搜索词占位符。
- **后台管理**：server 模式下提供 `/admin`，可管理网站信息、分类、站点、广告、搜索引擎、插件、备份和上传素材。
- **双构建模式**：`server` 模式保留后台和 API；`static` 模式导出纯静态页面，适合 GitHub Pages、对象存储、CDN。
- **Docker 友好**：内置 Dockerfile、Compose 配置和发布脚本，镜像自带默认数据，挂载数据目录时优先使用用户数据。
- **上传与备份**：支持图片上传、完整 ZIP 备份、备份还原和无用素材清理。
- **响应式体验**：桌面侧边栏、移动端抽屉导航、最近访问、回到顶部和二维码入口。

## 环境要求

- Node.js 20+ 推荐，最低请使用当前 Next.js 16 支持的 Node 版本
- pnpm：建议使用 Corepack 读取项目 `packageManager` 指定版本；升级项目 pnpm 时更新该字段即可
- Docker / Docker Compose：仅 Docker 部署需要



## Docker 部署

Docker部署比较简单


1. 创建`docker-compose.yml` 文件

```yaml
services:
  go-nav:
    image: doxwant/go-nav:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      ADMIN_USER: admin
      ADMIN_PASS: change-this-password
      # 可选，不填则自动生成并保存到 ./go-nav-data/.session-secret
      # SESSION_SECRET: change-this-to-a-long-random-string
    volumes:
      - ./go-nav-data:/app/data
```

2. 启动容器

```shell
docker compose up -d
```

3. 访问网站首页

在浏览器中输入部署地址访问导航页 

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/22/6f54a664ea77055e044c3c1016830987.png)


4. 访问后台管理

访问 `/admin` 登录后台（账号密码是docker-compose.yml中配置的）。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/22/8ce97c745fef33fa5063cb2b9c48d78e.png)

后台可编辑：

- 网站基础信息、主题、页脚、布局
- 分类与网站条目，网址标签支持英文逗号 `,` 或中文逗号 `，` 分隔
- 搜索引擎与搜索行为
- 广告位、捐赠/二维码、插件
- 图片上传、备份导出、备份还原、无用素材清理

上传接口仅接受 `png`、`jpg`、`gif`、`webp`、`ico` 图片，单文件最大 2MB。备份还原最大 20MB。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/06/22/97f643eba8af7c76831cb0b9f36d7d1d.png)


## 配置说明

### `data/nav.json`

| 字段                                          | 说明                        |
| --------------------------------------------- | --------------------------- |
| `title` / `name` / `description` / `keywords` | SEO 与品牌展示信息          |
| `logo` / `favicon`                            | Logo 和浏览器图标路径       |
| `author` / `copyright`                        | 作者与版权信息              |
| `icp` / `beian`                               | 备案信息，留空则不显示      |
| `qrCode` / `qrCodeText`                       | 二维码图片与提示文案        |
| `footerLinks`                                 | 页脚链接数组                |
| `themeMode`                                   | `light`、`dark` 或 `system` |
| `search`                                      | 搜索配置                    |
| `ads` / `showAds` / `adsAspectRatio`          | 广告配置                    |
| `showRecentVisits` / `recentVisitsMax`        | 最近访问配置                |
| `layout`                                      | 布局与显示开关              |
| `plugins`                                     | 自定义 CSS / JS 片段        |

### `data/website.json`

```json
{
	"categories": [
		{
			"id": "tools",
			"name": "效率工具",
			"icon": "⚙️",
			"description": "常用工具集合",
			"sites": [
				{
					"title": "Go Nav",
					"description": "导航站项目",
					"url": "https://github.com/dengxiwang/go-nav",
					"icon": "/images/logo.svg",
					"tags": ["nav", "nextjs"]
				}
			],
			"children": []
		}
	]
}
```

分类可以无限嵌套。网站图标支持 emoji、本地路径、远程 URL；后台上传素材会返回 `/uploads/xxx` 路径。


## 应用场景

- **个人导航页**：收藏常用网站，打造个性化的上网入口
- **团队资源中心**：统一管理团队常用工具、文档和内部系统链接
- **开源项目展示**：作为项目生态的导航门户
- **企业内部门户**：集成公司各类系统和工具的快捷入口




## 写在最后

无论你是想搭建个人导航页，还是为团队构建资源中心，Go Nav 都是一个值得尝试的选择。它用现代化的技术栈、优雅的界面设计和灵活的部署方式，让导航站的管理变得简单而高效。