import { useForm } from 'react-hook-form'
import OrganizerLoginForm, { TOrganizerLoginFormValues } from './form'

export default function OrganizerLogin() {
  const formHook = useForm<TOrganizerLoginFormValues>({ mode: 'all' })
  const onSubmitWrapper = () => {}
  return <OrganizerLoginForm {...{ formHook, onSubmitWrapper }} />
}
