import style from './user-information.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkError } from '../../utils/functions'
import { TFormValues } from '../../utils/types'
import { AddPhoto } from '../addPhoto/addPhoto'
import { Tip } from '../tip/tip'

export const UserInformation = ({
  onSubmit,
  submitText = 'Отправить',
  submitButtonStyle,
}: {
  onSubmit: (data: TFormValues) => void
  submitText?: string
  submitButtonStyle?: string
}) => {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className={style.form}>
      <AddPhoto formHook={formHook} inputName="photo" />
      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Как Вас зовут? <Tip color="black" text={'Напишите здесь ваши настоящие имя и фамилию, пожалуйста'} />
        </span>
        <input
          {...register('name', { required: 'Поле обязательно к заполнению' })}
          type="text"
          className={`${style.infoInput} ${checkError('name', errors) && style.errorInput}`}
          placeholder="Сергей Фадеев"
        />
        {checkError('name', errors) && <span className={style.errorMessage}>{checkError('name', errors)}</span>}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Расскажите о себе
          <Tip
            color="black"
            text={
              'Расскажите здесь не только где вы работаете и кто вы по профессии, но и про ваши интересы, хобби, добавьте интересный факт о себе.'
            }
          />
        </span>
        <textarea
          {...register('about', { required: 'Поле обязательно к заполнению' })}
          className={`${style.infoInput} ${style.textareaInput} ${checkError('about', errors) && style.errorInput}`}
          placeholder="Стратегический консультант в weetalk, мой любимый режиссер Джим Джармуш, а в свободное время я очень люблю рассказывать о себе и заполнять информацию"
        />
        {checkError('about', errors) && <span className={style.errorMessage}>{checkError('about', errors)}</span>}
      </div>

      <div className={style.infoQuestionWrapper}>
        <span className={style.infoQuestion}>
          Кем работаете? <Tip color="black" text={'Это важно написать, так можно увеличить количество интересных знакомств'} />
        </span>
        <input
          {...register('work', { required: 'Поле обязательно к заполнению' })}
          type="text"
          className={`${style.infoInput} ${checkError('work', errors) && style.errorInput}`}
          placeholder="Руководитель тестирования"
        />
        {checkError('work', errors) && <span className={style.errorMessage}>{checkError('work', errors)}</span>}
      </div>

      <input type="submit" className={`${style.submit} ${submitButtonStyle}`} value={submitText} />
    </form>
  )
}
