import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { ReactComponent as CheckboxCheckedSvg } from '../../../../images/Organizer/checkBox/Checked.svg'
import { ReactComponent as CheckboxEmptySvg } from '../../../../images/Organizer/checkBox/grayBorder.svg'
import { ReactComponent as GoogleLogo } from '../../../../images/Organizer/googleLogin.svg'
import { ReactComponent as ImageRect } from '../../../../images/Organizer/OrganizerLogin.svg'
import { checkError, emailValidationHandler } from '../../../../utils/functions'
import style from './form.module.css'

export type TOrganizerLoginFormValues = {
  email: string
  password: string
}

type TOrganizerLoginForm = {
  formHook: UseFormReturn<TOrganizerLoginFormValues, any>
  onSubmitWrapper: (data: TOrganizerLoginFormValues) => void
}

const OrganizerLoginForm = ({ formHook, onSubmitWrapper }: TOrganizerLoginForm) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const navigate = useNavigate()
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
            rules={{
              required: 'Поле обязательное для заполнения',
              validate: {
                checkEmail: (v: string) => emailValidationHandler(v),
              },
            }}
          />
          <OrganizerInput
            register={register}
            error={checkError('password', errors)}
            inputName="password"
            label="Пароль"
            placeholder="Введите пароль"
            hideButton
            autoComplete="off"
          />
          <div className={style.blockWrapper}>
            <label htmlFor="checkbox" className={style.checkboxLabel}>
              <div className={style.checkboxIcon}>{checkboxChecked ? <CheckboxCheckedSvg /> : <CheckboxEmptySvg />}</div>
              <span className={style.checkboxText}>Запомнить меня</span>
              <input
                type="checkbox"
                className={style.checkbox}
                onChange={(e) => {
                  setCheckboxChecked(e.target.checked)
                }}
                id="checkbox"
              />
            </label>
            <span className={style.linkText} onClick={() => navigate('#')}>
              Забыли пароль?
            </span>
          </div>
          <div className={style.bottomMenu}>
            <span className={style.bottomText}>
              Еще нет аккаунта?
              <span className={style.linkText}> Зарегистрироваться</span>
            </span>
            <label htmlFor="loginSubmitButton" className={style.loginButtonWrapper}>
              <input type="submit" id="loginSubmitButton" className={style.loginButton} />
              Войти
            </label>
            <span className={style.addition}>
              <div className={style.additionLine} />
              или
              <div className={style.additionLine} />
            </span>

            <button className={style.loginWithGoogle}>
              Войти через
              <GoogleLogo />
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrganizerLoginForm
