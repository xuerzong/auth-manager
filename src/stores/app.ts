import create from 'zustand'

interface State {
  currentAccount?: string
  accountModalVisible: boolean
  deleteAccountModalVisible: boolean

  currentTag?: string
  tagModalVisible: boolean
  deleteTagModalVisible: boolean
}

const initialState: State = {
  accountModalVisible: false,
  deleteAccountModalVisible: false,
  tagModalVisible: false,
  deleteTagModalVisible: false,
}

const store = create<State>(() => ({ ...initialState }))

export const setCurrentAccount = (account: string) => {
  store.setState({ currentAccount: account })
}

export const clearCurrentAccount = () => {
  store.setState({ currentAccount: undefined })
}

export const setAccountModalVisible = (visible: boolean) => {
  store.setState({ accountModalVisible: visible })
}

export const setDeleteAccountModalVisible = (visible: boolean) => {
  store.setState({ deleteAccountModalVisible: visible })
}

export const setTagModalVisible = (visible: boolean) => {
  store.setState({ tagModalVisible: visible })
}

export const setCurrentTag = (tag?: string) => {
  store.setState({ currentTag: tag })
}

export const clearCurrentTag = () => {
  setCurrentTag()
}

export const setDeleteTagModalVisible = (visible: boolean) => {
  store.setState({ deleteTagModalVisible: visible })
}

export default store
