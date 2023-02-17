import style from './container.module.css'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { TitleSmart } from '../../components/title-smart/title-smart'
import { ProfileForm } from './form'
import { ProfileDeleteModal } from './modal'

import { deleteUser, getCurrentUser, patchUser } from '../../utils/api'
import { possibleContacts, possibleVisibility } from '../../utils/constants'
import { createUserFormData } from '../../utils/functions'
import { TFormValues } from '../../utils/types'

export default function ProfileContainer() {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const { setValue } = formHook
  const navigate = useNavigate()

  const [loader, setLoader] = useState(false)
  const [previewFromApi, setPreviewFromApi] = useState<null | string>(null)
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null)
  const [contactType, setContactType] = useState<string | number | undefined>(possibleContacts[0].value)

  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [deleteError, setDeleteError] = useState(false)

  useEffect(() => {
    getCurrentUser().then((userData) => {
      const {
        username,
        description,
        imageName,
        actualJob,
        contacts: { telegram, email, showType },
      } = userData

      setValue('name', username)
      setValue('about', description)
      setValue('work', actualJob)

      const foundIndexShowType = possibleVisibility.findIndex((element) => element.value === showType)
      setValue('contactShowType', possibleVisibility[foundIndexShowType])

      const foundContactType = possibleContacts.findIndex((element) => element.value === `${telegram ? 'telegram' : 'email'}`)
      setValue('contactType', possibleContacts[foundContactType])
      setContactType(possibleContacts[foundContactType].value)

      setValue('contact', telegram ?? email ?? '')
      setPreviewFromApi(imageName)
    })
  }, [setValue])

  const onSubmit = (data: TFormValues) => {
    const formDataContent = createUserFormData(data)
    const id = localStorage.getItem('ownerId')
    if (!id) return new Promise((resolve, reject) => reject('Ошибка получения ID пользователя'))
    return patchUser(formDataContent)
  }

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    setLoader(true)
    onSubmit(data)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitSuccess(false))
      .finally(() => setLoader(false))
  }

  const onConfirmDelete = () => {
    const id = localStorage.getItem('ownerId')
    if (!id) {
      setDeleteError(true)
      return
    }

    setDeleteLoader(true)
    setDeleteError(false)

    deleteUser()
      .then(() => {
        localStorage.removeItem('ownerId')
        localStorage.removeItem('userData')
        localStorage.removeItem('welcomeState')
        setOpenConfirmModal(false)
        navigate('/login')
      })
      .catch(() => {
        setDeleteError(true)
      })
      .finally(() => {
        setDeleteLoader(false)
      })
  }

  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" />
      <ProfileForm {...{ formHook, loader, submitSuccess, onSubmitWrapper, contactType, setContactType, previewFromApi }} />
      <div className={style.deleteProfileButtonWrapper}>
        <button className={style.deleteProfileButton} onClick={() => setOpenConfirmModal(true)}>
          Удалить профиль
        </button>
      </div>
      {openConfirmModal && <ProfileDeleteModal {...{ deleteError, deleteLoader, setOpenConfirmModal, onConfirmDelete }} />}
    </div>
  )
}
