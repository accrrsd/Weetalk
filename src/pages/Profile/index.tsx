import style from './Profile.module.css'

import { ReactComponent as BurgerMenuSvg } from '../../images/burgerMenu.svg'
import { UserInformation } from '../../components/user-information/user-information'
export default function Profile() {
  const onSubmit = () => {}
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>
        <span className={style.titleText}>Профиль</span>
        <BurgerMenuSvg className={style.burgerMenu} />
      </h2>
      <UserInformation onSubmit={onSubmit} submitText={'Сохранить'} submitButtonStyle={style.submit} />
    </div>
  )
}
