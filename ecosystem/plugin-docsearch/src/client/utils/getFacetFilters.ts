import { isArray } from '@vuepress/shared'
import type { DocsearchOptions } from '../types.js'

type FacetFilters =
  Required<DocsearchOptions>['searchParameters']['facetFilters']

/**
 * Get facet filters for current lang
 */
export const getFacetFilters = (
  rawFacetFilters: FacetFilters = [],
  lang: string
): FacetFilters => [
  `lang:${lang}`,
  ...((isArray(rawFacetFilters)
    ? rawFacetFilters
    : [rawFacetFilters]) as string[]),
]
