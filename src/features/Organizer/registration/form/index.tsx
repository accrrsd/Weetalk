import { useState } from 'react'
import { TOrganizerRegistrationFormValues } from '..'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { emailValidationHandler } from '../../../../utils/functions'
import { TSmallForm } from '../../../../utils/types'

import { ReactComponent as CheckboxCheckedSvg } from '../../../../images/Organizer/Checked.svg'
import { ReactComponent as GoogleLogo } from '../../../../images/Organizer/googleLogin.svg'
import { ReactComponent as CheckboxEmptySvg } from '../../../../images/Organizer/grayBorder.svg'

import { useNavigate } from 'react-router-dom'
import style from './form.module.css'

type TOrganizerRegistrationForm = {} & TSmallForm<TOrganizerRegistrationFormValues>

const OrganizerRegistrationForm = ({ formHook, onSubmitWrapper }: TOrganizerRegistrationForm) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook

  return (
    <>
      <h2 className={style.title}>Зарегистрироваться</h2>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
        <OrganizerInput {...{ register, errors }} inputName="fullName" label="Полное имя" placeholder="Введите ваше полное имя" />
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
        <OrganizerInput {...{ register, errors }} inputName="password" label="Пароль" placeholder="Введите пароль" hideButton autoComplete="off" />
        <div className={style.checkboxHypertextWrapper}>
          <label htmlFor="checkbox" className={style.checkboxLabel}>
            <div className={style.checkboxIcon}>{checkboxChecked ? <CheckboxCheckedSvg /> : <CheckboxEmptySvg />}</div>
            Я согласен с
            <input
              type="checkbox"
              className={style.checkbox}
              onChange={(e) => {
                setCheckboxChecked(e.target.checked)
              }}
              id="checkbox"
            />
          </label>
          <span className={style.hypertext}>Условиями использования</span>
        </div>
        <div className={style.bottomMenu}>
          <label htmlFor="loginSubmitButton" className={style.loginButtonWrapper}>
            <input type="submit" id="loginSubmitButton" className={style.loginButton} />
            Зарегистрироваться
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

          <span className={style.bottomText}>
            Уже зарегистрированы?{' '}
            <span className={style.hypertext} onClick={() => navigate('/organizer/login')}>
              Войти
            </span>
          </span>
        </div>
      </form>
    </>
  )
}
export default OrganizerRegistrationForm
