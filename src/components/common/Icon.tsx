import { forwardRef, type HTMLProps } from 'react'
import cls from 'classnames'

const iconSizes = ['lg', 'md', 'sm'] as const

type IconProps = Omit<
  HTMLProps<HTMLSpanElement>,
  'size' | 'children' | 'as'
> & {
  as: React.ReactNode
  size?: typeof iconSizes[number]
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ as, className, size = 'md', ...iconProps }, ref) => {
    return (
      <span
        ref={ref}
        className={cls(className, 'block', {
          'w-8 h-8': size === 'sm',
          'w-6 h-6': size === 'md',
          'w-4 h-4': size === 'sm',
        })}
        {...iconProps}
      >
        {as}
      </span>
    )
  }
)

export default Icon
