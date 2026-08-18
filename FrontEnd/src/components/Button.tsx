import type { ButtonHTMLAttributes, ReactNode } from 'react';

import '../styles/button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const classes = ['market-btn', `market-btn--${variant}`, `market-btn--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
