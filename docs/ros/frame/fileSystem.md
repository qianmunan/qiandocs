---
title: 文件体系
---
# {{$frontmatter.title}}

## 概述
立足系统架构，如下图所示，ROS2可以划分为三层：

+ **操作系统层（OS Layer）**

如前所述，ROS虽然称之为机器人操作系统，但实质只是构建机器人应用程序的软件开发工具包，ROS必须依赖于传统意义的操作系统，目前ROS2可以运行在Linux、Windows、Mac或RTOS上。

+ **中间层（Middleware Layer）**

主要由数据分发服务DDS与ROS2封装的关于机器人开发的中间件组成。DDS是一种去中心化的数据通讯方式，ROS2还引入了服务质量管理 （Quality of Service）机制，借助该机制可以保证在某些较差网络环境下也可以具备良好的通讯效果。ROS2中间件则主要由客户端库、DDS抽象层与进程内通讯API构成。

+ **应用层（Application Layer）**

是指开发者构建的应用程序，在应用程序中是以功能包为核心的，在功能包中可以包含源码、数据定义、接口等内容。

<div align=center><img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/screenshot/ros2/Screenshot%20from%202023-04-19%2010-01-52.png"></div>

对于一般开发者而言，工作内容主要集中在应用层，开发者一般通过实现具有某一特定功能的功能包来构建机器人应用程序。对应的我们所介绍的ROS2文件系统主要是指在硬盘上以功能包为核心的目录与文件的组织形式。

## 概览
功能包是ROS2应用程序的核心，但是功能包不能直接构建，必须依赖于工作空间，一个ROS2工作空间的目录结构如下：
```bash
WorkSpace --- 自定义的工作空间。
    |--- build：存储中间文件的目录，该目录下会为每一个功能包创建一个单独子目录。
    |--- install：安装目录，该目录下会为每一个功能包创建一个单独子目录。
    |--- log：日志目录，用于存储日志文件。
    |--- src：用于存储功能包源码的目录。
        |-- C++功能包
            |-- package.xml：包信息，比如:包名、版本、作者、依赖项。
            |-- CMakeLists.txt：配置编译规则，比如源文件、依赖项、目标文件。
            |-- src：C++源文件目录。
            |-- include：头文件目录。
            |-- msg：消息接口文件目录。
            |-- srv：服务接口文件目录。
            |-- action：动作接口文件目录。
```
另外，无论是Python功能包还是C++功能包，都可以自定义一些配置文件相关的目录。
```bash
|-- C++或Python功能包
    |-- launch：存储launch文件。
    |-- rviz：存储rviz2配置相关文件。
    |-- urdf：存储机器人建模文件。
    |-- params：存储参数文件。
    |-- world：存储仿真环境相关文件。
    |-- map：存储导航所需地图文件。
    |-- ......
```

## 源文件说明
在ROS2中，推荐以继承Node的方式来创建节点对象。
C++继承Node实现示例如下：
```cpp
#include "rclcpp/rclcpp.hpp"

class MyNode: public rclcpp::Node{
public:
    MyNode():Node("node_name"){
        RCLCPP_INFO(this->get_logger(),"hello world!");
    }

};

int main(int argc, char *argv[])
{
    rclcpp::init(argc,argv);
    auto node = std::make_shared<MyNode>();
    rclcpp::shutdown();
    return 0;
}
```

之所以继承比直接实例化Node更被推荐，是因为继承方式可以在一个进程内组织多个节点，这对于提高节点间的通信效率是很有帮助的，但是直接实例化则与该功能不兼容。

## 配置文件说明
在ROS2功能包中，经常需要开发者编辑一些配置文件以设置功能包的构建信息，功能包类型不同，所需修改的配置文件也有所不同。C++功能包的构建信息主要包含在package.xml与CMakeLists.txt中，Python功能包的构建信息则主要包含在package.xml和setup.py中，接下来我们就简单了解一下这些配置文件。
### package.xml
不管是何种类型的功能包，package.xml的格式都是类似的，在该文件中包含了包名、版本、作者、依赖项的信息，package.xml可以为colcon构建工具确定功能包的编译顺序。一个简单的package.xml示例如下：
```c
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>pkg01_helloworld_cpp</name>
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="ros2@todo.todo">ros2</maintainer>
  <license>TODO: License declaration</license>

  <buildtool_depend>ament_cmake</buildtool_depend>
  <depend>rclcpp</depend>

  <test_depend>ament_lint_auto</test_depend>
  <test_depend>ament_lint_common</test_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```

1. 根标签
```c
<package>：该标签为整个xml文件的根标签，format属性用来声明文件的格式版本。
```
2.元信息标签
```c
    <name>：包名；
    <version>：包的版本号；
    <description>：包的描述信息；
    <maintainer>：维护者信息；
    <license>：软件协议；
    <url>：包的介绍网址；
    <author>：包的作者信息。
```
3.依赖项
```c
    <buildtool_depend>：声明编译工具依赖；
    <build_depend>：声明编译依赖；
    <build_export_depend>：声明根据此包构建库所需依赖；
    <exec_depend>：声明执行时依赖；
    <depend>：相当于<build_depend>、<build_export_depend>、<exec_depend>三者的集成；
    <test_depend>：声明测试依赖；
    <doc_depend>：声明构建文档依赖。
```

### CMakeLists.txt

C++功能包中需要配置CMakeLists.txt文件，该文件描述了如何构建C++功能包，一个简单的CMakeLists.txt示例如下：
```c
# 声明cmake的最低版本
cmake_minimum_required(VERSION 3.8)
# 包名，需要与package.xml中的包名一致
project(pkg01_helloworld_cpp)

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
# 引入外部依赖包
find_package(rclcpp REQUIRED)

# 映射源文件与可执行文件
add_executable(helloworld src/helloworld.cpp)
# 设置目标依赖库
ament_target_dependencies(
  helloworld
  "rclcpp"
)
# 定义安装规则
install(TARGETS helloworld
  DESTINATION lib/${PROJECT_NAME})

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following line skips the linter which checks for copyrights
  # comment the line when a copyright and license is added to all source files
  set(ament_cmake_copyright_FOUND TRUE)
  # the following line skips cpplint (only works in a git repo)
  # comment the line when this package is in a git repo and when
  # a copyright and license is added to all source files
  set(ament_cmake_cpplint_FOUND TRUE)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()
```

## 操作命令

ROS2的文件系统核心是功能包，我们可以通过编译指令colcon和ROS2内置的工具指令ros2来实现功能包的创建、编译、查找与执行等相关操作。
### 1.创建

新建功能包语法如下：
```bash
ros2 pkg create 包名 --build-type 构建类型 --dependencies 依赖列表 --node-name 可执行程序名称
格式解释：
    --build-type：是指功能包的构建类型，有cmake、ament_cmake、ament_python三种类型可选；
    --dependencies：所依赖的功能包列表；
    --node-name：可执行程序的名称，会自动生成对应的源文件并生成配置文件。
```
### 2.编译

编译功能包语法如下：
```bash
colcon build
或
colcon build --packages-select 功能包列表
```
前者会构建工作空间下的所有功能包，后者可以构建指定功能包。
### 3.查找

在ros2 pkg命令下包含了多个查询功能包相关信息的参数。
```bash
ros2 pkg executables [包名] # 输出所有功能包或指定功能包下的可执行程序。
ros2 pkg list # 列出所有功能包
ros2 pkg prefix 包名 # 列出功能包路径
ros2 pkg xml # 输出功能包的package.xml内容
```
### 4.执行

执行命令语法如下：
```bash
ros2 run 功能包 可执行程序 参数
```