import { createReactRoot } from '@/utils/dom'
import WelcomeChild from '@/components/welcome'
import Layout from './Layout'

const Welcome: React.FC = () => {
  return (
    <Layout>
      <WelcomeChild />
    </Layout>
  )
}

createReactRoot().render(<Welcome />)
