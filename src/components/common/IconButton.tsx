import { forwardRef, type HTMLProps } from 'react'
import cls from 'classnames'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset'
}

const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(
          className,
          'p-2 bg-gray-200 text-sm rounded hover:bg-gray-300 transition-all outline-none'
        )}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

export default IconButton
