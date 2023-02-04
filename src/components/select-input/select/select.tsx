import { forwardRef, useState } from 'react'
import { TSelectableItem, TSelectInputClassNames } from '../../../utils/types'
import { TSelectProps } from '../types/select-types'
import { v4 as uuid } from 'uuid'
import style from './select.module.css'

/**
 * Сумасшедший компонент, если принимает в себя:
 * @param options Массив, то стейт должен быть const [value1, setValue1] = useState<TSelectableItem[]>([options[0]])
 * @param options Одно значение, то стейт должен быть const [value2, setValue2] = useState<TSelectableItem | undefined>(possibleContacts[0])
 */

const Select = forwardRef<HTMLDivElement, TSelectProps>(
  ({ multiple, value, onChange, onBlur, options, clearButton, divider, className, isOpenProp }, ref) => {
    const [isOpen, setIsOpen] = useState(isOpenProp ?? false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const smartStyle = (styleName: keyof TSelectInputClassNames) => (className && className[styleName] ? className[styleName] : style[styleName])

    const onBlurHandler = () => {
      setIsOpen(false)
      if (onBlur) onBlur()
    }

    const selectOption = (option: TSelectableItem) => {
      if (!multiple) return option !== value ? onChange(option) : undefined
      value.includes(option) ? onChange(value.filter((o) => o !== option)) : onChange([...value, option])
    }

    const clearOptions = () => (multiple ? onChange([]) : onChange(undefined))

    const isOptionSelected = (option: TSelectableItem) =>
      multiple ? value.includes(option) : option.label === value?.label && option.value === value.value

    return (
      <div ref={ref} onBlur={onBlurHandler} onClick={() => setIsOpen((prev) => !prev)} tabIndex={0} className={`${smartStyle('container')}`}>
        <span className={`${smartStyle('valueWrapper')}`}>
          {multiple
            ? value.map((v) => (
                <button
                  key={uuid()}
                  onClick={(e) => {
                    e.stopPropagation()
                    selectOption(v)
                  }}
                  className={`${smartStyle('optionBadge')}`}
                >
                  {v.label}
                  <span className={`${smartStyle('removeBadgeBtn')}`}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        {clearButton && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              clearOptions()
            }}
            className={`${smartStyle('clearBtn')}`}
          >
            &times;
          </button>
        )}
        {divider && <div className={style.divider}></div>}
        <div className={`${smartStyle('arrow')} ${isOpen ? smartStyle('arrowOpen') : ''}`}></div>
        <ul className={`${smartStyle('options')} ${isOpen ? smartStyle('optionsShow') : ''}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                if (!multiple) setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={uuid()}
              className={`${smartStyle('option')} ${isOptionSelected(option) ? smartStyle('optionSelected') : ''} ${
                index === highlightedIndex ? smartStyle('optionHighlighted') : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default Select
