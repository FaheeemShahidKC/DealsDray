import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdminRoute from './Routes/AdminRoute'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<AdminRoute />} />
      </Routes>
    </Router>
  )
}

export default App
