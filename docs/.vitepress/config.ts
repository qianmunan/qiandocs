import { createRequire } from 'module'
import { DefaultTheme, defineConfig } from 'vitepress'
import { description, github, keywords, name, site, logo } from './meta'
import sidebar from './sidebar'
import { link } from 'fs';

const nav: DefaultTheme.NavItem[] = [
    {
        text: "首页",
        link: "/articles/",
        activeMatch: '/articles/'
    },
    {
        text: "专栏",             //导航标签的名字
        items: [                  //这种格式是有下拉菜单的版本
            { text: "Ros2", link: "/ros/" },      //text代表每一项的名字，link是连接的位置
            { text: "Matlab", link: "/matlab/" }

        ],
    },
    {
        text: "杂记",
        link: '/scattered/'
    },
    {
        text: "项目",
        activeMatch: "/project/",
        link: "/project/"
    },
    {
        text: "资源导航",
        activeMatch: "/download/",
        link: "/download/"
    },
]

export default defineConfig({
    outDir: '../../gaidocs',
    title: name,
    description,
    base: "/",
    lastUpdated: true,
    useWebFonts: false,
    cleanUrls: true,
    markdown: {
        theme: 'github-dark',
        lineNumbers: true,
    },
    vue: {
        template: {
            compilerOptions: {
                
            },
        },
    },
    locales: {
        root: { label: '简体中文', lang: 'zh-CN' }
    },
    head: [
        ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
        ['meta', { name: 'keywords', content: keywords }],
        ['meta', { name: 'author', content: '小锅盖儿' }],
        ['meta', { property: 'og:type', content: 'article' }],
        ['meta', { name: 'application-name', content: name }],
        ['meta', { name: 'apple-mobile-web-app-title', content: name }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],

        ['link', { rel: 'shortcut icon', href: 'https://photohosting.oss-cn-hangzhou.aliyuncs.com/captures/grinning-face-with-big-eyes_1f603.png' }],
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        ['link', { rel: 'mask-icon', href: '', color: '#06f' }],
        ['meta', { name: 'theme-color', content: '#06f' }],
        // webfont
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
        ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
        // og
        ['meta', { property: 'og:description', content: description }],
        ['meta', { property: 'og:url', content: site }],
        ['meta', { property: 'og:locale', content: 'zh_CN' }],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css', crossorigin: '' }]
    ],
    themeConfig: {
        logo,
        outline: 'deep',
        docFooter: {
            prev: '上一篇',
            next: '下一篇',
        },
        returnToTopLabel: '返回顶部',
        outlineTitle: '导航栏',
        darkModeSwitchLabel: '外观',
        sidebarMenuLabel: '归档',
        editLink: {
            pattern: `${github}/tree/main/docs/:path`,
            text: '在 GitHub 上编辑此页面'
        },
        lastUpdatedText: '最后一次更新于',
        // 底部
        footer: {
            message: `用心去梳理高质量的专业Ros内容，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现`,
            copyright: `<a target="_blank" href="${github}/blob/main/LICENSE">MIT License</a> | 版权所有 © 2022-${new Date().getFullYear()} <a target="_blank" href="${github}"> Qiananran contributors</a>`,
        },
        nav,
        // 搜索
        //algolia,
        //侧边栏
        sidebar,
        socialLinks: [{ icon: "github", link: "https://github.com/qianmunan" }],
    },
})