/* eslint-disable @typescript-eslint/no-unused-vars */

const devUrl = 'http://weetalk.online/api/v1'
const buildUrl = 'http://localhost:8080'

const temporaryBuildUrl = 'http://91.185.86.7:8081'

export const currentUrl = temporaryBuildUrl

const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

const checkResponseWithoutContent = (res: any) => !res.ok && Promise.reject(`Ошибка: ${res.status}`)

export const postUser = (content: FormData) => {
  const url = `${currentUrl}/users`
  return fetch(url, {
    method: 'POST',
    body: content,
  }).then(checkResponse)
}

export const getAllUsers = (currentUserId?: string | null) => {
  const url = `${currentUrl}/users?id=${currentUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getCurrentUser = (currentUserId: string | number) => {
  const url = `${currentUrl}/users/${currentUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserFavorites = (currentUserId: string | null) => {
  const url = `${currentUrl}/users/${currentUserId}/favorites`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserById = (userId: number | string, currentUserId: string | null) => {
  const url = `${currentUrl}/users/${currentUserId}?id=${userId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const addUserLike = (currentUserId: number | null, likedUserId: number | null) => {
  const url = `${currentUrl}/users/${currentUserId}/like?likedUserId=${likedUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://weetalk.online',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT, POST, DELETE',
    },
    method: 'PATCH',
    body: JSON.stringify({ currentUserId, likedUserId }),
  })
}

export const removeUserLike = (currentUserId: number | null, likedUserId: number | null) => {
  const url = `${currentUrl}/users/${currentUserId}/like?likedUserId=${likedUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://weetalk.online',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT, POST, DELETE',
    },
    method: 'DELETE',
    body: JSON.stringify({ currentUserId, likedUserId }),
  })
}

export const patchUser = (content: FormData, currentUserId: string) => {
  const url = `${currentUrl}/users/${currentUserId}`
  return fetch(url, {
    method: 'PATCH',
    body: content,
  }).then(checkResponseWithoutContent)
}

export const deleteUser = (currentUserId: string | number) => {
  const url = `${currentUrl}/users/${currentUserId}`
  return fetch(url, {
    method: 'DELETE',
  }).then(checkResponseWithoutContent)
}
