import { extendTheme } from '@chakra-ui/react'

const fonts = `Recursive, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`

const theme = extendTheme({
  fonts: {
    heading: fonts,
    body: fonts,
  },
})

export default theme