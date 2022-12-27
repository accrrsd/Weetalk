import { Outlet, Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoutes = ({ needAuthorized = false, auth = false, redirect = '/login' }) => {
  const location = useLocation()
  if (auth && !needAuthorized) {
    // Если пользователь авторизован, а не должен, возвращаем на предыдущую страницу
    //@ts-ignore:next-line
    return <Navigate to={-1} />
  } else if (!auth && needAuthorized) {
    // Если пользователь не авторизован, а должен, переадресуем на логин с передачей локации
    return <Navigate to={redirect} state={{ from: location }} />
  } else {
    // Если все хорошо, возвращаем результат роутинга
    return <Outlet />
  }
}
