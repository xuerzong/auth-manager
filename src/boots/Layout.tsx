import { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/provider'
import theme from '@/libs/theme'
import './Layout.css'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}

export default Layout