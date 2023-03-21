import { Fragment } from 'react'
import type { PropsWithChildren } from 'react'
import '@/styles/tailwind.css'
import './Layout.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

export default Layout
