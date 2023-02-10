import { Control } from 'react-hook-form'
import { TSelectableItem, TSelectInputClassNames } from '../../../../utils/types'

type TMultipleSelectProps = {
  multiple: true
  value: TSelectableItem[]
  onChange: (value: TSelectableItem[]) => void
}

type TSingleSelectProps = {
  multiple?: false
  value?: TSelectableItem
  onChange: (value: TSelectableItem | undefined) => void
}

export type TSelectProps = {
  options: TSelectableItem[]
  clearButton?: boolean
  divider?: boolean
  onBlur?: Function
  className?: TSelectInputClassNames
  isOpenProp?: boolean
  enableAbsolutePreset?: boolean
  defaultValueIndex?: number
} & (TSingleSelectProps | TMultipleSelectProps)

// --------------------------------------------------

type TSelectWrapperCurrent = {
  multiple?: false
  onChange?: (value: TSelectableItem | undefined) => void
}

type TSelectWrapperMultiple = {
  multiple: true
  onChange?: (value: TSelectableItem[]) => void
}

export type TSelectWrapperProps = {
  control: Control<any, any>
  inputName: string
  options: TSelectableItem[]
  rules?: Object
  clearButton?: boolean
  divider?: boolean
  defaultValueIndex?: number
  className?: TSelectInputClassNames
  isOpenProp?: boolean
} & (TSelectWrapperMultiple | TSelectWrapperCurrent)
