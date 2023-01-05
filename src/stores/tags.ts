import create from 'zustand'
import tagsService from '@/services/tag'

interface State {
  tags: string[]

  /**
   * Popup selected tag
   */
  currentTag: string
}

const store = create<State>(() => ({
  tags: [],
  currentTag: '',
}))

export const setTags = async (tags: string[], saveStorage = true) => {
  store.setState({ tags })
  if (saveStorage) {
    tagsService.set(tags)
  }
}

export const fetchTags = async () => {
  const accounts = await tagsService.get()
  await setTags(accounts, false)
}

export const createOrUpdateTag = async (oldTag: string, newTag: string) => {
  const curTags = store.getState().tags
  const oldTagIndex = curTags.findIndex((item) => item === oldTag)
  if (oldTagIndex < 0) {
    curTags.unshift(newTag)
  } else {
    curTags[oldTagIndex] = newTag
  }
  await setTags([...curTags])
}

export const deleteTagByValue = async (tag: string) => {
  const curTags = store.getState().tags
  const tagIndex = curTags.findIndex((item) => item === tag)
  if (tagIndex > -1) {
    curTags.splice(tagIndex, 1)
  }
  await setTags([...curTags])
}

export const setCurrentTag = (newCurrentTag: string) => {
  store.setState({ currentTag: newCurrentTag })
}

export const clearCurrentTag = () => {
  setCurrentTag('')
}

export default store
