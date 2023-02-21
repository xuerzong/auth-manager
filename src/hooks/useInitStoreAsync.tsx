import { useEffect } from 'react'
import { fetchAccounts } from '@/stores/accounts'
import { fetchTags } from '@/stores/tags'

const useInitStoreAsync = () => {
  useEffect(() => {
    fetchAccounts()
    fetchTags()
  }, [])
}

export default useInitStoreAsync
