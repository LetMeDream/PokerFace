import Sections from './components/liveChat/Sections'
import Login from './pages/Login'
import AgentPage from './pages/AgentPage'
import { HashRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Sections />} />
          <Route path="login" element={<Login />} />
          <Route path="agent" element={<AgentPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
