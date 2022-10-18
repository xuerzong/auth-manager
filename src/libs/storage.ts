import { isChromeExtension, isString } from '@/utils/is'

export const getStorage = async <T = any>(key: string): Promise<T | null> => {
  if (isChromeExtension()) {
    const { [key]: value } = (await chrome.storage.sync.get(key)) || {
      [key]: '',
    }
    return value ? (JSON.parse(value) as T) : null
  }

  const value = localStorage.getItem(key)
  return value ? (JSON.parse(value) as T) : null
}

export const setStorage = <T>(key: string, value: T) => {
  let valueCopy: T | string = value
  if (!isString(valueCopy)) {
    valueCopy = JSON.stringify(valueCopy)
  }

  if (isChromeExtension()) {
    return chrome.storage.sync.set({ [key]: valueCopy })
  }

  localStorage.setItem(key, valueCopy)
}

export default { set: setStorage, get: getStorage }
