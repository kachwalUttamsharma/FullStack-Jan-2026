import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Partner from './pages/Partner'
import User from './pages/User'

function App() {
 

  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/partner" element={<ProtectedRoute><Partner /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
