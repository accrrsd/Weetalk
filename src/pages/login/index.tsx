import style from './login.module.css'
import { useState } from 'react'
import { UserInformation } from '../../components/user-information/user-information'
import { TFormValues } from '../../utils/types'
import { postUser } from '../../utils/api'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [photoChanged, setPhotoChanged] = useState(false)
  const onPhotoChange = () => setPhotoChanged(true)

  const onSubmit = (data: TFormValues) => {
    const { name, about, work, photo, contactsUserShowType, contact, contactType } = data

    const formDataContent = new FormData()
    if (name) formDataContent.set('username', name)
    if (about) formDataContent.set('description', about)
    if (work) formDataContent.set('actualJob', work)
    if (photo) formDataContent.set('currentImage', photo)

    if (contactType.value) formDataContent.set(`contacts.${contactType.value}`, contact)
    formDataContent.set('contacts.showType', contactsUserShowType.value ?? 'NOBODY')

    return postUser(formDataContent).then((id) => {
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
      <UserInformation
        onSubmit={onSubmit}
        submitText="Создать карточку"
        onPhotoChange={onPhotoChange}
        onPhotoChangeStyle={style.biggerPhoto}
        submitSuccessText="Карточка успешно создана"
        submitButtonStyle={style.submit}
      />
    </div>
  )
}
