import style from './Profile.module.css'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { TFormValues } from '../../utils/types'
import { deleteUser, patchUser } from '../../utils/api'
import { useState } from 'react'
import { ModalAnyContent } from '../../components/modal-any-content/modal-any-content'
import { Oval } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

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
    const { name, about, work, photo, contactsUserShowType, contact, contactType } = data

    //todo Рефактор МОЖНО вынести подобную логику в отдельную функцию, которая будет использоваться сразу и в login и в profile

    const formDataContent = new FormData()
    if (name) formDataContent.set('username', name)
    if (about) formDataContent.set('description', about)
    if (work) formDataContent.set('actualJob', work)
    if (photo) formDataContent.set('currentImage', photo)
    // if (contactType.value==='email') {formDataContent.set('contacts.telegram', undefined)}
    // if (contactType.value==='telegram') formDataContent.set('contacts.email', undefined)

    if (contactType.value) formDataContent.set(`contacts.${contactType.value}`, contact)
    formDataContent.set('contacts.showType', contactsUserShowType.value ?? 'NOBODY')

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
