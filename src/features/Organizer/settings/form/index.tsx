import { useState } from 'react'
import { TOrganizerSettingsFormValues } from '..'
import { SubmitButton } from '../../../../components/buttons/SubmitButton/SubmitButton'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { SuccessMessage } from '../../../../components/misc/SuccessMessage/Organizer/SuccessMessage'
import { ReactComponent as UnknownAvatarSvg } from '../../../../images/Organizer/unknownAvatar.svg'
import { emailValidationHandler, objectIsEmptyCheck } from '../../../../utils/functions'
import { TSmallForm } from '../../../../utils/types'
import style from './form.module.css'

type TOrganizerSettingsForm = {} & TSmallForm<TOrganizerSettingsFormValues>

const OrganizerSettingsForm = ({ formHook, onSubmitWrapper }: TOrganizerSettingsForm) => {
  const [submitted, setSubmitted] = useState<null | boolean>()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = formHook

  const onSubmit = (data: TOrganizerSettingsFormValues) => {
    onSubmitWrapper(data)?.then(() => {
      setSubmitted(true)
    })
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Настройки</h2>
      <div className={style.contentWrapper}>
        <div className={style.avatar}>
          <UnknownAvatarSvg />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.category}>
            <span className={style.categoryTitle}>Основная информация</span>
            <OrganizerInput {...{ register, errors }} inputName="fullName" label="Полное имя" />
          </div>
          <div className={style.category}>
            <span className={style.categoryTitle}>Контактная информация</span>
            <OrganizerInput
              {...{ register, errors }}
              inputName="email"
              label="Email"
              placeholder="Введите Email"
              rules={{
                required: 'Поле обязательное для заполнения',
                validate: {
                  checkEmail: (v: string) => emailValidationHandler(v),
                },
              }}
            />
            <OrganizerInput {...{ register, errors }} inputName="telegram" label="Telegram" />
            {submitted === true && <SuccessMessage>Изменения сохранены</SuccessMessage>}
            <div className={style.buttonWrapper}>
              <SubmitButton disabled={!objectIsEmptyCheck(errors) || !isDirty}>Сохранить</SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrganizerSettingsForm
