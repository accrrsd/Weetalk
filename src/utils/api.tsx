/* eslint-disable no-useless-concat */

const mainUrl = 'http://weetalk.online/api/v1'

export const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

export const checkResponseWithoutContent = (res: any) => !res.ok && Promise.reject(`Ошибка: ${res.status}`)

export const postUser = (content: FormData) => {
  const url = mainUrl + '/users'
  return fetch(url, {
    method: 'POST',
    body: content,
  }).then(checkResponse)
}

export const getAllUsers = (userId: string | null) => {
  const url = mainUrl + `/users?id=${userId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserFavorites = (userId: string | null) => {
  const url = mainUrl + `/users/${userId}/favorites`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserById = (userId: number | string) => {
  const url = mainUrl + '/users/' + userId
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const addUserLike = (currentUserId: number | null, likedUserId: number | null) => {
  const url = mainUrl + `/users/${currentUserId}/like?likedUserId=${likedUserId}`
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://weetalk.online',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT, POST, DELETE',
    },
    method: 'PATCH',
  })
}

export const removeUserLike = (currentUserId: number | null, likedUserId: number | null) => {
  const url = mainUrl + `/users/${currentUserId}/like?likedUserId=${likedUserId}`
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

export const patchUser = (content: FormData, userId: string) => {
  const url = mainUrl + '/users/' + userId
  return fetch(url, {
    method: 'PATCH',
    body: content,
  }).then(checkResponseWithoutContent)
}
