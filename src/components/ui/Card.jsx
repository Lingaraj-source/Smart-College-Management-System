import React from 'react';

export const Card = ({ children, className = '' }) => (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = '' }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>
        {children}
    </p>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);