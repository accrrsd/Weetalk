import React from 'react'
import { Sidebar } from '../sidebar'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
