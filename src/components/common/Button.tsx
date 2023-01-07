import { forwardRef, type HTMLProps } from 'react'
import cls from 'classnames'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined'
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'outlined', ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(
          className,
          'px-4 py-1 border-2 ring-0 ring-primary-400 rounded active:ring-2 transition-all outline-none',
          {
            'bg-white text-primary-600 border-primary-600 hover:bg-blue-100 active:bg-blue-100':
              variant === 'outlined',
            'bg-blue-600 text-white border-primary-600 hover:bg-blue-500 hover:border-primary-500 active:bg-blue-600 active:border-blue-600':
              variant === 'contained',
          }
        )}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

export default Button
