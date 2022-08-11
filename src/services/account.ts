import { getStorage, setStorage } from '@/libs/chrome'
import { AccountInterface } from '@/types/account'

const AM_ACCOUNT_KEY = 'AUTH_ACCOUNT_KEY_99'

export const setAccounts = async (accounts: AccountInterface[]) => {
  setStorage(AM_ACCOUNT_KEY, accounts)
}

export const findAccountByKey = (key: string, accounts: AccountInterface[]) => {
  return accounts.find((item) => item.key === key) as AccountInterface
}

export const createOrUpdateAccount = async (
  originKey: string,
  newAccount: AccountInterface
) => {
  const curAccounts = await getAccounts()
  const originAccountIndex = curAccounts.findIndex(
    (item) => item.key === originKey
  )
  if (originAccountIndex < 0) {
    curAccounts.push(newAccount)
  } else {
    curAccounts[originAccountIndex] = newAccount
  }
  await setAccounts(curAccounts)
}

export const deleteAccountByKey = async (key: string) => {
  const curAccounts = await getAccounts()
  const originAccountIndex = curAccounts.findIndex((item) => item.key === key)
  if (originAccountIndex > -1) {
    curAccounts.splice(originAccountIndex, 1)
  }
  await setAccounts(curAccounts)
}

export const getAccounts = async () => {
  return (await getStorage<AccountInterface[]>(AM_ACCOUNT_KEY)) || []
}
