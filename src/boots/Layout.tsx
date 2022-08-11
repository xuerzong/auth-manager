import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/libs/theme'
import { fetchAccounts } from '@/stores/accounts'
import './Layout.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    fetchAccounts()
  }, [fetchAccounts])

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default Layout
