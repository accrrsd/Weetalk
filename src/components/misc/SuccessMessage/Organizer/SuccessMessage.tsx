import { ReactNode } from 'react'
import successIcon from '../../../../images/Organizer/successImage.svg'
import style from './SuccessMessage.module.css'

type TSuccessMessage = {
  children: ReactNode
  iconSrc?: string
  className?: string
  imgClassName?: string
} & React.AnchorHTMLAttributes<HTMLSpanElement>

export const SuccessMessage = ({ children, iconSrc, className, imgClassName, ...rest }: TSuccessMessage) => {
  return (
    <span className={className ?? style.text} {...rest}>
      <img src={iconSrc ?? successIcon} alt="" className={imgClassName ?? style.img} />
      {children}
    </span>
  )
}
