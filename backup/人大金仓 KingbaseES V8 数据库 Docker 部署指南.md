

今天在公司接手了一个新项目，数据库选用的是人大金仓 KingbaseES V8。由于测试环境的数据库实例不知何时被清理掉了，为了方便本地开发和调试，决定使用 Docker 在本地部署一套开发版数据库。特此记录下完整的部署步骤，既作为个人备忘，也希望能帮助到有类似需求的同学。

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/2e2b0bf5fc90316671c9bca5d2d7bc70.png)


## 简介

金仓数据库管理系统KingbaseES（简称KES）是中电科金仓（北京）科技股份有限公司（简称电科金仓）研发的、具有自主知识产权的、获得自主原创资质认证的通用数据库产品。该产品面向全行业、全客户，覆盖从极简应用到核心关键应用的企业级大型通用数据库管理系统，适用于事务处理类应用、数据分析类应用、人工智能应用、时序数据采集检索应用等场景，可用作管理信息系统、业务及生产系统、决策支持系统、多维数据分析系统、全文本及图片检索系统、地理信息系统、传感器及日志等数据采集及分析系统等的承载数据库。

官网地址: [https://docs.kingbase.com.cn/cn/KES-V9R1C10/introduction/](https://docs.kingbase.com.cn/cn/KES-V9R1C10/introduction/)


## docker-compose 部署

### 准备

首先在官网下载对应的docker镜像文件，我下载的是v8 

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/220c527cc0fd701bf2928488c1b3c69a.png)


### 导入镜像

将镜像文件导入到我们linux的服务器上，执行以下命令导入镜像

```shell
docker load -i kdb_x86_64_V008R006C009B0014.tar
```

导入成功后我们就可以看到镜像了

```shell
docker images | grep kingbase
```

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/89c9147f83714f7c3963c5ee12c38c48.png)


### 创建docker-compose.yml文件

导入成功后创建一个部署目录`kingbase`,在此目录下创建一个数据挂载卷

```shell
mkdir data

chmod -R 777 data
```

创建docker-compose.yml 文件

```yaml
services:
  kingbase:
    image: kingbase_v008r006c009b0014_single_x86:v1
    container_name: kingbase
    privileged: true
    restart: always
    ports:
      - "54321:54321"
    privileged: true
    volumes:
      - "./data:/home/kingbase/userdata/"
    environment:
      - NEED_START=yes
      - DB_USER=kingbase # 用户名
      - DB_PASSWORD=kb@123456 # 密码
      - DB_MODE=oracle  # 兼容模式（兼容oracle)
    command: /usr/sbin/init
```

参数说明

|环境变量	|参数默认值|	参数说明|
|--|--|--|
|DB_USER	|system	|数据库用户名|
|DB_PASSWORD	|12345678ab|	数据库密码|
|DB_MODE	|oracle	|数据库兼容模式|
|ENCODING	|utf8	|数据库启动字符集|
|NEED_START	|yes	|容器部署是否启动数据库|
|ENABLE_CI	|yes|	配置数据库大小写不敏感|


###  启动容器

在docker-compose.yml的同级目录下使用以下命令启动容器

```shell
docker-compose up -d 
```

启动之后查看日志

```shell
docker-compose logs -f 
```

如下，则服务就可以使用了


![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/53fedec271e2d7a9cc6526c54aeb5164.png)


### 连接数据

我这使用的是`DBeaver`连接的数据，

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/5393ca9db34bb87d20a0e542290cb5a6.png)

然后新建模式，新建数据库表就可以使用了

![](http://chevereto.xiuji.mynatapp.cc/images/2026/04/14/f77712ee7c4399b82f41e63f22e755f6.png)

### 注意事项

- 授权许可：正式使用时需替换官方授权文件（license.dat），开发测试环境有基础许可限制（如最大连接数受限） 。

- 数据持久化：务必挂载数据目录到宿主机，避免容器删除后数据丢失。

- 版本选择：根据实际需求选择兼容模式（oracle/pg/mysql），初始化后修改较复杂 。



## 写在最后

通过 Docker 部署人大金仓 KingbaseES 数据库，只需简单几步即可获得一个功能完备的国产数据库环境，非常适合开发测试、技术评估和学习研究场景。

