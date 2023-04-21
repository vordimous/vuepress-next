import type { ZoomOptions } from 'medium-zoom'

/**
 * Options for @vuepress/plugin-medium-zoom
 */
export interface MediumZoomOptions {
  /**
   * Selector of zoomable images
   *
   * @default ':not(a) > img'
   */
  selector?: string

  /**
   * Delay in milliseconds
   *
   * @default 500
   */
  delay?: number

  /**
   * Options for medium-zoom
   *
   * @see https://github.com/francoischalifour/medium-zoom#options
   */
  zoomOptions?: ZoomOptions
}
