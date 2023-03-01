import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { OrganizerImageFormWrapper } from '../../../components/OrganizerImageFormWrapper/OrganizerImageFormWrapper'
import getMailImage from '../../../images/Organizer/getMail.svg'
import mainImage from '../../../images/Organizer/OrganizerLogin.svg'
import { registrationOrganizer } from '../../../utils/api'
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

    const { fullName, email, password } = data

    //! Временно
    // const formDataContent = new FormData()

    // formDataContent.set('firstName', data.fullName)
    // formDataContent.set('email', data.email)
    // formDataContent.set('password', data.password)

    const newData = {
      firstName: fullName,
      lastName: fullName,
      email,
      password,
    }

    registrationOrganizer(newData).then(() => {
      navigate('/organizer/login')
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
