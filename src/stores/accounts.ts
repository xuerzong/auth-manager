import create from 'zustand'
import {
  getAccounts,
  setAccounts as setAccountsToStorage,
} from '@/services/account'
import type { AccountInterface } from '@/types/account'

interface State {
  accounts: AccountInterface[]
}

const store = create<State>(() => ({
  accounts: [],
}))

export const setAccounts = async (
  accounts: AccountInterface[],
  saveStorage = true
) => {
  store.setState({ accounts })
  if (saveStorage) {
    setAccountsToStorage(accounts)
  }
}

export const fetchAccounts = async () => {
  const accounts = await getAccounts()
  await setAccounts(accounts, false)
}

export const createOrUpdateAccount = async (
  originKey: string,
  newAccount: AccountInterface
) => {
  const curAccounts = store.getState().accounts
  const originAccountIndex = curAccounts.findIndex(
    (item) => item.key === originKey
  )
  if (originAccountIndex < 0) {
    curAccounts.unshift(newAccount)
  } else {
    curAccounts[originAccountIndex] = newAccount
  }
  await setAccounts([...curAccounts])
}

export const deleteAccountByKey = async (key: string) => {
  const curAccounts = store.getState().accounts
  const originAccountIndex = curAccounts.findIndex((item) => item.key === key)
  if (originAccountIndex > -1) {
    curAccounts.splice(originAccountIndex, 1)
  }
  await setAccounts([...curAccounts])
}

export const deleteTagFromAccount = (tag: string) => {
  const { accounts } = store.getState()
  const nextAccounts = accounts.map((account) => {
    if (Array.isArray(account.tags)) {
      account.tags.splice(account.tags.indexOf(tag), 1)
    }
    return account
  })
  setAccounts(nextAccounts)
}

export default store
