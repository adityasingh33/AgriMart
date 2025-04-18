// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         try {
//             const token = localStorage.getItem("token");
//             setIsAuthenticated(!!token);
//         } catch (error) {
//             console.error("Error checking authentication:", error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     const login = (token) => {
//         try {
//             localStorage.setItem("token", token);
//             setIsAuthenticated(true);
//         } catch (error) {
//             console.error("Error during login:", error);
//             throw error;
//         }
//     };

//     const logout = () => {
//         try {
//             localStorage.removeItem("token");
//             setIsAuthenticated(false);
//         } catch (error) {
//             console.error("Error during logout:", error);
//             throw error;
//         }
//     };

//     if (loading) {
//         return null; // or a loading spinner
//     }

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated (e.g., check localStorage for token)
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    // if (loading) {
    //     return null; // or a loading spinner
    // }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};