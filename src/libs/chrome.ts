const getInstance = () => {
  const instance = window.chrome || (window as any).broswer
  return instance as typeof chrome
}

const getStorage = async (...keys: string[]) => {
  await chrome.storage.sync.get(keys)
}

const setStorage = (key: string, value: any) => {
  let valueCopy = value
  if(typeof valueCopy === 'object') {
    valueCopy = JSON.stringify(valueCopy)
  }
  chrome.storage.sync.set({ [key]: valueCopy })
}


export default { getStorage, setStorage }