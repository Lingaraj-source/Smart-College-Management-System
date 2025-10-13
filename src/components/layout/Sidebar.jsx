import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from '../../routing/Router';
import Icon from '../ui/Icon';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user, logout } = useAuth();
    const { pathname } = useLocation();

    const commonLinks = [
        { name: 'Dashboard', icon: 'dashboard', href: `/${user?.role}/dashboard` }
    ];

    const roleLinks = {
        admin: [
            { name: 'User Management', icon: 'users', href: '/admin/users' },
            { name: 'Course Management', icon: 'courses', href: '/admin/courses' },
        ],
        student: [
            { name: 'My Course', icon: 'courses', href: '/student/course' },
            { name: 'My Grades', icon: 'grades', href: '/student/grades' },
            { name: 'My Finances', icon: 'finance', href: '/student/finance' },
        ],
        faculty: [
            { name: 'My Classes', icon: 'users', href: '/faculty/classes' },
            { name: 'Assignments', icon: 'grades', href: '/faculty/assignments' },
        ],
    };

    const links = [...commonLinks, ...(roleLinks[user?.role] || [])];

    const NavLink = ({ href, icon, name }) => (
        <a 
            href={`#${href}`} 
            onClick={() => setIsOpen(false)} 
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors ${pathname === href ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
        >
            <Icon name={icon} className="w-5 h-5 mr-3" />
            <span>{name}</span>
        </a>
    );

    return (
        <>
            <aside className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-card border-r transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <h1 className="text-xl font-bold text-primary">SmartCollege</h1>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden">
                        <Icon name="close" />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {links.map(link => <NavLink key={link.name} {...link} />)}
                </nav>
                <div className="absolute bottom-0 w-full p-4 border-t">
                    <button onClick={logout} className="flex items-center w-full px-4 py-2.5 rounded-lg text-muted-foreground hover:bg-accent">
                        <Icon name="logout" className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
};

export default Sidebar;
