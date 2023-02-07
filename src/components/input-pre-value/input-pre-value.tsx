import { v4 as uuid } from 'uuid'
import style from './input-pre-value.module.css'

import { UseFormRegister } from 'react-hook-form'
import { TFormValues } from '../../utils/types'

export const ContactInput = ({
  register,
  rules,
  preValue,
  placeholder,
  wrapperClassName,
  preClassName,
  error,
  inputClassName,
  wrapperErrorClassName,
}: {
  preValue: string
  rules?: object
  register: UseFormRegister<TFormValues>
  placeholder: string
  preClassName?: string
  error?: boolean
  wrapperClassName?: string
  wrapperErrorClassName?: string
  inputClassName?: string
}) => {
  const id = uuid()
  return (
    <label
      htmlFor={id}
      className={`${wrapperClassName ?? style.wrapperClassName} ${error ? wrapperErrorClassName ?? style.wrapperErrorClassName : ''}`}
    >
      {preValue && <span className={preClassName ?? style.preClassName}>{preValue}</span>}
      <input {...register('contact', rules)} type="text" id={id} placeholder={placeholder} className={inputClassName ?? style.inputClassName} />
    </label>
  )
}
