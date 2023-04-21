import { defineClientConfig } from '@vuepress/client'
import { default as mediumZoom } from 'medium-zoom'
import { mediumZoomSymbol, useMediumZoomOptions } from './composables/index.js'

import './styles/vars.css'
import './styles/medium-zoom.css'

export default defineClientConfig({
  enhance({ app, router }) {
    const { selector, delay, zoomOptions } = useMediumZoomOptions()

    if (__VUEPRESS_SSR__ || !selector) return

    // create zoom instance and provide it
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/50690
    const zoom = mediumZoom(zoomOptions)
    zoom.refresh = (sel = selector) => {
      zoom.detach()
      zoom.attach(sel)
    }
    app.provide(mediumZoomSymbol, zoom)

    router.afterEach(() => {
      setTimeout(() => zoom.refresh(), delay)
    })
  },
})
