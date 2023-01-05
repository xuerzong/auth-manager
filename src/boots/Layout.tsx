import { Fragment, useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { fetchAccounts } from '@/stores/accounts'
import { fetchTags } from '@/stores/tags'
import '@/styles/tailwind.css'
import './Layout.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])
  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  return <Fragment>{children}</Fragment>
}

export default Layout
