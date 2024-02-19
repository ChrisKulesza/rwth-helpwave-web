import { Menu } from '@headlessui/react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { tw, tx } from '../../twind'
import { Span } from '../Span'

export type SelectOption<T> = {
  label: ReactNode,
  value: T,
  disabled?: boolean,
  className?: string
}

export type SelectProps<T> = {
  value?: T,
  label?: string,
  options: SelectOption<T>[],
  onChange: (value: T) => void,
  isHidingCurrentValue?: boolean,
  hintText?: string,
  showDisabledOptions?: boolean,
  className?: string,
  labelClassName?: string,
  isDisabled?: boolean,
  /**
   * The items will be at the start of the select and aren't selectable
   */
  additionalItems?: ReactNode[],
  selectedDisplayOverwrite?: ReactNode
};

/**
 * A Select Component for selecting form a list of options
 *
 * The State is managed by the parent
 */
export const Select = <T, >({
  value,
  label,
  options,
  onChange,
  isHidingCurrentValue = true,
  hintText = '',
  showDisabledOptions = true,
  isDisabled,
  className,
  labelClassName = 'text-lg font-semibold',
  additionalItems,
  selectedDisplayOverwrite,
}: SelectProps<T>) => {
  // Notice: for more complex types this check here might need an additional compare method
  let filteredOptions = isHidingCurrentValue ? options.filter(option => option.value !== value) : options
  if (!showDisabledOptions) {
    filteredOptions = filteredOptions.filter(value => !value.disabled)
  }
  return (
    <div className={tx(className)}>
      {label && (
        <label htmlFor={label} className={tx(' mb-1', labelClassName)}>
          {label}
        </label>
      )}
      <Menu as="div" className={tw('relative w-full text-gray-700')}>
        {({ open }) => (
          <>
            <Menu.Button
              className={tx('inline-flex w-full justify-between items-center rounded-t-lg border-2 px-4 py-2 font-medium',
                {
                  'rounded-b-lg': !open,
                  'hover:bg-gray-100': !isDisabled,
                  'bg-gray-100 cursor-not-allowed text-gray-500': isDisabled
                }
              )}
              disabled={isDisabled}
            >
              <Span>{selectedDisplayOverwrite ?? options.find(option => option.value === value)?.label ?? hintText}</Span>
              {open ? <ChevronUp/> : <ChevronDown/>}
            </Menu.Button>
            <Menu.Items
              className={tw('absolute w-full z-10 rounded-b-lg bg-white shadow-lg max-h-[30vh] overflow-y-auto')}
            >
              {(additionalItems ?? []).map((item, index) => (
                <div key={`additionalItems${index}`}
                     className={tx('px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis border-2 border-t-0', {
                       'border-b-0 rounded-b-lg': filteredOptions.length === 0 && index === (additionalItems?.length ?? 1) - 1,
                     })}
                >
                  {item}
                </div>
              ))}
              {filteredOptions.map((option, index) => (
                <Menu.Item key={`item${index}`}>
                  {
                    <div
                      className={tx('px-4 py-2 overflow-hidden whitespace-nowrap text-ellipsis border-2 border-t-0',
                        option.className, {
                          'bg-gray-100': option.value === value,
                          'bg-gray-50': index % 2 === 1,
                          'text-gray-300 cursor-not-allowed': !!option.disabled,
                          'hover:bg-gray-100 cursor-pointer': !option.disabled,
                          'border-b-0 rounded-b-lg': index === filteredOptions.length - 1,
                        })}
                      onClick={() => {
                        if (!option.disabled) {
                          onChange(option.value)
                        }
                      }}
                    >
                      {option.label}
                    </div>
                  }
                </Menu.Item>
              ))}
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  )
}