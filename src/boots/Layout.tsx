import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/libs/theme'
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

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default Layout
