import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerImageFormWrapper } from '../../../components/OrganizerImageFormWrapper/OrganizerImageFormWrapper'
import { OrganizerForgotPassCheckEmail } from './checkEmail'
import OrganizerForgotPassForm from './form'

import forgotImage from '../../../images/Organizer/forgotImage.svg'
import OrganizerForgotPassNew from './newPass'
import OrganizerForgotPassSuccess from './success'

export type TOrganizerForgotPassFormValues = {
  email: string
}
export type TOrganizerNewPassValues = {
  password: string
}

export default function OrganizerForgotPass() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1)
  const [email, setEmail] = useState('')
  const forgotPassFormHook = useForm<TOrganizerForgotPassFormValues>({ mode: 'all' })
  const newPassFormHook = useForm<TOrganizerNewPassValues>({ mode: 'all' })

  const backToLogin = () => navigate('/organizer/login')
  const backToFirst = () => setStage(1)

  const onSubmitStage1 = (data: TOrganizerForgotPassFormValues) => {
    setStage(2)
    setEmail(data.email)
  }

  const onNewPassSubmit = (data: TOrganizerNewPassValues) => {
    setStage(4)
  }

  // todo Получаем какой-то код через url и сразу перекидываем чела на stage 3

  switch (stage) {
    case 4:
      return (
        <OrganizerImageFormWrapper image={forgotImage}>
          <OrganizerForgotPassSuccess redirectFunc={backToLogin} />
        </OrganizerImageFormWrapper>
      )

    case 3:
      return (
        <OrganizerImageFormWrapper image={forgotImage} backButton onBackClick={backToLogin}>
          <OrganizerForgotPassNew formHook={newPassFormHook} onSubmitWrapper={onNewPassSubmit} />
        </OrganizerImageFormWrapper>
      )

    case 2:
      return (
        <OrganizerImageFormWrapper onBackClick={backToFirst} image={forgotImage} backButton>
          <OrganizerForgotPassCheckEmail {...{ email }} onAgainClick={backToFirst} />
        </OrganizerImageFormWrapper>
      )

    default:
      return (
        <OrganizerImageFormWrapper onBackClick={backToLogin} image={forgotImage} backButton>
          <OrganizerForgotPassForm formHook={forgotPassFormHook} emailProp={email} onSubmitWrapper={onSubmitStage1} />
        </OrganizerImageFormWrapper>
      )
  }
}
