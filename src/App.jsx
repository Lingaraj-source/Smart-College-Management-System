import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './routing/Router';

const App = () => {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <DataProvider>
                    <AuthProvider>
                        <AppRouter />
                    </AuthProvider>
                </DataProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
};

export default App;


