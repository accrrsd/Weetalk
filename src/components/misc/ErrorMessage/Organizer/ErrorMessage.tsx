import style from './ErrorMessage.module.css'

type TErrorMessage = {
  code?: string
  wrapperClassName?: string
  additionWrapperClassName?: string
  hypertextClassName?: string
  textClassName?: string
}

export const ErrorMessage = ({ code, wrapperClassName, additionWrapperClassName, hypertextClassName, textClassName }: TErrorMessage) => {
  const switchFunc = () => {
    switch (code) {
      case '500':
        return (
          <>
            <span className={hypertextClassName ?? style.hypertext}>Упс...</span>{' '}
            <span className={textClassName ?? style.text}>что-то пошло не так</span>
          </>
        )
      default:
        return (
          <>
            <span className={hypertextClassName ?? style.hypertext}>Упс...</span>{' '}
            <span className={textClassName ?? style.text}>что-то пошло не так</span>
          </>
        )
    }
  }
  return code ? <span className={`${wrapperClassName ?? style.error} ${additionWrapperClassName ?? ''}`}>{switchFunc()}</span> : null
}
