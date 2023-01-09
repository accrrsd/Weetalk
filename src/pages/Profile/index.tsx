import style from './Profile.module.css'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
export default function Profile() {
  const onSubmit = () => {}
  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
      <UserInformation onSubmit={onSubmit} submitText={'Обновить'} submitButtonStyle={style.submit} />
    </div>
  )
}
