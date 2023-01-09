import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TTipPopupOffset } from '../../utils/types'
import ModalOverlay from '../modal-overlay/modal-overlay'
import style from './tip-modal.module.css'

const modalsContainer = document.querySelector('#modals')

export const TipModal = ({
  message,
  onClick,
  offset,
  tongue = 'bottom',
  overlayAdditionStyle,
}: {
  message: string
  onClick: () => void
  offset: TTipPopupOffset
  tongue?: 'top' | 'bottom'
  overlayAdditionStyle?: string
}) => {
  const [size, setSize] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.offsetHeight)
    }
  }, [ref, offset, size])

  return createPortal(
    <>
      <div ref={ref} className={style.wrapper} style={tongue === 'bottom' ? { top: offset.top - size - 20 } : { top: offset.top + 20 }}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          <span className={style.message}>{message}</span>
          <div className={`${style.tongue} ${tongue === 'bottom' ? style.tongueDown : style.tongueUp}`} style={{ left: offset.left }}></div>
        </div>
      </div>
      <ModalOverlay onClick={onClick} additionStyle={overlayAdditionStyle} />
    </>,
    modalsContainer!
  )
}
