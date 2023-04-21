import { defineClientData, useClientData } from '@vuepress/client'
import type { InjectionKey } from 'vue'
import type { DocsearchOptions } from '../types.js'

export const docsearchKey: InjectionKey<DocsearchOptions> = Symbol(
  __VUEPRESS_DEV__ ? 'docsearch' : ''
)

export const defineDocsearchConfig = (options: DocsearchOptions): void =>
  defineClientData(docsearchKey, options)

export const useDocsearchOptions = (): DocsearchOptions => {
  const options = useClientData(docsearchKey, true)

  return options
}
