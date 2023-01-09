import style from './App.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'

import { ProtectedRoutes } from '../protected-routes/protected-routes'

import Login from '../../pages/login'
import { RouteMenu } from '../route-menu/route-menu'
import Profile from '../../pages/Profile'
import Main from '../../pages/main'
import Welcome from '../../pages/welcome'
import Advices from '../../pages/advices'
import Favorites from '../../pages/favorites'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)
  const [welcomeDone, setWelcomeDone] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Получаем из localStorage статус авторизации
    setUserAuthorized(!!localStorage.getItem('userData'))
    setWelcomeDone(!!localStorage.getItem('welcomeState'))
  }, [])

  return (
    <div className={style.page}>
      <Routes>
        <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/" />}>
          <Route path="/login" element={<Login authorizedFunc={setUserAuthorized} />} />
        </Route>

        <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/login" />}>
          <Route element={<ProtectedRoutes needCondition={false} condition={welcomeDone} redirect="/guests" />}>
            <Route path="/" element={<Welcome />} />
          </Route>
          <Route path="/guests" element={<Main />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/recommendations" element={<Advices />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {userAuthorized && location.pathname !== '/' && <RouteMenu />}
    </div>
  )
}
