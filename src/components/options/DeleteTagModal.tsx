import { deleteTagFromAccount } from '@/stores/accounts'
import useApp, { clearCurrentTag, setDeleteTagModalVisible } from '@/stores/app'
import { deleteTagByValue } from '@/stores/tags'
import DeleteModal from './DeleteModal'

const DeleteTagModal: React.FC = () => {
  const { deleteTagModalVisible, currentTag } = useApp((state) => state)

  const onDelete = async (value: string) => {
    await deleteTagByValue(value)
    await deleteTagFromAccount(value)
  }

  const onCancel = () => {
    clearCurrentTag()
    setDeleteTagModalVisible(false)
  }

  if (!currentTag) return null

  return (
    <DeleteModal
      originValue={currentTag}
      visible={deleteTagModalVisible}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  )
}

export default DeleteTagModal
