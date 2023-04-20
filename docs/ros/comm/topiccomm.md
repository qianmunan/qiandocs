---
title: 话题通信
---

# {{$frontmatter.title}}

## 场景
话题通信是ROS中使用频率最高的一种通信模式，话题通信是基于发布订阅模式的，也即：一个节点发布消息，另一个节点订阅该消息。话题通信的应用场景也极其广泛，比如如下场景：
> 机器人在执行导航功能，使用的传感器是激光雷达，机器人会采集激光雷达感知到的信息并计算，然后生成运动控制信息驱动机器人底盘运动。    
在该场景中，就不止一次使用到了话题通信。

+ 以激光雷达信息的采集处理为例，在ROS中有一个节点需要时时的发布当前雷达采集到的数据，导航模块中也有节点会订阅并解析雷达数据。
+ 再以运动消息的发布为例，导航模块会综合多方面数据实时计算出运动控制信息并发布给底盘驱动模块，底盘驱动有一个节点订阅运动信息并将其转换成控制电机的脉冲信号。

## 概念
话题通信是一种以发布订阅的方式实现不同节点之间数据传输的通信模型。数据发布对象称为发布方，数据订阅对象称之为订阅方，发布方和订阅方通过话题相关联，发布方将消息发布在话题上，订阅方则从该话题订阅消息，消息的流向是单向的。
<div align=center><img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/screenshot/ros2/topic1.gif"></div>
话题通信的发布方与订阅方是一种多对多的关系，也即，同一话题下可以存在多个发布方，也可以存在多个订阅方，这意味着数据会出现交叉传输的情况，当然如果没有订阅方，数据传输也会出现丢失的情况。
<div align=center><img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/screenshot/ros2/topic2.gif"></div>

## 作用
话题通信一般应用于不断更新的、少逻辑处理的数据传输场景。

## 消息借口
关于消息接口的使用有多种方式：

+ 在ROS2中通过std_msgs包封装了一些原生的数据类型,比如：String、Int8、Int16、Int32、Int64、Float32、Float64、Char、Bool、Empty.... 这些原生数据类型也可以作为话题通信的载体，不过这些数据一般只包含一个 data 字段，而std_msgs包中其他的接口文件也比较简单，结构的单一意味着功能上的局限性，当传输一些结构复杂的数据时，就显得力不从心了；
+ 在ROS2中还预定义了许多标准话题消息接口，这在实际工作中有着广泛的应用，比如：sensor_msgs包中定义了许多关于传感器消息的接口（雷达、摄像头、点云......），geometry_msgs包中则定义了许多几何消息相关的接口（坐标点、坐标系、速度指令......）；
+ 如果上述接口文件都不能满足我们的需求，那么就可以自定义接口消息；

## 两个案例
### 案例分析
::: danger
这两个案例均使用 C++ 实现
:::
在案例实现过程中，需要关注的要素有三个：
```c
发布方；
订阅方；
消息载体。
```
案例1和案例2的主要区别在于消息载体，前者可以使用原生的数据类型，后者需要自定义接口消息。
### 流程简介
案例2需要先自定义接口消息，除此之外的实现流程与案例1一致，主要步骤如下：
```c
编写发布方实现；
编写订阅方实现；
编辑配置文件；
编译；
执行。
```
### 前期准备
1. 创建一个工作空间
```bash
mkdir -p ws01_helloworld/src
```
2. 编译工作空间
```bash
cd ws01_helloworld
colcon build
```
3. 创建 C++ 功能包
```bash
cd ws01_hellowrold
cd src
ros2 pkg create cpp01_topic --build-type ament_cmake --dependencies rclcpp std_msgs base_interfaces_demo --node-name demo1_topic_str
```
4. 再次编译
```bash
cd ws01_hellowrold
colcon build
```
5. 使用集成开发工具打开项目<br>
>这里使用 CLion 集成开发工具进行编辑

### 案例一
> 编写话题通信实现，发布方以某个频率发布一段文本，订阅方订阅消息，并输出在终端。<br>


**1.发布方实现**

```cpp
/*  
  需求：以某个固定频率发送文本“hello world!”，文本后缀编号，每发送一条消息，编号递增1。
  步骤：
    1.包含头文件；
    2.初始化 ROS2 客户端；
    3.定义节点类；
      3-1.创建发布方；
      3-2.创建定时器；
      3-3.组织消息并发布。
    4.调用spin函数，并传入节点对象指针；
    5.释放资源。
*/

// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"

using namespace std::chrono_literals;

// 3.定义节点类；
class MinimalPublisher : public rclcpp::Node
{
  public:
    MinimalPublisher()
    : Node("minimal_publisher"), count_(0)
    {
      // 3-1.创建发布方；
      publisher_ = this->create_publisher<std_msgs::msg::String>("topic", 10);
      // 3-2.创建定时器；
      timer_ = this->create_wall_timer(500ms, std::bind(&MinimalPublisher::timer_callback, this));
    }

  private:
    void timer_callback()
    {
      // 3-3.组织消息并发布。
      auto message = std_msgs::msg::String();
      message.data = "Hello, world! " + std::to_string(count_++);
      RCLCPP_INFO(this->get_logger(), "发布的消息：'%s'", message.data.c_str());
      publisher_->publish(message);
    }
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<std_msgs::msg::String>::SharedPtr publisher_;
    size_t count_;
};

int main(int argc, char * argv[])
{
  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc, argv);
  // 4.调用spin函数，并传入节点对象指针。
  rclcpp::spin(std::make_shared<MinimalPublisher>());
  // 5.释放资源；
  rclcpp::shutdown();
  return 0;
}

```


**2.订阅方实现**


```cpp
/*  
    需求：订阅发布方发布的消息，并输出到终端。
    步骤：
        1.包含头文件；
        2.初始化 ROS2 客户端；
        3.定义节点类；
            3-1.创建订阅方；
            3-2.处理订阅到的消息。
        4.调用spin函数，并传入节点对象指针；
        5.释放资源。
*/

// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "std_msgs/msg/string.hpp"
using std::placeholders::_1;

// 3.定义节点类；
class MinimalSubscriber : public rclcpp::Node
{
  public:
    MinimalSubscriber()
    : Node("minimal_subscriber")
    {
      // 3-1.创建订阅方；
      subscription_ = this->create_subscription<std_msgs::msg::String>("topic", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));
    }

  private:
    // 3-2.处理订阅到的消息；
    void topic_callback(const std_msgs::msg::String & msg) const
    {
      RCLCPP_INFO(this->get_logger(), "订阅的消息： '%s'", msg.data.c_str());
    }
    rclcpp::Subscription<std_msgs::msg::String>::SharedPtr subscription_;
};

int main(int argc, char * argv[])
{
  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc, argv);
  // 4.调用spin函数，并传入节点对象指针。
  rclcpp::spin(std::make_shared<MinimalSubscriber>());
  // 5.释放资源；
  rclcpp::shutdown();
  return 0;
}
```

**3.编辑配置文件**<br>
在C++功能包中，配置文件主要关注package.xml与CMakeLists.txt。

1. package.xml

在创建功能包时，所依赖的功能包已经自动配置了，配置内容如下：
```cpp
<depend>rclcpp</depend>
<depend>std_msgs</depend>
<depend>base_interfaces_demo</depend>
```
需要说明的是`<depend>base_interfaces_demo</depend>`在本案例中不是必须的。<br>

2. CMakeLists.txt<br>
CMakeLists.txt中发布和订阅程序核心配置如下：
```cpp
find_package(rclcpp REQUIRED)
find_package(std_msgs REQUIRED)
find_package(base_interfaces_demo REQUIRED)

add_executable(demo01_talker_str src/demo01_talker_str.cpp)
ament_target_dependencies(
  demo01_talker_str
  "rclcpp"
  "std_msgs"
)

add_executable(demo02_listener_str src/demo02_listener_str.cpp)
ament_target_dependencies(
  demo02_listener_str
  "rclcpp"
  "std_msgs"
)

install(TARGETS 
  demo01_talker_str
  demo02_listener_str
  DESTINATION lib/${PROJECT_NAME})
```

4. 编译<br>
终端中进入当前工作空间，编译功能包：
```bash
colcon build --packages-select cpp01_topic
```

5. 执行<br>
当前工作空间下，启动两个终端，终端1执行发布程序，终端2执行订阅程序。

终端1输入如下指令：
```bash
. install/setup.bash
ros2 run cpp01_topic demo01_talker_str
```
终端2输入如下指令：
```bash
. install/setup.bash 
ros2 run cpp01_topic demo02_listener_str
```
### 案例二
> 编写话题通信实现，发布方以某个频率发布自定义接口消息，订阅方订阅消息，并输出在终端。

#### 话题通信自定义接口消息
自定义接口消息的流程与在功能包中编写可执行程序的流程类似，主要步骤如下：
```cpp
1. 创建并编辑 .msg文件；
2. 编辑配置文件；
3. 编译；
4. 测试。
```
接下来，我们可以参考案例2编译一个msg文件，该文件中包含学生的姓名、年龄、身高等字段。
1. **创建并编辑 .msg 文件**

功能包base_interfaces_demo下新建 msg 文件夹，msg文件夹下新建Student.msg文件，文件中输入如下内容：

string   name
int32    age
float64  height

2. **编辑配置文件**<br>
+ package.xml文件
在package.xml中需要添加一些依赖包，具体内容如下：
```cpp
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```
+ CMakeLists.txt文件

为了将.msg文件转换成对应的C++和Python代码，还需要在CMakeLists.txt中添加如下配置：
```bash
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Student.msg"
)
```
3. **编译**

终端中进入当前工作空间，编译功能包：
```bash
colcon build --packages-select base_interfaces_demo
```
4. **测试**

编译完成之后，在工作空间下的install目录下将生成Student.msg文件对应的C++和Python文件，我们也可以在终端下进入工作空间，通过如下命令查看文件定义以及编译是否正常：
``` bash
. install/setup.bash
ros2 interface show base_interfaces_demo/msg/Student
``` 
正常情况下，终端将会输出与Student.msg文件一致的内容。

#### 源码编写
 

**1.发布方实现**

```cpp
/*  
  需求：以某个固定频率发送文本学生信息，包含学生的姓名、年龄、身高等数据。
*/

// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "base_interfaces_demo/msg/student.hpp"

using namespace std::chrono_literals;
using base_interfaces_demo::msg::Student;
// 3.定义节点类；
class MinimalPublisher : public rclcpp::Node
{
  public:
    MinimalPublisher()
    : Node("student_publisher"), count_(0)
    {
      // 3-1.创建发布方；
      publisher_ = this->create_publisher<Student>("topic_stu", 10);
      // 3-2.创建定时器；
      timer_ = this->create_wall_timer(500ms, std::bind(&MinimalPublisher::timer_callback, this));
    }

  private:
    void timer_callback()
    {
      // 3-3.组织消息并发布。
      auto stu = Student();
      stu.name = "张三";
      stu.age = count_++;
      stu.height = 1.65;
      RCLCPP_INFO(this->get_logger(), "学生信息:name=%s,age=%d,height=%.2f", stu.name.c_str(),stu.age,stu.height);
      publisher_->publish(stu);

    }
    rclcpp::TimerBase::SharedPtr timer_;
    rclcpp::Publisher<Student>::SharedPtr publisher_;
    size_t count_;
};

int main(int argc, char * argv[])
{
  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc, argv);
  // 4.调用spin函数，并传入节点对象指针。
  rclcpp::spin(std::make_shared<MinimalPublisher>());
  // 5.释放资源；
  rclcpp::shutdown();
  return 0;
}

```


**2.订阅方实现**
```cpp
/*  
    需求：订阅发布方发布的学生消息，并输出到终端。
*/

// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "base_interfaces_demo/msg/student.hpp"

using std::placeholders::_1;
using base_interfaces_demo::msg::Student;
// 3.定义节点类；
class MinimalSubscriber : public rclcpp::Node
{
  public:
    MinimalSubscriber()
    : Node("student_subscriber")
    {
      // 3-1.创建订阅方；
      subscription_ = this->create_subscription<Student>("topic_stu", 10, std::bind(&MinimalSubscriber::topic_callback, this, _1));
    }

  private:
    // 3-2.处理订阅到的消息；
    void topic_callback(const Student & msg) const
    {
      RCLCPP_INFO(this->get_logger(), "订阅的学生消息：name=%s,age=%d,height=%.2f", msg.name.c_str(),msg.age, msg.height);
    }
    rclcpp::Subscription<Student>::SharedPtr subscription_;
};

int main(int argc, char * argv[])
{
  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc, argv);
  // 4.调用spin函数，并传入节点对象指针。
  rclcpp::spin(std::make_shared<MinimalSubscriber>());
  // 5.释放资源；
  rclcpp::shutdown();
  return 0;
}

```

**3.编辑配置文件**<br>
在C++功能包中，配置文件主要关注package.xml与CMakeLists.txt。

1. package.xml

在创建功能包时，所依赖的功能包已经自动配置了，配置内容如下：
```cpp
<depend>rclcpp</depend>
<depend>std_msgs</depend>
<depend>base_interfaces_demo</depend>
```
需要说明的是`<depend>base_interfaces_demo</depend>`在本案例中不是必须的。<br>

2. CMakeLists.txt<br>
CMakeLists.txt中发布和订阅程序核心配置如下：
```cpp
add_executable(demo03_talker_stu src/demo03_talker_stu.cpp)
ament_target_dependencies(
  demo03_talker_stu
  "rclcpp"
  "std_msgs"
  "base_interfaces_demo"
)

add_executable(demo04_listener_stu src/demo04_listener_stu.cpp)
ament_target_dependencies(
  demo04_listener_stu
  "rclcpp"
  "std_msgs"
  "base_interfaces_demo"
)

install(TARGETS 
  demo01_talker_str
  demo02_listener_str
  demo03_talker_stu
  demo04_listener_stu
  DESTINATION lib/${PROJECT_NAME})
```

4. 编译<br>
终端中进入当前工作空间，编译功能包：
```bash
colcon build --packages-select cpp01_topic
```

5. 执行<br>
当前工作空间下，启动两个终端，终端1执行发布程序，终端2执行订阅程序。

终端1输入如下指令：
```bash
. install/setup.bash
ros2 run cpp01_topic demo03_talker_stu
```
终端2输入如下指令：
```bash
. install/setup.bash 
ros2 run cpp01_topic demo04_listener_stu
```



