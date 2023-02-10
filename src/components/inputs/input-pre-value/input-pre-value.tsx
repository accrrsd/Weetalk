import { v4 as uuid } from 'uuid'
import style from './input-pre-value.module.css'

import { UseFormRegister } from 'react-hook-form'
import { TFormValues } from '../../../utils/types'
import { useLayoutEffect, useState } from 'react'

type TContactInput = {
  register: UseFormRegister<TFormValues>
  rules?: object
  preValue: string
  placeholder: string
  wrapperClassName?: string
  preClassName?: string
  error?: boolean
  inputClassName?: string
  wrapperErrorClassName?: string
}

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
}: TContactInput) => {
  const [uid, setUid] = useState<string>()

  useLayoutEffect(() => {
    setUid(uuid())
  }, [setUid])

  return (
    <label
      htmlFor={uid}
      className={`${wrapperClassName ?? style.wrapperClassName} ${error ? wrapperErrorClassName ?? style.wrapperErrorClassName : ''}`}
    >
      {preValue && <span className={preClassName ?? style.preClassName}>{preValue}</span>}
      <input {...register('contact', rules)} type="text" id={uid} placeholder={placeholder} className={inputClassName ?? style.inputClassName} />
    </label>
  )
}
