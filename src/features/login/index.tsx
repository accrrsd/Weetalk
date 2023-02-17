import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RegistrationForm } from './form'

import { postUser } from '../../utils/api'
import { createUserFormData } from '../../utils/functions'
import { TFormValues } from '../../utils/types'
import { useAppSelector } from '../../hooks/storeHooks'

export default function RegistrationContainer({ authorizedFunc }: { authorizedFunc: (elem: boolean) => void }) {
  const formHook = useForm<TFormValues>({ mode: 'all' })
  const [loader, setLoader] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null)
  const roomId = useAppSelector((state) => state.roomReducer.room)

  const onSubmit = (data: TFormValues) =>
    postUser(createUserFormData(data), roomId!).then((id) => {
      console.log(id)
      localStorage.setItem('ownerId', id)
      localStorage.setItem('userData', '1234')
      authorizedFunc(true)
      return id
    })

  const onSubmitWrapper: SubmitHandler<TFormValues> = (data) => {
    setLoader(true)
    if (!roomId) return setSubmitSuccess(false)
    onSubmit(data)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitSuccess(false))
      .finally(() => setLoader(false))
  }
  return <RegistrationForm {...{ loader, submitSuccess, formHook, onSubmitWrapper }} />
}
