import style from './Profile.module.css'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { TFormValues } from '../../utils/types'
import { patchUser } from '../../utils/api'
export default function Profile() {
  const onSubmit = (data: TFormValues) => {
    const { name, about, work, photo } = data
    const formDataContent = new FormData()
    formDataContent.set('username', name)
    formDataContent.set('description', about)
    formDataContent.set('actualJob', work)
    formDataContent.set('currentImage', photo)

    const id = localStorage.getItem('ownerId')
    if (id) patchUser(formDataContent, id)
    else throw new Error('NO ID')
  }

  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
      <UserInformation onSubmit={onSubmit} submitText={'Обновить'} submitButtonStyle={style.submit} autoValues={true} />
    </div>
  )
}
