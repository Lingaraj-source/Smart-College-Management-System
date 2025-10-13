import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import CourseManagement from '../pages/admin/CourseManagement';
import UserManagement from '../pages/admin/UserManagement';

// Faculty Pages
import FacultyAssignmentsPage from '../pages/faculty/FacultyAssignmentsPage';
import FacultyClassesPage from '../pages/faculty/FacultyClassesPage';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';

// Student Pages
import StudentCoursePage from '../pages/student/StudentCoursePage';
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentFinancePage from '../pages/student/StudentFinancePage';
import StudentGradesPage from '../pages/student/StudentGradesPage';

// Public Pages
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// FIX: Added 'export' to make this hook available to other files.
export const useLocation = () => {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setHash(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const pathname = hash.replace(/^#/, '') || '/';
    return { pathname };
};

const Route = ({ path, component: Component }) => {
    const { pathname } = useLocation();
    return pathname === path ? <Component /> : null;
};

const Redirect = ({ to }) => {
    useEffect(() => {
        window.location.hash = `#${to}`;
    }, [to]);
    return null;
};

const AppRouter = () => {
    const { pathname } = useLocation();
    const { user, isAuthenticated } = useAuth();

    // If user is not authenticated and trying to access a protected route, redirect to login.
    if (!isAuthenticated && !['/', '/login', '/register', '/forgot-password'].includes(pathname)) {
        return <Redirect to="/login" />;
    }
    
    // If user IS authenticated and on the landing page, redirect to their dashboard.
    if (isAuthenticated && (pathname === '/' || pathname === '/login')) {
         return <Redirect to={`/${user.role}/dashboard`} />;
    }

    return (
        <>
            {!isAuthenticated ? (
                // Public Routes
                <>
                    <Route path="/" component={LandingPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/forgot-password" component={ForgotPasswordPage} />
                </>
            ) : (
                // Protected Routes based on user role
                <>
                    {user.role === 'admin' && (
                        <>
                            <Route path="/admin/dashboard" component={AdminDashboard} />
                            <Route path="/admin/users" component={UserManagement} />
                            <Route path="/admin/courses" component={CourseManagement} />
                        </>
                    )}
                    {user.role === 'student' && (
                        <>
                            <Route path="/student/dashboard" component={StudentDashboard} />
                            <Route path="/student/course" component={StudentCoursePage} />
                            <Route path="/student/grades" component={StudentGradesPage} />
                            <Route path="/student/finance" component={StudentFinancePage} />
                        </>
                    )}
                    {user.role === 'faculty' && (
                        <>
                            <Route path="/faculty/dashboard" component={FacultyDashboard} />
                            <Route path="/faculty/classes" component={FacultyClassesPage} />
                            <Route path="/faculty/assignments" component={FacultyAssignmentsPage} />
                        </>
                    )}
                     {/* Fallback redirect if on a role root path */}
                    {pathname === `/${user.role}` && <Redirect to={`/${user.role}/dashboard`} />}
                </>
            )}
        </>
    );
};

export default AppRouter;

