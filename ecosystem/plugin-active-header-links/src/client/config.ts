import { defineClientConfig } from '@vuepress/client'
import { useActiveHeaderLinks } from './composables/index.js'

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_SSR__) return

    useActiveHeaderLinks()
  },
})
