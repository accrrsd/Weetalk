import { Route, Routes } from 'react-router-dom'
import OrganizerLogin from '../../features/Organizer/login'
import { Layout } from '../../features/Organizer/layout'
import { Home } from './home'
import { Settings } from './settings'

export default function OrganizerRoutes() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<OrganizerLogin />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  )
}
