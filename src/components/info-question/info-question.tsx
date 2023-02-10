import style from './info-question.module.css'
import { ReactNode } from 'react'
import { Tip } from '../tip/tip'
import { TTip } from '../../utils/types'

type TQuestion = {
  question: string
  tip?: TTip
  children?: ReactNode
  questionClassName?: string
  wrapperClassName?: string
}

export const InfoQuestion = ({ question, tip, children, wrapperClassName, questionClassName }: TQuestion) => {
  return (
    <div className={wrapperClassName ?? style.wrapper}>
      <span className={questionClassName ?? style.question}>
        {question}
        {tip && <Tip {...tip} />}
      </span>
      {children}
    </div>
  )
}
