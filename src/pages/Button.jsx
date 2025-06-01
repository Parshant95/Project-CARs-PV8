import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  href,
  className = '',
  style,
  onClick,
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 focus:ring-blue-500',
    outline: 'bg-transparent border-white text-white hover:bg-white/10 focus:ring-white',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={classes} style={style}>
        {children}
      </a>
    );
  }
  
  return (
    <button type="button" className={classes} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button; 