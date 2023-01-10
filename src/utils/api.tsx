export const checkResponse = (res: any) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
