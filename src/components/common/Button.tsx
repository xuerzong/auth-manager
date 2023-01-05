import { forwardRef, type HTMLProps } from 'react'
import cls from 'classnames'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(
          className,
          'px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 active:bg-gray-200 transition-all outline-none'
        )}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

export default Button
