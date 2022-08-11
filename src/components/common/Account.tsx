import { Flex, Text, Tag, Spacer, Box } from '@chakra-ui/react'
import type { AccountInterface } from '@/types/account'

export interface AccountProps extends Pick<AccountInterface, 'tags'> {
  accountKey: string
}

const Account: React.FC<AccountProps> = ({ accountKey, tags = [] }) => {
  const tagsRender = tags.map((tag) => (
    <Tag as="li" key={tag} size="sm" listStyleType="none">
      {tag}
    </Tag>
  ))

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
      <Box as="ul"> {tagsRender}</Box>
    </Flex>
  )
}

export default Account
