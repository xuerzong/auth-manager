import { Fragment } from 'react'
import { goToOptions } from '@/utils'
import useTags, { clearCurrentTag } from '@/stores/tags'
import { ChevronLeftIcon } from '../icons/ChevronLeft'
import { SettingIcon } from '../icons/Setting'

const Toolbar = () => {
  const currentTag = useTags((state) => state.currentTag)

  const currentTagRender = currentTag && (
    <Fragment>
      <button
        className="p-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition-all outline-none"
        onClick={clearCurrentTag}
      >
        <span className="block w-6 h-6">
          <ChevronLeftIcon />
        </span>
      </button>
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
      <button
        className="p-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition-all outline-none"
        onClick={goToOptions}
      >
        <span className="block w-6 h-6">
          <SettingIcon />
        </span>
      </button>
    </div>
  )
}

export default Toolbar
