import { forwardRef, HTMLProps } from 'react'
import cls from 'classnames'

type InputProps = HTMLProps<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...inputProps }, ref) => {
    return (
      <input
        ref={ref}
        className={cls(
          className,
          'inline-block w-full px-4 py-2 bg-gray-100 ring-0 ring-violet-500 focus:ring-2 rounded outline-none transition-all'
        )}
        {...inputProps}
      />
    )
  }
)

export default Input
