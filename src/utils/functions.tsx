import { FieldErrorsImpl } from 'react-hook-form'
import { addUserLike, removeUserLike } from './api'
import { TFormValues } from './types'

export const checkError = (name: string, errors: FieldErrorsImpl) =>
  errors && errors[name] ? (errors[name]!.message as string) : false

export const changeLikeStatus = (
  likedUserId: number | null,
  isLiked: boolean
) => {
  if (!isLiked) {
    return addUserLike(likedUserId).catch(error =>
      console.log(`Error: ${error}`)
    )
  } else {
    return removeUserLike(likedUserId).catch(error =>
      console.log(`Error: ${error}`)
    )
  }
}

export const createUserFormData = (data: TFormValues) => {
  const { name, about, work, photo, contactShowType, contact, contactType } =
    data

  const formDataContent = new FormData()
  if (name) formDataContent.set('username', name)
  if (about) formDataContent.set('description', about)
  if (work) formDataContent.set('actualJob', work)
  if (photo) formDataContent.set('currentImage', photo)

  if (contactType.value)
    formDataContent.set(`contacts.${contactType.value}`, contact)
  formDataContent.set('contacts.showType', contactShowType.value ?? 'NOBODY')
  return formDataContent
}

type TIsValidEmailFunc = (
  email: string,
  errMessage?: string
) => boolean | string

export const isValidEmail: TIsValidEmailFunc = (email, errMessage) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
    ? true
    : errMessage ?? false

export const loadImages = (card: any) =>
  new Promise((resolve, reject) => {
    const loadImg = new Image()
    loadImg.src = `https://weetalk.online/img/${card.imageName}`
    loadImg.onload = () => resolve(card)
    loadImg.onerror = err => reject(err)
  })
