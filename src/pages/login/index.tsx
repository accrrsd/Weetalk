import style from './login.module.css'
import { useState } from 'react'
import { UserInformation } from '../../components/user-information/user-information'
import { TFormValues } from '../../utils/types'
import { getAllUsers, postUser } from '../../utils/api'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [photoChanged, setPhotoChanged] = useState(false)
  const onPhotoChange = () => setPhotoChanged(true)

  const onSubmit = (data: TFormValues) => {
    const { name, about, work, photo } = data
    const formDataContent = new FormData()
    formDataContent.set('username', name)
    formDataContent.set('description', about)
    formDataContent.set('actualJob', work)
    formDataContent.set('currentImage', photo)

    postUser(formDataContent).then((id) => {
      localStorage.setItem('ownerId', id)
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
