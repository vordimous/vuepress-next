import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-docsearch
 */
export interface DocsearchPluginOptions {
  /**
   * Whether to inject docsearch default styles
   */
  injectStyles?: boolean
}

export const docsearchPlugin = ({
  injectStyles = true,
}: DocsearchPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-docsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __DOCSEARCH_INJECT_STYLES__: injectStyles,
  },
})
