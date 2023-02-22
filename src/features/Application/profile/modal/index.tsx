import { Oval } from 'react-loader-spinner'
import { ModalAnyContent } from '../../../../components/modals/modal-any-content/modal-any-content'
import style from './profile-delete-modal.module.css'

type TProfileDeleteModal = {
  setOpenConfirmModal: (e: boolean) => void
  onConfirmDelete?: () => void
  deleteError: boolean
  deleteLoader: boolean
}

const ProfileDeleteModal = ({ deleteError, deleteLoader, setOpenConfirmModal, onConfirmDelete }: TProfileDeleteModal) => (
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
)
export default ProfileDeleteModal
