import { Stack } from '@chakra-ui/react'
import Accounts from './Accounts'
import Toolbar from './Toolbar'

const PopupChildren: React.FC = () => {
  return (
    <Stack w="320px" spacing="0" pb="4">
      <Toolbar />
      <Accounts />
    </Stack>
  )
}

export default PopupChildren
