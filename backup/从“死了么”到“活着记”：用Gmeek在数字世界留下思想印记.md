

>本文从近期热议的“死了么”App入手，探讨现代人对数字安全与思想存续的双重需求，详细介绍基于GitHub的极简博客框架Gmeek，阐述在数字时代通过博客记录思想、对抗遗忘的重要意义，鼓励读者建立个人数字思想家园。


![github_gmeek.png](https://xiuji008.github.io/images/202601/github_gmeek.png)

## 引言

一款名为“死了么”的App近期引发广泛讨论。它以直白甚至略显生硬的名字，精准地切中了当代社会一个真实且规模庞大的群体需求。

可以说，“死了么”的火爆，是产品创意、社会情绪与网络传播共同作用的结果。它如同一面棱镜，折射出当代独居生活的潜在隐忧。

如今，独居者人数众多。他们往往独自奋斗，习惯“一个人扛下所有”，最担心的莫过于在突发疾病或意外时无人知晓。这款App之所以能够走红，恰恰在于它敏锐地捕捉到了现代人一种微妙而普遍的心理——“不愿日常打扰他人，却渴望在异常状况下被关注”。用户无需复杂的社交，仅通过简单的每日打卡，就能为自己构筑一道最低成本的“安全防线”。其付费下载量的快速增长，也印证了这一需求真实而强烈。

然而，人终有一死。那么，我们该如何留下生活过的痕迹？如何在日常中安顿内心、与自己对话？活着，不仅仅意味着没有死去，而是要有思想、有记录、有回响地活着。博客，作为一种数字化的表达方式，正成为越来越多人记录自我、分享见解、沉淀思想的平台。

最近读到一篇文章，颇受启发。[People Die, but Long Live GitHub](https://laike9m.com/blog/people-die-but-long-live-github,122/)

![people-die-but-long-live-github.png](https://xiuji008.github.io/images/202601/people-die-but-long-live-github.png)

最近，我还在 GitHub 上发现了一个开源项目——Gmeek。它是一个超轻量级的个人博客框架，完全基于 GitHub Pages、GitHub Issues 与 GitHub Actions 构建，可谓“All in GitHub”。无需本地部署，从搭建到写作，整个过程只需三步：前两步用 18 秒完成博客搭建，第三步即可开始书写。今天我们就来介绍下如何使用这款开源项目构建个人github博客。

## Gmeek：三步构建你的数字思想家园

一个博客框架，超轻量级个人博客模板。完全基于`Github Pages` 、 `Github Issues` 和 `Github Actions`。不需要本地部署，从搭建到写作，只需要18秒，2步搭建好博客，第3步就是写作。

github地址：[https://github.com/Meekdai/Gmeek](https://github.com/Meekdai/Gmeek)

文档博客：[https://blog.meekdai.com/tag.html#Gmeek](https://blog.meekdai.com/tag.html#Gmeek)

![gmeek_star.png](https://xiuji008.github.io/images/202601/gmeek_star.png)

![gmeek_doc_blog.png](https://xiuji008.github.io/images/202601/gmeek_doc_blog.png)

## 快速开始


1. 【创建仓库】点击[通过模板创建仓库](https://github.com/new?template_name=Gmeek-template&template_owner=Meekdai)，建议仓库名称为`XXX.github.io`，其中`XXX`为你的github用户名。

![xiuji_github_blog.png](https://xiuji008.github.io/images/202601/xiuji_github_blog.png)

2. 【启用Pages】在仓库的`Settings`中`Pages->Build and deployment->Source`下面选择`Github Actions`。

3. 【开始写作】打开一篇issue，开始写作，并且**必须**添加一个`标签Label`（至少添加一个），再保存issue后会自动创建博客内容，片刻后可通过https://XXX.github.io 访问（可进入Actions页面查看构建进度）。

4. 【手动全局生成】这个步骤只有在修改`config.json`文件或者出现奇怪问题的时候，需要执行。

```
通过Actions->build Gmeek->Run workflow->里面的按钮全局重新生成一次
```

> [!NOTE]
> issue必须添加一个标签Label（至少添加一个）


到此，提交完issue之后Actions页面构建完成之后就可以看到我们的博客了。

博主的github博客地址：[https://xiuji008.github.io/](https://xiuji008.github.io/)

## 配置及使用

config.json 文件就是配置文件，在创建的仓库内可以找到，对应修改为自己的即可。

配置可参考Gmeek作者博文：[https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html](https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html)

### static文件夹使用

1. 在自己的仓库根目录下新建一个文件夹，名称必须是static。

2. 然后在static文件内上传一些自己的文件，比如博客图片、插件js等。

3. 通过手动全局生成一次成功后，你就可以通过 xxx.github.io/your.png 访问了

### 插件功能的使用

为了使得Gmeek的功能更加的丰富，Gmeek作者添加了插件的功能，目前已经有几个插件可以使用。大家可以直接复制文章中的配置代码使用，也可以把对应的插件文件拷贝到自己的static文件夹下使用。

#### 计数工具 Vercount

1. 全站添加计数工具Vercount，只需要在config.json文件内添加配置

```js
"allHead":"<script src='https://blog.meekdai.com/Gmeek/plugins/GmeekVercount.js'></script>",
```


2. 单个文章页添加Vercount，只需要在文章最后一行添加如下

```js
<!-- ##{"script":"<script src='https://blog.meekdai.com/Gmeek/plugins/GmeekVercount.js'></script>"}## -->
```

![gmeek_plugin_vercount.png](https://xiuji008.github.io/images/202601/gmeek_plugin_vercount.png)

#### TOC目录

1. 所有文章页添加TOC目录，只需要在config.json文件内添加配置

```js
"script":"<script src='https://blog.meekdai.com/Gmeek/plugins/GmeekTOC.js'></script>",
```


2. 单个文章页添加TOC目录，只需要在文章最后一行添加如下

```js
<!-- ##{"script":"<script src='https://blog.meekdai.com/Gmeek/plugins/GmeekTOC.js'></script>"}## -->
```

![gmeek_plugins_toc.png](https://xiuji008.github.io/images/202601/gmeek_plugins_toc.png)

#### 灯箱插件

> [!TIP]
> 此插件由Tiengming编写，可以放大浏览文章中的图片，适合一些图片较多的文章。

1. 所有文章页添加lightbox，只需要在config.json文件内添加配置

```js
"script":"<script src='https://blog.meekdai.com/Gmeek/plugins/lightbox.js'></script>",
```

2. 单个文章页添加lightbox，只需要在文章最后一行添加如下

```js
<!-- ##{"script":"<script src='https://blog.meekdai.com/Gmeek/plugins/lightbox.js'></script>"}## -->
```

#### 看板娘（花里胡哨）

> [!TIP]
> 此插件从github开源项目live2d-widget引入，纯属页面展示

1. 所有文章页添加lightbox，只需要在config.json文件内添加配置

```js
"script":"<script src='https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0/dist/autoload.js'></script>",
```

![gmeek_plugins_live2d-widget.png](https://xiuji008.github.io/images/202601/gmeek_plugins_live2d-widget.png)


对看板娘项目感兴趣的伙伴也可以研究下

看板娘项目github地址：[https://github.com/stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

![github_live2d_widget.png](https://xiuji008.github.io/images/202601/github_live2d_widget.png)


#### 多插件使用

同时在所有文章页使用TOC目录、灯箱插件及其它插件，需要这样添加配置文件：

```js
    "allHead":"<script src='https://xiuji008.github.io/plugins/gmeekVercount.js'></script><script src='https://xiuji008.github.io/plugins/lightbox.js'></script><script src='https://xiuji008.github.io/plugins/gmeekTOC.js'></script><script src='https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0/dist/autoload.js'></script>",

```



### 其它使用说明

#### issue添加中文标签

1. 点击 `issue`页签, 点击右侧 `Labels` 后边的设置按钮，点击`Edit labels`

![issues_labels_setting.png](https://xiuji008.github.io/images/202601/issues_labels_setting.png)

2. 在`Labels` 页面则可以新增或修改标签

![issues_labels_edit.png](https://xiuji008.github.io/images/202601/issues_labels_edit.png)

#### 置顶博客文章

只需要`Pin issue`后，手动全局生成一次即可。

![issues_pin.png](https://xiuji008.github.io/images/202601/issues_pin.png)

#### 评论 utteranc报错

如果在评论里面登录后评论报错，可直接按照提示安装`utteranc app`即可

```
Error: utterances is not installed on xxx/xxx.github.io. If you own this repo, install the app. Read more about this change in the PR.
```

#### 删除文章

只需要`Close issue`或者`Delete issue`后，再手动全局生成一次即可。


## 结语：在数字时代留下有温度的痕迹

“死了么”关注的是物理存在的安全，而Gmeek这样的工具关注的是思想存在的延续。两者看似无关，实则都回应了现代人对存在感的深层渴望。

在这个算法主导、注意力碎片化的时代，拥有一个属于自己的数字角落，定期记录、整理、输出，不仅是对抗遗忘的方式，更是一种积极的生活态度——主动塑造自己的数字身份，而非被动地被平台定义。

从担心“无人知晓的离去”到主动“留下有思想的痕迹”，或许正是数字时代给予我们的一种平衡：既通过工具获得安全感，也通过表达实现自我确认。

你的思想值得被记录，你的声音值得被听见。现在，只需18秒，就可以开始在GitHub上建造你的数字思想家园。