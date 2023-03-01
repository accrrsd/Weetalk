import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerImageFormWrapper } from '../../../components/OrganizerImageFormWrapper/OrganizerImageFormWrapper'
import { OrganizerForgotPassCheckEmail } from './checkEmail'
import OrganizerForgotPassForm from './form'

import forgotImage from '../../../images/Organizer/forgotImage.svg'

export type TOrganizerForgotPassFormValues = {
  email: string
}

export default function OrganizerForgotPass() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const formHook = useForm<TOrganizerForgotPassFormValues>({ mode: 'all' })

  const backToLogin = () => navigate('/organizer/login')

  const onSubmitStageOne = (data: TOrganizerForgotPassFormValues) => {
    setStage(2)
    setEmail(data.email)
  }

  const backToFirst = () => setStage(1)

  switch (stage) {
    case 2:
      return (
        <OrganizerImageFormWrapper onBackClick={backToFirst} image={forgotImage} backButton>
          <OrganizerForgotPassCheckEmail {...{ email }} onAgainClick={backToFirst} />
        </OrganizerImageFormWrapper>
      )

    default:
      return (
        <OrganizerImageFormWrapper onBackClick={backToLogin} image={forgotImage} backButton>
          <OrganizerForgotPassForm {...{ formHook }} emailProp={email} onSubmitWrapper={onSubmitStageOne} />
        </OrganizerImageFormWrapper>
      )
  }
}
