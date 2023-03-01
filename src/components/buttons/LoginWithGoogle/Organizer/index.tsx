import { ReactComponent as GoogleLogo } from '../../../../images/Organizer/googleLogin.svg'
import { SubmitButton } from '../../SubmitButton/SubmitButton'
import style from './LoginWithGoogle.module.css'

export const LoginWithGoogle = ({ disabled }: { disabled?: boolean }) => {
  return (
    <SubmitButton submit={false} disabled={disabled} wrapperStyle={style.loginWithGoogle} disabledWrapperStyle={style.loginWithGoogleDisabled}>
      Войти через
      <GoogleLogo />
      Google
    </SubmitButton>
  )
}
