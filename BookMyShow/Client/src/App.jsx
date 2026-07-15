import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Partner from './pages/Partner'
import User from './pages/User'
import SingleMovie from './pages/SingleMovie'
import BookingShow from './pages/BookingShow'
import MyBookings from './pages/MyBookings'
import Forget from './pages/Forget'
import Reset from './pages/Reset'


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
        <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie /></ProtectedRoute>}/>
        <Route  path='/book-show/:id' element={<ProtectedRoute><BookingShow /></ProtectedRoute>} />
        <Route path="/mybookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
