import style from './title-smart.module.css'

type TTitleSmart = {
  text: string
  textStyle?: string
  wrapperStyle?: string
  haveButton?: boolean
  buttonStyle?: string
  buttonText?: string
  onButtonClick?: () => any | void
}

export const TitleSmart = ({ text, textStyle, wrapperStyle, haveButton = true, buttonStyle, buttonText, onButtonClick }: TTitleSmart) => {
  return (
    <div className={`${style.wrapper} ${wrapperStyle}`}>
      <h1 className={`${style.title} ${textStyle}`}>{text}</h1>
      {haveButton && (
        <button onClick={onButtonClick} className={`${style.button} ${buttonStyle}`}>
          {buttonText}
        </button>
      )}
    </div>
  )
}
