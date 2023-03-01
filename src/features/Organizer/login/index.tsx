import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginOrganizer } from '../../../utils/api'
import OrganizerLoginForm from './form'

export type TOrganizerLoginFormValues = {
  email: string
  password: string
}

export default function OrganizerLogin() {
  const formHook = useForm<TOrganizerLoginFormValues>({ mode: 'all' })
  const navigate = useNavigate()
  const onSubmitWrapper = (data: TOrganizerLoginFormValues) => {
    const formDataContent = new FormData()
    formDataContent.set('username', data.email)
    formDataContent.set('password', data.password)
    loginOrganizer(formDataContent).then(() => {
      navigate('/organizer/')
    })
  }
  return <OrganizerLoginForm {...{ formHook, onSubmitWrapper }} />
}
