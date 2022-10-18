import { isUndefined } from '@/utils/is'

export const getCurrent = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  })
  return tabs[0] || {}
}

export const reload = async () => {
  const { id } = await getCurrent()
  if (isUndefined(id)) {
    return
  }
  await chrome.tabs.reload(id)
}

export default { reload, getCurrent }
