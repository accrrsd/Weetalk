import style from './tip.module.css'
import { useState } from 'react'

import { ReactComponent as TipIcon } from '../../images/tip.svg'
import { TipModal } from './tip-modal/tip-modal'
import { TTipPopupOffset } from '../../utils/types'

type TTip = {
  text: string
  additionStyle?: string
  color?: string
  tongue?: 'top' | 'bottom'
}

export const Tip = ({ text, color, additionStyle, tongue = 'top' }: TTip) => {
  const [popupOffset, setPopupOffset] = useState<null | TTipPopupOffset>(null)
  return (
    <>
      <div className={style.wrapper} onClick={(e) => setPopupOffset({ top: e.pageY, left: e.pageX - 10 })}>
        <TipIcon className={`${style.tip} ${additionStyle ?? ''}`} style={{ color }} />
      </div>
      {popupOffset && <TipModal message={text} onClick={() => setPopupOffset(null)} offset={popupOffset} tongue={tongue} />}
    </>
  )
}
