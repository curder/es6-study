import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: "zh-CN",
    base: "/es6-study/",
    title: "Python 学习",
    description: "Python 学习记录",
    lastUpdated: true,
    themeConfig: {
        // logo: "",
        siteTitle: "Python 学习",
        outlineTitle: "章节导航",
        lastUpdatedText: "最后更新时间",
        editLink: {
            pattern: "https://github.com/curder/es6-study/edit/master/docs/:path",
            text: '编辑它'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/curder/es6-study'}
        ],
        nav: nav(),
        sidebar: {
            "/guide": sidebarGuide(),
        }
    }
});

function nav() {
    return [
        {text: 'Guide', link: '/guide/variable-declaration', activeMatch: '/guide/'},
    ];
}

function sidebarGuide() {
    return [
        {
            items: [
                {text: "变量声明", link: "/guide/variable-declaration"},
            ]
        },
    ];
}