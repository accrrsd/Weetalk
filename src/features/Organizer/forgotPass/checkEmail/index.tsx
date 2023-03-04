import { ErrorMessage } from '../../../../components/misc/ErrorMessage/Organizer/ErrorMessage'
import { ReactComponent as BluePencil } from '../../../../images/Organizer/pencil.svg'
import style from './checkEmail.module.css'

type TOrganizerForgotPassCheckEmail = {
  email: string
  onAgainClick: () => void
  fetchError?: string
}

export const OrganizerForgotPassCheckEmail = ({ email, onAgainClick, fetchError }: TOrganizerForgotPassCheckEmail) => {
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
      <ErrorMessage code={fetchError} additionWrapperClassName={style.fetchErrorWrapper} />
    </>
  )
}
