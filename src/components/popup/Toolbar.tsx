import { SettingIcon } from '../icons/Setting'
import { goToOptions } from '@/utils'

const Toolbar = () => {
  return (
    <div className="flex items-center p-2">
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
