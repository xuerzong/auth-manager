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
import useAccounts, {
  fetchAccounts,
  createOrUpdateAccount,
} from '@/stores/accounts'
import useAccountKey, { setKey as setAccountKey } from '@/stores/account-key'
import useAccountModal, {
  setOpen as setAccountModalOpen,
} from '@/stores/account-modal'
import { AccountModalModes } from '@/constants/account'
import type { AccountInterface } from '@/types/account'

const emptyAccount: AccountInterface = {
  key: '',
  password: '',
}

const getToastConfig = () => ({
  position: 'top' as 'top',
  isClosable: true,
  duration: 3000,
})

const AccountModal: React.FC = () => {
  const toast = useToast()
  const accounts = useAccounts((state) => state.accounts)
  const accountKey = useAccountKey((state) => state.key)
  const accountModalMode = Boolean(accountKey)
    ? AccountModalModes.Edit
    : AccountModalModes.Add
  const accountModalOpen = useAccountModal((state) => state.open)
  const [curAccount, setCurAccount] = useState({ ...emptyAccount })
  const accountCache = useRef({ ...emptyAccount })

  useEffect(() => {
    const accountTmp = accounts.find((item) => item.key === accountKey) || {
      ...emptyAccount,
    }
    setCurAccount(
      accounts.find((item) => item.key === accountKey) || { ...emptyAccount }
    )
    accountCache.current = accountTmp
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
    await createOrUpdateAccount(accountCache.current.key, curAccount)
    onCancel()
    fetchAccounts()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCurAccount({ ...curAccount, [name]: value })
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
