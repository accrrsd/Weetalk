import React from 'react'
import styles from './sidebar.module.css'
import logo from '../../../images/Organizer/logo.svg'
import { NavLink, useLocation } from 'react-router-dom'
import homeImageActive from '../../../images/Organizer/sidebar-1-color.svg'
import homeImage from '../../../images/Organizer/sidebar-1-gray.svg'
import settingsImageActive from '../../../images/Organizer/sidebar-2-color.svg'
import settingsImage from '../../../images/Organizer/sidebar-2-gray.svg'
import exitImage from '../../../images/Organizer/exit-btn.svg'

export const Sidebar = () => {
  const pathname = useLocation().pathname
  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="Лого" />
      <button className={styles.buttonCreate}>Создать событие</button>
      <ul className={styles.menu}>
        <li className={styles.item}>
          {pathname === '/organizer/' && (
            <div className={styles.indicator}></div>
          )}
          <NavLink
            className={styles.link}
            to={'/organizer/'}
            style={({ isActive }) => ({
              color: isActive ? '#1D1A4D' : '#747386',
            })}
          >
            {pathname === '/organizer/' ? (
              <img src={homeImageActive} alt="Домашняя страница" />
            ) : (
              <img src={homeImage} alt="Домашняя страница" />
            )}
            <p className={styles.text}>Мои события</p>
          </NavLink>
        </li>
        <li className={styles.item}>
          {pathname === '/organizer/settings' && (
            <div className={styles.indicator}></div>
          )}
          <NavLink
            className={styles.link}
            to={'/organizer/settings'}
            style={({ isActive }) => ({
              color: isActive ? '#1D1A4D' : '#747386',
            })}
          >
            {pathname === '/organizer/settings' ? (
              <img src={settingsImageActive} alt="Настройки" />
            ) : (
              <img src={settingsImage} alt="Настройки" />
            )}
            <p className={styles.text}>Настройки</p>
          </NavLink>
        </li>
      </ul>
      <NavLink to="/organizer/login" className={styles.buttonExit}>
        <img src={exitImage} alt="Выход" />
        <div className={styles.buttonExitText}>Выйти</div>
      </NavLink>
    </div>
  )
}
