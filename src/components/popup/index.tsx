import Accounts from './Accounts'
import Toolbar from './Toolbar'

const PopupChildren: React.FC = () => {
  return (
    <div className="w-80 flex flex-col space-y-4">
      <Toolbar />
      <Accounts />
    </div>
  )
}

export default PopupChildren
