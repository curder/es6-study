import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: "zh-CN",
    base: "/es6-study/",
    title: "ES6 学习",
    description: "ES6 学习记录",
    lastUpdated: true,
    themeConfig: {
        // logo: "",
        siteTitle: "ES6 学习",
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
        {text: 'Guide', link: '/guide/let-and-const-directives', activeMatch: '/guide/'},
    ];
}

function sidebarGuide() {
    return [
        {
            items: [
                {text: "let 和 const 指令", link: "/guide/let-and-const-directives"},
            ]
        },
    ];
}
