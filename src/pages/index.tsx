import { Route, Routes } from 'react-router-dom'
import ApplicationRoutes from './Application'
import MainPage from './Main'
import ManagerRoutes from './Manager'

export default function app() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/application/*" element={<ApplicationRoutes />} />
      <Route path="/manager/*" element={<ManagerRoutes />} />
    </Routes>
  )
}
