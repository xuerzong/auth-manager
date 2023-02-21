import { Fragment } from 'react'
import type { PropsWithChildren } from 'react'
import useInitStoreAsync from '@/hooks/useInitStoreAsync'
import '@/styles/tailwind.css'
import './Layout.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  useInitStoreAsync()
  return <Fragment>{children}</Fragment>
}

export default Layout
