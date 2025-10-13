import React from 'react';
import Icon from './Icon';

const Toast = ({ message, type }) => {
    const styles = {
        info: { bg: 'bg-blue-500', icon: 'info' },
        success: { bg: 'bg-green-500', icon: 'checkCircle' },
        error: { bg: 'bg-red-500', icon: 'xCircle' }
    };

    return (
        <div className={`flex items-center w-full max-w-xs p-4 text-white ${styles[type].bg} rounded-lg shadow-lg slide-in`}>
            <Icon name={styles[type].icon} className="w-5 h-5" />
            <div className="ml-3 text-sm font-normal">{message}</div>
        </div>
    );
};

export default Toast;
