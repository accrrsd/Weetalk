import style from './login.module.css'
import { useState } from 'react'
import { UserInformation } from '../../components/user-information/user-information'
import { TFormValues } from '../../utils/types'
import { convertToBase64, getAllUsers, postUser } from '../../utils/api'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [photoChanged, setPhotoChanged] = useState(false)
  const onPhotoChange = () => setPhotoChanged(true)

  getAllUsers()

  const onSubmit = async (data: TFormValues) => {
    const { name, about, work, photo } = data
    const formDataContent = new FormData()
    formDataContent.set('username', name)
    formDataContent.set('description', about)
    formDataContent.set('actualJob', work)
    const photo64Base = await convertToBase64(photo)
    if (typeof photo64Base !== 'string') return

    formDataContent.set('currentImage', photo64Base)

    // postUser(formDataContent).then((data) => {
    //   console.log(data)
    // })

    // const { name, about, work } = data
    // const file = data.photo
    // const userWithoutPhotoData = { name, about, work }
    // const userPhotoData = { file }

    // postUser(userWithoutPhotoData).then((data) => {
    //   postUserPhoto(userPhotoData, data.id).then(() => {
    //     localStorage.setItem('ownerId', data.id)
    //     localStorage.setItem('userData', '1234')
    //     authorizedFunc(true)
    //   })
    // })
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
