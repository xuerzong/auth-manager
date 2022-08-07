export const isChromeExtension = () => {
  // anyway
  return !isUndefined(chrome.runtime)
}

export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined'
}
