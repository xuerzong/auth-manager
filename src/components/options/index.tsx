import { Fragment } from 'react'
import { Container, VStack } from '@chakra-ui/react'
import AccountModal from './AccountModal'
import Accounts from './Accounts'
import Toolbar from './Toolbar'

const OptionsChildren: React.FC = () => {
  return (
    <Fragment>
      <Container maxW="container.md" my="8">
        <VStack w="full">
          {/* <Toolbar /> */}
          <Accounts />
        </VStack>
      </Container>

      <AccountModal />
    </Fragment>
  )
}

export default OptionsChildren
