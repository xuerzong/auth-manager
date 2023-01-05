import AccountModal from './AccountModal'
import Accounts from './Accounts'
import DeleteAccountModal from './DeleteAccountModal'

const OptionsChildren: React.FC = () => {
  return (
    <div className="max-w-screen-md p-4 md:px-0 mx-auto">
      <Accounts />
      <AccountModal />
      <DeleteAccountModal />
    </div>
  )
}

export default OptionsChildren
