import create from 'zustand'

interface State {
  currentAccount?: string
  deleteAccountModalVisible: boolean
}

const initialState: State = {
  deleteAccountModalVisible: false,
}

const store = create<State>(() => ({ ...initialState }))

export const setCurrentAccount = (account: string) => {
  store.setState({ currentAccount: account })
}

export const clearCurrentAccount = () => {
  store.setState({ currentAccount: undefined })
}

export const setDeleteAccountModalVisible = (visible: boolean) => {
  store.setState({ deleteAccountModalVisible: visible })
}

export default store
