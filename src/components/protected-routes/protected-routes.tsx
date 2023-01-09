import { Outlet, Navigate, useLocation } from 'react-router-dom'

type TProtectedRoute = {
  needCondition: boolean
  condition: boolean
  redirect?: string | number
}

export const ProtectedRoutes = ({ needCondition = false, condition = false, redirect = -1 }: TProtectedRoute) => {
  const location = useLocation()
  // Если условие выполняется, а не должно, или условие не выполняется, а должно редирект
  if (condition !== needCondition) {
    //@ts-ignore:next-line
    return <Navigate to={redirect} state={{ from: location }} />
  }
  // Если все хорошо, возвращаем результат роутинга
  else {
    return <Outlet />
  }
}
