export const isChromeExtension = () => {
  // anyway
  return !isUndefined(chrome.runtime)
}

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined'
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isArray = <T = any>(value: unknown): value is T[] => {
  return Array.isArray(value)
}
