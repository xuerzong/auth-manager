import PopupChildren from '@/components/popup'
import { createReactRoot } from '@/utils/dom'
import Layout from './Layout'
import './Popup.css'

const Popup: React.FC = () => {
  return (
    <Layout>
      <PopupChildren />
    </Layout>
  )
}

createReactRoot().render(<Popup />)
