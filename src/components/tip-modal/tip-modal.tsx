import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { TTipPopupOffset } from '../../utils/types'
import ModalOverlay from '../modal-overlay/modal-overlay'
import style from './tip-modal.module.css'

const modalsContainer = document.querySelector('#modals')

export const TipModal = ({ message, onClick, offset }: { message: string; onClick: () => void; offset: TTipPopupOffset }) => {
  const [size, setSize] = useState<number>(0)
  const [needMoveUp, setNeedMoveUp] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      setSize(ref.current.offsetHeight)
      setNeedMoveUp(offset.top < size + ref.current!.offsetTop)
    }
  }, [ref, offset.top, size])

  return createPortal(
    <>
      <div ref={ref} className={style.wrapper} style={{ top: needMoveUp ? offset.top - size - 20 : offset.top }}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          <span className={style.message}>{message}</span>
          <div className={style.tongue} style={{ left: offset.left - 10 }}></div>
        </div>
      </div>
      <ModalOverlay onClick={onClick} />
    </>,
    modalsContainer!
  )
}
