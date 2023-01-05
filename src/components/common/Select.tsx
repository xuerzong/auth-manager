import { ChangeEventHandler, forwardRef, HTMLProps, useState } from 'react'
import cls from 'classnames'

export type SelectOpt = {
  value: string | number
  label: React.ReactNode
}

type SelectProps = Omit<HTMLProps<HTMLSelectElement>, 'onChange' | 'value'> & {
  options?: SelectOpt[]
  onChange?(value: SelectOpt['value']): void
  value?: SelectOpt['value']
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options = [],
      className,
      placeholder = '',
      value,
      onChange,
      defaultValue = '',
      ...selectProps
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] =
      useState<Partial<SelectOpt>['value']>(value)

    const triggerChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
      const _value = (e.target as any).value
      setSelectedValue(_value)
      onChange && onChange(_value)
    }

    return (
      <select
        defaultValue={selectedValue ? undefined : defaultValue}
        value={selectedValue}
        ref={ref}
        className={cls(
          className,
          'inline-block w-full px-4 py-2 bg-gray-100 ring-0 ring-violet-500 focus:ring-2 rounded outline-none transition-all appearance-none',
          {
            'text-gray-400':
              selectedValue === '' || typeof selectedValue === 'undefined',
          }
        )}
        {...selectProps}
        placeholder={placeholder}
        onChange={triggerChange}
      >
        <option value="" hidden disabled>
          {placeholder}
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    )
  }
)

export default Select
