import storage from '@/libs/storage'
import type { AccountInterface } from '@/types/account'
import { isArray } from '@/utils/is'

const AM_ACCOUNT_KEY = 'AUTH_ACCOUNT_KEY_99'

export const setAccounts = async (accounts: AccountInterface[]) => {
  storage.set(AM_ACCOUNT_KEY, accounts)
}

export const getAccounts = async () => {
  const storageRes = await storage.get<AccountInterface[]>(AM_ACCOUNT_KEY)
  if (!isArray(storageRes)) {
    await setAccounts([])
    return []
  }
  return storageRes
}
