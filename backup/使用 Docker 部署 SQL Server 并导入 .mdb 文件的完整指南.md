

最近在项目中遇到一个需求，需要从 .mdb 文件中提取特定数据并导入到现有系统数据库中。当现场同事将 .mdb 文件发给我后，我首先尝试在本地打开以查看数据结构，但试了多种方法都未能成功——原生的 Microsoft Access 需要付费激活，其他各类工具也均告失败。后来在网上看到有网友建议可以将 .mdb 文件导入 SQL Server 数据库后再进行操作，于是灵机一动：部署一个 SQL Server 岂不是更直接？我便翻出之前 Docker 部署 SQL Server 的文档，结果发现相关镜像已不存在。于是，我重新查阅资料，整理了以下关于如何使用 Docker 部署 SQL Server 并导入 .mdb 文件的步骤。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/02/6cc013931ffc40c959a774c4ccc42603.png)


## ❓什么是.mdb文件？

.mdb文件是Microsoft Access数据库文件，它是微软公司开发的一种专有数据库格式，主要用于其桌面关系数据库管理系统（RDBMS）——Microsoft Access。

主要用途：

- 桌面数据库应用：适用于中小型业务的数据管理（如库存、客户信息）。

- 原型开发：快速构建数据库应用程序原型。

- 报表生成：创建和管理自定义报表。

- 与其他Office集成：可与Excel、Word等无缝连接。

## 🐳Docker部署sql server数据库

### 📋创建docker-compose.yml 文件

首先创建一个部署目录`sqlserver`,在该目录下创建docker-compose.yml文件，内容如下：

```yaml
services:
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2025-latest
    container_name: mssql-server
    restart: always
    environment:
      #接受最终用户许可协议
      - ACCEPT_EULA=Y
      #SA用户密码，密码长度必须至少为8个字符，并且包含以下四组中的三组字符：大写字母、小写字母、数字和符号。
      - SA_PASSWORD=Abcd1234
    ports:
      - 1433:1433
    volumes:
      - ./mssql:/var/opt/mssql
```
### 📂创建挂载目录并授权

在docker-compose.yml同级目录下创建数据挂载目录`mssql`并授权

```shell
# 创建挂载目录
mkdir mssql
# 赋权限
chmod -R 777  mssql
```

### 📚启动服务

在docker-compose.yml同级目录下执行以下命令启动服务

```shell
docker-compose up -d 
```

如果启动过程中有报权限文档的错误`Access denied errno = 0xD(13) Permission denied]`时，给挂载目录赋权限之后再重新启动容器即可。

### 🚀连接数据库

我连接数据库使用的时navicat,我记得旧版本还需要再安装目录下安装`qlncli`,但是新版本的`navicat`不用，直接连接即可.

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/02/6ac9608c4a7dc830666d77e9110e025c.png)


## ⬆️将.mdb文件导入sql server数据库

连接到sql server 数据库之后新建数据库，再`表`上右击导入向导，选择`MS Access数据库`,点击下一步，选择需要导入的表，将数据导入到sql server 中，然后按照正常的数据表就可以查看了。如果需要修改，则修改完之后再导出文件即可。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/02/b74b4fe7558abaac69334f1416df90f4.png)



## 📝总结

通过 Docker 部署 SQL Server 并结合 Navicat 等工具，可以高效、灵活地处理 .mdb 文件，既避免了本地安装 Microsoft Access 的成本与限制，也便于在开发环境中进行数据迁移与转换。这种方法尤其适合需要临时或频繁处理 Access 数据的开发与运维场景，具备良好的可复现性与环境隔离性。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/02/02/d2541613aabc75e95c81eb6f99d43178.jpg)
