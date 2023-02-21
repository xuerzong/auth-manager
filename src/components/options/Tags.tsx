import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cls from 'classnames'
import {
  setCurrentTag,
  setDeleteTagModalVisible,
  setTagModalVisible,
} from '@/stores/app'
import useTags from '@/stores/tags'
import TagModal from './TagModal'
import DeleteTagModal from './DeleteTagModal'
import { DotsHorizontalIcon } from '../icons/DotsHorizontal'
import Empty from '../common/Empty'
import Icon from '../common/Icon'
import IconButton from '../common/IconButton'
import { PlusIcon } from '../icons/Plus'
import { DeleteIcon } from '../icons/Delete'
import { EditIcon } from '../icons/Edit'

const Tags: React.FC = () => {
  const tags = useTags((state) => state.tags)

  const handleAddTag = () => {
    setTagModalVisible(true)
  }

  const handleEditTag = (tag: string) => {
    setCurrentTag(tag)
    setTagModalVisible(true)
  }

  const handleDeleteTag = async (tag: string) => {
    setCurrentTag(tag)
    setDeleteTagModalVisible(true)
  }

  return (
    <Fragment>
      <div className="flex items-center mb-4">
        <h2 className="font-bold uppercase">Tags List</h2>
        <div className="flex-1"></div>
        <IconButton onClick={handleAddTag}>
          <Icon size="sm" aria-label="add tag" as={<PlusIcon />} />
        </IconButton>
      </div>

      {tags.length ? (
        tags.map((tag) => (
          <div
            key={tag}
            className="flex items-center px-2 py-3 hover:bg-gray-100 rounded transition-all"
          >
            {tag}

            <div className="flex-1"></div>

            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button>
                  <Icon
                    size="md"
                    className="text-gray-500 cursor-pointer"
                    as={<DotsHorizontalIcon />}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded bg-white shadow z-10">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={cls(
                            'w-full flex items-center transition-colors p-1 rounded',
                            { 'bg-primary-600 text-white': active }
                          )}
                          onClick={handleEditTag.bind(null, tag)}
                        >
                          <Icon className="mr-1" size="sm" as={<EditIcon />} />
                          Edit
                        </button>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={cls(
                            'w-full flex items-center transition-colors p-1 rounded',
                            { 'bg-primary-600 text-white': active }
                          )}
                          onClick={handleDeleteTag.bind(null, tag)}
                        >
                          <Icon
                            className="mr-1"
                            size="sm"
                            as={<DeleteIcon />}
                          />
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ))
      ) : (
        <Empty />
      )}

      <TagModal />
      <DeleteTagModal />
    </Fragment>
  )
}

export default Tags
