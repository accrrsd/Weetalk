import style from './registration-form.module.css'
import selectInputStyle from './registration-select.module.css'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Oval } from 'react-loader-spinner'

import { InfoQuestion } from '../../../../components/info-question/info-question'
import { AddPhoto } from '../../../../components/inputs/add-photo/add-photo'
import { ContactInput } from '../../../../components/inputs/input-pre-value/input-pre-value'
import { SelectInput } from '../../../../components/inputs/select-input/select-input'

import { possibleContacts, possibleVisibility } from '../../../../utils/constants'
import { checkError, emailValidationHandler } from '../../../../utils/functions'
import { TFormValues } from '../../../../utils/types'

type TRegistrationForm = {
  formHook: UseFormReturn<TFormValues, any>
  loader: boolean
  submitSuccess: null | boolean
  onSubmitWrapper: (data: TFormValues) => void
}

const RegistrationForm = ({ formHook, loader, submitSuccess, onSubmitWrapper }: TRegistrationForm) => {
  const [contactType, setContactType] = useState<string | number | undefined>(possibleContacts[0].value)
  const [photoChanged, setPhotoChanged] = useState(false)
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
              validate: {
                checkContact: (v: string) => (contactType === possibleContacts[0].value ? true : emailValidationHandler(v)),
                preValueContain: (v: string) =>
                  contactType === possibleContacts[0].value && v.includes('@') ? '@ установлена по умолчанию, ее нужно убрать' : true,
              },
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

export default RegistrationForm
