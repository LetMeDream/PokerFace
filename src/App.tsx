import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/Dashboard/DashboardPage'
import PrivateRoute from './layout/PrivateRoute'
import AllNotifications from './pages/Dashboard/AllNotifications'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Sections />} />
          <Route path="login" element={<Login />} />

          <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="dashboard/notifications" element={<PrivateRoute><AllNotifications /></PrivateRoute>} />

        </Routes>
      </HashRouter>
      <Toaster />
    </>
  )
}

export default App
