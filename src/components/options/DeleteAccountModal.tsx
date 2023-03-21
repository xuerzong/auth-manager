import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import useApp, {
  clearCurrentAccount,
  setDeleteAccountModalVisible,
} from '@/stores/app'
import { deleteAccountByKey } from '@/stores/accounts'
import Input from '../common/Input'
import Modal from '../common/Modal'

const DeleteAccountModal = () => {
  const { currentAccount, deleteAccountModalVisible } = useApp()
  const formRef = useRef<HTMLFormElement>(null)

  const onOk = async () => {
    if (!formRef.current) return
    const form = new FormData(formRef.current)
    const confirmAccount = form.get('account')
    if (confirmAccount === currentAccount) {
      await deleteAccountByKey(currentAccount)
      toast.success(`Delete account ${currentAccount} successfully`)
    } else {
      toast.error(`Delete account ${currentAccount} unsuccessfully`)
    }
  }

  const onClose = () => {
    clearCurrentAccount()
    setDeleteAccountModalVisible(false)
  }

  return (
    <Modal onOk={onOk} onClose={onClose} visible={deleteAccountModalVisible}>
      <form ref={formRef}>
        <p className="mb-4">
          Please type
          <code className="bg-gray-100 px-2 mx-2 text-violet-500">
            {currentAccount}
          </code>
          to confirm.
        </p>
        <Input name="account" placeholder="Please type account" />
      </form>
    </Modal>
  )
}

export default DeleteAccountModal
