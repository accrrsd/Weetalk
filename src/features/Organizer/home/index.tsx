import React from 'react'
import { Sidebar } from '../../../components/sidebar'
import { Content } from './content'
import styles from './home.module.css'

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Content />
    </div>
  )
}
