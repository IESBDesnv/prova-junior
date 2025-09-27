import { forwardRef } from 'react';

const InfantilInput = forwardRef(({ 
    type = 'text',
    className = '',
    icon = null,
    placeholder = '',
    ...props 
}, ref) => {
    const baseClasses = 'w-full px-4 py-3 rounded-2xl border-2 border-primary/50 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-primary/30 focus:border-primary transition-all duration-300 shadow-md hover:shadow-lg';
    
    return (
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl">
                    {icon}
                </div>
            )}
            <input
                type={type}
                className={`${baseClasses} ${icon ? 'pl-12' : ''} ${className}`}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />
        </div>
    );
});

InfantilInput.displayName = 'InfantilInput';

export default InfantilInput;
