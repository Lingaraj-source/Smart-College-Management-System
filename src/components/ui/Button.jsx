import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:translate-y-[-2px] hover:shadow-lg";
    const variants = { 
        primary: "bg-primary text-primary-foreground hover:bg-primary/90", 
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", 
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", 
        outline: "border border-input hover:bg-accent hover:text-accent-foreground", 
        ghost: "hover:bg-accent hover:text-accent-foreground", 
        link: "underline-offset-4 hover:underline text-primary" 
    };
    return <button className={`${baseClasses} ${variants[variant]} px-4 py-2 ${className}`} {...props}>{children}</button>;
};

export default Button;
