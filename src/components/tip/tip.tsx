import style from './tip.module.css'
import { useState } from 'react'

import { ReactComponent as TipIcon } from '../../images/Application/tip.svg'
import { TipModal } from './tip-modal/tip-modal'
import { TTip, TTipPopupOffset } from '../../utils/types'

export const Tip = ({ text, color, additionStyle, tongue = 'toBottom' }: TTip) => {
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
