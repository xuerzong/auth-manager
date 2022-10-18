import { useState } from 'react'
import { DeleteIcon, DragHandleIcon, EditIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Icon,
  Box,
  ButtonGroup,
  IconButton,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverFooter,
  Button,
  PopoverBody,
  useDisclosure,
  Tag,
  Stack,
} from '@chakra-ui/react'
import { Reorder, useDragControls, useMotionValue } from 'framer-motion'
import { UserPlus } from 'tabler-icons-react'
import useAccounts, { setAccounts, deleteAccountByKey } from '@/stores/accounts'
import { setKey as setAccountKey } from '@/stores/account-key'
import { setOpen as setAccountModalOpen } from '@/stores/account-modal'
import type { AccountInterface } from '@/types/account'
import AccountComp from '../common/Account'
import type { AccountProps } from '../common/Account'
import Tags from './Tags'
import Empty from '../common/Empty'

const Account: React.FC<AccountProps> = (props) => {
  const { accountKey, tags = [] } = props

  const [isHover, setIsHover] = useState<boolean>(false)
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const { onOpen, onClose, isOpen } = useDisclosure()

  const handleEditAccount = () => {
    setAccountKey(accountKey)
    setAccountModalOpen(true)
  }

  const handleDeleteAccount = async (key: string) => {
    await deleteAccountByKey(key)
    onClose()
  }

  const tagsRender = tags.map((tag) => (
    <Tag as="li" key={tag} size="sm" whiteSpace="nowrap" listStyleType="none">
      {tag}
    </Tag>
  ))

  return (
    <Reorder.Item
      value={accountKey}
      id={accountKey}
      style={{
        y: y,
        position: 'relative',
        marginBottom: 8,
      }}
      dragListener={false}
      dragControls={dragControls}
      onMouseOver={() => {
        !isHover && setIsHover(true)
      }}
      onMouseLeave={() => {
        isHover && setIsHover(false)
      }}
    >
      <Flex
        alignItems="center"
        bg="white"
        px="2"
        py="3"
        rounded="md"
        cursor="pointer"
        _hover={{
          shadow: 'xs',
        }}
      >
        <Icon
          as={DragHandleIcon}
          onPointerDown={(event) => dragControls.start(event)}
          cursor="grab"
          mr="4"
          color="gray.500"
        />
        <AccountComp {...props} />
        <Stack direction="row" spacing="2" as="ul" mx="2">
          {tagsRender}
        </Stack>
        <Flex>
          <IconButton
            size="sm"
            aria-label="edit"
            icon={<Icon as={EditIcon} />}
            mr={1}
            onClick={handleEditAccount}
          />
          <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} size="xs">
            <PopoverTrigger>
              <IconButton
                size="sm"
                aria-label="delete"
                color="red"
                icon={<Icon as={DeleteIcon} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>Confirm delete this account?</PopoverBody>
              <PopoverFooter textAlign="right">
                <ButtonGroup size="xs">
                  <Button onClick={onClose} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteAccount.bind(null, accountKey)}>
                    Confirm
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Reorder.Item>
  )
}

const Accounts: React.FC = () => {
  const accounts = useAccounts((state) => state.accounts)

  const onModalShow = () => {
    setAccountModalOpen(true)
  }

  const handleOrderAccount = (keys: string[]) => {
    const sortedAccounts = keys.map(
      (key) => accounts.find((item) => item.key === key) as AccountInterface
    )
    setAccounts(sortedAccounts)
  }

  const accountsRender = (
    <Reorder.Group
      axis="y"
      onReorder={handleOrderAccount}
      values={accounts.map((item) => item.key)}
    >
      {accounts.map((account) => (
        <Account accountKey={account.key} {...account} key={account.key} />
      ))}
    </Reorder.Group>
  )

  return (
    <Box w="full">
      <Flex alignItems="center" mb="4" bg="white">
        <Text fontSize="xl" fontWeight="bold" textTransform="uppercase">
          Accounts
        </Text>
        <Spacer />
        <IconButton
          mr="2"
          aria-label="add account"
          icon={<Icon as={UserPlus} />}
          onClick={onModalShow}
        />
        <Tags />
      </Flex>

      {accounts.length ? accountsRender : <Empty />}
    </Box>
  )
}

export default Accounts
