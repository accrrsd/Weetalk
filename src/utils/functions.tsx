import { FieldErrorsImpl } from 'react-hook-form'

export const checkError = (name: string, errors: FieldErrorsImpl) => (errors && errors[name] ? (errors[name]!.message as string) : false)
