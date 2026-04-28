

在团队协作中，文档管理始终是一个让人头疼的问题。传统的文档工具要么功能单一，要么价格昂贵，要么数据不在自己手里。今天，我要向大家推荐一款开源的协作式 Wiki 软件 —— Docmost。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/21dea84236710860c21c0a4304e4afef.png)


## 什么是Docmost？

Docmost 是一款开源的协作式 Wiki 和文档管理软件，专为团队知识管理而设计。它提供了实时协作、权限管理、空间隔离等企业级功能，同时保持了开源软件的透明性和可控性。

github 地址： [https://github.com/docmost/docmost](https://github.com/docmost/docmost)

文档地址： [https://docmost.com/docs/](https://docmost.com/docs/)

web地址： [https://customers.docmost.com/](https://customers.docmost.com/)


该项目在github 已有 `19.9 k` star

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/ede6f4c542cdc8cc838b483c60494f14.png)


## 核心特性


### 1. 实时协作编辑

团队多人可同时编辑同一份文档，实时看到彼此的修改，告别文档冲突和版本混乱。

### 2. 强大的图表支持

内置多种图表工具支持：

- Draw.io - 流程图和架构图

- Excalidraw - 手绘风格图表

- Mermaid - 代码生成图表

### 3. 灵活的权限管理

- 空间（Spaces）隔离不同团队或项目

- 精细的权限控制

- 用户组（Groups）管理

### 4. 丰富的互动功能

- 评论系统

- 页面历史版本管理

- 全文搜索

- 文件附件上传


## Docker Compose 部署指南


### 第一步：创建docker-compose.yml文件

首先创建部署目录`docmost`,在此目录下创建docker-compose.yml文件，内容如下：

```yaml
services:
  docmost:
    image: docmost/docmost:latest
    depends_on:
      - db
      - redis
    environment:
      APP_URL: 'http://localhost:3000'
      APP_SECRET: 'REPLACE_WITH_LONG_SECRET' # 至少32位
      DATABASE_URL: 'postgresql://docmost:STRONG_DB_PASSWORD@db:5432/docmost'
      REDIS_URL: 'redis://redis:6379'
    ports:
      - "3000:3000"
    restart: unless-stopped
    volumes:
      - docmost:/app/data/storage

  db:
    image: postgres:18
    environment:
      POSTGRES_DB: docmost
      POSTGRES_USER: docmost
      POSTGRES_PASSWORD: STRONG_DB_PASSWORD
    restart: unless-stopped
    volumes:
      - db_data:/var/lib/postgresql

  redis:
    image: redis:8
    command: ["redis-server", "--appendonly", "yes", "--maxmemory-policy", "noeviction"]
    restart: unless-stopped
    volumes:
      - redis_data:/data

volumes:
  docmost:
  db_data:
  redis_data:
```


因为我有redis（redis版本需要7.0以上）和 postgres ,所以我先在部署目录下创建挂载目录及赋权限

```shell
mkdir data
chmod -R 777 data
```

创建以下docker-compose.yml


```yaml
services:
   docmost:
     image: docmost/docmost:latest
     environment:
       APP_URL: "http://localhost:43000"
       APP_SECRET: "14cdb9b4-de01-3faa-aff5-65bc2f771745"
       DATABASE_URL: "postgresql://docmost:docmost@192.168.31.195:5432/docmost"
       REDIS_URL: "redis://:xj2026@192.168.31.195:6379"
       TZ: Asia/Shanghai
     ports:
       - "43000:3000"
     restart: unless-stopped
     volumes:
       - ./data:/app/data/storage

```


### 第二步：启动容器

在docker-compose.yml 同级目录下使用以下命令启动容器

```shell
docker-compose up -d 
```

使用以下命令查看启动日志

```shell
docker-compose logs -f 
```

出现以下日志则说明启动成功

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/9d1876da4bdf81032db6b289031d89b3.png)

### 第三步：访问系统

在浏览器中输入我们部署服务的地址和端口访问系统

`http://192.168.31.195:43000/`

## 系统使用

### 首次登录系统需要注册账号

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/35551f8cdf72c1366a4c8625a6a2be99.png)

### 修改系统语言为中文

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/7eeca99b7ccbdd1d4517d66891c866e1.png)


### 新建页面，在页面中输入`/`查看命令


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/60ed170c036a9fcc35cb960f0abbfee7.png)


### 多人同时编辑同一份文档

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/d4c351213d56e68ff418c7cc338536b1.png)


### 嵌入pdf


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/c82bbf7e191223a374fc68ea31cca2f7.png)


###  折叠块

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/b5580dcb396fb800a0124cc5cea8299f.png)



![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/43b296766bb47d9fb309a5cbfd817d44.png)

### 提示

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/cd18d7977c1a582730ced49c45065cb5.png)

### mermaid

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/af2f9ba2336177840f2c6ce82a2ae33f.png)

### excalidraw

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/a4d3d1216ebd03a3c63bdfaca62079a7.png)

### draw.io

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/1f9e0ceee3a7d75485117254d9114d11.png)

### 状态


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/20/49241efb24db72a6497822425c34b5ce.png)


### 还有一些其他特性，家人们自行尝试


## 总结
Docmost 是一款功能强大、部署简单的开源 Wiki 系统。它完美平衡了功能和易用性，既适合小团队快速搭建知识库，也满足企业级的安全和权限管理需求。

### 优势：

✅ 开源免费，数据自主可控

✅ 实时协作，提升团队效率

✅ 丰富的图表和嵌入支持

✅ Docker 一键部署

### 适用场景：

- 技术团队文档中心

- 公司内部知识库

- 产品手册和帮助文档

- 项目协作空间