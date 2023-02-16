/* eslint-disable @typescript-eslint/no-unused-vars */

const devUrl = 'http://weetalk.online/api/v1'
const buildUrl = 'http://localhost:8080'

const temporaryBuildUrl = '/api/v1/test'

const devRoomId = '54aa5f82-f9e7-4710-8088-cee12570e661'
const localRoomId = '176fe47e-13f1-453d-bcae-7e168d3407dd'

export const currentUrl = temporaryBuildUrl

const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

const checkResponseWithoutContent = (res: any) => !res.ok && Promise.reject(`Ошибка: ${res.status}`)

type TPostUser = (content: FormData, roomId?: string) => Promise<any>

export const postUser: TPostUser = (content, roomId = devRoomId) => {
  const url = `${currentUrl}/users/${roomId}`
  return fetch(url, {
    method: 'POST',
    body: content,
  }).then(checkResponse)
}

export const getAllUsers = (roomId = devRoomId) => {
  const url = `${currentUrl}/rooms/${roomId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getCurrentUser = () => {
  const url = `${currentUrl}/users/view`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserFavorites = () => {
  const url = `${currentUrl}/users/favorites`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserById = (userId: number | string) => {
  const url = `${currentUrl}/users/view?id=${userId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const addUserLike = (likedUserId: number | null) => {
  const url = `${currentUrl}/users/like?likedUserId=${likedUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ likedUserId }),
  })
}

export const removeUserLike = (likedUserId: number | null) => {
  const url = `${currentUrl}/users/like?likedUserId=${likedUserId}`
  return fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({ likedUserId }),
  })
}

export const patchUser = (content: FormData) => {
  const url = `${currentUrl}/users`
  return fetch(url, {
    method: 'PATCH',
    body: content,
  }).then(checkResponseWithoutContent)
}

export const deleteUser = () => {
  const url = `${currentUrl}/users`
  return fetch(url, {
    method: 'DELETE',
  }).then(checkResponseWithoutContent)
}
