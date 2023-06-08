---
title: 安装并简单使用TeamCity
---

# {{$frontmatter.title}}<img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/emoji/202305110915741.png" width="46" height="46" alt="图片描述" style="display:inline; margin-bottom: -12px"/>

## TeamCity简介

TeamCity 是 JetBrains 公司推出的一款持续集成和持续交付工具，旨在帮助软件开发团队提高项目交付速度和质量。它支持多种编程语言和技术栈，在构建、测试、部署等方面具有很强的灵活性和可扩展性。

TeamCity 的主要用途包括：

1. 持续集成：从代码提交到版本控制系统开始，自动构建、编译、测试等，确保每次代码的提交都能够成功构建且不会破坏现有的代码。
2. 持续交付：将应用程序的更新内容部署到生产环境中，以实现快速的反馈和改进周期，同时减少错误和故障的发生。

TeamCity 通过友好的界面和强大的插件机制，极大地简化了此类任务的配置和管理。同时也为开发者提供了丰富的报告和分析，这些信息可以帮助他们识别和修复问题。

在许可证方面，TeamCity 提供了两种类型的许可证：免费的 Professional Server 和商业版 Enterprise Server。Professional Server 可限于3个 build agent 节点和100个Build configurations，而 Enterprise Server 则没有此类限制，并提供更多的高级功能和支持。如果有特定的需求，还可以根据需要进行定制化。有关定价的更多信息和细节，请参考 JetBrains 官网。

总之，TeamCity 是一款非常优秀的持续集成/交付工具，通过自动化软件构建、测试和部署过程来提高开发团队的效率和协作能力。



## TeamCity下载

请选择官方网站进行下载，[官方网址](https://teamcity.com/)

在许可证方面，TeamCity 提供了两种类型的许可证：

免费的 Professional Server 和商业版 Enterprise Server。Professional Server 可限于3个 build agent 节点和100个Build configurations。

Enterprise Server 则没有此类限制，并提供更多的高级功能和支持。如果有特定的需求，还可以根据需要进行定制化。

请根据自身情况进行选择。此刻我选择的是免费版本。



## 前期准备

安装数据库，虽然软件本身内置了一个数据库，但是我习惯使用 MySql 数据库，所以这里我安装了 MySql 数据库进行管理我的数据。

安装数据库管理软件，数据库管理软件有很多种，jetBrains公司就提供了一款强大的数据库管理软件，DataGrip，你可以去尝试一下，But 我是用的是Sqlyog这一款小巧的数据库管理软件，它可以满足我目前对数据库的所有操作。

## 安装TeamCity

::: tip 声明

操作系统版本：windows10 家庭版

TeamCity版本：Version 2022.10.3

:::

前期的安装和普通软件没有什么太大的区别，无非就是同意协议，更改安装位置。

我只记录了我安装此软件之前我不太清楚的地方。如果你和我一样，请仔细的阅读下去。我相信，这篇文章会给你带来一些帮助的。

我开始懵逼的时候：

设置TeamCity端口号

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191922444.png)

到了这里我设置完端口号后，点击下一步，出现了这个， 其实这是我们对这个软件的配置信息，建议保存一下，如果出现了问题，我们还可以查看一下。

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191923013.png)

查看一下，如果没有什么问题，我们直接点击Save就会跳到下一步。

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191926266.png)

在这里面有两个选项：先说明一下，我选择的是第一项，因为我选择第二项的时候，没有运行通过

1. Run TeamCity Server under the SYSTEM accout

    这个选项的意思为：在SYSTEM账户下运行TeamCity Server

    

2. Run TeamCity Server under a user accout

    这个选项的意思为：在一个用户账户下运行TeamCity Server

    我选择这个选项的时候出现了这个错误，所以没办法，只能选第一个了。

    ```c++
    JetBrains TeamCity 2022.10.3 Setup
    ×
    Failed to install the service.
    Selected account does not have enough rights to run as service.Loginfailed.登录失败:未授予用户在此计算机上的请求登录类型。
    Press Cancel to skip the service installation
    重试(R)
    取消
    ```

    



### 选择第一项的后续操作

选择第一项后，点击下一步，后出现这个界面

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191933409.png)

我们直接默认，点击下一步。

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191935955.png)

在这也不需要任何操作。直接Finish。它的意思是，在浏览器中打开 Web UI。

在浏览器中打开 Web UI 后，我们还需要对这个软件进行简单配置，配置说明如下：

1. 设置TeamCity服务器计算机上的数据目录位置

    根据自己的实际情况进行选择目录。

![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191937267.png)

2. 设置数据库

    这里我选择的是 MySQL，你可以选择你喜欢的数据库软件。

    这里它提示，让我们下载JDBC driver，直接点击下载就会自动下载。

    ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191943526.png)

    ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191945104.png)

3. 连接数据库

    这里需要先在MySQL数据库创建一个数据库，用于保存TeamCity数据。

    创建数据库的命令:

    ```sql
    CREATE DATABASE mydatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
    -- 上述命令将创建一个名为 "mydatabase" 的数据库，并指定了使用 utf8mb4 字符集以及 utf8mb4_general_ci 排序规则。
    ```

    在 Web UI 中的设置数据库：

    ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191954378.png)

3. 剩下的就是它自动配置了

    

    ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191956785.png)

    

    ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191956093.png)

    4. 同意协议

        ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191958509.png)

    5. 设置账户

        ![](https://gaidocs.oss-cn-hangzhou.aliyuncs.com/software/install/teamcity/202305191959206.png)

6. 最后就安装完了TeamCity。



## TeamCity基本使用

我不会使用。