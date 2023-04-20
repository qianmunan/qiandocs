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
                { text: '复习c++', link: '' },
                { text: '程序性能分析', link: '' },
                { text: '复杂度记法', link: '' },
                { text: '线性表', link: '' },
                { text: '数组和矩阵', link: '' },
                { text: '栈', link: '' },
                { text: '队列', link: '' },
                { text: '跳表和散列', link: '' },
                { text: '二叉树', link: '' },
                { text: '贪婪算法', link: '' },
                { text: '分而治之', link: '' }
            ]
        },
        {
            text: '计算机网络',
            collapsed: true,
            items: [
                { text: '关于IP', link: '/netexam/base/aboutIp' },
                { text: '关于路由', link: '/netexam/base/aboutRoute'},
                { text: '关于交换机', link: '/netexam/base/aboutSwitche'},
                { text: '关于VLAN', link: '/netexam/base/aboutVlan'},
                { text: '关于STP', link: '/netexam/base/aboutStp'},
                { text: '关于PPP', link: '/netexam/base/aboutPPP'},
                { text: '关于GARP', link: '/netexam/base/aboutGarp'}
            ],
        },
        {
            text: 'Linux（Ubuntu）',
            collapsible: true,    //是不是可以动态展开
            collapsed: true,      //默认是不是展开
            items: []
        }
    ],

}