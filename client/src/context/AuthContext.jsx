import { createContext, useState, useEffect } from 'react';


 export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const storedUser = localStorage.getItem('user');

                if (token && storedUser) {
                    // Verify token with backend
                    const response = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.data) {
                        setIsAuthenticated(true);
                        setUser(response.data);
                    } else {
                        // Token is invalid, clear storage
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                // Clear invalid tokens
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const login = async (token, userData) => {
        try {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthenticated(true);
            setUser(userData);
            setError(null);
        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message);
            throw error;
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser(null);
            setError(null);
        } catch (error) {
            console.error('Error during logout:', error);
            setError(error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            user, 
            loading,
            error,
            login, 
            logout 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};