import OptionsChildren from '@/components/options'
import Toaster from '@/components/common/Toaster'
import { createReactRoot } from '@/utils/dom'
import useInitStoreAsync from '@/hooks/useInitStoreAsync'
import Layout from './Layout'
import './Options.css'

const Options: React.FC = () => {
  useInitStoreAsync()
  return (
    <Layout>
      <OptionsChildren />
      <Toaster />
    </Layout>
  )
}

createReactRoot().render(<Options />)
