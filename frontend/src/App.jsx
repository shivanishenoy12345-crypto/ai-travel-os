import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import CreateTrip from './pages/CreateTrip'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="/dashboard/:tripId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App