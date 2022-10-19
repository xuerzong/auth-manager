import { Flex, Text, Spacer } from '@chakra-ui/react'
import type { AccountInterface } from '@/types/account'

export interface AccountProps extends Pick<AccountInterface, 'tags'> {
  accountKey: string
}

const Account: React.FC<AccountProps> = ({ accountKey, tags = [] }) => {
  return (
    <Flex
      bg="transparent"
      width="full"
      alignItems="center"
      userSelect="none"
      p="2"
    >
      <Text fontSize="sm" fontWeight="bold">
        {accountKey}
      </Text>
      <Spacer />
    </Flex>
  )
}

export default Account
