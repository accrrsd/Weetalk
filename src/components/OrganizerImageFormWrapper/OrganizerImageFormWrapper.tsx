import { ReactNode } from 'react'
import { ReactComponent as BackArrow } from '../../images/Organizer/backArrow.svg'
import style from './OrganizerImageFormWrapper.module.css'

type TBase = {
  children: ReactNode
  image: string
}

type TOrganizerImageFormWrapperBackButton = {
  backButton: true
  onBackClick: () => void
} & TBase

type TOrganizerImageFormWrapperWithoutBackButton = {
  backButton?: false
  onBackClick?: () => void
} & TBase

type TOrganizerImageFormWrapper = TOrganizerImageFormWrapperBackButton | TOrganizerImageFormWrapperWithoutBackButton

export const OrganizerImageFormWrapper = ({ children, onBackClick, backButton, image }: TOrganizerImageFormWrapper) => {
  return (
    <div className={style.page}>
      <div className={style.wrapper}>
        <div className={style.image} style={{ backgroundImage: `url(${image})` }} />
        <div className={style.container}>
          {backButton && (
            <span className={style.backButton} onClick={() => onBackClick()}>
              <BackArrow />
              Назад
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
