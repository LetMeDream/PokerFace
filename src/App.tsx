import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './layout/PrivateRoute'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Sections />} />
          <Route path="login" element={<Login />} />

          <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
      </HashRouter>
      <Toaster />
    </>
  )
}

export default App
