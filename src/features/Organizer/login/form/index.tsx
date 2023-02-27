import style from './form.module.css'
import { ReactComponent as ImageRect } from '../../../../images/Organizer/OrganizerLogin.svg'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { checkError } from '../../../../utils/functions'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'

export type TManagerLoginFormValues = {
  email: string
  password: string
}

type TManagerLoginForm = {
  formHook: UseFormReturn<TManagerLoginFormValues, any>
  onSubmitWrapper: (data: TManagerLoginFormValues) => void
}

const ManagerLoginForm = ({ formHook, onSubmitWrapper }: TManagerLoginForm) => {
  const [showPass, setShowPass] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook
  return (
    <div className={style.wrapper}>
      <ImageRect />
      <div className={style.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
          <h2 className={style.title}>Войти</h2>
          <OrganizerInput
            register={register}
            error={checkError('email', errors)}
            inputName="email"
            label="Email"
            placeholder="Введите Email"
          />
          <OrganizerInput
            register={register}
            error={checkError('password', errors)}
            inputName="password"
            label="Пароль"
            placeholder="Введите пароль"
          />

          <label htmlFor="checkbox" className="checkboxLabel">
            <span className="checkboxText">Запомнить меня</span>
            <input type="checkbox" className={style.checkbox} id="checkbox" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default ManagerLoginForm
