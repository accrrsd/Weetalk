import { useForm } from 'react-hook-form'
import { loginManager } from '../../../utils/api'
import OrganizerLoginForm from './form'

export type TOrganizerLoginFormValues = {
  email: string
  password: string
}

export default function OrganizerLogin() {
  const formHook = useForm<TOrganizerLoginFormValues>({ mode: 'all' })
  const onSubmitWrapper = (data: TOrganizerLoginFormValues) => {
    const formDataContent = new FormData()
    formDataContent.set('username', data.email)
    formDataContent.set('password', data.password)
    loginManager(formDataContent)
  }
  return <OrganizerLoginForm {...{ formHook, onSubmitWrapper }} />
}
