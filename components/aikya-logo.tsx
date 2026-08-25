'use client';

import { cn } from '@/lib/utils';

export function AikyaLogo({
  className,
  showWordmark = true,
  size = 'default',
  variant = 'default',
}: {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'default' | 'lg' | 'xl';
  variant?: 'default' | 'light';
}) {
  const sizes = {
    sm: { mark: 'h-6 w-6', text: 'text-base' },
    default: { mark: 'h-8 w-8', text: 'text-xl' },
    lg: { mark: 'h-10 w-10', text: 'text-2xl' },
    xl: { mark: 'h-14 w-14', text: 'text-4xl' },
  };
  const s = sizes[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-foreground';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          className={cn(s.mark)}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer rounded square */}
          <rect x="1" y="1" width="30" height="30" rx="8" fill="hsl(var(--primary))" />
          {/* Interconnected nodes forming an A shape */}
          {/* Left diagonal */}
          <path d="M9 22L14 9" stroke="hsl(var(--indigo))" strokeWidth="2.2" strokeLinecap="round" />
          {/* Right diagonal */}
          <path d="M23 22L18 9" stroke="hsl(var(--coral))" strokeWidth="2.2" strokeLinecap="round" />
          {/* Crossbar */}
          <path d="M12.5 17H19.5" stroke="hsl(var(--orange))" strokeWidth="2.2" strokeLinecap="round" />
          {/* Top node */}
          <circle cx="16" cy="9" r="2.2" fill="hsl(var(--yellow))" />
          {/* Bottom-left node */}
          <circle cx="9" cy="22" r="2" fill="hsl(var(--indigo))" />
          {/* Bottom-right node */}
          <circle cx="23" cy="22" r="2" fill="hsl(var(--coral))" />
        </svg>
      </div>
      {showWordmark && (
        <span
          className={cn(
            'font-serif font-semibold tracking-tightest',
            s.text,
            textColor
          )}
        >
          AIKYA
        </span>
      )}
    </div>
  );
}

export function AikyaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="hsl(var(--primary))" />
      <path d="M9 22L14 9" stroke="hsl(var(--indigo))" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M23 22L18 9" stroke="hsl(var(--coral))" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12.5 17H19.5" stroke="hsl(var(--orange))" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="9" r="2.2" fill="hsl(var(--yellow))" />
      <circle cx="9" cy="22" r="2" fill="hsl(var(--indigo))" />
      <circle cx="23" cy="22" r="2" fill="hsl(var(--coral))" />
    </svg>
  );
}
