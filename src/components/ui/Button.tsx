import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'blue' | 'ghost';
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
    'inline-flex items-center justify-center font-medium tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-[1.5px]';

  const variants = {
    primary: 'bg-white border-white text-black hover:bg-transparent hover:text-white',
    secondary: 'bg-transparent border-white/40 text-white hover:bg-white hover:border-white hover:text-black',
    outline: 'bg-transparent border-white text-white hover:bg-white hover:text-black',
    blue: 'bg-[#004BFA] border-[#004BFA] text-white hover:bg-[#003CC8] hover:border-[#003CC8]',
    ghost: 'border-transparent text-[#a0a0a0] hover:text-white',
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
