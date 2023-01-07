import { Fragment, PropsWithChildren } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import Button from './Button'

interface Props {
  title?: string
  okText?: string
  cancelText?: string
  onOk(): Promise<void> | void
  onClose(): void
  visible?: boolean
}

const Modal: React.FC<PropsWithChildren<Props>> = ({
  title,
  okText = 'Ok',
  cancelText = 'Cancel',
  visible,
  onOk,
  onClose,
  children,
}) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                )}
                <div className="mt-2">{children}</div>

                <div className="flex items-center mt-4 space-x-2">
                  <div className="flex-1" />
                  <Button onClick={onClose}>{cancelText}</Button>

                  <Button
                    onClick={async () => {
                      await onOk()
                      onClose()
                    }}
                    variant="contained"
                  >
                    {okText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
