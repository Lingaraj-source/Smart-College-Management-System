import React from 'react';
import AuthLayout from './AuthLayout';

const RegisterPage = () => {
    return (
        <AuthLayout title="Create an Account" description="This is a demo. Registration is disabled.">
            <div className="text-center text-sm text-muted-foreground">
                Already have an account? <a href="#/login" className="text-primary hover:underline">Login</a>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;