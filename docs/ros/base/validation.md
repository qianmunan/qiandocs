---
title: 验证 Ros2 安装
lang: en-US
---

# {{$frontmatter.title}} :camel:

在ROS2中已经内置了一些案例，安装完毕之后，就可以运行这些案例，以测试ROS2的安装与配置是否正常，在此，我们选用ROS2内置的小乌龟案例，具体操作如下。

1.打开两个终端(可以使用快捷键Ctrl + Alt + T)；

2.终端1中输入指令：`ros2 run turtlesim turtlesim_node`，执行完毕，会启动一个绘有小乌龟的窗口；

3.终端2中输入指令：`ros2 run turtlesim turtle_teleop_key`，执行完毕，可以在此终端中通过键盘控制乌龟运动。

运行结果示例如下：


::: danger 注意
如果想要让小乌龟动起来，请将光标放在第二条命令所在的终端下，进行方向的键入
:::