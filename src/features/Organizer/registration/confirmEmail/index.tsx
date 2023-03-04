import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TOrganizerRegistrationConfirmEmailChange, TOtpInputCode } from '..'
import { SubmitButton } from '../../../../components/buttons/SubmitButton/SubmitButton'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { OtpInput } from '../../../../components/inputs/otp-input/otp-input'
import { ReactComponent as BluePencil } from '../../../../images/Organizer/pencil.svg'
import { emailValidationHandler } from '../../../../utils/functions'
import style from './confirmEmail.module.css'

type TOrganizerRegistrationConfirmEmail = {
  email: string
  onEmailChanged: (data: TOrganizerRegistrationConfirmEmailChange) => void
  onCodeSubmitted: (data: TOtpInputCode) => void
  emailFormHook: UseFormReturn<TOrganizerRegistrationConfirmEmailChange, any>
  codeFormHook: UseFormReturn<TOtpInputCode, any>
}

export const OrganizerRegistrationConfirmEmail = ({
  email,
  onEmailChanged,
  onCodeSubmitted,
  emailFormHook,
  codeFormHook,
}: TOrganizerRegistrationConfirmEmail) => {
  const [changeEmail, setChangeEmail] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = emailFormHook

  const {
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors, isDirty: codeIsDirty },
    control: handleCodeControl,
  } = codeFormHook

  const onEmailChangedWrapper = (data: TOrganizerRegistrationConfirmEmailChange) => {
    onEmailChanged(data)
    setChangeEmail(false)
  }

  const changeEmailMarkup = () => (
    <>
      <h3 className={style.subtitle}>Отредактируйте адрес почты, чтобы получить код</h3>
      <form onSubmit={handleSubmit(onEmailChangedWrapper)} className={style.emailForm}>
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
        <SubmitButton disabled={!!errors.email || !isDirty}>Получить код</SubmitButton>
      </form>
    </>
  )
  const checkEmailMarkup = () => (
    <>
      <h3 className={style.subtitle}>Пожалуйста проверьте вашу почту</h3>
      <span className={style.text}>Мы отправили код на вашу почту</span>
      <span className={style.mailPreview}>
        {email}
        <span className={style.hypertext} onClick={() => setChangeEmail(true)}>
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
      <form className={style.otpWrapper} onSubmit={handleSubmitCode(onCodeSubmitted)}>
        <span className={style.otpSubtext}>Введите 6-значный код ниже</span>
        <OtpInput inputName="code" control={handleCodeControl} />
        <span className={style.otpText}>
          Не получили код? <span className={style.hypertext}>Нажмите сюда</span> чтобы отправить его снова
        </span>
        <div className={style.submitWrapper}>
          <SubmitButton disabled={!!codeErrors.code || !codeIsDirty}>Подтвердить</SubmitButton>
        </div>
      </form>
    </>
  )
}
