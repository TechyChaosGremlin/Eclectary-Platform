import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import '../styles/button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    fullWidth = false,
    disabled,
    type,
    ...props
  },
  ref,
) {
  const classes = [
    'market-btn',
    `market-btn--${variant}`,
    `market-btn--${size}`,
    isLoading ? 'market-btn--loading' : '',
    fullWidth ? 'market-btn--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classes}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {leftIcon ? <span className="market-btn__icon" aria-hidden="true">{leftIcon}</span> : null}
      {isLoading ? (loadingText ?? children ?? 'Loading...') : children}
      {rightIcon ? <span className="market-btn__icon" aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
});

export default Button;
