import { useState } from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { ReactComponent as HidePassSvg } from '../../../images/Organizer/closePassEye.svg'
import { ReactComponent as ShowPassSvg } from '../../../images/Organizer/showPassEye.svg'
import { checkError } from '../../../utils/functions'
import style from './OrganizerInput.module.css'

type TOrganizerInput = {
  register: UseFormRegister<any>
  label?: string
  inputName: string
  rules?: object
  errors: FieldErrorsImpl<any>
  hideButton?: true
  noLabel?: true
  autoComplete?: 'on' | 'off'
} & React.AnchorHTMLAttributes<HTMLInputElement>

export const OrganizerInput = ({
  register,
  rules = { required: 'Поле обязательное для заполнения' },
  errors,
  inputName,
  label,
  hideButton,
  noLabel,
  autoComplete,
  ...rest
}: TOrganizerInput) => {
  const [showPass, setShowPass] = useState(false)
  const error = checkError(inputName, errors)

  // prettier-ignore
  const checkShowState = ()=>showPass? <><HidePassSvg/> Скрыть</> : <><ShowPassSvg/> Показать</>
  return (
    <div className={style.wrapper}>
      {!noLabel && (
        <div className={style.labelWrapper}>
          <span className={style.label}>{label ?? inputName}</span>
          {hideButton && (
            <button className={style.hideButton} onClick={() => setShowPass((prev) => !prev)}>
              {checkShowState()}
            </button>
          )}
        </div>
      )}
      <input
        {...register(inputName, rules)}
        type={`${hideButton ? (showPass ? 'text' : 'password') : 'text'}`}
        className={`${style.input} ${error ? style.errorInput : ''}`}
        autoComplete={autoComplete}
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
