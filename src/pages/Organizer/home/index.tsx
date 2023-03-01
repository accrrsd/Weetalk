import React from 'react'
import { Header } from '../../../features/Organizer/header'
import styles from './home.module.css'
import { Calendar } from '../../../features/Organizer/calendar'
import basicImage from '../../../images/Organizer/basic-img.svg'
import { useAppSelector } from '../../../hooks/storeHooks'

export const Home = () => {
  const { data } = useAppSelector(state => state.managerReducer)
  return (
    <>
      <Header headingType="Title" haveCredentials={true} title="Мои события" />
      <div className={styles.wrapper}>
        <div className={styles.events}>
          <div className={styles.basic}>
            <div className={styles.basicText}>
              <h3 className={styles.basicTitle}>
                Доброе утро, {data.firstName}!
              </h3>
              <p className={styles.basicSubtitle}>
                У вас пока нет событий на этой неделе
              </p>
              <button className={styles.basicButton}>Создать</button>
            </div>
            <img src={basicImage} alt="Фото" />
          </div>
        </div>
        <Calendar />
      </div>
    </>
  )
}
