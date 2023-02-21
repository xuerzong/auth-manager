import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import cloneDeep from 'clone-deep'
import useAccounts, { createOrUpdateAccount } from '@/stores/accounts'
import useApp, {
  setAccountModalVisible,
  clearCurrentAccount,
} from '@/stores/app'
import useTags from '@/stores/tags'
import { emptyAccount } from '@/constants/account'
import Modal from '../common/Modal'
import Input from '../common/Input'
import Select from '../common/Select'

const AccountModal: React.FC = () => {
  const tags = useTags((state) => state.tags)
  const accounts = useAccounts((state) => state.accounts)
  const { currentAccount, accountModalVisible } = useApp()
  const [curAccount, setCurAccount] = useState({ ...emptyAccount })
  const accountCache = useRef({ ...emptyAccount })

  useEffect(() => {
    const accountTmp = accounts.find((item) => item.key === currentAccount)
    const account = accountTmp ? { ...accountTmp } : { ...emptyAccount }
    setCurAccount(cloneDeep(account))
    accountCache.current = cloneDeep(account)
  }, [currentAccount, accounts])

  const onOk = async () => {
    if (!curAccount.key) {
      return alert('Account is required')
    }
    const isAddUser = !currentAccount
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
    clearCurrentAccount()
    setAccountModalVisible(false)
  }

  return (
    <Modal visible={accountModalVisible} onClose={onClose} onOk={onOk}>
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
