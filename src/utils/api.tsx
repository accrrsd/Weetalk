/* eslint-disable no-useless-concat */

const mainUrl = 'http://weetalk.online/api/v1';

export const checkResponse = (res: any) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const checkResponseWithoutContent = (res: any) =>
  !res.ok && Promise.reject(`Ошибка: ${res.status}`);

export const postUser = (content: FormData) => {
  const url = mainUrl + '/users';
  return fetch(url, {
    method: 'POST',
    body: content,
  }).then(checkResponse);
};

export const getAllUsers = (userId: string | null) => {
  const url = mainUrl + `/users?id=${userId}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse);
};

export const getUserFavorites = (userId: string | null) => {
  const url = mainUrl + `/users/${userId}/favorites`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse);
};

export const getUserById = (userId: number | string) => {
  const url = mainUrl + '/users/' + userId;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(checkResponse);
};

export const addUserLike = (
  currentUserId: number | null,
  likedUserId: number | null,
) => {
  const url =
    mainUrl + `/users/${currentUserId}/like?likedUserId=${likedUserId}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://weetalk.online',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT, POST, DELETE',
    },
    method: 'PATCH',
  });
};

export const removeUserLike = (
  currentUserId: number | null,
  likedUserId: number | null,
) => {
  const url =
    mainUrl + `/users/${currentUserId}/like?likedUserId=${likedUserId}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://weetalk.online',
      'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT, POST, DELETE',
    },
    method: 'DELETE',
    body: JSON.stringify({ currentUserId, likedUserId }),
  });
};

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
