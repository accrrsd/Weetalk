import { ReactComponent as BluePencil } from '../../../../images/Organizer/pencil.svg'
import style from './checkEmail.module.css'

export const OrganizerForgotPassCheckEmail = ({ email, onAgainClick }: { email: string; onAgainClick: () => void }) => {
  return (
    <>
      <h2 className={style.title}>Проверьте вашу почту</h2>
      <div className={style.content}>
        <span className={style.text}>Мы отправили инструкцию на вашу почту</span>
        <span className={style.mailPreview}>
          {email}
          <span className={style.hypertext} onClick={onAgainClick}>
            <BluePencil />
            Изменить
          </span>
        </span>
        <span className={style.bottomMessage}>
          Не получили инструкцию? Пожалуйста, проверьте папку “Спам” или{' '}
          <span className={style.hypertext} onClick={onAgainClick}>
            отправьте ее снова
          </span>
        </span>
      </div>
    </>
  )
}
