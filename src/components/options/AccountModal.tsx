import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import useAccounts, { createOrUpdateAccount } from '@/stores/accounts'
import useAccountKey, { setKey as setAccountKey } from '@/stores/account-key'
import useAccountModal, {
  setOpen as setAccountModalOpen,
} from '@/stores/account-modal'
import useTags from '@/stores/tags'
import { AccountModalModes } from '@/constants/account'
import type { AccountInterface } from '@/types/account'
import cloneDeep from 'clone-deep'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Select from '../common/Select'

const emptyAccount: AccountInterface = {
  key: '',
  password: '',
}

const AccountModal: React.FC = () => {
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
    const account = accountTmp ? { ...accountTmp } : { ...emptyAccount }
    setCurAccount(cloneDeep(account))
    accountCache.current = cloneDeep(account)
  }, [accountKey, accounts])

  const onOk = async () => {
    if (!curAccount.key) {
      return alert('Account is required')
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
      return alert('Account is existed')
    }
    await createOrUpdateAccount(accountCache.current.key, curAccount)
    onCancel()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCurAccount({ ...curAccount, [name]: value })
  }

  const handleSelectTag = (tag: string) => {
    setCurAccount({ ...curAccount, tags: [tag] })
  }

  const onCancel = () => {
    onClose()
  }

  const onClose = () => {
    setAccountKey('')
    setAccountModalOpen(false)
  }

  return (
    <Modal visible={accountModalOpen} onClose={onClose} onOk={onOk}>
      <form>
        <div className="space-y-2">
          <div className="space-y-2">
            <label htmlFor="account">Account</label>
            <Input
              name="key"
              value={curAccount.key}
              placeholder="Please enter account"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              value={curAccount.password}
              placeholder="Please enter password"
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <div className="space-y-2">
              <label htmlFor="tags">Tags</label>
              <Select
                name="tags"
                value={curAccount.tags?.[0]}
                placeholder="Please select tags"
                options={tags.map((tag) => ({ value: tag, label: tag }))}
                onChange={handleSelectTag}
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AccountModal
