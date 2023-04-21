import { defineClientData, useClientData } from '@vuepress/client'
import type { InjectionKey } from 'vue'
import type { ActiveHeaderLinksOptions } from '../types.js'

export const activeHeaderLinksKey: InjectionKey<ActiveHeaderLinksOptions> =
  Symbol(__VUEPRESS_DEV__ ? 'active-header-link' : '')

export const defineDocsearchConfig = (
  options: ActiveHeaderLinksOptions
): void => defineClientData(activeHeaderLinksKey, options)

export const useActiveHeaderLinksOptions =
  (): Required<ActiveHeaderLinksOptions> => {
    const options = useClientData(activeHeaderLinksKey)

    return {
      headerAnchorSelector: '.header-anchor',
      headerLinkSelector: 'a.sidebar-item',
      delay: 200,
      offset: 5,
      ...options,
    }
  }
