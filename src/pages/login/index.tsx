import style from './login.module.css'
import { useEffect, useState } from 'react'
import { UserInformation } from '../../components/user-information/user-information'
import { TFormValues, TUserPhoto, TUserSubmitValues, TUserWithoutPhoto } from '../../utils/types'
import { checkResponse } from '../../utils/api'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [photoChanged, setPhotoChanged] = useState(false)
  const onPhotoChange = () => setPhotoChanged(true)
  const mainUrl = 'http://95-163-235-246.cloudvps.regruhosting.ru:8080'

  const postUser = (content: TUserWithoutPhoto) => {
    // eslint-disable-next-line
    const url = mainUrl + '/users' + '/create'
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(content),
    }).then(checkResponse)
  }

  const postUserPhoto = (content: TUserPhoto, id: number) => {
    // eslint-disable-next-line
    const url = mainUrl + '/users' + id + '/photo'
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(content),
    }).then(checkResponse)
  }

  // const getTest = () => {
  //   const url = mainUrl + '/users'
  //   return fetch(url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'GET',
  //   }).then(checkResponse)
  // }

  // useEffect(() => {
  //   getTest().then((data) => console.log(data))
  // }, [])

  const onSubmit = (data: TFormValues) => {
    const { name, about, work } = data
    const file = data.photo
    const userWithoutPhotoData = { name, about, work }
    const userPhotoData = { file }

    postUser(userWithoutPhotoData).then((data) => {
      localStorage.setItem('ownerId', data.id)
      localStorage.setItem('userData', '1234')
      authorizedFunc(true)
      // postUserPhoto(userPhotoData, data.id).then(() => {})
    })
  }

  return (
    <div className={style.wrapper}>
      {!photoChanged && (
        <p className={style.photoTitle}>
          Выбери фотографию или сделай селфи. Важно чтобы лицо было хорошо видно — так тебя будет проще найти среди гостей
        </p>
      )}
      <UserInformation onSubmit={onSubmit} submitText="Создать карточку" onPhotoChange={onPhotoChange} onPhotoChangeStyle={style.biggerPhoto} />
    </div>
  )
}
