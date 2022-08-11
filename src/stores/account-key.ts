import create from 'zustand'

interface State {
  key: string
}

const initialState: State = {
  key: '',
}

const store = create<State>(() => ({ ...initialState }))

export const setKey = (newKey: string) => {
  store.setState({
    key: newKey,
  })
}

export default store
