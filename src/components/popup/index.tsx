import { Fragment, useMemo } from 'react'
import auth from '@/services/auth'
import useAccounts from '@/stores/accounts'
import useTags, { setCurrentTag, clearCurrentTag } from '@/stores/tags'
import { goToOptions } from '@/utils'
import { ChevronLeftIcon } from '../icons/ChevronLeft'
import { SettingIcon } from '../icons/Setting'
import IconButton from '../common/IconButton'
import Icon from '../common/Icon'
import Empty from '../common/Empty'
import { ChevronRightIcon } from '../icons/ChevronRight'

const PopupChildren: React.FC = () => {
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

  const currentTagRender = currentTag && (
    <Fragment>
      <IconButton aria-label="back" onClick={clearCurrentTag}>
        <Icon as={<ChevronLeftIcon />} />
      </IconButton>
      <div className="w-4"></div>
      <span title={currentTag} className="truncate">
        {currentTag}
      </span>
    </Fragment>
  )

  const tagsRender = tags.length ? (
    tags.map((tag) => (
      <div key={tag} onClick={() => setCurrentTag(tag)}>
        <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all">
          {tag}
          <div className="flex-1"></div>
          <Icon as={<ChevronRightIcon />} />
        </div>
      </div>
    ))
  ) : (
    <Empty />
  )

  const accountsRender = accountsMemo.length ? (
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
  )

  return (
    <div className="w-80 flex flex-col space-y-4">
      <div className="flex items-center p-2">
        {currentTagRender}
        <div className="flex-1"></div>
        <IconButton aria-label="options" onClick={goToOptions}>
          <Icon as={<SettingIcon />} />
        </IconButton>
      </div>

      <div>{currentTag ? accountsRender : tagsRender}</div>
    </div>
  )
}

export default PopupChildren
