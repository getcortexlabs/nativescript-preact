import { defineConfig } from 'vitepress'

const site = 'https://nativescript-preact.rafaelaugusto.dev'
const repo = 'https://github.com/rafaelaugustos/nativescript-preact'
const description =
  'An independent project exploring Preact for native iOS and Android apps with NativeScript. Read the project goals, status, and roadmap.'

export default defineConfig({
  lang: 'en-US',
  title: 'NativeScript Preact',
  description,
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  sitemap: { hostname: site },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#7041d9' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'NativeScript Preact' }],
    ['meta', { property: 'og:image', content: `${site}/logo.png` }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
  ],
  transformHead({ pageData }) {
    const path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const url = `${site}/${path}`

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:description', content: pageData.description || description }],
    ]
  },
  themeConfig: {
    siteTitle: 'NativeScript Preact',
    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Roadmap', link: '/project/roadmap' },
      { text: 'Contribute', link: '/project/contributing' },
    ],
    sidebar: [
      {
        text: 'Start here',
        items: [
          { text: 'Introduction', link: '/guide/' },
          { text: 'Try the prototype', link: '/guide/prototype' },
          { text: 'Project status', link: '/guide/status' },
        ],
      },
      {
        text: 'The project',
        items: [
          { text: 'Design goals', link: '/project/design' },
          { text: 'Roadmap', link: '/project/roadmap' },
          { text: 'Contributing', link: '/project/contributing' },
        ],
      },
    ],
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: repo }],
    outline: { level: [2, 3], label: 'On this page' },
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: `Released under the <a href="${repo}/blob/main/LICENSE">MIT License</a>.`,
      copyright: 'Maintained by <a href="https://github.com/rafaelaugustos">Rafael Augusto</a>.<br>Supported by <a href="https://getcortexlabs.com/">Cortex Labs</a>.',
    },
  },
})
