import { setCurrentAccount, setDeleteAccountModalVisible } from '@/stores/app'
import useAccounts from '@/stores/accounts'
import { setKey as setAccountKey } from '@/stores/account-key'
import { setOpen as setAccountModalOpen } from '@/stores/account-modal'
import Empty from '../common/Empty'
import IconButton from '../common/IconButton'
import Icon from '../common/Icon'
import { UserPlusIcon } from '../icons/UserPlus'
import { DeleteIcon } from '../icons/Delete'
import { EditIcon } from '../icons/Edit'

const Accounts: React.FC = () => {
  const accounts = useAccounts((state) => state.accounts)

  const handleEditAccount = (account?: string) => {
    setAccountKey(account || '')
    setAccountModalOpen(true)
  }

  const handleDelete = async (account: string) => {
    setCurrentAccount(account)
    setDeleteAccountModalVisible(true)
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="font-bold uppercase">Account Manager</span>
        <div className="flex-1" />

        <IconButton onClick={() => handleEditAccount()}>
          <Icon size="sm" as={<UserPlusIcon />} />
        </IconButton>
      </div>

      <div>
        {accounts.length ? (
          accounts.map((account) => (
            <div
              key={account.key}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {account.key}

              <div className="flex-1" />

              <div className="space-x-2">
                <IconButton onClick={() => handleEditAccount(account.key)}>
                  <Icon as={<EditIcon />} size="sm" />
                </IconButton>
                <IconButton
                  className="text-red-500"
                  onClick={() => handleDelete(account.key)}
                >
                  <Icon as={<DeleteIcon />} size="sm" />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

export default Accounts
