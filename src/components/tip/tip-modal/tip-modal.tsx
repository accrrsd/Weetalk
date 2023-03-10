import style from './tip-modal.module.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { TTipPopupOffset } from '../../../utils/types'
import ModalOverlay from '../../modals/modal-overlay/modal-overlay'

const modalsContainer = document.querySelector('#modals')

type TTipModal = {
  message: string
  onClick: () => void
  offset: TTipPopupOffset
  tongue?: 'toTop' | 'toBottom'
  overlayAdditionStyle?: string
}

export const TipModal = ({ message, onClick, offset, tongue = 'toBottom', overlayAdditionStyle }: TTipModal) => {
  const [size, setSize] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.offsetHeight)
    }
  }, [ref, offset, size])

  return createPortal(
    <>
      <div ref={ref} className={style.wrapper} style={tongue === 'toTop' ? { top: offset.top - size - 20 } : { top: offset.top + 20 }}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          <span className={style.message}>{message}</span>
          <div className={`${style.tongue} ${tongue === 'toTop' ? style.tongueDown : style.tongueUp}`} style={{ left: offset.left }}></div>
        </div>
      </div>
      <ModalOverlay onClick={onClick} additionStyle={overlayAdditionStyle} />
    </>,
    modalsContainer!
  )
}
