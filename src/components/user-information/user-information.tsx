import style from './user-information.module.css'
import selectInputStyle from './selectInputStyle.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkError } from '../../utils/functions'
import { TFormValues, TSelectableItem } from '../../utils/types'
import { AddPhoto } from '../addPhoto/addPhoto'
import { Tip } from '../tip/tip'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../../utils/api'
import { Oval } from 'react-loader-spinner'
import { SelectInput } from '../select-input/select-input'
import { ContactInput } from '../input-pre-value/input-pre-value'
import { possibleContacts, possibleVisibility } from '../../utils/constants'

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
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null)
  const [loader, setLoader] = useState(false)

  const [contactType, setContactType] = useState<string | number | undefined>(possibleContacts[0].value)

  const contactTypeChangeHandler = (e: TSelectableItem | undefined) =>
    typeof e === 'undefined' ? setContactType(undefined) : setContactType(e.value)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = formHook

  const isValidEmail = (email: string) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
      ? true
      : 'Некорректный адрес электронной почты'

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    setLoader(true)
    onSubmit(data)
      .then(() => {
        setSubmitSuccess(true)
      })
      .catch(() => {
        setSubmitSuccess(false)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    if (autoValues) {
      const id = localStorage.getItem('ownerId')
      if (id) {
        getCurrentUser(id).then((userData) => {
          const {
            username,
            description,
            image,
            actualJob,
            contacts: { telegram, email, showType },
          } = userData
          console.log(userData)
          setValue('name', username)
          setValue('about', description)
          setValue('work', actualJob)
          const foundIndexShowType = possibleVisibility.findIndex((element) => element.value === showType)
          setValue('contactsUserShowType', possibleVisibility[foundIndexShowType])
          const foundContactType = possibleContacts.findIndex((element) => element.value === `${telegram ? 'telegram' : 'email'}`)
          setValue('contactType', possibleContacts[foundContactType])
          setContactType(possibleContacts[foundContactType].value)
          setValue('contact', telegram ?? email)
          setPreviewFromApi(image)
        })
      }
    }
  }, [setValue, autoValues])

  //todo Рефактор нужно завернуть infoQuestionWrapper в отдельный компонент, чтобы сильно упростить структуру, для инпутов можно сделать отдельную папку
  //todo Рефактор нужно разбить это на два возможных рендера, профиль и логин, т.к там сильно отличается дизайн

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
      <AddPhoto formHook={formHook} inputName="photo" onChange={onPhotoChange} onChangeStyle={onPhotoChangeStyle} previewImageUrl={previewFromApi} />
      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Как тебя зовут? <Tip color="black" text={'Напиши свои настоящие имя и фамилию'} modalDirection="down" />
        </span>
        <input
          {...register('name', {
            required: 'Поле обязательное для заполнения',
          })}
          type="text"
          className={`${style.infoInput} ${checkError('name', errors) ? style.errorInput : ''}`}
          placeholder="Евгений Александров"
        />
        {checkError('name', errors) && <span className={style.errorMessage}>{checkError('name', errors)}</span>}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Оставь свой контакт для связи <Tip color="black" text={'Добавь удобный контакт для связи с тобой'} modalDirection="down" />
        </span>
        <SelectInput
          control={control}
          inputName="contactType"
          options={possibleContacts}
          onChange={contactTypeChangeHandler}
          className={selectInputStyle}
        />
        <ContactInput
          register={register}
          preValue={contactType === possibleContacts[0].value ? '@' : ''}
          placeholder={contactType === possibleContacts[0].value ? 'ananas' : 'example@mail.ru'}
          wrapperErrorClassName={style.errorInput}
          rules={{ required: 'Поле обязательное для заполнения', validate: contactType === possibleContacts[0].value ? true : isValidEmail }}
        />
        {checkError('contact', errors) && <span className={style.errorMessage}>{checkError('contact', errors)}</span>}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Кто видит твои контакты <Tip color="black" text={'Выбери кто из пользователей может видеть твои контакты'} modalDirection="down" />
        </span>
        <SelectInput control={control} inputName="contactsUserShowType" options={possibleVisibility} className={selectInputStyle} />
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
            minLength: {
              value: 100,
              message: 'Напиши о себе минимум 100 символов',
            },
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
          {...register('work', {
            required: 'Поле обязательное для заполнения',
          })}
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
