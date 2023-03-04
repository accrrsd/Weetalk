import { useEffect } from 'react'
import { SuccessMessage } from '../../../../components/misc/SuccessMessage/Organizer/SuccessMessage'
import style from './success.module.css'

const OrganizerForgotPassSuccess = ({ redirectFunc, delay = 2000 }: { redirectFunc: () => void; delay?: number }) => {
  useEffect(() => {
    setTimeout(redirectFunc, delay)
  }, [redirectFunc, delay])

  return (
    <div className={style.wrapper}>
      <SuccessMessage>Email подтвержден!</SuccessMessage>
    </div>
  )
}

export default OrganizerForgotPassSuccess
