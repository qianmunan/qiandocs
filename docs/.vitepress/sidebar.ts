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
            text: 'ROS2 安装与卸载',
            collapsed: false,
            items: [
                { text: 'ROS2 安装', link: '/ros/base/install' },
            ],
        },
        {
            text: 'ROS2 通信机制核心',
            collapsed: false,
            items: [
                { text: '简介', link: '/ros/base/'},
                { text: '话题通信', link: '/ros/base/topic'},
                { text: '服务通信', link: '/ros/base/server'},
                { text: '动作通信', link: 'ros/base/action'},
                { text: '参数通信', link: 'ros/base/param'}
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
            text: 'Matlab 基础',
            collapsed: false,
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
            text: 'windows',
            collapsible: false,
            collapsed: false,
            items: [
                { text: '' }
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
            collapsed: false,
            items: [
                { text: '初衷', link: '' },
                { text: '', link: '' }
            ],
        },
        {
            text: '校园资讯',
            collapsed: false,
            items: [
                { text: '初衷', link: '' },
                { text: '', link: '' }
            ],
        },
        {
            text: 'Ros 无人小车',
            collapsed: false,
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
            collapsible: false,
            collapsed: false,
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
            collapsed: false,
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
            collapsible: false,    //是不是可以动态展开
            collapsed: false,      //默认是不是展开
            items: []
        }
    ],

}