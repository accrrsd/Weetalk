import React, { useEffect } from 'react'
import { Sidebar } from '../sidebar'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'
import { useAppDispatch } from '../../../hooks/storeHooks'
import { fetchManager } from '../../../store/reducers/Organizer/ActionCreators'

export const Layout = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchManager())
  }, [])

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
