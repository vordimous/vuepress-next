import {
  isPlainObject,
  isString,
  resolveHeadIdentifier,
} from '@vuepress/shared'
import type { HeadConfig, VuepressSSRContext } from '@vuepress/shared'
import { onMounted, provide, ref, useSSRContext, watch } from 'vue'
import {
  updateHeadSymbol,
  usePageHead,
  usePageLang,
} from './composables/index.js'
import type { UpdateHead } from './composables/index.js'

interface HeadTagInfo {
  el: HTMLElement
  id: string
  info: HeadConfig
}

/**
 * Auto update head and provide as global util
 */
export const setupUpdateHead = (): void => {
  const head = usePageHead()
  const lang = usePageLang()

  // ssr-only, extract page meta info to ssrContext
  if (__VUEPRESS_SSR__) {
    const ssrContext: VuepressSSRContext | undefined = useSSRContext()
    if (ssrContext) {
      ssrContext.head = head.value
      ssrContext.lang = lang.value
    }
    return
  }

  const headInfos = ref<HeadTagInfo[]>([])

  // load current head tags from DOM
  const loadHead = (): void => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item)

      if (tag) {
        headInfos.value.push({
          el: tag,
          id: resolveHeadIdentifier(item)!,
          info: item,
        })
      }
    })
  }

  // update html lang attribute and head tags to DOM
  const updateHead: UpdateHead = () => {
    const oldHeadInfos = headInfos.value
    const newHeadTagsConfig = head.value

    // update lang
    if (document.documentElement.lang !== lang.value)
      document.documentElement.lang = lang.value

    oldHeadInfos.forEach(({ el, info, id: oldId }) => {
      const existingHeadIndex = newHeadTagsConfig.findIndex(
        (item) => resolveHeadIdentifier(item) === oldId
      )

      // remove the tag in new tags to preserve it
      if (existingHeadIndex !== -1) {
        newHeadTagsConfig.splice(existingHeadIndex, 1)
      }
      // remove old head tags
      else {
        document.head.removeChild(el)
      }
    })

    // append new head tags
    newHeadTagsConfig.forEach((head) => {
      const el = createHeadTag(head)
      const id = resolveHeadIdentifier(head)!

      if (el) {
        document.head.appendChild(el)
        headInfos.value.push({ el, id, info: head })
      }
    })
  }
  provide(updateHeadSymbol, updateHead)

  onMounted(() => {
    loadHead()
    updateHead()
    watch(
      () => head.value,
      () => updateHead()
    )
  })
}

/**
 * Query the matched head tag of head config
 */
export const queryHeadTag = ([
  tagName,
  attrs,
  content = '',
]: HeadConfig): HTMLElement | null => {
  const attrsSelector = Object.entries(attrs)
    .map(([key, value]) => {
      if (isString(value)) {
        return `[${key}=${JSON.stringify(value)}]`
      }
      if (value === true) {
        return `[${key}]`
      }
      return ''
    })
    .join('')

  const selector = `head > ${tagName}${attrsSelector}`
  const tags = Array.from(document.querySelectorAll<HTMLElement>(selector))
  const matchedTag = tags.find((item) => item.innerText === content)
  return matchedTag || null
}

/**
 * Create head tag from head config
 */
export const createHeadTag = ([
  tagName,
  attrs,
  content,
]: HeadConfig): HTMLElement | null => {
  if (!isString(tagName)) {
    return null
  }

  // create element
  const tag = document.createElement(tagName)

  // set attributes
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString(value)) {
        tag.setAttribute(key, value)
      } else if (value === true) {
        tag.setAttribute(key, '')
      }
    })
  }

  // set content
  if (isString(content)) {
    tag.appendChild(document.createTextNode(content))
  }

  return tag
}
