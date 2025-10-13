import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-secondary">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 overflow-y-auto sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;

