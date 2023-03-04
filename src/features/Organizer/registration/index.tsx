import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerImageFormWrapper } from '../../../components/OrganizerImageFormWrapper/OrganizerImageFormWrapper'
import getMailImage from '../../../images/Organizer/getMail.svg'
import mainImage from '../../../images/Organizer/OrganizerLogin.svg'
import { OrganizerRegistrationConfirmEmail } from './confirmEmail'
import OrganizerRegistrationForm from './form'
import OrganizerRegistrationSuccess from './success'

export type TOrganizerRegistrationFormValues = {
  fullName: string
  email: string
  password: string
  confirm: any
}

export type TOrganizerRegistrationConfirmEmailChange = {
  email: string
}

export type TOtpInputCode = {
  code: string
}

export default function OrganizerRegistration() {
  const [stage, setStage] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const registrationFormHook = useForm<TOrganizerRegistrationFormValues>({ mode: 'all' })
  const codeFormHook = useForm<TOtpInputCode>({ mode: 'all' })
  const emailChangeFormHook = useForm<TOrganizerRegistrationConfirmEmailChange>({ mode: 'all' })

  const { setValue: setRegistrationValue } = registrationFormHook

  const onBackClickStage1 = () => navigate(-1)
  const onBackClickStage2 = () => setStage(1)

  const onSubmitStage1 = (data: TOrganizerRegistrationFormValues) => {
    setEmail(data.email)
    setStage(2)
  }

  const onEmailChangedStage2 = (data: TOrganizerRegistrationConfirmEmailChange) => {
    setEmail(data.email)
  }

  const onCodeSubmitted = (data: TOtpInputCode) => {}

  const onRegistrationSuccess = () => {
    navigate('/organizer/')
  }

  useEffect(() => {
    setRegistrationValue('email', email)
  }, [email, setRegistrationValue])

  switch (stage) {
    case 3:
      return (
        <OrganizerImageFormWrapper image={getMailImage}>
          <OrganizerRegistrationSuccess redirectFunc={onRegistrationSuccess} />
        </OrganizerImageFormWrapper>
      )
    case 2:
      return (
        <OrganizerImageFormWrapper image={getMailImage} backButton onBackClick={onBackClickStage2}>
          <OrganizerRegistrationConfirmEmail
            email={email}
            onEmailChanged={onEmailChangedStage2}
            onCodeSubmitted={onCodeSubmitted}
            emailFormHook={emailChangeFormHook}
            codeFormHook={codeFormHook}
          />
        </OrganizerImageFormWrapper>
      )

    default:
      return (
        <OrganizerImageFormWrapper image={mainImage} backButton onBackClick={onBackClickStage1}>
          <OrganizerRegistrationForm formHook={registrationFormHook} onSubmitWrapper={onSubmitStage1} />
        </OrganizerImageFormWrapper>
      )
  }
}

// const onSubmitWrapper = (data: TOrganizerRegistrationFormValues) => {
//   setEmail(data.email)
//   const { fullName, email, password } = data

//   const newData = {
//     firstName: fullName,
//     lastName: fullName,
//     email,
//     password,
//   }

//   registrationOrganizer(newData).then(() => {
//     navigate('/organizer/login')
//   })
// }
