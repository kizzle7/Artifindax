import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';

    const variants = {
        primary: 'bg-[#1E4E82] text-white hover:bg-[#163a61] shadow-md',
        secondary: 'bg-[#dbeafe] text-[#1e40af] hover:bg-[#cfe2f3]',
        outline: 'border-2 border-[#1e4e82] text-[#1e4e82] hover:bg-[#1e4e82]/5',
        ghost: 'text-[#1e4e82] hover:bg-[#1e4e82]/5',
        dark: 'bg-[#1e293b] text-white hover:bg-[#0f172a]',
        white: 'bg-white text-[#1e4e82] hover:bg-gray-50',
        plain: ''
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
