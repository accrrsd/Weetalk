import { Route, Routes, useLocation } from 'react-router-dom'
import OrganizerLogin from '../../features/Organizer/login'
import { Home } from '../../features/Organizer/home'
import { Sidebar } from '../../components/sidebar'

export default function OrganizerRoutes() {
  const location = useLocation()
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<OrganizerLogin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
