import style from './login.module.css'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import useImagePreview from '../../hooks/useImagePreview'
// import addPhotoRect from '../../images/addPhotoRect.svg'
import { SubmitHandler } from 'react-hook-form/dist/types'

type TFormValues = {
  image: File
  name: string
  about: string
  purpose: string
}

export default function Login({ authorizedFunc }: { authorizedFunc: Function }) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { register, handleSubmit } = useForm<TFormValues>()

  const previewSrc = useImagePreview(imageFile)

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    // Тут нужно будет хранить какую-то ссылку на получение данных с БД
    localStorage.setItem('userData', data.name)
    authorizedFunc(true)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || !files.item(0)) return
    setImageFile(files.item(0))
  }

  const titleText = 'Добавьте Ваше фото :)'

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {!previewSrc && <h2 className={style.title}>{titleText}</h2>}
        <div className={style.imageWrapper}>
          {!previewSrc ? (
            <>
              <div className={style.imageInputWrapper}>
                <label htmlFor="addImage" className={style.imageInput}>
                  <input {...register('image')} type="file" id="addImage" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                </label>
                {/* <img src={addPhotoRect} alt="" /> */}
              </div>
              <p className={style.imageHint}>
                Выберите фотографию на которой хорошо видно ваше лицо, а если вы сегодня в ударе, то лучше всего сделать селфи
              </p>
            </>
          ) : (
            <div className={style.imageReadyWrapper}>
              <img src={previewSrc} alt="" className={style.previewImage} />
              <label htmlFor="replaceImage" className={style.replaceImageInput}>
                <span>Заменить фотографию</span>
                <input {...register('image')} type="file" id="replaceImage" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
              </label>
            </div>
          )}
        </div>
        <div className={style.infoWrapper}>
          <div className={style.infoQuestionWrapper}>
            <span className={style.infoQuestion}>Как Вас зовут?</span>
            <input {...register('name')} type="text" className={style.infoInput} placeholder="Например: Вася Пупкин" required />
          </div>
          <div className={style.bottomInfoWrapper}>
            <div className={style.infoQuestionWrapper}>
              <span className={style.infoQuestion}>Расскажите о себе</span>
              <textarea
                {...register('about')}
                className={style.infoInput}
                placeholder="Я очень люблю рассказывать о себе и заполнять информацию"
                required
              />
            </div>
            <div className={style.infoQuestionWrapper}>
              <span className={style.infoQuestion}>Почему Вы пришли сюда</span>
              <textarea {...register('purpose')} className={style.infoInput} placeholder="Я хочу пожать руку людям выше меня 10 раз" required />
            </div>
          </div>
        </div>
        <input type="submit" className={style.submit} />
      </form>
    </div>
  )
}
