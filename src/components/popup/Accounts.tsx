import auth from '@/services/auth'
import useAccounts from '@/stores/accounts'
import useTags from '@/stores/tags'
import { emptyAccount } from '@/constants/account'
import Account from '../common/Account'
import Empty from '../common/Empty'
import { ChevronRightIcon } from '../icons/ChevronRight'

const Accounts: React.FC = () => {
  const accounts = useAccounts((state) => state.accounts)
  const tags = useTags((state) => state.tags)

  console.log(tags)

  const handleChange = async (nextKey: string) => {
    const curAccount = accounts.find((item) => item.key === nextKey)!
    await auth.select(curAccount)
    window.close()
  }

  return (
    <ul className="w-full">
      {tags.map((item) => (
        <li key={item}>
          <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all">
            {item}

            <div className="flex-1"></div>

            <span className="block w-6 h-6">
              <ChevronRightIcon />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Accounts
