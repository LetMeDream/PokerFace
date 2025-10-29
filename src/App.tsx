import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import DashboardPage from './pages/DashboardPage'
import PrivateRoute from './layout/PrivateRoute'
interface AuthState {
  auth: {
    isLoggedIn: boolean;
  }
}

function App() {
  const { isLoggedIn } = useSelector((state: AuthState) => state.auth);
  console.log(isLoggedIn)

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
