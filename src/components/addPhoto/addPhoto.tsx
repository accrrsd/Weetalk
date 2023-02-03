import style from './addPhoto.module.css'
import { useEffect, useState } from 'react'
import useImagePreview from '../../hooks/useImagePreview'

import { ReactComponent as ImageRect } from '../../images/addPhotoRect.svg'
import { ReactComponent as AddPhotoPlusRect } from '../../images/addPhotoPlus.svg'
import { UseFormReturn } from 'react-hook-form'
import { checkError } from '../../utils/functions'
import { currentUrl } from '../../utils/api'

type TAddPhoto = {
  formHook: UseFormReturn<any, object>
  inputName?: string
  onChange?: Function
  onChangeStyle?: string
  previewImageUrl: string | null
}

export const AddPhoto = ({ formHook, inputName = 'photo', onChange, onChangeStyle, previewImageUrl }: TAddPhoto) => {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [photoChanged, setPhotoChanged] = useState(false)
  const imagePreview = useImagePreview(imageFile)
  const imageFromApi = `${currentUrl}/img/${previewImageUrl}`
  const previewSrc = previewImageUrl ? imageFromApi : imagePreview

  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = formHook

  useEffect(() => {
    imageFile !== null && clearErrors(inputName)
  }, [imageFile, clearErrors, inputName])

  useEffect(() => {
    if (previewSrc) setPhotoChanged(true)
  }, [previewSrc])

  useEffect(() => {
    if (photoChanged && onChange) {
      onChange()
    }
  }, [photoChanged, onChange])

  useEffect(() => {
    if (previewImageUrl) {
      setValue(inputName, null)
    }
  }, [previewImageUrl])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    if (!files || !files.item(0)) return
    setImageFile(files.item(0))
    setValue(inputName, files.item(0))
  }
  return (
    <div className={style.wrapper}>
      <div className={`${style.image} ${photoChanged && onChangeStyle ? onChangeStyle : ''}`} style={{ backgroundImage: `url(${previewSrc})` }}>
        {!previewSrc && <ImageRect />}
        <label htmlFor="addImage" className={style.imageInput}>
          <AddPhotoPlusRect className={style.imageInputRect} />
          <input
            {...register(inputName, {
              validate: {
                havePhoto: () => (previewImageUrl ? true : imageFile !== null ? true : 'Добавьте вашу фотографию'),
              },
            })}
            type="file"
            id="addImage"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      {checkError(inputName, errors) && <span className={style.error}>{checkError(inputName, errors)}</span>}
    </div>
  )
}
