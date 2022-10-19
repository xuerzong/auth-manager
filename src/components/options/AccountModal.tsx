import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Modal,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { MultiValue, Select } from 'chakra-react-select'
import useAccounts, { createOrUpdateAccount } from '@/stores/accounts'
import useAccountKey, { setKey as setAccountKey } from '@/stores/account-key'
import useAccountModal, {
  setOpen as setAccountModalOpen,
} from '@/stores/account-modal'
import useTags from '@/stores/tags'
import { AccountModalModes } from '@/constants/account'
import type { AccountInterface } from '@/types/account'
import cloneDeep from 'clone-deep'

interface TagOptions {
  label: string
  value: string
}

const emptyAccount: Omit<AccountInterface, 'tags'> & { tags?: TagOptions[] } = {
  key: '',
  password: '',
}

const getToastConfig = () => ({
  position: 'top' as 'top',
  isClosable: true,
  duration: 3000,
})

const toSelectOptions = (arr?: string[]): TagOptions[] | undefined => {
  return arr?.map((item) => ({ label: item, value: item }))
}

const AccountModal: React.FC = () => {
  const toast = useToast()
  const tags = useTags((state) => state.tags)
  const accounts = useAccounts((state) => state.accounts)
  const accountKey = useAccountKey((state) => state.key)
  const accountModalMode = Boolean(accountKey)
    ? AccountModalModes.Edit
    : AccountModalModes.Add
  const accountModalOpen = useAccountModal((state) => state.open)
  const [curAccount, setCurAccount] = useState({ ...emptyAccount })
  const accountCache = useRef({ ...emptyAccount })

  useEffect(() => {
    const accountTmp = accounts.find((item) => item.key === accountKey)
    const account = accountTmp
      ? { ...accountTmp, tags: toSelectOptions(accountTmp.tags) }
      : { ...emptyAccount }
    setCurAccount(cloneDeep(account))
    accountCache.current = cloneDeep(account)
  }, [accountKey, accounts])

  const titleRender = `${accountModalMode} an user`

  const onOk = async () => {
    if (!curAccount.key) {
      return toast({
        title: '输入账号',
        status: 'error',
        ...getToastConfig(),
      })
    }
    const isAddUser = accountModalMode === AccountModalModes.Add
    const accountIsExsited = Boolean(
      accounts.find((item) =>
        isAddUser
          ? item.key === curAccount.key
          : item.key === curAccount.key && item.key !== accountCache.current.key
      )
    )
    if (accountIsExsited) {
      return toast({
        title: '账号已存在',
        status: 'error',
        ...getToastConfig(),
      })
    }
    await createOrUpdateAccount(accountCache.current.key, {
      ...curAccount,
      tags: curAccount.tags?.map((item) => item.value),
    })
    onCancel()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCurAccount({ ...curAccount, [name]: value })
  }

  const handleTagChange = (e: MultiValue<TagOptions>) => {
    setCurAccount({ ...curAccount, tags: e as TagOptions[] })
  }

  const onCancel = () => {
    onClose()
  }

  const onClose = () => {
    setAccountKey('')
    setAccountModalOpen(false)
  }

  return (
    <Modal isOpen={accountModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{titleRender}</Text>
        </ModalHeader>

        <ModalBody>
          {accountModalOpen && (
            <VStack>
              <FormControl>
                <FormLabel htmlFor="account">Account</FormLabel>
                <Input
                  name="key"
                  placeholder="Account"
                  value={curAccount.key}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name="password"
                  placeholder="Password"
                  value={curAccount.password}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="tabs">Tabs</FormLabel>
                <Select
                  id="tabs"
                  name="tabs"
                  placeholder="Tabs"
                  value={curAccount.tags}
                  onChange={handleTagChange}
                  options={tags.map((item) => ({ label: item, value: item }))}
                  isMulti
                />
              </FormControl>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onCancel}>Cancel</Button>
            <Button colorScheme="purple" onClick={onOk}>
              Ok
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AccountModal
