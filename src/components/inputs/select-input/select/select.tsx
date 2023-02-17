import style from './select.module.css'
import { forwardRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { TSelectableItem, TSelectInputClassNames } from '../../../../utils/types'
import { TSelectProps } from '../types/select-types'

/**
 * Сумасшедший компонент, если принимает в себя:
 * @param options Массив, то стейт должен быть const [value1, setValue1] = useState<TSelectableItem[]>([options[0]])
 * @param options Одно значение, то стейт должен быть const [value2, setValue2] = useState<TSelectableItem | undefined>(possibleContacts[0])
 */

const Select = forwardRef<HTMLDivElement, TSelectProps>(
  ({ multiple, value, onChange, onBlur, options, clearButton, divider, className, isOpenProp, enableAbsolutePreset, defaultValueIndex }, ref) => {
    const [isOpen, setIsOpen] = useState(isOpenProp ?? false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)

    const smartStyle = (styleName: keyof TSelectInputClassNames) => (className && className[styleName] ? className[styleName] : style[styleName])

    const onBlurHandler = () => {
      setIsOpen(false)
      if (onBlur) onBlur()
    }

    const selectOption = (option: TSelectableItem) => {
      // Если опция отличается от активной, мы ее меняем, иначе - не делаем ничего
      if (!multiple) return option !== value ? onChange(option) : undefined
      // Если опция уже есть в массиве, мы ее исключаем, иначе добавляем
      value.includes(option) ? onChange(value.filter((o) => o !== option)) : onChange([...value, option])
    }

    // При очистке значения, мы возвращаем пустой массив, или стандартное значение, или undefined
    const clearOptions = () => (multiple ? onChange([]) : onChange(defaultValueIndex ? options[defaultValueIndex] : undefined))

    const isOptionSelected = (option: TSelectableItem) =>
      multiple ? value.includes(option) : option.label === value?.label && option.value === value.value

    return (
      <div ref={ref} onBlur={onBlurHandler} onClick={() => setIsOpen((prev) => !prev)} tabIndex={0} className={`${smartStyle('container')}`}>
        <div className={style.upperMenu}>
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
          <div className={style.iconsContainer}>
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
          </div>
        </div>
        <ul className={`${enableAbsolutePreset ? smartStyle('optionsAbsolute') : smartStyle('options')} ${isOpen ? smartStyle('optionsShow') : ''}`}>
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
