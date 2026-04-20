import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#c9a84c] hover:bg-[#e2c97e] text-black',
    secondary: 'bg-white hover:bg-[#e0e0e0] text-black',
    outline: 'border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black',
    ghost: 'text-[#a0a0a0] hover:text-white',
  };

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5',
    md: 'text-[11px] px-7 py-3.5',
    lg: 'text-[12px] px-10 py-4',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
