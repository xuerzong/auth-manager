import { useRef } from 'react'
import Input from '../common/Input'
import Modal from '../common/Modal'

interface Props<T extends string> {
  originValue: T
  onCancel(): Promise<void> | void
  onDelete(key?: T): Promise<void> | void
  visible: boolean
}

const inputName = 'confirm'

const DeleteModal: React.FC<Props<string>> = ({
  originValue,
  visible,
  onCancel,
  onDelete,
}) => {
  const formRef = useRef<HTMLFormElement>(null)

  const onOk = async () => {
    if (!formRef.current) return
    const form = new FormData(formRef.current)
    const confirm = form.get(inputName)?.toString().trim()

    if (originValue !== confirm) {
      return alert('Delete unsuccessfully')
    }

    await onDelete(confirm)

    alert('Delete successfully')
  }

  const onClose = async () => {
    await onCancel()
  }

  return (
    <Modal onOk={onOk} onClose={onClose} visible={visible}>
      <form ref={formRef}>
        <p className="mb-4">
          Please type
          <code className="bg-gray-100 px-2 mx-2 text-primary-600">
            {originValue}
          </code>
          to confirm.
        </p>
        <Input name={inputName} placeholder="Please type" />
      </form>
    </Modal>
  )
}

export default DeleteModal
