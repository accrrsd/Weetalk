import { Route, Routes } from 'react-router-dom'
import OrganizerLogin from '../../features/Organizer/login'

export default function OrganizerRoutes() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<OrganizerLogin />} />
      </Routes>
    </div>
  )
}
