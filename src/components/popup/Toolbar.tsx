import { ButtonGroup, Flex, IconButton, Spacer } from '@chakra-ui/react'
import { Settings } from 'tabler-icons-react'
import { goToOptions } from '@/utils'

const Toolbar = () => {
  return (
    <Flex w="full" alignItems="center" p="2">
      <Spacer />
      <ButtonGroup>
        <IconButton
          size="sm"
          aria-label="to-options"
          icon={<Settings />}
          onClick={goToOptions}
        />
      </ButtonGroup>
    </Flex>
  )
}

export default Toolbar
