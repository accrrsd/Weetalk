import React from 'react'
import styles from './header.module.css'
import { useNavigate } from 'react-router-dom'
import backBtn from '../../../images/Organizer/back-btn.svg'
import { useAppSelector } from '../../../hooks/storeHooks'

interface IHeader {
  headingType: 'Title' | 'Button'
  haveCredentials: boolean
  title: string
}

export const Header = ({ headingType, haveCredentials, title }: IHeader) => {
  const navigate = useNavigate()
  const { data, error } = useAppSelector(state => state.managerReducer)
  console.log(error)
  return (
    <div className={styles.wrapper}>
      {headingType === 'Title' && <h1 className={styles.title}>{title}</h1>}
      {headingType === 'Button' && (
        <button className={styles.button} onClick={() => navigate(-1)}>
          <img src={backBtn} alt="Назад" />
          Назад
        </button>
      )}
      {haveCredentials && (
        <div className={styles.info}>
          <div className={styles.data}>
            <h2 className={styles.name}>
              {data.firstName && data.lastName
                ? data.firstName + ' ' + data.lastName
                : error}
            </h2>
            <p className={styles.email}>{error ? error : data.email}</p>
          </div>
          <img className={styles.image} src={'test'} alt="Фото" />
        </div>
      )}
    </div>
  )
}
