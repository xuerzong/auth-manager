import { isChromeExtension } from './is'

export const goToOptions = () => {
  if (!isChromeExtension()) {
    return window.open('/options.html', '_blank')
  }

  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
}

export const downloadURI = (uri: string, fileName: string) => {
  const link = document.createElement('a')

  link.setAttribute('download', fileName)
  link.href = uri

  document.body.appendChild(link)
  link.click()
  link.remove()
}
