import { getCurrent } from './tabs'

const setCookies = async (key: string, value: string) => {
  const { url = '' } = await getCurrent()
  const _url = new URL(url)
  return chrome.cookies.set({ name: key, value, url: _url.origin })
}

export default { set: setCookies }
