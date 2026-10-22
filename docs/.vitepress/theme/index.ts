import OrbitSignature from './OrbitSignature.vue'
import './orbit-signature.css'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Home from './Home.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(OrbitSignature),
  }),
  enhanceApp({ app }) {
    app.component('ProjectHome', Home)
  },
} satisfies Theme
