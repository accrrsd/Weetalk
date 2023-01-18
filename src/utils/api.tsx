/* eslint-disable no-useless-concat */

const testMainUrl = 'http://weetalk.online'

export const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export const postUser = (content: FormData) => {
  const url = testMainUrl + '/users'
  return fetch(url, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    body: content,
  }).then(checkResponse)
}

export const getAllUsers = () => {
  const url = 'http://weetalk.online/users'
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Accept:
      //   'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      // 'Accept-Encoding': 'gzip, deflate',
      // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      // 'Cache-Control': 'max-age=0',
      // Connection: 'keep-alive',
      // 'Upgrade-Insecure-Requests': '1',
    },
    method: 'GET',
  }).then(checkResponse)
}

export const getUserById = (userId: number) => {
  const url = testMainUrl + '/users/' + userId
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse)
}

// !Не готово
// export const patchUserById = (userId: number) => {
//   const url = mainUrl + '/users/' + userId
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'PATCH',
//   }).then(checkResponse)
// }

// ! Не актуально
// export const getUserFavorites = (ownerId: number) => {
//   const url = mainUrl + '/likes/' + ownerId
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'GET',
//   }).then(checkResponse)
// }

// export const addUserLike = (ownerId: number, userId: number) => {
//   const url = mainUrl + '/likes' + '/create'
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({ ownerId, userId }),
//   })
// }

// export const removeUserLike = (ownerId: number, userId: number) => {
//   const url = mainUrl + '/likes' + '/create'
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify({ ownerId, userId }),
//   })
// }

// ----------
// const createFormData = (content: TUserPhoto) => {
//   const data = new FormData()
//   data.set('file', content.file)
//   return data
// }

// export const postUserPhoto = (content: TUserPhoto, id: number) => {
//   const url = mainUrl + '/users/' + id + '/photo'
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     method: 'POST',
//     body: createFormData(content),
//   }).then(checkResponse)
// }
// ----------

// export const postUser = (content: TUserWithoutPhoto) => {
//   const url = mainUrl + '/users' + '/create'
//   return fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify(content),
//   }).then(checkResponse)
// }
