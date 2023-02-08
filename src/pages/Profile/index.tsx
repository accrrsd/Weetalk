import style from './Profile.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

import { TFormValues } from '../../utils/types'
import { deleteUser, patchUser } from '../../utils/api'
import { createUserFormData } from '../../utils/functions'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { ModalAnyContent } from '../../components/modals/modal-any-content/modal-any-content'

export default function Profile() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const navigate = useNavigate()

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

  const onSubmit = (data: TFormValues) => {
    const formDataContent = createUserFormData(data)

    const id = localStorage.getItem('ownerId')
    // Временная обработка отсутствия id
    if (!id) return new Promise((resolve, reject) => reject('Ошибка получения ID пользователя'))
    return patchUser(formDataContent, id)
  }

  return (
    <div className={style.wrapper}>
      <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
      <UserInformation
        onSubmit={onSubmit}
        submitText={'Обновить'}
        autoValues={true}
        submitSuccessText="Карточка успешно обновлена"
        submitButtonStyle={style.submit}
        submitLabelWrapperStyle={style.submitLabel}
      />

      <div className={style.deleteProfileButtonWrapper}>
        <button className={style.deleteProfileButton} onClick={() => setOpenConfirmModal(true)}>
          Удалить профиль
        </button>
      </div>

      {openConfirmModal && (
        <ModalAnyContent
          wrapperStyle={style.deleteModalWrapper}
          removeDefaultStyle={true}
          onOverlayClick={() => {
            setOpenConfirmModal(false)
          }}
        >
          <span className={style.deleteModalTitle}>Ты действительно хочешь удалить свой профиль?</span>
          {deleteError && <span className={style.deleteModalError}>Произошла ошибка удаления</span>}
          <div className={style.deleteModalButtonsWrapper}>
            <button
              className={`${style.deleteModalButton} ${style.deleteModalButtonNo}`}
              onClick={() => {
                setOpenConfirmModal(false)
              }}
            >
              Не удалять
            </button>
            <div className={style.deleteModalButtonYesWrapper}>
              <button
                className={`${style.deleteModalButton} ${deleteLoader ? style.deleteModalButtonWithLoader : ''} ${style.deleteModalButtonYes}`}
                onClick={onConfirmDelete}
              >
                {deleteLoader ? <Oval height={34} color="#7e7ee7" secondaryColor="#d9d9f8" /> : 'Удалить профиль'}
              </button>
            </div>
          </div>
        </ModalAnyContent>
      )}
    </div>
  )
}
