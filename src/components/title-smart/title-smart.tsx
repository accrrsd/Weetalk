import style from './title-smart.module.css'

type TTitleSmart = {
  text?: string
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
      {text && <h2 className={`${style.title} ${textStyle}`}>{text}</h2>}
      {haveButton && (
        <button onClick={onButtonClick} className={`${style.button} ${buttonStyle}`}>
          {buttonText}
        </button>
      )}
    </div>
  )
}
