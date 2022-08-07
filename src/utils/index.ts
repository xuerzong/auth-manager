import { isChromeExtension } from './is'

export const goToOptions = () => {
  if (!isChromeExtension()) {
    return window.open('/options', '_blank')
  }

  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage()
  } else {
    window.open(chrome.runtime.getURL('options.html'))
  }
}
