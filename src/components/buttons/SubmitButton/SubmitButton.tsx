import { ReactNode } from 'react'
import { v4 as uuid } from 'uuid'
import style from './SubmitButton.module.css'

type TBase = {
  children: ReactNode
  disabled?: boolean
  wrapperStyle?: string
  disabledWrapperStyle?: string
  buttonStyle?: string
  containerStyle?: string
  submit?: boolean
} & React.AnchorHTMLAttributes<HTMLInputElement>

export const SubmitButton = ({
  children,
  disabled,
  wrapperStyle,
  disabledWrapperStyle,
  buttonStyle,
  containerStyle,
  submit = true,
  ...rest
}: TBase) => {
  const id = uuid()
  return (
    <label htmlFor={`${id}`} className={`${wrapperStyle ?? style.wrapper} ${disabled ? disabledWrapperStyle ?? style.disabledWrapper : ''}`}>
      <input type={`${submit ? 'submit' : 'button'}`} id={id} className={`${buttonStyle ?? style.button}`} disabled={disabled} {...rest} />
      <span className={`${containerStyle ?? style.container}`}>{children}</span>
    </label>
  )
}
