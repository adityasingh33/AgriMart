import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Navbar from './components/Navbar/navbar'
import ProtectedRoute from './components/protectedRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './pages/home'

const App = () => {
    return (

        <AuthProvider>
            <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProtectedRoute>
                         <Home/>
                       </ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
            </div>
         </Router>
        </AuthProvider>
        
    )
}

export default App