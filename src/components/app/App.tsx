import style from './App.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ProtectedRoutes } from '../protected-routes/protected-routes'

import Login from '../../pages/login'
import { RouteMenu } from '../route-menu/route-menu'
import Profile from '../../pages/Profile'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)

  useEffect(() => {
    // Получаем из localStorage статус авторизации
    setUserAuthorized(!!localStorage.getItem('userData'))
  }, [])

  return (
    <div className={style.page}>
      <Routes>
        <Route element={<ProtectedRoutes needAuthorized={true} auth={userAuthorized} />}>
          {/* Изначальный экран - экран гостей */}
          <Route path="/" />
          {/* <Route path="/guests" /> */}
          <Route path="/favorite" />
          <Route path="/recommendations" />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoutes needAuthorized={false} auth={userAuthorized} />}>
          <Route path="/login" element={<Login authorizedFunc={setUserAuthorized} />} />
        </Route>
      </Routes>
      {userAuthorized && <RouteMenu />}
    </div>
  )
}
