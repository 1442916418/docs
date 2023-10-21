export default {
  base: '/docs/',
  title: '鱼的文档',
  description: 'HTML、CSS、JavaScript文档...',
  themeConfig: {
    nav: [
      { text: '导航', link: '/guide/index' },
      {
        text: '基础',
        items: [
          { text: 'HTML', link: '/guide/base/HTML/index' },
          { text: 'CSS', link: '/guide/base/CSS/index' },
          { text: 'JavaScript', link: '/guide/base/JavaScript/index' }
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'Vue', link: '/guide/frame/vue/index' },
          { text: 'Vue3', link: '/guide/frame/vue3/index' }
        ]
      },
      {
        text: '计算机',
        items: [
          { text: '网络', link: '/guide/computer/network/index' },
          { text: 'OSI', link: '/guide/computer/osi/index' }
        ]
      },
      {
        text: '代码片段/库',
        items: [{ text: 'Three.js', link: '/guide/code-snippet/three/index' }]
      }
    ],
    // editLink: {
    //   pattern: 'https://github.com/1442916418/docs/main/docs/:path',
    //   text: '在 GitHub 上编辑此页面'
    // },
    lastUpdated: {
      text: '更新时间: '
    },
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Evan You'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/1442916418/docs/' }]
  },
  markdown: {
    lineNumbers: true
  }
}
