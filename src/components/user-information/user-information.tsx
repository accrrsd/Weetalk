import style from './user-information.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkError } from '../../utils/functions'
import { TFormValues } from '../../utils/types'
import { AddPhoto } from '../addPhoto/addPhoto'
import { Tip } from '../tip/tip'
import { useEffect, useState } from 'react'
import { getUserById } from '../../utils/api'
import { Oval } from 'react-loader-spinner'

export const UserInformation = ({
  onSubmit,
  onPhotoChange,
  onPhotoChangeStyle,
  submitText = 'Отправить',
  submitButtonStyle,
  submitSuccessText = 'Данные успешно установлены',
  submitDenyText = 'Ошибка, попробуйте снова',
  autoValues = false,
}: {
  onSubmit: (data: TFormValues) => any
  onPhotoChange?: Function
  onPhotoChangeStyle?: string
  submitText?: string
  submitSuccessText?: string
  submitDenyText?: string
  submitButtonStyle?: string
  autoValues?: boolean
}) => {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const [previewFromApi, setPreviewFromApi] = useState<null | string>(null)
  const [loader, setLoader] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = formHook

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    setLoader(true)
    onSubmit(data)
      .then(() => {
        setLoader(false)
        setSubmitSuccess(true)
      })
      .catch(() => {
        setLoader(false)
        setSubmitSuccess(false)
      })
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
          setPreviewFromApi(image)
        })
      }
    }
  }, [setValue, autoValues])

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
      <AddPhoto
        formHook={formHook}
        inputName="photo"
        onChange={onPhotoChange}
        onChangeStyle={onPhotoChangeStyle}
        previewImageBase64={previewFromApi}
      />
      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Как тебя зовут? <Tip color="black" text={'Напиши свои настоящие имя и фамилию'} modalDirection="down" />
        </span>
        <input
          {...register('name', { required: 'Поле обязательное для заполнения' })}
          type="text"
          className={`${style.infoInput} ${checkError('name', errors) ? style.errorInput : ''}`}
          placeholder="Евгений Александров"
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
          placeholder="Профессиональный дизайнер, опыт работы 8 лет. Основатель комьюнити “Контраст”. Занимаюсь йогой, люблю отдыхать на природе. Буду рад обменяться опытом построения сообщества!"
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
          placeholder="Дизайнер в Gradient"
        />
        {checkError('work', errors) && <span className={style.errorMessage}>{checkError('work', errors)}</span>}
      </div>

      <div className={style.submitWrapper}>
        {submitSuccess !== null && (
          <span className={submitSuccess ? style.submitSuccessColor : style.submitDenyColor}>
            {submitSuccess ? submitSuccessText : submitDenyText}
          </span>
        )}
        <div className={`${style.submitLabelWrapper} ${loader ? style.submitLabelWrapperDisableEvents : ''}`}>
          <label htmlFor="submitButton" className={`${style.submit} ${submitButtonStyle} ${loader ? style.submitButtonDisablePadding : ''}`}>
            <input type="submit" id="submitButton" style={{ display: 'none' }} />
            <span className={style.submitContent}>{loader ? <Oval color="#7e7ee7" height={27} secondaryColor="#d9d9f8"></Oval> : submitText}</span>
          </label>
        </div>
      </div>
    </form>
  )
}
