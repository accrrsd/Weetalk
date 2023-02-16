export type TContactType = TSelectableItem<
  'telegram' | 'email',
  'Telegram' | 'Электронная почта'
>
export type TContactShowType = TSelectableItem<
  'ALL' | 'NOBODY' | 'ONLY_FOR_MY_FAVORITES',
  'Все пользователи' | 'Кого я выберу' | 'Не видит никто'
>

export type TTipPopupOffset = {
  left: number
  top: number
}

export type TTip = {
  text: string
  additionStyle?: string
  color?: string
  tongue?: 'toTop' | 'toBottom'
}

export type TFormValues = {
  photo: File
  name: string
  about: string
  work: string
  contactShowType: TContactShowType
  contactType: TContactType
  contact: string
}

export type TUserFormData = {
  username: string
  description: string
  about: string
  currentImage: File
}

export type TSelectableItem<valueType = string | number, labelType = string> = {
  label: labelType
  value: valueType
}

export type TSelectInputClassNames = {
  removeBadgeBtn?: string
  valueWrapper?: string
  optionBadge?: string
  mainWrapper?: string
  clearBtn?: string
  divider?: string
  arrow?: string
  option?: string
  options?: string
  arrowOpen?: string
  container?: string
  optionsShow?: string
  optionSelected?: string
  optionsAbsolute?: string
  optionHighlighted?: string
}

export type loadedCard = {
  actualJob: string
  username: string
  imageName: string
  isLiked: boolean
  description: string
  id: number | null
  contacts?: null | {
    email: string | null
    telegram: string | null
  }
}
