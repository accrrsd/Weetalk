import { Route, Routes } from 'react-router-dom'
import ManagerLogin from '../../features/Manager/login'

export default function ManagerRoutes() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<ManagerLogin />} />
      </Routes>
    </div>
  )
}
