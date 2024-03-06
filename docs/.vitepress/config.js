export default {
  base: '/docs/',
  title: '鱼的文档',
  description: 'HTML、CSS、JavaScript文档...',
  themeConfig: {
    nav: [
      // { text: '导航', link: '/guide/index' },
      {
        text: '前端',
        items: [
          { text: '主页', link: '/guide/base/index' },
          {
            text: '三板斧',
            items: [
              { text: 'HTML', link: '/guide/base/HTML/index' },
              { text: 'CSS', link: '/guide/base/CSS/index' },
              { text: 'JavaScript', link: '/guide/base/JavaScript/index' }
            ]
          },
          { text: 'TypeScript', link: '/guide/base/TypeScript/index' },
          { text: 'WebGL', link: '/guide/base/WebGL/index' },
          { text: 'Three', link: '/guide/base/Three/index' },
          { text: 'Blender', link: '/guide/base/blender/index' },
          { text: '问题', link: '/guide/base/questions/index' }
        ]
      },
      {
        text: '框架',
        items: [
          { text: '主页', link: '/guide/frame/index' },
          { text: 'Vue', link: '/guide/frame/vue/index' },
          { text: 'Vue3', link: '/guide/frame/vue3/index' },
          { text: 'vue-router', link: '/guide/frame/vue-router/index' },
          { text: 'vuex', link: '/guide/frame/vuex/index' }
        ]
      },
      {
        text: '计算机',
        items: [
          { text: '主页', link: '/guide/computer/index' },
          { text: '网络', link: '/guide/computer/network/index' },
          { text: 'OSI', link: '/guide/computer/osi/index' }
        ]
      },
      {
        text: '代码片段/库',
        items: [
          { text: '主页', link: '/guide/code-snippet/index' },
          { text: 'Three.js', link: '/guide/code-snippet/three/index' },
          { text: 'ECharts.js', link: '/guide/code-snippet/echarts/index' }
        ]
      },
      {
        text: '问题/技巧',
        items: [
          { text: '主页', link: '/guide/issue/index' },
          { text: 'Node', link: '/guide/issue/node/index' }
        ]
      }
      // {
      //   text: '记录',
      //   link: '/guide/records/index'
      // }
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/1442916418/docs/' }],
    outline: 'deep'
  },
  markdown: {
    lineNumbers: true
  },
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]]
}
