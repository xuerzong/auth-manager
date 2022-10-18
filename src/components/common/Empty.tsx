import { Flex, Text } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

interface Props {
  description?: string
}

const Empty: React.FC<Props> = ({ description = 'no data' }) => {
  return (
    <Flex
      minH={200}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      opacity={0.8}
    >
      <InfoOutlineIcon mb="2" fontSize="2xl" />
      <Text
        fontSize="sm"
        fontWeight="normal"
        fontStyle="italic"
        textAlign="center"
        textTransform="uppercase"
      >
        {description}
      </Text>
    </Flex>
  )
}

export default Empty
