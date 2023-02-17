import { createPortal } from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay'
import style from './modal-any-content.module.css'

const modalsContainer = document.querySelector('#modals')

type TModalProps = {
  children: string | JSX.Element | (JSX.Element | boolean)[]
  onOverlayClick: () => void
  wrapperStyle?: string
  removeDefaultStyle?: boolean
}

export const ModalAnyContent = ({ children, onOverlayClick, wrapperStyle, removeDefaultStyle }: TModalProps) => {
  const emptyFunc = () => {}
  return createPortal(
    <>
      <div className={`${removeDefaultStyle ? '' : style.wrapper} ${wrapperStyle ?? ''}`} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick ?? emptyFunc} />
    </>,
    modalsContainer!
  )
}
