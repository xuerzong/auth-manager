import storage from '@/libs/storage'
import { isArray } from '@/utils/is'

const AM_TAG_KEY = 'AUTH_TAG_KEY_99'

const setTags = async (accounts: string[]) => {
  storage.set(AM_TAG_KEY, accounts)
}

const getTags = async () => {
  const storageRes = await storage.get<string[]>(AM_TAG_KEY)
  return isArray(storageRes) ? storageRes : []
}

export default { set: setTags, get: getTags }
