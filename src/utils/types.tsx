export type TTipPopupOffset = {
  left: number
  top: number
}

export type TFormValues = {
  photo: File
  name: string
  about: string
  work: string
  contactsShowType: TSelectableItem<'ALL' | 'NOBODY' | 'ONLY_FOR_MY_FAVORITES'>
  contact: TSelectableItem<string>
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

export type loadedCard = {
  actualJob: string
  username: string
  image: string
  isLiked: boolean
  description: string
  id: number | null
}

export type TContactForReq = {
  email?: string
  instagram?: string
  telegram?: string
  showType: 'ALL' | 'NOBODY' | 'ONLY_FOR_MY_FAVORITES'
}
