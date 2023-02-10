import style from './login.module.css'
import selectInputStyle from './select-input-class.module.css'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'

import { TFormValues } from '../../utils/types'
import { postUser } from '../../utils/api'
import { checkError, createUserFormData, isValidEmail } from '../../utils/functions'
import { possibleContacts, possibleVisibility } from '../../utils/constants'

import { InfoQuestion } from '../../components/info-question/info-question'
import { AddPhoto } from '../../components/inputs/add-photo/add-photo'
import { SelectInput } from '../../components/inputs/select-input/select-input'
import { ContactInput } from '../../components/inputs/input-pre-value/input-pre-value'

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const [photoChanged, setPhotoChanged] = useState(false)
  const [contactType, setContactType] = useState<string | number | undefined>(possibleContacts[0].value)
  const [loader, setLoader] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null)

  const emailValidationHandler = (email: string) => isValidEmail(email, 'Некорректный адрес электронной почты')

  const onSubmit = (data: TFormValues) => {
    const formDataContent = createUserFormData(data)

    return postUser(formDataContent).then((id) => {
      localStorage.setItem('ownerId', id)
      localStorage.setItem('userData', '1234')
      authorizedFunc(true)
    })
  }

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    setLoader(true)
    onSubmit(data)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitSuccess(false))
      .finally(() => setLoader(false))
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = formHook

  return (
    <div className={style.wrapper}>
      {!photoChanged && (
        <p className={style.photoTitle}>
          Выбери фотографию или сделай селфи. Важно чтобы лицо было хорошо видно — так тебя будет проще найти среди гостей
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
        <AddPhoto formHook={formHook} inputName="photo" onChange={() => setPhotoChanged(true)} />

        <InfoQuestion question="Как тебя зовут?" tip={{ text: 'Напиши свое настоящие имя и фамилию' }}>
          <input
            {...register('name', {
              required: 'Поле обязательное для заполнения',
            })}
            type="text"
            className={`${style.infoInput} ${checkError('name', errors) ? style.errorInput : ''}`}
            placeholder="Евгений Александров"
          />
          {checkError('name', errors) && <span className={style.errorMessage}>{checkError('name', errors)}</span>}
        </InfoQuestion>

        <InfoQuestion question="Оставь свой контакт для связи" tip={{ text: 'Добавь удобный контакт для связи с тобой' }}>
          <SelectInput
            control={control}
            inputName="contactType"
            options={possibleContacts}
            onChange={(e) => setContactType(e?.value)}
            className={selectInputStyle}
          />
          <ContactInput
            register={register}
            preValue={contactType === possibleContacts[0].value ? '@' : ''}
            placeholder={contactType === possibleContacts[0].value ? 'ananas' : 'example@mail.ru'}
            wrapperErrorClassName={style.errorInput}
            rules={{
              required: 'Поле обязательное для заполнения',
              validate: contactType === possibleContacts[0].value ? true : emailValidationHandler,
            }}
          />
          {checkError('contact', errors) && <span className={style.errorMessage}>{checkError('contact', errors)}</span>}
        </InfoQuestion>

        <InfoQuestion question="Кто видит твои контакты" tip={{ text: 'Выбери кто из пользователей может видеть твои контакты' }}>
          <SelectInput control={control} inputName="contactShowType" options={possibleVisibility} className={selectInputStyle} />
        </InfoQuestion>

        <InfoQuestion question="Расскажи о себе" tip={{ text: 'Расскажи, чем занимаешься, какие у тебя есть рабочие интересы и хобби' }}>
          <textarea
            maxLength={250}
            {...register('about', {
              required: 'Поле обязательное для заполнения',
              minLength: {
                value: 70,
                message: 'Напиши о себе минимум 70 символов',
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
        </InfoQuestion>

        <InfoQuestion question="Кем работаешь?" tip={{ text: 'Укажи свое место работы или специальность', tongue: 'toTop' }}>
          <input
            {...register('work', {
              required: 'Поле обязательное для заполнения',
            })}
            type="text"
            className={`${style.infoInput} ${checkError('work', errors) ? style.errorInput : ''}`}
            placeholder="Дизайнер в Gradient"
          />
          {checkError('work', errors) && <span className={style.errorMessage}>{checkError('work', errors)}</span>}
        </InfoQuestion>

        <div className={style.submitWrapper}>
          {submitSuccess !== null && (
            <span className={submitSuccess ? style.submitSuccessColor : style.submitDenyColor}>
              {submitSuccess ? 'Карточка успешно создана' : 'Ошибка создания карточки'}
            </span>
          )}
          <div className={`${style.submitLabelWrapper} ${loader ? style.submitLabelWrapperDisableEvents : ''}`}>
            <label htmlFor="submitButton" className={`${style.submit} ${loader ? style.submitButtonDisablePadding : ''}`}>
              <input type="submit" id="submitButton" style={{ display: 'none' }} />
              <span className={style.submitContent}>
                {loader ? <Oval color="#7e7ee7" height={27} secondaryColor="#d9d9f8"></Oval> : 'Создать карточку'}
              </span>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}
