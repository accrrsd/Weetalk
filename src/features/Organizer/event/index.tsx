import React, { Dispatch, SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import miniqr from '../../../images/Organizer/miniqr.svg'
import downloadImg from '../../../images/Organizer/download.svg'
import copyImg from '../../../images/Organizer/copy.svg'
import editImage from '../../../images/Organizer/pencil.svg'
import styles from './event.module.css'
import { RemoveModal } from '../RemoveModal'

interface IEvent {
  roomName: string
  beginingDate: string
  id: string
}

export const Event = ({ roomName, beginingDate, id }: IEvent) => {
  const [accTextState, setAccTextState] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [active, setActive] = useState(false)
  const copyText = `https://weetalk.online/#/users/${id}`

  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <div className={styles.event}>
        <div className={styles.header}>
          <h3 className={styles.title}>{roomName}</h3>
          <button
            className={styles.delete}
            onClick={() => setActive(true)}
          ></button>
        </div>
        <p className={styles.date}>
          {beginingDate ? beginingDate.split('-').join('.') : 'Дата не указана'}
        </p>
        <Link to={`/organizer/event/${id}`} className={styles.edit}>
          <img src={editImage} alt="Карандаш" />
          Редактировать
        </Link>
        <button
          className={
            accTextState ? styles.acc + ' ' + styles.accActive : styles.acc
          }
          onClick={() => {
            setIsOpened(!isOpened)
            accTextState ? setAccTextState(false) : setAccTextState(true)
          }}
        >
          {accTextState ? 'Скрыть QR код события' : 'Показать QR код события'}
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
                <img src={downloadImg} alt="Скачать" />
                Скачать баннер
              </li>
              <li className={styles.item} onClick={handleCopyClick}>
                <img src={copyImg} alt="Скопировать" />
                <input
                  type="text"
                  value={copyText}
                  readOnly
                  style={{ display: 'none' }}
                />
                {isCopied ? 'Скопировано!' : 'Скопировать URL'}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RemoveModal active={active} setActive={setActive} roomName={roomName} />
    </>
  )
}
