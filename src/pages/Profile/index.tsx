import style from './Profile.module.css'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { TFormValues } from '../../utils/types'
import { deleteUser, patchUser } from '../../utils/api'
import { useState } from 'react'
import { ModalAnyContent } from '../../components/modal-any-content/modal-any-content'
import { Oval } from 'react-loader-spinner'

export default function Profile() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [deleteError, setDeleteError] = useState(false)

  const onConfirmDelete = () => {
    const id = localStorage.getItem('ownerId')
    if (!id) {
      setDeleteError(true)
      return
    }

    setDeleteLoader(true)
    setDeleteError(false)

    deleteUser(id)
      .then(() => {
        localStorage.removeItem('ownerId')
        localStorage.removeItem('userData')
        localStorage.removeItem('welcomeState')
      })
      .catch(() => {
        setDeleteError(true)
      })
      .finally(() => {
        setDeleteLoader(false)
      })
  }

  const onSubmit = (data: TFormValues) => {
    const { name, about, work, photo } = data

    const formDataContent = new FormData()
    if (name) formDataContent.set('username', name)
    if (about) formDataContent.set('description', about)
    if (work) formDataContent.set('actualJob', work)
    if (photo) formDataContent.set('currentImage', photo)

    const id = localStorage.getItem('ownerId')
    // Временная обработка отсутствия id
    if (!id) return new Promise((resolve, reject) => reject())
    return patchUser(formDataContent, id)
  }

  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
      <UserInformation
        onSubmit={onSubmit}
        submitText={'Обновить'}
        submitButtonStyle={style.submit}
        autoValues={true}
        submitSuccessText="Карточка успешно обновлена"
      />

      <button className={style.deleteProfileButton} onClick={() => setOpenConfirmModal(true)}>
        Удалить
      </button>
      {openConfirmModal && (
        <ModalAnyContent
          wrapperStyle={style.deleteModalWrapper}
          onOverlayClick={() => {
            setOpenConfirmModal(false)
          }}
        >
          <span className={style.deleteModalTitle}>Ты действительно хочешь удалить профиль?</span>
          {deleteError && <span className={style.deleteModalError}>Произошла ошибка удаления</span>}
          <div className={style.deleteModalButtonsWrapper}>
            <button
              className={style.deleteModalButton}
              onClick={() => {
                setOpenConfirmModal(false)
              }}
            >
              Нет
            </button>
            <button className={`${style.deleteModalButton} ${deleteLoader ? style.deleteModalButtonWithLoader : ''}`} onClick={onConfirmDelete}>
              {deleteLoader ? <Oval height={34} color="#7e7ee7" secondaryColor="#d9d9f8" /> : 'Да'}
            </button>
          </div>
        </ModalAnyContent>
      )}
    </div>
  )
}
