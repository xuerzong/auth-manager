import { goToOptions } from '@/utils'
import { Box, Flex, Icon, Spacer, Tooltip } from '@chakra-ui/react'
import { Settings } from 'tabler-icons-react'

const Toolbar = () => {
  return (
    <Flex w="full" alignItems="center" p="2">
      <Spacer />
      <Tooltip label="Setting options">
        <Box as="span">
          <Icon
            cursor="pointer"
            verticalAlign="-0.125em"
            as={Settings}
            onClick={goToOptions}
          />
        </Box>
      </Tooltip>
    </Flex>
  )
}

export default Toolbar
