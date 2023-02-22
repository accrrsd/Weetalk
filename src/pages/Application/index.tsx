import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ProtectedRoutes } from '../../components/protected-routes/protected-routes'
import { RouteMenu } from '../../components/route-menu/route-menu'

import Login from './login'
import Profile from './profile'
import Guests from './guests'
import Welcome from './welcome'
import Advices from './advices'
import Favorites from './favorites'
import UserPage from './userPage'
import CheckRoom from './checkRoom'

export default function ApplicationRoutes() {
  const [userAuthorized, setUserAuthorized] = useState(false)
  const [welcomeDone, setWelcomeDone] = useState(false)
  const location = useLocation()

  const userDataLocalStorage = !!localStorage.getItem('userData')
  const welcomeStateLocalStorage = !!localStorage.getItem('welcomeState')

  // todo используется для проверки комнаты
  // const roomId = useAppSelector((state) => state.roomReducer.room)

  useEffect(() => {
    // Получаем из localStorage всякие статусы
    setUserAuthorized(userDataLocalStorage)
    setWelcomeDone(welcomeStateLocalStorage)
  }, [userDataLocalStorage, welcomeStateLocalStorage])

  // todo Необходимо добавить защиту (перенаправление в случае если комната указана не корректно) И (перенаправление куда-то если не удается получить комнату)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/room/:roomId" element={<CheckRoom />}></Route>
        <Route element={<ProtectedRoutes needCondition={false} condition={userAuthorized} redirect="/application/" />}>
          <Route path="/login" element={<Login authorizedFunc={setUserAuthorized} />} />
        </Route>
        <Route element={<ProtectedRoutes needCondition={true} condition={userAuthorized} redirect="/application/login" />}>
          <Route element={<ProtectedRoutes needCondition={false} condition={welcomeDone} redirect="/application/guests" />}>
            <Route path="/" element={<Welcome />} />
          </Route>
          <Route path="/guests" element={<Guests />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/advices" element={<Advices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:id" element={<UserPage />} />
        </Route>
      </Routes>
      {userAuthorized && location.pathname !== '/application/' && <RouteMenu />}
    </div>
  )
}
