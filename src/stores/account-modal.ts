import create from 'zustand'

interface State {
  open: boolean
}

const initialState: State = {
  open: false,
}

const store = create<State>(() => ({ ...initialState }))

export const setOpen = (open: boolean) => {
  store.setState({ open })
}

export default store
