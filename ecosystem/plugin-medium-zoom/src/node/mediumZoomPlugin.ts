import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const mediumZoomPlugin = (): Plugin => ({
  name: '@vuepress/plugin-medium-zoom',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
