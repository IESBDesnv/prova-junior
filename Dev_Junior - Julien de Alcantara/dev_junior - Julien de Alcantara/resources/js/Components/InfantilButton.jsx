import { forwardRef } from 'react';

const InfantilButton = forwardRef(({ 
    type = 'button', 
    className = '', 
    variant = 'primary',
    size = 'md',
    children, 
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    ...props 
}, ref) => {
    const baseClasses = 'font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';
    
    const variants = {
        primary: 'bg-primary text-white border-2 border-primary/50 hover:bg-primary-hover hover:shadow-lg shadow-md',
        secondary: 'bg-success text-white border-2 border-success/50 hover:bg-success/90 hover:shadow-lg shadow-md',
        accent: 'bg-info text-white border-2 border-info/50 hover:bg-info/90 hover:shadow-lg shadow-md',
        warning: 'bg-warning text-white border-2 border-warning/50 hover:bg-warning/90 hover:shadow-lg shadow-md',
        danger: 'bg-danger text-white border-2 border-danger/50 hover:bg-danger/90 hover:shadow-lg shadow-md',
        outline: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md',
    };
    
    const sizes = {
        xs: 'px-2 py-2 text-xs min-h-[32px] flex items-center justify-center',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };
    
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
    
    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            ref={ref}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            {...props}
        >
            {children}
        </button>
    );
});

InfantilButton.displayName = 'InfantilButton';

export default InfantilButton;
