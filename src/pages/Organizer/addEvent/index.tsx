import React, { SetStateAction, useState } from 'react'
import { Header } from '../../../features/Organizer/header'
import styles from './addEvent.module.css'
import { Calendar } from '../../../features/Organizer/calendar'
import { useNavigate } from 'react-router-dom'
import { createRoom } from '../../../utils/api'

export const AddEvent = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState<string>('12-12-0000')
  const [roomName, setRoomName] = useState<string>('')
  console.log(date)
  const formDataContent = new FormData()
  formDataContent.set('beginingDate', date /*.split('-').reverse().join('-')*/)
  formDataContent.set('roomName', roomName)
  return (
    <>
      <Header headingType={'Button'} haveCredentials={true} title={'Назад'} />
      <h1 className={styles.title}>Создать событие</h1>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault()
            createRoom(formDataContent).then(r => console.log(r))
          }}
        >
          <div className={styles.formWrapper}>
            <div className={styles.inputWrapper}>
              <h2 className={styles.subtitle}>Название события</h2>
              <input
                value={roomName}
                className={styles.input}
                type="text"
                placeholder="Введите название события"
                onChange={e => setRoomName(e.target.value)}
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
          <div className={styles.buttonWrapper}>
            <button className={styles.button} onClick={() => navigate(-1)}>
              Отмена
            </button>
            <button className={styles.submitButton} type="submit">
              Создать
            </button>
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
