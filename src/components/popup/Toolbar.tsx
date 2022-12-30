import { Fragment } from 'react'
import { goToOptions } from '@/utils'
import useTags, { clearCurrentTag } from '@/stores/tags'
import { ChevronLeftIcon } from '../icons/ChevronLeft'
import { SettingIcon } from '../icons/Setting'
import IconButton from '../common/IconButton'
import Icon from '../common/Icon'

const Toolbar = () => {
  const currentTag = useTags((state) => state.currentTag)

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

  return (
    <div className="flex items-center p-2">
      {currentTagRender}
      <div className="flex-1"></div>
      <IconButton aria-label="options" onClick={goToOptions}>
        <Icon as={<SettingIcon />} />
      </IconButton>
    </div>
  )
}

export default Toolbar
