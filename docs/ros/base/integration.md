---
title: 集成开发环境搭建
---

# {{$frontmatter.title}} :motor_scooter:

::: tip 开始之前先听个音乐
<Iframe mylink="//music.163.com/outchain/player?type=2&id=1306923998&auto=1&height=66"></Iframe>
:::

::: tip 说在前面
在学习过程中，根据老师的教程，使用的VsCode,但是在某一天，给挂了（没有了代码提示）。:sob:<br>
这对于一个写代码的文员来说，是一个极其烦的事情。<br>
所以我改变了我的集成开发环境，使用的是Clion<br>
至于它的安装这里就不详细介绍了，各位各显神通吧 :smiling_face_with_three_hearts:
:::

## 官方教程
我先把官方的教程贴出来，英语好的同学可以阅读一下。[官方教程](https://www.jetbrains.com/help/clion/ros2-tutorial.html#create-ext-tool)<br>

## 创建一个Ros2功能包
1. 创建你的工作空间 `mkdir -p ws00_helloworld/src`
2. 在工作空间中编译整个项目 `colcon build`
3. 进入工作空间中的src目录下创建第一个功能包
```bash
# 使用 C++ 进行编写
ros2 pkg create pkg01_helloworld_cpp --build-type ament_cmake --dependencies rclcpp --node-name helloworld
```
执行完毕，在src目录下将生成一个名为pkg01_helloworld_cpp的目录，且目录中已经默认生成了一些子级文件与文件夹。

## 简单写一点代码
进入pkg01_helloworld_cpp/src目录，该目录下有一helloworld.cpp文件，修改文件内容如下：
```cpp
#include "rclcpp/rclcpp.hpp"

int main(int argc, char ** argv)
{
  // 初始化 ROS2
  rclcpp::init(argc,argv);
  // 创建节点
  auto node = rclcpp::Node::make_shared("helloworld_node");
  // 输出文本
  RCLCPP_INFO(node->get_logger(),"hello world!");
  // 释放资源
  rclcpp::shutdown();
  return 0;
}
```

## 编译
终端下进入到工作空间，执行如下指令：
```sh
colcon build --cmake-args -DCMAKE_EXPORT_COMPILE_COMMANDS=ON
```
或
```sh
colcon build --cmake-args -DCMAKE_EXPORT_COMPILE_COMMANDS=ON -G Ninja
```
::: danger 注意
注意，CMAKE_EXPORT_COMPILE_COMMANDS选项只有在CMake使用Makefile或Ninja生成器时可用，可以通过-G选项指定。<br>
:::

构建完成后，在build目录下会生成一个compile_commands.json文件。<br>

## 运行CLion
在CLion中打开ROS2项目<br>

+ 在`File | Open`中选择刚刚生成的`compile_commands.json`文件并`“Open as Project”`。

+ 然而CLion把build文件夹当成了工程的根目录。所以我们可以点击 `Tools | Compilation Database | Change Project Root`把根目录替换为你的ROS2工作空间文件夹

## 问题
::: warning
当你在加入新的 C++ 文件的时候，编辑器CLion不会将它识别!! :sob:
:::
解决：
1. 创建完新的 C++ 文件后，我们先编译一下，这里可能会出错，先不用管他
2. 在回到CLion查看，你会发现，该文件就会加入到ROS2的环境中来，至于为什么，我没有想明白 