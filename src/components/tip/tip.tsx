import style from './tip.module.css'
import { ReactComponent as TipIcon } from '../../images/tip.svg'
import { useState } from 'react'
import { TipModal } from '../tip-modal/tip-modal'
import { TTipPopupOffset } from '../../utils/types'
export const Tip = ({ text, color, tail, additionStyle }: { text: string; additionStyle?: string; color?: string; tail?: boolean }) => {
  const [popupOffset, setPopupOffset] = useState<null | TTipPopupOffset>(null)
  return (
    <>
      <div className={style.wrapper} onClick={(e) => setPopupOffset({ top: e.clientY, left: e.clientX })}>
        <TipIcon className={`${style.tip} ${additionStyle || ''}`} style={{ color }} />
      </div>
      {popupOffset && <TipModal message={text} onClick={() => setPopupOffset(null)} offset={popupOffset} />}
    </>
  )
}
