import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Navbar from './components/Navbar/navbar'

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App