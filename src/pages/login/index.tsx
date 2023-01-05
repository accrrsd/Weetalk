import style from './login.module.css'

import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { AddPhoto } from '../../components/addPhoto/addPhoto'
import { Tip } from '../../components/tip/tip'
import { checkError } from '../../utils/functions'

type TFormValues = {
  photo: File
  name: string
  about: string
  work: string
}

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formHook

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    localStorage.setItem('userData', data.name)
    authorizedFunc(true)
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <p className={style.photoTitle}>
          Выберите фотографию на которой хорошо видно ваше лицо, а если вы сегодня в ударе, то лучше всего сделать селфи
        </p>
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
        <input type="submit" className={style.submit} value="Найти новых людей" />
      </form>
    </div>
  )
}
