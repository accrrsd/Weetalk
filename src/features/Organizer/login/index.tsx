import { useForm } from 'react-hook-form'
import ManagerLoginForm, { TManagerLoginFormValues } from './form'

export default function ManagerLogin() {
  const formHook = useForm<TManagerLoginFormValues>()
  const onSubmitWrapper = () => {}
  return <ManagerLoginForm {...{ formHook, onSubmitWrapper }} />
}
