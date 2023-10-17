export default {
  title: '鱼的文档',
  description: '文档...',
  themeConfig: {
    nav: [
      { text: '导航', link: '/guide/index' },
      {
        text: '前端基础',
        items: [
          { text: 'HTML', link: '/guide/base/HTML/index' },
          { text: 'CSS', link: '/guide/base/CSS/index' },
          { text: 'JavaScript', link: '/guide/base/JavaScript/index' }
        ]
      }
    ],
    editLink: {
      pattern: 'https://github.com/1442916418/docs/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    lastUpdated: {
      text: '更新时间: '
    },
    search: {
      provider: 'local'
    }
  }
}
