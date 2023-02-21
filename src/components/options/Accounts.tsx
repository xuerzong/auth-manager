import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import cls from 'classnames'
import {
  setAccountModalVisible,
  setCurrentAccount,
  setDeleteAccountModalVisible,
} from '@/stores/app'
import useAccounts from '@/stores/accounts'
import Empty from '../common/Empty'
import IconButton from '../common/IconButton'
import Icon from '../common/Icon'
import { DotsHorizontalIcon } from '../icons/DotsHorizontal'
import { UserPlusIcon } from '../icons/UserPlus'
import { DeleteIcon } from '../icons/Delete'
import { EditIcon } from '../icons/Edit'

const Accounts: React.FC = () => {
  const accounts = useAccounts((state) => state.accounts)

  const onEdit = (account?: string) => {
    setCurrentAccount(account || '')
    setAccountModalVisible(true)
  }

  const onDelete = async (account: string) => {
    setCurrentAccount(account)
    setDeleteAccountModalVisible(true)
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <span className="font-bold uppercase">Account List</span>
        <div className="flex-1" />

        <IconButton onClick={() => onEdit()}>
          <Icon size="sm" as={<UserPlusIcon />} />
        </IconButton>
      </div>

      <div>
        {accounts.length ? (
          accounts.map((account) => (
            <div
              key={account.key}
              className="flex items-center px-2 py-3 hover:bg-gray-100 rounded transition-all"
            >
              {account.key}

              <div className="flex-1" />

              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button>
                    <Icon
                      size="md"
                      className="text-gray-500 cursor-pointer"
                      as={<DotsHorizontalIcon />}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded bg-white shadow z-10">
                    <div className="p-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cls(
                              'w-full flex items-center transition-colors p-1 rounded',
                              { 'bg-primary-600 text-white': active }
                            )}
                            onClick={onEdit.bind(null, account.key)}
                          >
                            <Icon
                              className="mr-1"
                              size="sm"
                              as={<EditIcon />}
                            />
                            Edit
                          </button>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={cls(
                              'w-full flex items-center transition-colors p-1 rounded',
                              { 'bg-primary-600 text-white': active }
                            )}
                            onClick={onDelete.bind(null, account.key)}
                          >
                            <Icon
                              className="mr-1"
                              size="sm"
                              as={<DeleteIcon />}
                            />
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
