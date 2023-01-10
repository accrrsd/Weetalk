import style from './login.module.css'
import { useState } from 'react'
import { UserInformation } from '../../components/user-information/user-information'
import { TFormValues, TUserSubmitValues } from '../../utils/types'
import { checkResponse } from '../../utils/api'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [photoChanged, setPhotoChanged] = useState(false)
  const onPhotoChange = () => setPhotoChanged(true)
  const mainUrl = 'http://95-163-235-246.cloudvps.regruhosting.ru:8080'
  const postUser = (content: TUserSubmitValues) => {
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

  const onSubmit = (data: TFormValues) => {
    const newData = { name: data.name, about: data.about, work: data.work, file: data.photo } as TUserSubmitValues
    postUser(newData).then(() => {
      localStorage.setItem('userData', '1234')
      authorizedFunc(true)
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
