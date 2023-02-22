import { UseFormRegister } from 'react-hook-form'
import style from './OrganizerInput.module.css'

type TOrganizerInput = {
  register: UseFormRegister<any>
  label?: string
  inputName: string
  rules?: object
  error?: string | false
  show?: boolean
  noLabel?: true
} & React.AnchorHTMLAttributes<HTMLInputElement>

export const OrganizerInput = ({ register, rules, error, inputName, label, show = true, noLabel, ...rest }: TOrganizerInput) => {
  return (
    <div className={style.wrapper}>
      {!noLabel && <span className={style.label}>{label ?? inputName}</span>}
      <input
        {...register(inputName, rules)}
        type={`${show ? 'text' : 'password'}`}
        className={`${style.input} ${error ? style.errorInput : ''}`}
        {...rest}
      />
      {error && <span className={style.errorMessage}>{error}</span>}
    </div>
  )
}
