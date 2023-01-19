import style from './user-information.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkError } from '../../utils/functions'
import { TFormValues } from '../../utils/types'
import { AddPhoto } from '../addPhoto/addPhoto'
import { Tip } from '../tip/tip'
import { useEffect, useState } from 'react'
import { getUserById } from '../../utils/api'

export const UserInformation = ({
  onSubmit,
  onPhotoChange,
  onPhotoChangeStyle,
  submitText = 'Отправить',
  submitButtonStyle,
  autoValues = false,
}: {
  onSubmit: (data: TFormValues) => void
  onPhotoChange?: Function
  onPhotoChangeStyle?: string
  submitText?: string
  submitButtonStyle?: string
  autoValues?: boolean
}) => {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const [apiPreview, setApiPreview] = useState<null | string>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formHook

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    onSubmit(data)
  }

  useEffect(() => {
    if (autoValues) {
      const id = localStorage.getItem('ownerId')
      if (id) {
        getUserById(id).then((userData) => {
          const { username, description, image, actualJob } = userData
          setValue('name', username)
          setValue('about', description)
          setValue('work', actualJob)
          setApiPreview(image)
        })
      }
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
      <AddPhoto formHook={formHook} inputName="photo" onChange={onPhotoChange} onChangeStyle={onPhotoChangeStyle} previewImageBase64={apiPreview} />
      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Как тебя зовут? <Tip color="black" text={'Напиши свои настоящие имя и фамилию'} modalDirection="down" />
        </span>
        <input
          {...register('name', { required: 'Поле обязательное для заполнения' })}
          type="text"
          className={`${style.infoInput} ${checkError('name', errors) ? style.errorInput : ''}`}
          placeholder="Сергей Фадеев"
        />
        {checkError('name', errors) && <span className={style.errorMessage}>{checkError('name', errors)}</span>}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Расскажи о себе
          <Tip color="black" text={'Расскажи, чем занимаешься, какие у тебя есть рабочие интересы и хобби'} modalDirection="down" />
        </span>
        <textarea
          maxLength={250}
          {...register('about', {
            required: 'Поле обязательное для заполнения',
            minLength: { value: 100, message: 'Напиши о себе минимум 100 символов' },
          })}
          className={`${style.infoInput} ${style.textareaInput} ${checkError('about', errors) ? style.errorInput : ''}`}
          placeholder="Стратегический консультант в Constanta, стартапер, продакт. Мой любимый режиссер - Джим Джармуш, в свободное время играю в MOBA игры"
        />
        {checkError('about', errors) ? (
          <span className={style.errorMessage}>{checkError('about', errors)}</span>
        ) : (
          <span className={style.symbolLimitMessage}>Максимум 250 символов</span>
        )}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Кем работаешь? <Tip color="black" text={'Укажи свое место работы или специальность'} />
        </span>
        <input
          {...register('work', { required: 'Поле обязательное для заполнения' })}
          type="text"
          className={`${style.infoInput} ${checkError('work', errors) ? style.errorInput : ''}`}
          placeholder="Руководитель тестирования"
        />
        {checkError('work', errors) && <span className={style.errorMessage}>{checkError('work', errors)}</span>}
      </div>

      <input type="submit" className={`${style.submit} ${submitButtonStyle}`} value={submitText} />
    </form>
  )
}
