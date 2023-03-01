import { useState } from 'react'
import { TOrganizerRegistrationFormValues } from '..'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { checkError, emailValidationHandler, objectIsEmptyCheck, stringContainNumber } from '../../../../utils/functions'
import { TSmallForm } from '../../../../utils/types'

import { ReactComponent as CheckboxCheckedSvg } from '../../../../images/Organizer/Checked.svg'
import { ReactComponent as CheckboxEmptySvg } from '../../../../images/Organizer/grayBorder.svg'

import { useNavigate } from 'react-router-dom'
import { LoginWithGoogle } from '../../../../components/buttons/LoginWithGoogle/Organizer'
import { SubmitButton } from '../../../../components/buttons/SubmitButton/SubmitButton'
import style from './form.module.css'

type TOrganizerRegistrationForm = {} & TSmallForm<TOrganizerRegistrationFormValues>

const OrganizerRegistrationForm = ({ formHook, onSubmitWrapper }: TOrganizerRegistrationForm) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = formHook
  // Если ошибка или если форма не была тронута
  const disableSubmitButton = !objectIsEmptyCheck(errors) || !isDirty

  console.log('errors', objectIsEmptyCheck(errors))

  const confirmError = checkError('confirm', errors)

  return (
    <>
      <h2 className={style.title}>Зарегистрироваться</h2>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
        <OrganizerInput
          {...{ register, errors }}
          inputName="fullName"
          label="Полное имя"
          placeholder="Введите ваше полное имя"
          rules={{
            required: 'Поле обязательное для заполнения',
            validate: {
              checkNums: (v: string) => (stringContainNumber(v) ? 'Используйте только буквенные символы' : true),
            },
          }}
        />
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
          rules={{
            required: 'Поле обязательное для заполнения',
            validate: {
              checkPassLength: (v: string) => (v.length < 8 ? 'Пароль должен состоять из не менее 8 символов' : true),
            },
          }}
        />
        <div className={style.checkboxBlockWrapper}>
          <div className={style.checkboxHypertextWrapper}>
            <label htmlFor="checkbox" className={style.checkboxLabel}>
              <div className={style.checkboxIcon}>{checkboxChecked ? <CheckboxCheckedSvg /> : <CheckboxEmptySvg />}</div>
              Я согласен с
              <input
                type="checkbox"
                {...register('confirm', { required: 'Требуется соглашение' })}
                className={style.checkbox}
                onChange={(e) => {
                  setCheckboxChecked(e.target.checked)
                }}
                id="checkbox"
              />
            </label>
            <span className={style.hypertext}>Условиями использования</span>
          </div>
          {confirmError && <span className={style.errorMessage}>{confirmError}</span>}
        </div>
        <div className={style.bottomMenu}>
          <SubmitButton disabled={disableSubmitButton}>Зарегистрироваться</SubmitButton>
          <span className={style.addition}>
            <div className={style.additionLine} />
            или
            <div className={style.additionLine} />
          </span>
          <LoginWithGoogle />

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
