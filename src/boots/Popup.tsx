import PopupChildren from '@/components/popup'
import { createReactRoot } from '@/utils/dom'
import useInitStoreAsync from '@/hooks/useInitStoreAsync'
import Layout from './Layout'
import './Popup.css'

const Popup: React.FC = () => {
  useInitStoreAsync()
  return (
    <Layout>
      <PopupChildren />
    </Layout>
  )
}

createReactRoot().render(<Popup />)
