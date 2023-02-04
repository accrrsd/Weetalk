import { ChangeEvent, useEffect, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import style from './input-pre-value.module.css'

type TInputPreValue = {
  control: Control<any, any>
  preValue?: string | number
  inputName: string
  rules?: object
  wrapperClassName?: string
  wrapperErrorClassName?: string
  inputClassName?: string
  preClassName?: string
  placeholder?: string
}
export const InputPreValue = ({
  control,
  preValue,
  inputName,
  rules,
  wrapperClassName,
  wrapperErrorClassName,
  preClassName,
  inputClassName,
  placeholder,
  ...rest
}: TInputPreValue) => {
  const preNumberInputId = uuid()
  const replaceRegEx = new RegExp(String(preValue), 'g')
  const [preValueRendered, setPreValueRendered] = useState(false)
  const {
    field,
    fieldState: { error },
  } = useController({
    defaultValue: preValue,
    name: inputName,
    control,
    rules: rules ?? {
      validate: {
        notOnlyPreValue: (value) => (String(value).replace(replaceRegEx, '') !== '' ? true : 'Поле обязательно к заполнению'),
      },
    },
  })

  //todo Вроде как все сделали, завтра нужно будет прикрутить картинки к меню выбора, например через второй массив, и доделать все поля ввода.
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const currentValue = `${preValue}${value}`
    field.onChange(currentValue)
  }

  // очистка поля ввода при изменении типа ввода
  useEffect(() => {
    setPreValueRendered(true)
  }, [])

  useEffect(() => {
    if (preValueRendered) {
      field.onChange('')
    }
    // eslint-disable-next-line
  }, [preValue])

  return (
    <label
      htmlFor={preNumberInputId}
      className={`${wrapperClassName ?? style.wrapperClassName} ${error ? wrapperErrorClassName ?? style.wrapperErrorClassName : ''}`}
    >
      {preValue && <span className={preClassName ?? style.preClassName}>{preValue}</span>}
      <input
        type="text"
        value={String(field.value).replace(replaceRegEx, '')}
        id={preNumberInputId}
        placeholder={placeholder}
        className={inputClassName ?? style.inputClassName}
        onChange={onChangeHandler}
        ref={field.ref}
        {...rest}
      ></input>
    </label>
  )
}
