import { Route, Routes } from 'react-router-dom'
import ApplicationRoutes from './Application'
import MainPage from './Main'
import OrganizerRoutes from './Organizer'

export default function app() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/application/*" element={<ApplicationRoutes />} />
      <Route path="/organizer/*" element={<OrganizerRoutes />} />
    </Routes>
  )
}
