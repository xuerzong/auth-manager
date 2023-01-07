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
          'px-2 py-2 bg-white text-sm text-primary-600 border-2 border-primary-600 rounded ring-0 ring-primary-400 transition-all outline-none hover:bg-blue-100 active:bg-blue-100 active:ring-2'
        )}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

export default IconButton
