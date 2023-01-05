import { UserInformation } from '../../components/user-information/user-information'
import style from './login.module.css'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const onSubmit = () => {
    localStorage.setItem('userData', '1234')
    authorizedFunc(true)
  }

  return (
    <div className={style.wrapper}>
      <p className={style.photoTitle}>
        Выберите фотографию на которой хорошо видно ваше лицо, а если вы сегодня в ударе, то лучше всего сделать селфи
      </p>
      <UserInformation onSubmit={onSubmit} submitText="Найти новых людей" />
    </div>
  )
}
