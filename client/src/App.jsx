import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Navbar from './components/Navbar/navbar'
import ProtectedRoute from './components/protectedRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './pages/home'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Product from './pages/product.jsx'
import Checkout from './pages/checkout.jsx'
import Cart from './pages/cart.jsx'
import Profile from './pages/profile.jsx'

const App = () => {
    return (

        <AuthProvider>
            <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <Routes>
                
                    <Route path="/" element={ 
                         <Home/>
                         } />

                    <Route path="/about" element={ <ProtectedRoute>
                         <About/>
                         </ProtectedRoute>} />

                    <Route path="/contact" element={
                         <ProtectedRoute>
                         <Contact/>
                    </ProtectedRoute>}
                     />

                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/checkout/:productId" element={<Checkout />} />
                    <Route path="/cart" element={<ProtectedRoute>
                         <Cart/>
                    </ProtectedRoute>} />


                    <Route path="/profile" element={<Profile/>} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                   
                </Routes>
            </div>
         </Router>
        </AuthProvider>
        
    )
}

export default App