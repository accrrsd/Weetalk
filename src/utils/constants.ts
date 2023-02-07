import { TSelectableItem } from './types'

export const possibleVisibility: TSelectableItem<'ALL' | 'NOBODY' | 'ONLY_FOR_MY_FAVORITES'>[] = [
  { label: 'Все пользователи', value: 'ALL' },
  { label: 'Кого я выберу', value: 'ONLY_FOR_MY_FAVORITES' },
  { label: 'Не видит никто', value: 'NOBODY' },
]
export const possibleContacts: TSelectableItem<'telegram' | 'email'>[] = [
  { label: 'Telegram', value: 'telegram' },
  { label: 'Электронная почта', value: 'email' },
]
