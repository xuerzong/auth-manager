import { isUndefined } from '@/utils/is'
import tabs from './tabs'

const goto = async (path: string) => {
  const { id } = await tabs.getCurrent()
  if (isUndefined(id)) return
  await chrome.scripting.executeScript({
    target: { tabId: id },
    func: (path: string) => {
      location.href = `${location.origin}${path}`
    },
    args: [path],
  })
}

export default { goto }
