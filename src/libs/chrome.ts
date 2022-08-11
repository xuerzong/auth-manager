import { isChromeExtension, isString } from '@/utils/is'

const getInstance = () => {
  const instance = window.chrome || (window as any).broswer
  return instance as typeof chrome
}

interface StorageRes {
  [key: string]: any
}

export const getStorage = async <T extends StorageRes>(keys: string) => {
  if (isChromeExtension()) {
    return (await chrome.storage.sync.get(keys)) as T
  }

  const _value = localStorage.getItem(keys)
  return _value ? (JSON.parse(_value) as T) : null
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
