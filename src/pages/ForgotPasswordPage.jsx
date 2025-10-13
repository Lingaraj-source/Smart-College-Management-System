import React from 'react';
import AuthLayout from './AuthLayout';

const ForgotPasswordPage = () => {
    return (
        <AuthLayout title="Reset Password" description="This is a demo. Password reset is disabled.">
             <div className="text-center text-sm text-muted-foreground">
                Return to <a href="#/login" className="text-primary hover:underline">Login</a>
            </div>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;
