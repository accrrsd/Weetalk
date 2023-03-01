import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TOrganizerLoginFormValues } from '..'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { ReactComponent as CheckboxCheckedSvg } from '../../../../images/Organizer/Checked.svg'
import { ReactComponent as GoogleLogo } from '../../../../images/Organizer/googleLogin.svg'
import { ReactComponent as CheckboxEmptySvg } from '../../../../images/Organizer/grayBorder.svg'
import { emailValidationHandler } from '../../../../utils/functions'
import { TSmallForm } from '../../../../utils/types'
import style from './form.module.css'

const OrganizerLoginForm = ({ formHook, onSubmitWrapper }: TSmallForm<TOrganizerLoginFormValues>) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook

  return (
    <div className={style.page}>
      <div className={style.wrapper}>
        <div className={style.image} />
        <div className={style.formWrapper}>
          <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
            <h2 className={style.title}>Войти</h2>
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
            <OrganizerInput
              {...{ register, errors }}
              inputName="password"
              label="Пароль"
              placeholder="Введите пароль"
              hideButton
              autoComplete="off"
            />
            <div className={style.blockWrapper}>
              <label htmlFor="checkbox" className={style.checkboxLabel}>
                <div className={style.checkboxIcon}>{checkboxChecked ? <CheckboxCheckedSvg /> : <CheckboxEmptySvg />}</div>
                Запомнить меня
                <input
                  type="checkbox"
                  className={style.checkbox}
                  onChange={(e) => {
                    setCheckboxChecked(e.target.checked)
                  }}
                  id="checkbox"
                />
              </label>
              <span className={style.linkText} onClick={() => navigate('/organizer/forgotPass')}>
                Забыли пароль?
              </span>
            </div>
            <div className={style.bottomMenu}>
              <span className={style.bottomText}>
                Еще нет аккаунта?
                <span className={style.linkText} onClick={() => navigate('/organizer/registration')}>
                  {' '}
                  Зарегистрироваться
                </span>
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
    </div>
  )
}

export default OrganizerLoginForm
