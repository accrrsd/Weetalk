import style from './Profile.module.css'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { TFormValues } from '../../utils/types'
import { patchUser } from '../../utils/api'

export default function Profile() {
  const onSubmit = (data: TFormValues) => {
    const { name, about, work, photo } = data

    const formDataContent = new FormData()
    if (name) formDataContent.set('username', name)
    if (about) formDataContent.set('description', about)
    if (work) formDataContent.set('actualJob', work)
    if (photo) formDataContent.set('currentImage', photo)

    const id = localStorage.getItem('ownerId')
    // Временная обработка отсутствия id
    if (!id) return new Promise((resolve, reject) => reject())
    return patchUser(formDataContent, id)
  }

  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
      <UserInformation
        onSubmit={onSubmit}
        submitText={'Обновить'}
        submitButtonStyle={style.submit}
        autoValues={true}
        submitSuccessText="Карточка успешно обновлена"
      />
    </div>
  )
}
