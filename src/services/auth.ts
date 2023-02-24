import type { AccountInterface } from '@/types/account'
import cookies from '@/libs/cookies'
import tabs from '@/libs/tabs'

export const select = async (account: AccountInterface) => {
  // <Your login workflow>
  await cookies.set('Account', account.key)
  await tabs.reload()
}

export default { select }
