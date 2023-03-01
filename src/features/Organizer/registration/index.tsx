import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerImageFormWrapper } from '../../../components/OrganizerImageFormWrapper/OrganizerImageFormWrapper'
import getMailImage from '../../../images/Organizer/getMail.svg'
import mainImage from '../../../images/Organizer/OrganizerLogin.svg'
import { registrationManager } from '../../../utils/api'
import { OrganizerRegistrationConfirmEmail } from './confirmEmail'
import OrganizerRegistrationForm from './form'

export type TOrganizerRegistrationFormValues = {
  fullName: string
  email: string
  password: string
  confirm: any
}

export default function OrganizerRegistration() {
  const [stage, setStage] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const formHook = useForm<TOrganizerRegistrationFormValues>({ mode: 'all' })
  const { setValue } = formHook

  const onBackClick = () => navigate(-1)
  const onBackClickStage2 = () => setStage(1)
  const onSubmitWrapper = (data: TOrganizerRegistrationFormValues) => {
    setEmail(data.email)

    //! Временно
    const formDataContent = new FormData()

    const firstName = data.fullName.split(' ')[0]
    const lastName = data.fullName.split(' ')[1]

    formDataContent.set('firstName', firstName)
    formDataContent.set('lastName', lastName)
    formDataContent.set('username', data.email)
    formDataContent.set('password', data.password)

    registrationManager(formDataContent).then(() => {
      navigate('/organizer/')
    })
  }

  useEffect(() => {
    setValue('email', email)
  }, [email, setValue])

  switch (stage) {
    case 2:
      return (
        <OrganizerImageFormWrapper image={getMailImage} backButton onBackClick={onBackClickStage2}>
          <OrganizerRegistrationConfirmEmail email={email} onEmailChanged={(data) => setEmail(data.email)} />
        </OrganizerImageFormWrapper>
      )

    default:
      return (
        <OrganizerImageFormWrapper image={mainImage} backButton onBackClick={onBackClick}>
          <OrganizerRegistrationForm {...{ formHook, onSubmitWrapper }} />
        </OrganizerImageFormWrapper>
      )
  }
}
