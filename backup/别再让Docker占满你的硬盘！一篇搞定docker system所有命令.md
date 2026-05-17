

> 从磁盘爆满到优雅清理，Docker系统管理完全指南



![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/17/b75b7612d4bbf27a370d5ca1b4a617ee.jpg)


“我的虚拟机又提示磁盘空间不足了！”

相信每个Docker用户都经历过这样的时刻。打开虚拟机一看，镜像、容器、卷、构建缓存，加起来轻松占据几十GB。**Docker是怎么悄悄吃掉你的硬盘的？又如何优雅地清理它们？**

答案就在 `docker system` 这组命令里。


`docker system` 是 Docker 提供的一组**管理命令**，用于查看和管理 Docker 守护进程的整体状态、磁盘使用情况、系统信息等。它不直接操作容器或镜像，而是从**全局视角**管理 Docker 引擎本身。



## 所有子命令概览

| 命令  | 作用  | 常用程度 |
| --- | --- | --- |
| `docker system df` | 显示 Docker 磁盘使用情况 | ⭐⭐⭐⭐⭐ |
| `docker system prune` | 删除未使用的 Docker 对象 | ⭐⭐⭐⭐⭐ |
| `docker system info` | 显示系统范围的信息 | ⭐⭐⭐⭐ |
| `docker system events` | 获取 Docker 守护进程的实时事件 | ⭐⭐⭐ |
| `docker system dial-stdio` | 管理 Docker 守护进程的连接（高级） | ⭐   |

## 各命令详细说明

### 1. `docker system df` - 查看磁盘使用情况

**最常用的命令**，用于查看 Docker 占用了多少磁盘空间。

#### 基本用法：

```bash
docker system df
```

**输出示例**：

```
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          21        21        8.797GB   460.6MB (5%)
Containers      24        24        565MB     0B (0%)
Local Volumes   8         8         123MB     0B (0%)
Build Cache     20        0         922.7MB   922.7MB
```

**各列含义**：

- `TYPE`: 对象类型（镜像、容器、卷、构建缓存）
- `TOTAL`: 总数量
- `ACTIVE`: 正在使用的数量
- `SIZE`: 占用空间大小
- `RECLAIMABLE`: 可以回收（删除）的空间大小及百分比

#### 详细模式（显示每个对象）：

```bash
docker system df -v
```

这会列出每个镜像、容器、卷的具体信息，适合深入分析空间占用。


![](http://chevereto.xiuji.mynatapp.cc/images/2026/05/17/bc35a88e5e8b725a6c93f664374725be.png)


#### 实用示例：

```bash
# 查看所有对象的详细信息，排序查看最大的镜像
docker system df -v | grep -A 10 "Images"

# 只查看镜像占用
docker system df | grep Images

# 查看格式化的输出（JSON格式）
docker system df --format "json"
```

### 2. `docker system prune` - 清理未使用对象

**清理命令**，删除不再使用的 Docker 对象以释放空间。

#### 完整参数表：

|     |     |     |
| --- | --- | --- |
| 参数  | 说明  | 删除内容 |
| 无参数 | 基础清理 | 停止的容器、未使用的网络、悬空镜像、悬空构建缓存 |
| `-a, --all` | 清理所有未使用的镜像 | 基础清理 + 所有未被容器引用的镜像 |
| `--volumes` | 清理卷 | 基础清理 + 所有未被容器引用的卷 |
| `-f, --force` | 强制执行 | 不提示确认，直接删除 |
| `--filter` | 条件过滤 | 根据特定条件筛选要删除的对象 |

#### 组合使用示例：

```bash
# 1. 标准清理（最安全）
docker system prune

# 2. 清理所有未使用镜像（不清理卷）
docker system prune -a

# 3. 清理所有未使用镜像和卷（危险）
docker system prune -a --volumes

# 4. 自动确认，不询问
docker system prune -f

# 5. 清理24小时前的资源
docker system prune --filter "until=24h"

# 6. 清理带有特定标签的资源
docker system prune --filter "label=deprecated=true"
```

#### 过滤条件高级用法：

```bash
# 清理超过指定时间的对象
docker system prune --filter "until=2026-01-01T00:00:00Z"

# 组合多个条件（逻辑与）
docker system prune -a --filter "until=24h" --filter "label!=keep"

# 排除某个标签的资源
docker system prune --filter "label!=important"
```

#### 安全建议：

- **生产环境**：只用 `docker system prune`（不加 `-a` 和 `--volumes`）
- **开发环境**：可以用 `docker system prune -a`，节省空间
- **避免使用** `--volumes` 除非确定数据不重要

### 3. `docker system info` - 系统信息

显示 Docker 引擎和主机的详细信息。

#### 基本用法：

```bash
docker system info
# 或使用旧命令别名
docker info
```

#### 输出内容包括：

- **服务器版本**：Docker Engine 版本号
- **操作系统**：运行 Docker 的主机系统
- **内核版本**：Linux 内核版本
- **CPU/内存**：主机硬件资源
- **存储驱动**：overlay2, aufs 等
- **日志驱动**：json-file, journald 等
- **安全选项**：seccomp, AppArmor, SELinux
- **镜像加速器**：Registry Mirrors 配置
- **容器运行时**：runc, containerd 版本

#### 实用示例：

```bash
# 查看 Docker 根目录位置
docker info | grep "Docker Root Dir"

# 查看存储驱动和空间
docker info | grep -A 5 "Storage Driver"

# 查看当前运行的容器数量
docker info | grep "Containers:"

# 输出为JSON格式（便于脚本处理）
docker info --format "{{json .}}"
docker info -f "{{.ServerVersion}}"
```

### 4. `docker system events` - 事件监控

实时监控 Docker 守护进程产生的事件。

#### 基本用法：

```bash
docker system events
```

#### 事件类型：

- **容器事件**：create, start, stop, kill, die, pause, unpause, delete
- **镜像事件**：pull, push, tag, untag, delete, save, load
- **卷事件**：create, mount, unmount, destroy
- **网络事件**：create, connect, disconnect, destroy
- **守护进程事件**：reload

#### 实用示例：

```bash
# 只监控容器相关事件
docker system events --filter type=container

# 只监控镜像拉取事件
docker system events --filter event=pull

# 监控特定容器的所有事件
docker system events --filter container=my-container

# 监控带特定标签的事件
docker system events --filter label=com.example.env=production

# 只显示最近10条事件
docker system events --since 10m

# 按时间范围过滤
docker system events --since "2026-01-01T00:00:00Z" --until "2026-01-02T00:00:00Z"

# 格式化输出（只显示时间和事件）
docker system events --format "{{.Time}} {{.Type}} {{.Action}}"
```

### 5. `docker system dial-stdio` - 高级连接管理

这是一个相对底层的命令，用于与 Docker 守护进程建立双向流式连接。主要用于调试和开发场景。

**使用场景**：

- Docker CLI 插件的开发
- 远程调试 Docker 守护进程
- 高级网络诊断

**示例**：

```bash
# 通常不直接使用，而是在插件中通过 API 调用
docker system dial-stdio
```

## 实战组合技巧

### 技巧1：清理前的预览

```bash
# 先查看占用情况
docker system df

# 预览会被删除的内容（不实际删除）
docker system prune -a --volumes --dry-run  # 注意：--dry-run 不是所有版本都支持
# 替代方案：手动检查
docker container ls -a | grep Exited  # 查看停止的容器
docker image ls -a  # 查看所有镜像
docker volume ls -f dangling=true  # 查看未使用的卷
```

### 技巧2：定期自动清理（Cron任务）

```bash
# 编辑 crontab
crontab -e

# 每天凌晨2点清理（安全模式）
0 2 * * * /usr/bin/docker system prune -f

# 每周日凌晨3点深度清理（保留最近7天）
0 3 * * 0 /usr/bin/docker system prune -a --filter "until=168h" -f
```

### 技巧3：监控磁盘变化

```bash
# 实时监控 Docker 磁盘占用
watch -n 5 'docker system df'

# 记录空间变化到日志
echo "$(date): $(docker system df | grep Images)" >> disk-usage.log
```

### 技巧4：一键清理脚本

```bash
#!/bin/bash
# docker-cleanup.sh - 安全的清理脚本

echo "当前磁盘占用:"
docker system df

echo ""
echo "清理停止的容器、悬空镜像和未使用的网络..."
docker system prune -f

echo ""
echo "清理旧的构建缓存（7天以上）..."
docker builder prune -f --filter "until=168h"

echo ""
echo "清理未使用的卷（需要确认）..."
docker volume prune

echo ""
echo "清理完成！"
docker system df
```

## 最佳实践总结

| 环境  | 推荐命令 | 频率  |
| --- | --- | --- |
| **生产环境** | `docker system prune` | 每周1次 |
| **开发环境** | `docker system prune -a` | 每天1次 |
| **CI/CD 环境** | `docker system prune -a --volumes -f` | 每次构建前 |
| **个人学习** | `docker system prune -a --volumes` | 磁盘满时 |
| **Docker Desktop (Mac/Windows)** | `docker system prune -a` | 月度维护 |

**注意**：

- 🔴 `--volumes` = 数据可能永久丢失
- 🟡 `-a` = 镜像需要重新下载
- 🟢 无参数 = 最安全，日常使用