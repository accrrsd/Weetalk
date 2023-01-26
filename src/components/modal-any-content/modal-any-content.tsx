import { createPortal } from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import style from './modal-any-content.module.css'

const modalsContainer = document.querySelector('#modals')

type TModalProps = {
  children: string | JSX.Element | JSX.Element[]
  onOverlayClick: () => void
  wrapperStyle?: string
}

export const ModalAnyContent = ({ children, onOverlayClick, wrapperStyle }: TModalProps) => {
  const emptyFunc = () => {}
  return createPortal(
    <>
      <div className={`${style.wrapper} ${wrapperStyle ?? ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick ?? emptyFunc} />
    </>,
    modalsContainer!
  )
}
