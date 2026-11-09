

## 背景

日常开发中，我们经常需要在 AMD（x86_64）机器上获取 ARM 架构的 Docker 镜像。比如为 ARM 设备准备离线镜像包，或者在构建、调试阶段验证多架构镜像的可用性。这时候就需要让 Docker 忽略当前宿主机架构，显式指定目标平台。

## 核心方法：使用 `--platform` 参数

在 AMD 机器上下载 ARM 架构的 Docker 镜像，核心是使用 `--platform` 参数显式指定目标平台。

以 `rustfs/rustfs:1.0.4` 为例，拉取 ARM64 架构镜像的命令如下：

```bash
docker pull --platform linux/arm64 rustfs/rustfs:1.0.4
```

## 关键说明

**平台参数**：`--platform linux/arm64` 告诉 Docker 拉取 ARM64 架构的镜像，忽略当前宿主机的 AMD64 架构。

**镜像支持**：RustFS 官方镜像支持多架构，包括 `linux/amd64` 和 `linux/arm64`，因此该命令可行。

**重要提醒**：虽然可以下载 ARM 镜像，但它**无法在 AMD 机器上直接运行**。你通常是为了导出镜像（`docker save`）传输到 ARM 设备，或者用于构建、调试目的。

## 典型使用流程

1. 在 AMD 机器上拉取 ARM64 镜像：
   ```bash
   docker pull --platform linux/arm64 rustfs/rustfs:1.0.4
   ```

2. 导出镜像为 tar 包：
   ```bash
   docker save -o rustfs-arm64.tar rustfs/rustfs:1.0.4
   ```

3. 将 tar 包传输到 ARM 设备后导入：
   ```bash
   docker load -i rustfs-arm64.tar
   ```

## 小结

跨平台拉取镜像的关键就是 `--platform` 参数。只要目标镜像本身支持多架构（可通过 `docker manifest inspect` 确认），就能在任意架构的机器上获取所需平台的镜像。但请记住：**能下载 ≠ 能运行**，跨架构镜像的主要用途是导出传输或构建调试。