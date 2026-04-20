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
    'inline-flex items-center justify-center font-medium tracking-[0.2em] uppercase transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-[Montserrat] relative overflow-hidden';

  const variants = {
    primary: 'bg-[#c8a55a] hover:bg-[#dfc07a] text-[#020203] font-semibold',
    secondary: 'bg-white/95 hover:bg-white text-[#020203]',
    outline: 'border border-[#c8a55a]/50 text-[#c8a55a] hover:bg-[#c8a55a]/10 hover:border-[#c8a55a]',
    ghost: 'text-[#8a8a8a] hover:text-white',
  };

  const sizes = {
    sm: 'text-[9px] px-5 py-2.5',
    md: 'text-[10px] px-8 py-4',
    lg: 'text-[11px] px-11 py-4.5',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
