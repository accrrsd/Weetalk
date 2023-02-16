import style from './App.module.css'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { ProtectedRoutes } from '../protected-routes/protected-routes'

import Login from '../../pages/login'
import { RouteMenu } from '../route-menu/route-menu'
import Profile from '../../pages/profile'
import Guests from '../../pages/guests'
import Welcome from '../../pages/welcome'
import Advices from '../../pages/advices'
import Favorites from '../../pages/favorites'
import UserPage from '../../pages/userPage'
import CheckRoom from '../../pages/checkRoom'
import { useAppSelector } from '../../hooks/storeHooks'

export default function App() {
  const [userAuthorized, setUserAuthorized] = useState(false)
  const [welcomeDone, setWelcomeDone] = useState(false)
  const location = useLocation()

  const userDataLocalStorage = !!localStorage.getItem('userData')
  const welcomeStateLocalStorage = !!localStorage.getItem('welcomeState')

  // todo используется для проверки комнаты
  const roomId = useAppSelector((state) => state.roomReducer.room)

  useEffect(() => {
    // Получаем из localStorage всякие статусы
    setUserAuthorized(userDataLocalStorage)
    setWelcomeDone(welcomeStateLocalStorage)
  }, [userDataLocalStorage, welcomeStateLocalStorage])

  // todo Необходимо добавить защиту (перенаправление в случае если комната указана не корректно) И (перенаправление куда-то если не удается получить комнату)

  return (
    <div className={style.page}>
      <Routes>
        <Route path="/room/:roomId" element={<CheckRoom />}></Route>
        <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/" />}>
          <Route path="/login" element={<Login authorizedFunc={setUserAuthorized} />} />
        </Route>
        <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/login" />}>
          <Route element={<ProtectedRoutes needCondition={false} condition={welcomeDone} redirect="/guests" />}>
            <Route path="/" element={<Welcome />} />
          </Route>
          <Route path="/guests" element={<Guests />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/advices" element={<Advices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Route>
      </Routes>
      {userAuthorized && location.pathname !== '/' && <RouteMenu />}
    </div>
  )
}
