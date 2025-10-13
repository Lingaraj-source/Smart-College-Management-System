import React from 'react';
import Button from './Button';
import Icon from './Icon';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 fade-in" 
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-lg bg-card text-card-foreground border rounded-lg shadow-xl" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <Button variant="ghost" className="p-1 h-auto" onClick={onClose}>
                        <Icon name="close" className="w-5 h-5" />
                    </Button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

export default Modal;