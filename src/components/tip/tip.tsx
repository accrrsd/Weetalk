import style from './tip.module.css'
import { ReactComponent as TipIcon } from '../../images/tip.svg'
import { useState } from 'react'
import { TipModal } from '../tip-modal/tip-modal'
import { TTipPopupOffset } from '../../utils/types'
export const Tip = ({
  text,
  color,
  additionStyle,
  modalDirection = 'up',
}: {
  text: string
  additionStyle?: string
  color?: string
  modalDirection?: 'up' | 'down'
}) => {
  const [popupOffset, setPopupOffset] = useState<null | TTipPopupOffset>(null)
  const tongueDirection = modalDirection === 'down' ? 'top' : 'bottom'
  return (
    <>
      <div className={style.wrapper} onClick={(e) => setPopupOffset({ top: e.pageY, left: e.pageX })}>
        <TipIcon className={`${style.tip} ${additionStyle || ''}`} style={{ color }} />
      </div>
      {popupOffset && <TipModal message={text} onClick={() => setPopupOffset(null)} offset={popupOffset} tongue={tongueDirection} />}
    </>
  )
}
