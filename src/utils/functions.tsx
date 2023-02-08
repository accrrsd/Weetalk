import { FieldErrorsImpl } from 'react-hook-form'
import { addUserLike, removeUserLike } from './api'

export const checkError = (name: string, errors: FieldErrorsImpl) =>
  errors && errors[name] ? (errors[name]!.message as string) : false

export const changeLikeStatus = (
  currentUserId: number | null,
  likedUserId: number | null,
  isLiked: boolean
) => {
  if (!isLiked) {
    return addUserLike(currentUserId, likedUserId).catch(error =>
      console.log(`Error: ${error}`)
    )
  } else {
    return removeUserLike(currentUserId, likedUserId).catch(error =>
      console.log(`Error: ${error}`)
    )
  }
}

export const loadImages = (card: any) => {
  return new Promise((resolve, reject) => {
    const loadImg = new Image()
    loadImg.src = `http://weetalk.online/img/${card.image}`
    loadImg.onload = () => resolve(card)
    loadImg.onerror = err => reject(err)
  })
}
