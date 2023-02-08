import { TContactShowType, TContactType } from './types'

export const possibleVisibility: TContactShowType[] = [
  { label: 'Все пользователи', value: 'ALL' },
  { label: 'Кого я выберу', value: 'ONLY_FOR_MY_FAVORITES' },
  { label: 'Не видит никто', value: 'NOBODY' },
]

export const possibleContacts: TContactType[] = [
  { label: 'Telegram', value: 'telegram' },
  { label: 'Электронная почта', value: 'email' },
]
