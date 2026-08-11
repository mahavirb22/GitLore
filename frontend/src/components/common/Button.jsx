import React from 'react';

export default function Button({
  children,
  variant = 'outline', // 'outline' | 'solid'
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = "font-label-caps uppercase transition-all duration-300 rounded-none cursor-pointer";
  
  const variantClasses = variant === 'solid'
    ? "border border-primary bg-primary text-on-primary py-4 px-6 hover:bg-surface hover:text-primary"
    : "border border-primary px-6 py-2 hover:bg-primary hover:text-on-primary text-primary";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
