import { useForm } from 'react-hook-form'
import OrganizerSettingsForm from './form'

export type TOrganizerSettingsFormValues = {
  fullName: string
  email: string
  telegram: string
}

export default function OrganizerSettings() {
  const settingFormHook = useForm<TOrganizerSettingsFormValues>({ mode: 'all' })
  const onSubmitWrapper = () => {}
  return <OrganizerSettingsForm formHook={settingFormHook} onSubmitWrapper={onSubmitWrapper} />
}
