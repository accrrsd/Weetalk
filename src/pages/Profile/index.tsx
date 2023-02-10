import style from './profile.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

import { TFormValues } from '../../utils/types'
import { deleteUser, getCurrentUser, patchUser } from '../../utils/api'
import { createUserFormData } from '../../utils/functions'

import { UserInformation } from '../../components/user-information/user-information'
import { TitleSmart } from '../../components/title-smart/title-smart'
import { ModalAnyContent } from '../../components/modals/modal-any-content/modal-any-content'
import { useForm } from 'react-hook-form'
import { possibleContacts, possibleVisibility } from '../../utils/constants'

export default function Profile() {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [deleteError, setDeleteError] = useState(false)

  const [contactType, setContactType] = useState<string | number | undefined>(possibleContacts[0].value)
  const [previewFromApi, setPreviewFromApi] = useState<null | string>(null)

  const navigate = useNavigate()

  const { setValue } = formHook

  useEffect(() => {
    const id = localStorage.getItem('ownerId')
    if (id) {
      getCurrentUser(id).then((userData) => {
        const {
          username,
          description,
          image,
          actualJob,
          contacts: { telegram, email, showType },
        } = userData
        console.log(userData)
        setValue('name', username)
        setValue('about', description)
        setValue('work', actualJob)

        const foundIndexShowType = possibleVisibility.findIndex((element) => element.value === showType)
        setValue('contactShowType', possibleVisibility[foundIndexShowType])

        const foundContactType = possibleContacts.findIndex((element) => element.value === `${telegram ? 'telegram' : 'email'}`)
        setValue('contactType', possibleContacts[foundContactType])
        setContactType(possibleContacts[foundContactType].value)

        setValue('contact', telegram ?? email ?? '')
        setPreviewFromApi(image)
      })
    }
  }, [setValue])

  return <div className="wrapper"></div>
}

// const onConfirmDelete = () => {
//   const id = localStorage.getItem('ownerId')
//   if (!id) {
//     setDeleteError(true)
//     return
//   }

//   setDeleteLoader(true)
//   setDeleteError(false)

//   deleteUser(id)
//     .then(() => {
//       localStorage.removeItem('ownerId')
//       localStorage.removeItem('userData')
//       localStorage.removeItem('welcomeState')
//       setOpenConfirmModal(false)
//       navigate('/login')
//     })
//     .catch(() => {
//       setDeleteError(true)
//     })
//     .finally(() => {
//       setDeleteLoader(false)
//     })
// }

// const onSubmit = (data: TFormValues) => {
//   const formDataContent = createUserFormData(data)

//   const id = localStorage.getItem('ownerId')
//   // Временная обработка отсутствия id
//   if (!id) return new Promise((resolve, reject) => reject('Ошибка получения ID пользователя'))
//   return patchUser(formDataContent, id)
// }

// return (
//   <div className={style.wrapper}>
//     <TitleSmart text="Профиль" wrapperStyle={style.titleWrapper} />
//     <UserInformation
//       onSubmit={onSubmit}
//       submitText={'Обновить'}
//       autoValues={true}
//       submitSuccessText="Карточка успешно обновлена"
//       submitButtonStyle={style.submit}
//       submitLabelWrapperStyle={style.submitLabel}
//     />

//     <div className={style.deleteProfileButtonWrapper}>
//       <button className={style.deleteProfileButton} onClick={() => setOpenConfirmModal(true)}>
//         Удалить профиль
//       </button>
//     </div>

//     {openConfirmModal && (
//       <ModalAnyContent
//         wrapperStyle={style.deleteModalWrapper}
//         removeDefaultStyle={true}
//         onOverlayClick={() => {
//           setOpenConfirmModal(false)
//         }}
//       >
//         <span className={style.deleteModalTitle}>Ты действительно хочешь удалить свой профиль?</span>
//         {deleteError && <span className={style.deleteModalError}>Произошла ошибка удаления</span>}
//         <div className={style.deleteModalButtonsWrapper}>
//           <button
//             className={`${style.deleteModalButton} ${style.deleteModalButtonNo}`}
//             onClick={() => {
//               setOpenConfirmModal(false)
//             }}
//           >
//             Не удалять
//           </button>
//           <div className={style.deleteModalButtonYesWrapper}>
//             <button
//               className={`${style.deleteModalButton} ${deleteLoader ? style.deleteModalButtonWithLoader : ''} ${style.deleteModalButtonYes}`}
//               onClick={onConfirmDelete}
//             >
//               {deleteLoader ? <Oval height={34} color="#7e7ee7" secondaryColor="#d9d9f8" /> : 'Удалить профиль'}
//             </button>
//           </div>
//         </div>
//       </ModalAnyContent>
//     )}
//   </div>
// )
