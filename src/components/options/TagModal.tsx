import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import useApp, { clearCurrentTag, setTagModalVisible } from '@/stores/app'
import useTags, { createOrUpdateTag } from '@/stores/tags'
import Input from '../common/Input'
import Modal from '../common/Modal'

const TagModal: React.FC = () => {
  const { tagModalVisible, currentTag = '' } = useApp()
  const tags = useTags((state) => state.tags)
  const formRef = useRef<HTMLFormElement>(null)

  const onOk = async () => {
    if (!formRef.current) return
    const form = new FormData(formRef.current)
    const newTag = form.get('tag')!.toString().trim()

    if (!newTag || newTag === currentTag) {
      return
    }

    if (!tags.includes(newTag)) {
      await createOrUpdateTag(currentTag, newTag)
    } else {
      toast.error('Cannot have the same tag')
    }
  }

  const onClose = () => {
    setTagModalVisible(false)
    clearCurrentTag()
  }

  return (
    <Modal visible={tagModalVisible} onOk={onOk} onClose={onClose}>
      <form ref={formRef}>
        <div>
          <label htmlFor="tag">Tag</label>
          <Input
            id="tag"
            name="tag"
            placeholder="Please enter tag name"
            className="mt-2"
            defaultValue={currentTag}
          />
        </div>
      </form>
    </Modal>
  )
}

export default TagModal
