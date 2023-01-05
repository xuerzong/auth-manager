import { InfoCircleIcon } from '../icons/InfoCircle'
import Icon from './Icon'

interface Props {
  description?: string
}

const Empty: React.FC<Props> = ({ description = 'no data' }) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-[200px] opacity-80">
      <Icon size="lg" as={<InfoCircleIcon />} />
      <span className="inline-block mt-2 italic uppercase">{description}</span>
    </div>
  )
}

export default Empty
