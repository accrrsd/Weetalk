import { useState } from 'react'
import { Link } from 'react-router-dom'
import miniqr from '../../../images/Organizer/miniqr.svg'
import editImage from '../../../images/Organizer/pencil.svg'
import styles from './event.module.css'

// @ts-ignore
export const Event = ({ roomName, beginingDate, id }) => {
  const [accText, setAccText] = useState('Скрыть QR код события')
  const [isOpened, setIsOpened] = useState(false)
  return (
    <div className={styles.event}>
      <div className={styles.header}>
        <h3 className={styles.title}>{roomName}</h3>
        <button className={styles.delete}></button>
      </div>
      <p className={styles.date}>{beginingDate ? beginingDate.split('-').join('.') : 'Дата не указана'}</p>
      <Link to={`/organizer/editEvent/${id}`} className={styles.edit}>
        <img src={editImage} alt="Карандаш" />
        Редактировать
      </Link>
      <button
        className={styles.acc}
        onClick={() => {
          setIsOpened(!isOpened)
        }}
      >
        {accText}
      </button>
      <div className={isOpened ? styles.content : styles.contentHidden}>
        <div className={styles.divider}></div>
        <div className={styles.menu}>
          <div className={styles.qr}></div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <img src={miniqr} alt="QR-Код" />
              Скачать код
            </li>
            <li className={styles.item}>
              <img src={miniqr} alt="QR-Код" />
              Скачать баннер
            </li>
            <li className={styles.item}>
              <img src={miniqr} alt="QR-Код" />
              Скопировать URL
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
