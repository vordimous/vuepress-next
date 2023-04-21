import type { DocSearchProps } from '@docsearch/react'
import type { LocaleConfig } from '@vuepress/shared'

export type DocsearchLocaleData = Pick<
  DocSearchProps,
  | 'appId'
  | 'apiKey'
  | 'indexName'
  | 'placeholder'
  | 'searchParameters'
  | 'disableUserPersonalization'
  | 'initialQuery'
  | 'translations'
>

export interface DocsearchOptions extends DocsearchLocaleData {
  /**
   * Base path of the search index
   */
  indexBase?: string

  locales?: LocaleConfig<DocsearchLocaleData>
}
