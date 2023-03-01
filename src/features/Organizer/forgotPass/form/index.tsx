import { useEffect } from 'react'
import { TOrganizerForgotPassFormValues } from '..'
import { SubmitButton } from '../../../../components/buttons/SubmitButton/SubmitButton'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { emailValidationHandler } from '../../../../utils/functions'
import { TSmallForm } from '../../../../utils/types'
import style from './form.module.css'

type TOrganizerForgotPassForm = {
  emailProp: string
} & TSmallForm<TOrganizerForgotPassFormValues>

const OrganizerForgotPassForm = ({ formHook, onSubmitWrapper, emailProp }: TOrganizerForgotPassForm) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = formHook

  useEffect(() => {
    if (emailProp) setValue('email', emailProp)
  }, [emailProp, setValue])

  return (
    <>
      <h2 className={style.title}>Забыли пароль?</h2>
      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
          <span className={style.text}>Не беда! Мы отправим вам инструкцию по восстановлению пароля на вашу почту</span>
          <OrganizerInput
            {...{ register, errors }}
            inputName="email"
            label="Email"
            rules={{
              required: 'Поле обязательное для заполнения',
              validate: {
                checkEmail: (v: string) => emailValidationHandler(v),
              },
            }}
          />
          <SubmitButton disabled={!!errors.email || !isDirty}>Сбросить пароль</SubmitButton>
        </form>
      </div>
    </>
  )
}

export default OrganizerForgotPassForm
