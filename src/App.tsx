import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import DashboardPage from './pages/DashboardPage'
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

          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </HashRouter>
      <Toaster />
    </>
  )
}

export default App
