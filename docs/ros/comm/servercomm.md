---
title: 服务通信
---

# {{$frontmatter.title}}

## 场景

服务通信也是ROS中一种极其常用的通信模式，服务通信是基于请求响应模式的，是一种应答机制。也即：一个节点A向另一个节点B发送请求，B接收处理请求并产生响应结果返回给A。比如如下场景：

> 机器人巡逻过程中，控制系统分析传感器数据发现可疑物体或人... 此时需要拍摄照片并留存。

在上述场景中，就使用到了服务通信。

+ 数据分析节点A需要向相机相关节点B发送图片存储请求，节点B处理请求，并返回处理结果。

与上述应用类似的，服务通信更适用于对实时性有要求、具有一定逻辑处理的应用场景。

## 概念

服务通信是以请求响应的方式实现不同节点之间数据传输的通信模式。发送请求数据的对象称为客户端，接收请求并发送响应的对象称之为服务端，同话题通信一样，客户端和服务端也通过话题相关联，不同的是服务通信的数据传输是双向交互式的。
<div align=center><img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/screenshot/ros2/server1.gif"></div>
服务通信中，服务端与客户端是一对多的关系，也即，同一服务话题下，存在多个客户端，每个客户端都可以向服务端发送请求。
<div align=center><img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/screenshot/ros2/server2.gif"></div>
## 作用
用于偶然的、对实时性有要求、有一定逻辑处理需求的数据传输场景。

## 需求
编写服务通信，客户端可以提交两个整数到服务端，服务端接收请求并解析两个整数求和，然后将结果响应回客户端。

### 需求分析
在上述案例中，需要关注的要素有三个：
```bash
客户端；
服务端；
消息载体。
```
### 实现流程
案例实现前需要先自定义服务接口，接口准备完毕后，服务实现主要步骤如下：
```bash
编写服务端实现；
编写客户端实现；
编辑配置文件；
编译；
执行。
```
### 开始前准备
终端下进入工作空间的src目录，调用如下两条命令分别创建C++功能包
```bash
ros2 pkg create cpp02_service --build-type ament_cmake --dependencies rclcpp base_interfaces_demo
```

## 编码

### 消息接口
定义服务接口消息与定义话题接口消息流程类似，主要步骤如下：
```bash
创建并编辑 .srv文件；
编辑配置文件；
编译；
测试。
```
接下来，我们可以参考案例编写一个srv文件，该文件中包含请求数据(两个整型字段)与响应数据(一个整型字段)。

1. **创建并编辑 .srv 文件**

功能包base_interfaces_demo下新建srv文件夹，srv文件夹下新建AddInts.srv文件，文件中输入如下内容：
```bash
int32 num1
int32 num2
---
int32 sum
```
2. **编辑配置文件**
**1.package.xml 文件**

srv文件与msg文件的包依赖一致，如果你是新建的功能包添加srv文件，那么直接参考定义msg文件时package.xml 配置即可。由于我们使用的是base_interfaces_demo该包已经为msg文件配置过了依赖包，所以package.xml不需要做修改。<br>

**2.CMakeLists.txt 文件**<br>
如果是新建的功能包，与之前定义msg文件同理，为了将.srv文件转换成对应的C++和Python代码，还需要在CMakeLists.txt中添加如下配置：
```bash
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "srv/AddInts.srv"
)
```
不过，我们当前使用的`base_interfaces_demo`包，那么你只需要修改`rosidl_generate_interfaces`函数即可，修改后的内容如下：
```bash
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/Student.msg"
  "srv/AddInts.srv"
)
```
3. 编译

终端中进入当前工作空间，编译功能包：
```bash
colcon build --packages-select base_interfaces_demo
```
4. 测试

编译完成之后，在工作空间下的 install 目录下将生成AddInts.srv文件对应的C++和Python文件，我们也可以在终端下进入工作空间，通过如下命令查看文件定义以及编译是否正常：
```bash
. install/setup.bash
ros2 interface show base_interfaces_demo/srv/AddInts
```
正常情况下，终端将会输出与AddInts.srv文件一致的内容。

### 服务端实现
```cpp
/*  
  需求：编写服务端，接收客户端发送请求，提取其中两个整型数据，相加后将结果响应回客户端。
  步骤：
    1.包含头文件；
    2.初始化 ROS2 客户端；
    3.定义节点类；
      3-1.创建服务端；
      3-2.处理请求数据并响应结果。
    4.调用spin函数，并传入节点对象指针；
    5.释放资源。
*/

// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "base_interfaces_demo/srv/add_ints.hpp"

using base_interfaces_demo::srv::AddInts;

using std::placeholders::_1;
using std::placeholders::_2;

// 3.定义节点类；
class MinimalService: public rclcpp::Node{
  public:
    MinimalService():Node("minimal_service"){
      // 3-1.创建服务端；
      server = this->create_service<AddInts>("add_ints",std::bind(&MinimalService::add, this, _1, _2));
      RCLCPP_INFO(this->get_logger(),"add_ints 服务端启动完毕，等待请求提交...");
    }
  private:
    rclcpp::Service<AddInts>::SharedPtr server;
    // 3-2.处理请求数据并响应结果。
    void add(const AddInts::Request::SharedPtr req,const AddInts::Response::SharedPtr res){
      res->sum = req->num1 + req->num2;
      RCLCPP_INFO(this->get_logger(),"请求数据:(%d,%d),响应结果:%d", req->num1, req->num2, res->sum);
    }
};

int main(int argc, char const *argv[])
{
  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc,argv);

  // 4.调用spin函数，并传入节点对象指针；
  auto server = std::make_shared<MinimalService>();
  rclcpp::spin(server);

  // 5.释放资源。
  rclcpp::shutdown();
  return 0;
}
```


### 客户端实现
```bash
/*  
  需求：编写客户端，发送两个整型变量作为请求数据，并处理响应结果。
  步骤：
    1.包含头文件；
    2.初始化 ROS2 客户端；
    3.定义节点类；
      3-1.创建客户端；
      3-2.等待服务连接；
      3-3.组织请求数据并发送；
    4.创建对象指针调用其功能,并处理响应；
    5.释放资源。

*/
// 1.包含头文件；
#include "rclcpp/rclcpp.hpp"
#include "base_interfaces_demo/srv/add_ints.hpp"

using base_interfaces_demo::srv::AddInts;
using namespace std::chrono_literals;

// 3.定义节点类；
class MinimalClient: public rclcpp::Node{
  public:
    MinimalClient():Node("minimal_client"){
      // 3-1.创建客户端；
      client = this->create_client<AddInts>("add_ints");
      RCLCPP_INFO(this->get_logger(),"客户端创建，等待连接服务端！");
    }
    // 3-2.等待服务连接；
    bool connect_server(){
      while (!client->wait_for_service(1s))
      {
        if (!rclcpp::ok())
        {
          RCLCPP_INFO(rclcpp::get_logger("rclcpp"),"强制退出！");
          return false;
        }

        RCLCPP_INFO(this->get_logger(),"服务连接中，请稍候...");
      }
      return true;
    }
    // 3-3.组织请求数据并发送；
    rclcpp::Client<AddInts>::FutureAndRequestId send_request(int32_t num1, int32_t num2){
      auto request = std::make_shared<AddInts::Request>();
      request->num1 = num1;
      request->num2 = num2;
      return client->async_send_request(request);
    }


  private:
    rclcpp::Client<AddInts>::SharedPtr client;
};

int main(int argc, char ** argv)
{
  if (argc != 3){
    RCLCPP_INFO(rclcpp::get_logger("rclcpp"),"请提交两个整型数据！");
    return 1;
  }

  // 2.初始化 ROS2 客户端；
  rclcpp::init(argc,argv);

  // 4.创建对象指针并调用其功能；
  auto client = std::make_shared<MinimalClient>();
  bool flag = client->connect_server();
  if (!flag)
  {
    RCLCPP_INFO(rclcpp::get_logger("rclcpp"),"服务连接失败！");
    return 0;
  }

  auto response = client->send_request(atoi(argv[1]),atoi(argv[2]));

  // 处理响应
  if (rclcpp::spin_until_future_complete(client,response) == rclcpp::FutureReturnCode::SUCCESS)
  {
    RCLCPP_INFO(client->get_logger(),"请求正常处理");
    RCLCPP_INFO(client->get_logger(),"响应结果:%d!", response.get()->sum);

  } else {
    RCLCPP_INFO(client->get_logger(),"请求异常");
  }

  // 5.释放资源。
  rclcpp::shutdown();
  return 0;
}
```

### 编辑配置文件
1.packages.xml

在创建功能包时，所依赖的功能包已经自动配置了，配置内容如下：

<depend>rclcpp</depend>
<depend>base_interfaces_demo</depend>

2.CMakeLists.txt

CMakeLists.txt 中服务端和客户端程序核心配置如下：
```cpp
find_package(ament_cmake REQUIRED)
find_package(rclcpp REQUIRED)
find_package(base_interfaces_demo REQUIRED)

add_executable(demo01_server src/demo01_server.cpp)
ament_target_dependencies(
  demo01_server
  "rclcpp"
  "base_interfaces_demo"
)
add_executable(demo02_client src/demo02_client.cpp)
ament_target_dependencies(
  demo02_client
  "rclcpp"
  "base_interfaces_demo"
)

install(TARGETS 
  demo01_server
  demo02_client
  DESTINATION lib/${PROJECT_NAME})
```

### 编译
终端中进入当前工作空间，编译功能包：
```bash
colcon build --packages-select cpp02_service
```
### 执行

当前工作空间下，启动两个终端，终端1执行服务端程序，终端2执行客户端程序。

终端1输入如下指令：
```bash
. install/setup.bash
ros2 run cpp02_service demo01_server
```
终端2输入如下指令：
```bash
. install/setup.bash
ros2 run cpp02_service demo02_client 100 200
```