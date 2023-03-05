import React, { useState } from 'react'
import { Header } from '../../../features/Organizer/header'
import styles from './home.module.css'
import { Calendar } from '../../../features/Organizer/calendar'
import basicImage from '../../../images/Organizer/basic-img.svg'
import { useAppSelector } from '../../../hooks/storeHooks'
import { Event } from '../../../features/Organizer/event'
import { Oval } from 'react-loader-spinner'
import { IRoom } from '../../../utils/interfaces'

export const Home = () => {
  const { data, isLoading } = useAppSelector(state => state.managerReducer)
  return (
    <>
      {isLoading ? (
        <Oval
          height={60}
          width={60}
          color="#3A65FD"
          wrapperStyle={{}}
          wrapperClass={styles.loader}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d9d9f8"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        <>
          <Header
            headingType="Title"
            haveCredentials={true}
            title="Мои события"
          />
          <div className={styles.wrapper}>
            <div className={styles.events}>
              {data.rooms && data.rooms.length > 0 ? (
                data.rooms.map((el: IRoom) => <Event key={el.id} {...el} />)
              ) : (
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
              )}
            </div>
            <Calendar />
          </div>
        </>
      )}
    </>
  )
}
