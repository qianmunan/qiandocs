---
title: ROS 初体验
---

# {{$frontmatter.title}} :heart_eyes:

## 创建功能包
终端下，进入ws00_helloworld/src目录，使用如下指令创建一个C++功能包：
```bash
ros2 pkg create pkg01_helloworld_cpp --build-type ament_cmake --dependencies rclcpp --node-name helloworld
```
执行完毕，在src目录下将生成一个名为pkg01_helloworld_cpp的目录，且目录中已经默认生成了一些子级文件与文件夹。

## 编辑源文件
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

## 编辑配置文件
在步骤1创建功能包时所使用的指令已经默认生成且配置了配置文件，不过实际应用中经常需要自己编辑配置文件，所以在此对相关内容做简单介绍，所使用的配置文件主要有两个，分别是功能包下的package.xml与CMakeLists.txt。
### 1.package.xml
文件内容如下：

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>pkg01_helloworld_cpp</name>
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="ros2@todo.todo">ros2</maintainer>
  <license>TODO: License declaration</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <!-- 所需要依赖 -->
  <depend>rclcpp</depend>

  <test_depend>ament_lint_auto</test_depend>
  <test_depend>ament_lint_common</test_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>
```
注释部分以后需要根据实际的包依赖进行添加或修改。

### 2.CMakeLists.txt
文件内容如下：
```c
cmake_minimum_required(VERSION 3.8)
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
中文注释部分以后可能需要根据实际情况修改。

## 编译项目
终端下进入到工作空间，执行如下指令：
```bash
colcon build
```

## 执行项目
终端下进入到工作空间，执行如下指令：
```bash
. install/setup.bash
ros2 run pkg01_helloworld_cpp helloworld
```
程序执行，在终端下将输出文本："hello world!"。

## 运行优化
::: danger 注意
虽然这样设置的运行优化，在一定程度上方便了我们使用，但是，我认为没有必要<br>
其实就是一条命令的事情，`source install/setup.bash`, 没必要按下面设置<br>
如果你就是想优化，当这个danger不存在。
:::

每次终端中执行工作空间下的节点时，都需要调用. install/setup.bash指令，使用不便，优化策略是，可以将该指令的调用添加进~/setup.bash，操作格式如下：
``` bash
echo "source /{工作空间路径}/install/setup.bash" >> ~/.bashrc
```
示例：
``` bash
echo "source /home/ros2/ws00_helloworld/install/setup.bash" >> ~/.bashrc
```
以后再启动终端时，无需手动再手动刷新环境变量，使用更方便。