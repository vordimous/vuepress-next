import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const activeHeaderLinksPlugin = (): Plugin => ({
  name: '@vuepress/plugin-active-header-links',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
