import style from './App.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { ProtectedRoutes } from '../protected-routes/protected-routes'

import Login from '../../pages/login'
import { RouteMenu } from '../route-menu/route-menu'
import Profile from '../../pages/Profile'
import Main from '../../pages/main'
import Welcome from '../../pages/welcome'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Получаем из localStorage статус авторизации
    setUserAuthorized(!!localStorage.getItem('userData'))
  }, [])

  return (
    <div className={style.page}>
      <Routes>
        <Route element={<ProtectedRoutes needAuthorized={false} auth={userAuthorized} />}>
          <Route path="/login" element={<Login authorizedFunc={setUserAuthorized} />} />
        </Route>
        <Route element={<ProtectedRoutes needAuthorized={true} auth={userAuthorized} />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/guests" element={<Main />} />
          <Route path="/favorite" />
          <Route path="/recommendations" />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {userAuthorized && location.pathname !== '/' && <RouteMenu />}
    </div>
  )
}
