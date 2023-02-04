export type TTipPopupOffset = {
  left: number
  top: number
}

export type TFormValues = {
  photo: File
  name: string
  about: string
  work: string
  contactType: TSelectableItem
}

export type TUserFormData = {
  username: string
  description: string
  about: string
  currentImage: File
}

export type TSelectableItem<valueType = string | number> = {
  label: string
  value: valueType
}

export type TSelectInputClassNames = {
  removeBadgeBtn?: string
  valueWrapper?: string
  optionBadge?: string
  clearBtn?: string
  divider?: string
  arrow?: string
  option?: string
  options?: string
  arrowOpen?: string
  container?: string
  optionsShow?: string
  optionSelected?: string
  optionHighlighted?: string
}
