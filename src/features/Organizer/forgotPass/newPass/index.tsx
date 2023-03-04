import { TOrganizerNewPassValues } from '..'
import { SubmitButton } from '../../../../components/buttons/SubmitButton/SubmitButton'
import { OrganizerInput } from '../../../../components/inputs/OrganizerInput/OrganizerInput'
import { TSmallForm } from '../../../../utils/types'
import style from './newPass.module.css'

const OrganizerForgotPassNew = ({ formHook, onSubmitWrapper }: TSmallForm<TOrganizerNewPassValues>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = formHook
  return (
    <>
      <span className={style.title}>Обновите пароль</span>
      <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
        <OrganizerInput
          {...{ register, errors }}
          inputName="password"
          label="Новый пароль"
          placeholder="Введите новый пароль"
          hideButton
          autoComplete="off"
          rules={{
            required: 'Поле обязательное для заполнения',
            validate: {
              checkPassLength: (v: string) => (v.length < 8 ? 'Пароль должен состоять из не менее 8 символов' : true),
            },
          }}
        />
        <SubmitButton disabled={!!errors.password || !isDirty}>Обновить пароль</SubmitButton>
      </form>
    </>
  )
}
export default OrganizerForgotPassNew
