import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Sections />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
