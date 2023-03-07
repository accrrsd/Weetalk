import React, { SetStateAction, useState } from 'react'
import { Header } from '../../../features/Organizer/header'
import styles from './addEvent.module.css'
import { Calendar } from '../../../features/Organizer/calendar'
import InputMask from 'react-input-mask'

export const AddEvent = () => {
  const [date, setDate] = useState<string>('12-12-0000')
  console.log(date)
  return (
    <>
      <Header headingType={'Button'} haveCredentials={true} title={'Назад'} />
      <h1 className={styles.title}>Создать событие</h1>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.formWrapper}>
            <div className={styles.inputWrapper}>
              <h2 className={styles.subtitle}>Название события</h2>
              <input
                className={styles.input}
                type="text"
                placeholder="Введите название события"
              />
            </div>
            <div className={styles.inputWrapper}>
              <h2 className={styles.subtitle}>Дата события</h2>
              <input
                value={date}
                className={styles.input}
                max="2030-12-31"
                type="date"
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>
        </form>
        <Calendar
          setSelectedDate={setDate}
          selectedDate={date}
          isCreatePage={true}
        />
      </div>
    </>
  )
}
