import { ChangeEvent, ClipboardEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
import style from './otp-input.module.css'

type TOtpInput = {
  inputName: string
  rules?: Object
  control: Control<any, any>

  onFullFunc?: () => void
}

const defaultRules = {
  validate: {
    checkUndefined: (v: string) => (v ? true : 'Требуется код'),
  },
}

export const OtpInput = ({ inputName, rules = defaultRules, control, onFullFunc }: TOtpInput) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [otpKeys] = useState<string[]>(otp.map(() => uuid()))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputName,
    control,
    rules,
  })

  const smartSetOtp = (newOtpValue: string[]) => {
    setOtp(newOtpValue)
    field.onChange(newOtpValue.join(''))
  }

  // Вызываем функцию при полном заполнении кода
  useEffect(() => {
    if (!otp.includes('')) onFullFunc?.()
  }, [otp, onFullFunc])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      const { key } = e
      switch (key) {
        case 'Backspace':
          if (otp[index] === '') {
            e.preventDefault()
            setActiveOtpIndex(index - 1)
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          if (index + 1 <= otp.length - 1) setActiveOtpIndex(index + 1)
          break
        case 'ArrowLeft':
          e.preventDefault()
          if (index - 1 >= 0) setActiveOtpIndex(index - 1)
          break
      }
    },
    [otp]
  )

  const onPaste = (e: ClipboardEvent<HTMLInputElement>, index: number) => {
    const text = e.clipboardData.getData('text/plain')
    const newArray: string[] = Array.from(text).filter((item, index) => index < otp.length)
    if (newArray.length < otp.length) {
      const newArrayMaxIndex = newArray.length - 1
      const otpArrayMaxIndex = otp.length - 1
      for (let i = 0; i < otpArrayMaxIndex - newArrayMaxIndex; i++) {
        newArray.push('')
      }
    }
    smartSetOtp(newArray)
  }

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = target

    // В случае ввода по одному символу
    if (!value) setActiveOtpIndex(index - 1)
    else setActiveOtpIndex(index + 1)

    const prevValue = otp[index]
    const newValue = prevValue !== value ? value.replace(prevValue, '') : prevValue
    const newArray = otp
    newArray[index] = newValue.substring(newValue.length - 1)
    smartSetOtp(newArray)
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [activeOtpIndex])

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {otp.map((item, index) => (
          <input
            type="number"
            ref={index === activeOtpIndex ? inputRef : null}
            className={style.input}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onFocus={(e) => setActiveOtpIndex(index)}
            onPaste={(e) => onPaste(e, index)}
            value={otp[index]}
            key={otpKeys[index]}
          />
        ))}
      </div>
      {error && <span className={style.errorMessage}>{error.message}</span>}
    </div>
  )
}
