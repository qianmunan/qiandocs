---
title: Ros2 安装
---
# {{$frontmatter.title}} :kiss:

::: tip 声明
整体而言，ROS2的安装步骤不算复杂，大致步骤如下：

+ 设置语言环境；
+ 启动Ubuntu universe存储库；
+ 设置软件源；
+ 安装ROS2；
+ 配置环境。
:::
::: danger
请注意：虽然安装比较简单，但是安装过程比较耗时，需要耐心等待。
:::

## 设置语言环境
请先检查本地语言环境是否支持UTF-8编码，可调用如下指令检查并设置UTF-8编码：
``` bash
locale  # 检查是否支持 UTF-8

# 终端输出
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC=zh_CN.UTF-8
LC_TIME=zh_CN.UTF-8
LC_COLLATE="en_US.UTF-8"
LC_MONETARY=zh_CN.UTF-8
LC_MESSAGES="en_US.UTF-8"
LC_PAPER=zh_CN.UTF-8
LC_NAME=zh_CN.UTF-8
LC_ADDRESS=zh_CN.UTF-8
LC_TELEPHONE=zh_CN.UTF-8
LC_MEASUREMENT=zh_CN.UTF-8
LC_IDENTIFICATION=zh_CN.UTF-8
LC_ALL=

# 如果不是上述内容，请使用一下命令更正
# but 可能改变你电脑的语言环境
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

::: danger
注意：语言环境可以不同，但必须支持UTF-8编码。
:::

## 启动Ubuntu universe存储库
**图形化操作:**
请打开软件与更新(Software & Updates)窗口，确保启动了universe存储库，以保证可以下载”社区维护的免费和开源软件“，操作示例如下：


## 设置软件源
先将ROS 2 apt存储库添加到系统，用apt授权我们的GPG密钥：
```bash
sudo apt update && sudo apt install curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
```
然后将存储库添加到源列表：
```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

## 安装ROS2
首先更新apt存储库缓存：
``` bash
sudo apt update
```
然后升级已安装的软件(ROS2软件包建立在经常更新的Ubuntu系统上，在安装新软件包之前请确保您的系统是最新的)：
``` bash
sudo apt upgrade
```
安装桌面版ROS2(建议)，包含：ROS、RViz、示例与教程，安装命令如下：
``` bash
sudo apt install ros-humble-desktop
```

## 配置环境
终端下，执行ROS2程序时，需要调用如下命令配置环境：
```bash
source /opt/ros/humble/setup.bash
```
每次新开终端时，都得执行上述命令，或者也可以执行如下命令，将配置环境指令写入 ”~/.bashrc“ 文件，那么每次新启动终端时，不需要在手动配置环境：
``` bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
```
到目前为止，ROS2就已经安装且配置完毕了。

## 此外
为了我们方便在终端中调试和编译我们的项目，再此还需要安装一个可以分栏的终端模拟器和colco构建工具
### 安装colcon构建工具
colcon是一个命令行工具，用于改进编译，测试和使用多个软件包的工作流程。它实现过程自动化，处理需求并设置环境以便于使用软件包。ROS2中便是使用colcon作为包构建工具的，但是ROS2中没有默认安装colcon，需要自行安装，安装命令如下：
```bash
sudo apt install python3-colcon-common-extensions
```
### 安装终端模拟器 terminator
```bash
# 安装
sudo apt install terminator
```

Terminator 常用快捷键 
```bash
//第一部份：关于在同一个标签内的操作
Alt+Up                          //移动到上面的终端
Alt+Down                        //移动到下面的终端
Alt+Left                        //移动到左边的终端
Alt+Right                       //移动到右边的终端
Ctrl+Shift+O                    //水平分割终端
Ctrl+Shift+E                    //垂直分割终端
Ctrl+Shift+Right                //在垂直分割的终端中将分割条向右移动
Ctrl+Shift+Left                 //在垂直分割的终端中将分割条向左移动
Ctrl+Shift+Up                   //在水平分割的终端中将分割条向上移动
Ctrl+Shift+Down                 //在水平分割的终端中将分割条向下移动
Ctrl+Shift+S                    //隐藏/显示滚动条
Ctrl+Shift+F                    //搜索
Ctrl+Shift+C                    //复制选中的内容到剪贴板
Ctrl+Shift+V                    //粘贴剪贴板的内容到此处
Ctrl+Shift+W                    //关闭当前终端
Ctrl+Shift+Q                    //退出当前窗口，当前窗口的所有终端都将被关闭
Ctrl+Shift+X                    //最大化显示当前终端
Ctrl+Shift+Z                    //最大化显示当前终端并使字体放大
Ctrl+Shift+N or Ctrl+Tab        //移动到下一个终端
Ctrl+Shift+P or Ctrl+Shift+Tab  //Crtl+Shift+Tab 移动到之前的一个终端

// 第二部份：有关各个标签之间的操作
F11                             //全屏开关
Ctrl+Shift+T                    //打开一个新的标签
Ctrl+PageDown                   //移动到下一个标签
Ctrl+PageUp                     //移动到上一个标签
Ctrl+Shift+PageDown             //将当前标签与其后一个标签交换位置
Ctrl+Shift+PageUp               //将当前标签与其前一个标签交换位置
Ctrl+Plus (+)                   //增大字体
Ctrl+Minus (-)                  //减小字体
Ctrl+Zero (0)                   //恢复字体到原始大小
Ctrl+Shift+R                    //重置终端状态
Ctrl+Shift+G                    //重置终端状态并clear屏幕
Super+g                         //绑定所有的终端，以便向一个输入能够输入到所有的终端
Super+Shift+G                   //解除绑定
Super+t                         //绑定当前标签的所有终端，向一个终端输入的内容会自动输入到其他终端
Super+Shift+T                   //解除绑定
Ctrl+Shift+I                    //打开一个窗口，新窗口与原来的窗口使用同一个进程
Super+i                         //打开一个新窗口，新窗口与原来的窗口使用不同的进程
```


