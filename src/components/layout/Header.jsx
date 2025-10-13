import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useData } from '../../hooks/useData';
import Icon from '../ui/Icon';

const Header = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { announcements } = useData();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    // Filter announcements relevant to the current user
    const myDepartments = []; // This would need to be populated for faculty
    const relevantAnnouncements = announcements.filter(an => {
        if (user.role === 'student' && user.enrolledCourseId) {
             const myCourse = announcements.find(c => c.id === user.enrolledCourseId);
             if (myCourse) {
                return an.target === 'All' || an.target === myCourse.department;
             }
        }
        if (user.role === 'faculty') {
            return an.target === 'All' || an.target === 'Faculty' || myDepartments.includes(an.target);
        }
        return true; // Admin sees all
    });


    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-card/80 backdrop-blur-sm sm:px-6">
            <button onClick={onMenuClick} className="lg:hidden">
                <Icon name="menu" />
            </button>
            <div className="hidden lg:block">
                <h1 className="text-lg font-semibold">Welcome back, {user?.name.split(' ')[0]}!</h1>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={toggleTheme}>
                    <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                </button>
                <div className="relative">
                    <button onClick={() => setNotificationsOpen(p => !p)}>
                        <Icon name="bell" />
                        {relevantAnnouncements.length > 0 && <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>}
                    </button>
                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-card border rounded-md shadow-lg fade-in">
                            <div className="p-3 font-semibold border-b">Notifications</div>
                            <ul className="p-2 max-h-80 overflow-y-auto">
                                {relevantAnnouncements.length > 0 ? relevantAnnouncements.map(an => (
                                    <li key={an.id} className="p-2 text-sm border-b hover:bg-accent rounded-md">
                                        <p className="font-semibold">{an.title}</p>
                                        <p className="text-xs text-muted-foreground">{an.content}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{an.date}</p>
                                    </li>
                                )) : <li className="p-2 text-sm text-muted-foreground">No new notifications.</li>}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <button onClick={() => setDropdownOpen(p => !p)} className="flex items-center gap-2">
                        <img src={user?.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                        <span className="hidden sm:inline">{user?.name}</span>
                        <Icon name="chevronDown" className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-card border rounded-md shadow-lg fade-in">
                            <a href="#" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent">Profile</a>
                            <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-accent">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
