import { Tab } from '@headlessui/react'
import cls from 'classnames'
import AccountModal from './AccountModal'
import Accounts from './Accounts'
import Tags from './Tags'
import DeleteAccountModal from './DeleteAccountModal'

const tabs = ['Accounts', 'Tags']

const OptionsChildren: React.FC = () => {
  return (
    <div className="max-w-screen-md p-4 md:px-0 mx-auto">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-lg bg-gray-100 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                cls('w-full py-2 bg-white rounded outline-none', {
                  'bg-primary-600 text-white ring ring-primary-400': selected,
                })
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <Accounts />
          </Tab.Panel>

          <Tab.Panel>
            <Tags />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <AccountModal />
      <DeleteAccountModal />
    </div>
  )
}

export default OptionsChildren
