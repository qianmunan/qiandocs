import { text } from "stream/consumers";

export default {
    '/': [
        {
            items: [
                { text: '📖 阅读须知', link: '/articles/'}
            ]
        },
        {
            text: '工具',
            collapsed: false,
            collapsible: true,
            items: [
                { text: 'emoji-list', link: '/tool/emoji-list'}
            ]
        },
        {
            text: '💡 备忘录',
            //是不是可以动态展开
            collapsed: false,      //默认是不是展开
            collapsible: true,    //是不是可以动态展开
            items: [
                { text: 'Git 命令', link: '/memo/git-command/' },
            ]
        }
    ],


    '/ros/': [
        {
            items: [
                { text: '📕 导读', link: '/ros/' }
            ],
        },
        {
            text: '环境搭建',
            collapsed: true,
            items: [
                { text: 'ROS2 安装', link: '/ros/base/install' },
                { text: 'ROS2 验证', link: '/ros/base/validation'},
                { text: 'ROS2 集成开发环境', link: '/ros/base/integration'},
                { text: 'ROS2 初体验', link: '/ros/base/experience'}
            ],
        },
        {
            text: '体系框架',
            collapsed: true,
            items: [
                { text: '文件系统', link: '/ros/frame/fileSystem' },
                { text: '核心模块', link: '/ros/frame/core'},
                { text: '技术支持', link: '/ros/frame/support'},
                { text: '应用方向', link: '/ros/frame/application'}
            ],
        },
        {
            text: '通信服务',
            collapsed: true,
            items: [
                { text: '简介', link: '/ros/comm/'},
                { text: '话题通信', link: '/ros/comm/topiccomm'},
                { text: '服务通信', link: '/ros/comm/servercomm'},
                { text: '动作通信', link: '/ros/comm/actioncomm'},
                { text: '参数通信', link: '/ros/comm/paramcomm'}
            ]
        },
        {
            text: 'Launch',
            collapsed: true,
            items: [
                { text: '引言', link: '' }
            ]
        },
        {
            text: '坐标变换',
            collapsed: true,
            items: [
                { text: '引言', link: '' }
            ]
        },
        {
            text: '可视化',
            collapsed: true,
            items: [
                { text: '引言', link: '' }
            ]
        }
        
    ],
    '/matlab/': [
        {
            items: [
                { text: '📕 导读', link: '/matlab/' }
            ],
        },
        {
            text: '使用MATLAB',
            collapsed: true,
            items: [
            
            ],
        },
        {
            text: '使用Simulink',
            collapsed: true,
            items: [
            
            ],
        },
        {
            text: '工作流',
            collapsed: true,
            items: [
            
            ],
        },
        {
            text: '应用',
            collapsible: true,
            collapsed: true,
            items: [
            
            ],
        }
    ],
    '/download/': [
        {
            items: [
                { text: '📕 导读', link: '/download/' }
            ]
        },
        {
            text: '在线资源链接',
            collapsible: true,
            collapsed: true,
            items: [
                { text: '工具链接', link: '/download/guide/' }
            ]
        },
        {
            text: 'Linux（Ubuntu）',
            collapsible: false,    //是不是可以动态展开
            collapsed: false,      //默认是不是展开
            items: []
        }
    ],
    '/project/': [
        {
            items: [
                { text: '📕 导读', link: '/project/' }
            ],
        },
        {
            text: '视觉生命',
            collapsed: true,
            items: [
                { text: '初衷', link: '' },
                { text: '', link: '' }
            ],
        },
        {
            text: '校园资讯',
            collapsed: true,
            items: [
                { text: '初衷', link: '' },
                { text: '', link: '' }
            ],
        },
        {
            text: 'Ros 无人小车',
            collapsed: true,
            items: [
                { text: '初衷', link: '' },
                { text: '', link: '' }
            ],
        }
    ],

    '/scattered/': [
        {
            items: [
                { text: '📕 导读', link: '/scattered/' }
            ],
        },
        {
            text: '数据结构与算法',
            collapsible: true,
            collapsed: true,
            items: [
                { text: '简介', link: '/scattered/dataStruct/'},
                { text: '复习c++', link: '/scattered/dataStruct/cpp2' },
                { text: '数据结构基本概念', link: '/scattered/dataStruct/concept' },
                { text: '线性表', link: '/scattered/dataStruct/Linear' },
                { text: '数组和矩阵', link: '/scattered/dataStruct/array' },
                { text: '栈', link: '/scattered/dataStruct/stack' },
                { text: '队列', link: '/scattered/dataStruct/queue' },
                { text: '串', link: '/scattered/dataStruct/string' },
                { text: '数组和广义表', link: '/scattered/dataStruct/' },
                { text: '树和二叉树', link: '/scattered/dataStruct/tree' },
                { text: '图', link: '/scattered/dataStruct/' },
                { text: '查找', link: '/scattered/dataStruct/' },
                { text: '内部排序', link: '' },
                { text: '算法设计与分析', link: '' },
                { text: '贪婪算法', link: '' },
                { text: '分而治之', link: '' }
            ]
        },
        {
            text: '软考中级软件设计师',
            collapsible: true,    //是不是可以动态展开
            collapsed: true,      //默认是不是展开
            items: [
                { text: '简介', link: '/scattered/softtest/' },
                { text: '计算机组成与体系结构', link: '/scattered/softtest/computercom' },
                { text: '操作系统基本原理', link: '/scattered/softtest/operatingsystem'},
                { text: '数据库系统', link: '/scattered/softtest/database'},
                { text: '计算机网络', link: '/scattered/softtest/net'},
                { text: '数据结构与算法', link: '/scattered/softtest/computercom'},
                { text: '程序设计语言', link: '/scattered/softtest/cpp'},
                { text: '法律法规', link: '/scattered/softtest/regulations'},
                { text: '标准化', link: '/scattered/softtest/standardization' },
                { text: '多媒体基础', link: '/scattered/softtest/multimedia'},
                { text: '软件工程', link: '/scattered/softtest/computercom'},
                { text: '面向对象', link: '/scattered/softtest/computercom'},
                { text: '数据流程图', link: '/scattered/softtest/computercom'},
                { text: '数据库设计', link: '/scattered/softtest/computercom'},
                { text: 'UML建模', link: '/scattered/softtest/computercom'},
                { text: '数据结构与算法应用', link: '/scattered/softtest/computercom' },
                { text: '面向对象程序设计', link: '/scattered/softtest/computercom'}
            ]
        },
        {
            text: 'HCIA（华为数通初级认证）',
            collapsed: true,
            items: [
                { text: '网络概述', link: '/netexam/base/aboutIp' },
                { text: 'VRP基础', link: '/netexam/base/aboutRoute'},
                { text: 'TCP/IP协议', link: '/netexam/base/aboutSwitche'},
                { text: '交换', link: '/netexam/base/aboutVlan'},
                { text: '交换机工作原理', link: '/netexam/base/aboutStp'},
                { text: 'VLAN', link: '/netexam/base/aboutPPP'},
                { text: 'GVRP', link: '/netexam/base/aboutGarp'},
                { text: 'STP', link: '/netexam/base/aboutSwitche'},
                { text: 'DHCP', link: '/netexam/base/aboutVlan'},
                { text: 'ACL', link: '/netexam/base/aboutStp'},
                { text: 'NAT', link: '/netexam/base/aboutPPP'},
                { text: '路由', link: '/netexam/base/aboutGarp'}
            ],
        },
        {
            text: 'HCIP（华为数通中级认证）',
            collapsed: true,
            items: [
                { text: '认识网络设备', link: '/netexam/base/aboutIp' },
                { text: 'IP路由基础', link: '/netexam/base/aboutRoute'},
                { text: 'OSPF基础', link: '/netexam/base/aboutSwitche'},
                { text: 'OSPF路由计算', link: '/netexam/base/aboutVlan'},
                { text: 'OSPF特殊区域以其他特性', link: '/netexam/base/aboutStp'},
                { text: 'IS-IS原理与配置', link: '/netexam/base/aboutPPP'},
                { text: 'BGP基础', link: '/netexam/base/aboutGarp'},
                { text: 'BGP路径属性与路由反射器', link: '/netexam/base/aboutSwitche'},
                { text: 'BGP路由优选', link: '/netexam/base/aboutVlan'},
                { text: 'BGP EVPN基础', link: '/netexam/base/aboutStp'},
                { text: '路由策略与路由控制', link: '/netexam/base/aboutPPP'},
                { text: '流量过滤与转发路径控制', link: '/netexam/base/aboutGarp'}
            ],
        },
        {
            text: '深度学习（python）',
            collapsed: true,
            items: [
                { text: '机器学习和深度学习综述', link: '/scattered/deeplearn/Overview' },
                { text: '使用Python和NumPy构建神经网络模型', link: '/netexam/base/aboutRoute'},
                { text: 'NumPy介绍', link: '/netexam/base/aboutSwitche'},
                { text: '一个案例吃透深度学习（上）', link: '/netexam/base/aboutVlan'},
                { text: '一个案例吃透深度学习（中）', link: '/netexam/base/aboutStp'},
                { text: '一个案例吃透深度学习（下）', link: '/netexam/base/aboutPPP'},
                { text: '卷积神经网络基础', link: '/netexam/base/aboutGarp'},
            ],
        }
    ],

}