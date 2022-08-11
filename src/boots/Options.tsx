import OptionsChildren from '@/components/options'
import { createReactRoot } from '@/utils/dom'
import Layout from './Layout'
import './Options.css'

const Options: React.FC = () => {
  return (
    <Layout>
      <OptionsChildren />
    </Layout>
  )
}

createReactRoot().render(<Options />)
