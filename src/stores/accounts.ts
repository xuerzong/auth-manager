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

export const fetchAccounts = async () => {
  const accounts = await getAccounts()
  store.setState({ accounts })
}

export const setAccounts = async (
  accounts: AccountInterface[],
  saveStorage = true
) => {
  store.setState({ accounts })
  if (saveStorage) {
    setAccountsToStorage(accounts)
  }
}

export default store
