import type { HeadConfig } from '../types/index.js'

const onlyTags = ['title', 'base']
const allowedTags = ['link', 'meta', 'script', 'style', 'noscript', 'template']

/**
 * Resolve identifier of a tag, to avoid duplicated tags in `<head>`
 */
export const resolveHeadIdentifier = ([tag, attrs, content]: HeadConfig):
  | string
  | null => {
  // avoid duplicated `<meta>` with same `name`
  if (tag === 'meta' && attrs.name) {
    return `${tag}.${attrs.name}`
  }

  // there should be only one `<title>` or `<base>`
  if (onlyTags.includes(tag)) {
    return tag
  }

  // avoid duplicated `<template>` with same `id`
  if (tag === 'template' && attrs.id) {
    return `${tag}.${attrs.id}`
  }

  if (allowedTags.includes(tag)) {
    return JSON.stringify([
      tag,
      Object.fromEntries(
        Object.entries(attrs)
          // handle boolean attributes
          .map(([key, value]) =>
            typeof value === 'boolean'
              ? value
                ? [key, '']
                : null
              : [key, value]
          )
          .filter((item): item is [string, string] => item != null)
          // sort keys
          .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      ),
      content,
    ])
  }

  // tags are not allowed
  return null
}
