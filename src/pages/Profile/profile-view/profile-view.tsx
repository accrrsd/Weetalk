import { UseFormReturn } from 'react-hook-form'
import { InfoQuestion } from '../../../components/info-question/info-question'
import { AddPhoto } from '../../../components/inputs/add-photo/add-photo'
import { TitleSmart } from '../../../components/title-smart/title-smart'
import { currentUrl } from '../../../utils/api'
import { TFormValues } from '../../../utils/types'
import style from './profile-view.module.css'

type TProfileView = {
  formHook: UseFormReturn<TFormValues, any>
  previewImageUrl: string
}

export const ProfileView = ({ formHook, previewImageUrl }: TProfileView) => {
  const { getValues } = formHook
  const defaultValues = getValues()

  const linkToPreviewImage = `${currentUrl}/img/${previewImageUrl}`
  return (
    <div className={style.wrapper}>
      <TitleSmart haveButton={true} buttonText="Изм." text="Профиль" textStyle={style.titleProfile} buttonStyle={style.titleChangeButton} />
      <div className={style.upperPreview}>
        <div className={style.photo} style={{ backgroundImage: `url(${linkToPreviewImage})` }}></div>
        <div className={style.infoWrapper}>
          <span className={style.name}>{defaultValues.name}</span>
          <span className={style.contact}>{`${defaultValues.contactType.value === 'telegram' ? '@' : ''}${defaultValues.contact}`}</span>
        </div>
      </div>

      <InfoQuestion question="Кто видит мой контакт для связи">
        <div className={style.field}>{defaultValues.contactShowType.label}</div>
      </InfoQuestion>

      <InfoQuestion question="Кем работаю">
        <div className={style.field}>{defaultValues.work}</div>
      </InfoQuestion>

      <InfoQuestion question="Обо мне">
        <div className={style.field}>{defaultValues.about}</div>
      </InfoQuestion>
    </div>
  )
}
