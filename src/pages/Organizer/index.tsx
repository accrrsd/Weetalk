import { Route, Routes } from 'react-router-dom'
import { Layout } from '../../features/Organizer/layout'
import Organizer404Route from './404'
import OrganizerForgotPassRoute from './forgotPass'
import { Home } from './home'
import OrganizerLoginRoute from './login'
import OrganizerRegistrationRoute from './registration'
import OrganizerSettingsRoute from './settings'
import { AddEvent } from './addEvent'
import { EditEvent } from './editEvent'

export default function OrganizerRoutes() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<OrganizerLoginRoute />} />
        <Route path="/forgotPass" element={<OrganizerForgotPassRoute />} />
        <Route path="/registration" element={<OrganizerRegistrationRoute />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<OrganizerSettingsRoute />} />
          <Route path="/event/:id" element={<EditEvent />} />
          <Route path="/addEvent" element={<AddEvent />} />
        </Route>
        <Route path="*" element={<Organizer404Route />} />
      </Routes>
    </div>
  )
}
