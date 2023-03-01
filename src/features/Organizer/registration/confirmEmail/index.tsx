import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { ReactComponent as BluePencil } from '../../../../images/Organizer/bluePencil.svg'
import { emailValidationHandler } from '../../../../utils/functions'
import style from './confirmEmail.module.css'

type TOrganizerRegistrationConfirmEmailChange = {
  email: string
}

type TOrganizerRegistrationConfirmEmail = {
  email: string
  onEmailChanged: (data: TOrganizerRegistrationConfirmEmailChange) => void
}

export const OrganizerRegistrationConfirmEmail = ({ email, onEmailChanged }: TOrganizerRegistrationConfirmEmail) => {
  const formHook = useForm<TOrganizerRegistrationConfirmEmailChange>({ mode: 'all' })
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = formHook
  const [changeEmail, setChangeEmail] = useState(false)
  const onEmailChangeClick = () => setChangeEmail(true)

  const changeEmailMarkup = () => (
    <>
      <h3 className={style.subtitle}>Отредактируйте адрес почты, чтобы получить код</h3>
      <form onSubmit={handleSubmit(onEmailChanged)} className={style.form}>
        <OrganizerInput
          {...{ register, errors }}
          inputName="email"
          label="Email"
          placeholder="Введите Email"
          rules={{
            required: 'Поле обязательное для заполнения',
            validate: {
              checkEmail: (v: string) => emailValidationHandler(v),
            },
          }}
        />
        <label
          htmlFor="emailChangeConfirmButton"
          className={`${style.changeEmailButtonWrapper} ${dirtyFields.email ? style.changeEmailButtonDisabled : ''}`}
        >
          <input type="submit" id="emailChangeConfirmButton" className={style.changeEmailButton} disabled={!!dirtyFields.email} />
          Получить код
        </label>
      </form>
    </>
  )
  const checkEmailMarkup = () => (
    <>
      <h3 className={style.subtitle}>Пожалуйста проверьте Вашу почту</h3>
      <span className={style.text}>Мы отправили код на вашу почту</span>
      <span className={style.mailPreview}>
        {email}
        <span className={style.hypertext} onClick={onEmailChangeClick}>
          <BluePencil />
          Изменить
        </span>
      </span>
    </>
  )

  return (
    <>
      <h2 className={style.title}>Подтвердить Email</h2>
      {changeEmail ? changeEmailMarkup() : checkEmailMarkup()}
    </>
  )
}
