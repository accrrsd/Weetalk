import React from 'react'
import styles from './advices.module.css'
import { TitleSmart } from '../../components/title-smart/title-smart'
function Index() {
  return (
    <div className={styles.advices}>
      <TitleSmart
        text="Советы"
        haveButton={false}
        textStyle={styles.heading}
        wrapperStyle={styles.headingWrapper}
      />
      <ul className={styles.list}>
        <li className={styles.element}>
          <h2 className={styles.elementTitle}>Шаг 1.</h2>
          <h3 className={styles.elementText}>
            Выбирай из списка гостей, с кем тебе интересно познакомиться.
          </h3>
          <p className={styles.elementTip}>
            👉 Дальше самое сложное — подойти и начать разговор.
          </p>
        </li>
        <li className={styles.element}>
          <h2 className={styles.elementTitle}>Шаг 2.</h2>
          <h3 className={styles.elementText}>Наберись смелости.</h3>
          <p className={styles.elementTip}>
            Помни — достаточно всего 20 секунд храбрости, чтобы быть
            победителем.
          </p>
        </li>
        <li className={styles.element}>
          <h2 className={styles.elementTitle}>Шаг 3.</h2>
          <h3 className={styles.elementText}>
            Поздоровайся с человеком по имени и представься сам.
          </h3>
          <p className={styles.elementTip}>
            «Сергей, привет! Меня зовут Денис и сейчас я развиваю стратам в
            edtech сегменте.»
          </p>
        </li>
        <li className={styles.element}>
          <h2 className={styles.elementTitle}>Шаг 4.</h2>
          <h3 className={styles.elementText}>
            Начинай разговор с общих рабочих или не рабочих вопросов.
          </h3>
          <p className={styles.elementTip}>
            «В визитке написано, что ты работаешь МТС. Как давно ты в команде?»
          </p>
        </li>
        <li className={styles.element}>
          <h2 className={styles.elementTitle}>Шаг 5.</h2>
          <h3 className={styles.elementText}>
            По завершению общению общения обменяйся контактами с собеседником и,
            если это уместно, обсуди дальнейшее взаимодействие.
          </h3>
          <p className={styles.elementTip}>
            «Рад познакомиться! Будет удобно, если я напишу тебе завтра и мы
            договоримся о следующей встрече или созвоне чтобы пообщаться
            подробнее?»
          </p>
        </li>
      </ul>
    </div>
  )
}

export default Index
