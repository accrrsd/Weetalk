import { ReactNode } from 'react'
import style from './SubmitButton.module.css'

type TBase = {
  children: ReactNode
  disabled?: boolean
  wrapperStyle?: string
  disabledWrapperStyle?: string
  buttonStyle?: string
  containerStyle?: string
  onClick?: () => void
  submit?: boolean
}
export const SubmitButton = ({
  children,
  disabled,
  wrapperStyle,
  disabledWrapperStyle,
  buttonStyle,
  containerStyle,
  onClick,
  submit = true,
  ...rest
}: TBase) => {
  return (
    <label
      htmlFor="submitButton"
      className={`${wrapperStyle ?? style.wrapper} ${disabled ? disabledWrapperStyle ?? style.disabledWrapper : ''}`}
      onClick={onClick}
    >
      <input type={`${submit ? 'submit' : 'button'}`} id="submitButton" className={`${buttonStyle ?? style.button}`} disabled={disabled} {...rest} />
      <span className={`${containerStyle ?? style.container}`}>{children}</span>
    </label>
  )
}
