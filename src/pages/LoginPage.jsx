import React, { useState } from 'react';
// FIX: Importing components without curly braces because they are default exports.
import AuthLayout from './AuthLayout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Label from '../components/ui/Label';
import Select from '../components/ui/Select';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { addNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(email, password, role);
            addNotification(`Welcome back, ${user.name}!`, 'success');
            // Redirect after successful login
            window.location.hash = `#/${user.role}/dashboard`;
        } catch (err) {
            setError(err.message);
            addNotification(err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout 
            title="Login to your Account" 
            description="Select your role and enter your credentials."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-sm text-red-500 bg-red-100 dark:bg-red-900/20 p-3 rounded-md">{error}</p>}
                
                <div>
                    <Label htmlFor="role">I am a</Label>
                    <Select id="role" value={role} onChange={e => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="admin">Admin</option>
                    </Select>
                </div>
                
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                
                <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account? <a href="#/register" className="text-primary hover:underline">Register</a>
                </div>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;

