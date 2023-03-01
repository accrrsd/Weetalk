import { Route, Routes } from 'react-router-dom'
import OrganizerForgotPassRoute from './forgotPass'
import OrganizerLoginRoute from './login'
import OrganizerRegistrationRoute from './registration'

export default function OrganizerRoutes() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<OrganizerLoginRoute />} />
        <Route path="/forgotPass" element={<OrganizerForgotPassRoute />} />
        <Route path="/registration" element={<OrganizerRegistrationRoute />} />
      </Routes>
    </div>
  )
}
