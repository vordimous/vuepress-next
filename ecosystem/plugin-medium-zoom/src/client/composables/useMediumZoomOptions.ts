import { defineClientData, useClientData } from '@vuepress/client'
import type { InjectionKey } from 'vue'
import type { MediumZoomOptions } from '../types.js'

export const mediumZoomKey: InjectionKey<MediumZoomOptions> = Symbol(
  __VUEPRESS_DEV__ ? 'medium-zoom' : ''
)

export const defineDocsearchConfig = (options: MediumZoomOptions): void =>
  defineClientData(mediumZoomKey, options)

export const useMediumZoomOptions = (): Required<MediumZoomOptions> => {
  const options = useClientData(mediumZoomKey)

  return {
    selector: ':not(a) > img',
    delay: 500,
    zoomOptions: {},
    ...options,
  }
}
