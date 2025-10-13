import React, { createContext, useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext'; // Auth needs user data to check credentials

// FIX: Added 'export' to make the context available for other files to import.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // The DataContext provides the list of all users.
    const { users } = useContext(DataContext); 
    
    // Initialize user state from localStorage to keep the user logged in after a refresh.
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Loading state to prevent rendering protected routes before auth check is complete.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);
    
    // The login function finds a user in the mock data that matches the credentials.
    const login = (email, password, role) => {
        return new Promise((resolve, reject) => {
            // Simulate a network request delay.
            setTimeout(() => {
                const foundUser = users.find(u => u.email === email && u.password === password && u.role === role);
                if (foundUser) {
                    // If user is found, save to localStorage and update state.
                    localStorage.setItem('user', JSON.stringify(foundUser));
                    setUser(foundUser);
                    resolve(foundUser);
                } else {
                    // If not found, reject the promise with an error.
                    reject(new Error('Invalid credentials or role.'));
                }
            }, 500);
        });
    };

    // The logout function clears user data from state and localStorage.
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        // Redirect to the login page after logout.
        window.location.hash = '#/login';
    };

    // The value object is provided to all child components.
    const value = { user, isAuthenticated: !!user, loading, login, logout };
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

