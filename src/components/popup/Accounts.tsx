import { useMemo } from 'react'
import auth from '@/services/auth'
import useAccounts from '@/stores/accounts'
import useTags, { setCurrentTag } from '@/stores/tags'
import Empty from '../common/Empty'
import { ChevronRightIcon } from '../icons/ChevronRight'

const Accounts: React.FC = () => {
  const accounts = useAccounts((state) => state.accounts)
  const { tags, currentTag } = useTags()

  const accountsMemo = useMemo(() => {
    return accounts.filter((a) => a.tags && a.tags.includes(currentTag))
  }, [currentTag])

  const handleChange = async (nextKey: string) => {
    const curAccount = accounts.find((item) => item.key === nextKey)!
    await auth.select(curAccount)
    window.close()
  }

  if (currentTag) {
    return (
      <div>
        {accountsMemo.length ? (
          accountsMemo.map((account) => (
            <div
              key={account.key}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all"
            >
              {account.key}
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    )
  }

  return (
    <ul className="w-full">
      {tags.length ? (
        tags.map((item) => (
          <li key={item} onClick={() => setCurrentTag(item)}>
            <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all">
              {item}

              <div className="flex-1"></div>

              <span className="block w-6 h-6">
                <ChevronRightIcon />
              </span>
            </div>
          </li>
        ))
      ) : (
        <Empty />
      )}
    </ul>
  )
}

export default Accounts
