import React from 'react';

interface MeridianBluLogoProps {
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const MeridianBluLogo: React.FC<MeridianBluLogoProps> = ({
  theme = 'light',
  size = 'md',
  className = '',
  onClick,
}) => {
  const isDark = theme === 'dark';

  const textSizes = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-[27px]',
    lg: 'text-3xl sm:text-4xl',
  };

  const badgeSizes = {
    sm: 'w-[26px] h-[26px]',
    md: 'w-[30px] h-[30px]',
    lg: 'w-[36px] h-[36px]',
  };

  const bluSizes = {
    sm: 'text-[7.5px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
  };

  const infinitySizes = {
    sm: 'text-[12px] -mt-[1px]',
    md: 'text-[14px] -mt-[2px]',
    lg: 'text-[17px] -mt-[3px]',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 select-none transition-transform active:scale-[0.98] ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      role={onClick ? 'button' : undefined}
      aria-label="Meridian Blu Home"
    >
      {/* Real Brand Logo Image */}
      <img
        src="/images/logo/logo.png"
        alt="Meridian Blu Emblem"
        className={`${badgeSizes[size]} object-contain shrink-0`}
        onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
      />

      {/* Serif Wordmark */}
      <span
        className={`font-serif font-bold uppercase tracking-[0.06em] leading-none transition-colors ${
          textSizes[size]
        } ${
          isDark
            ? 'text-white'
            : 'text-[#0d121c]'
        }`}
        style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
        }}
      >
        MERIDIAN
      </span>

      {/* Iconic Blue Box Badge */}
      <div
        className={`${badgeSizes[size]} bg-[#005cd8] rounded-[3px] flex flex-col items-center justify-center text-white shrink-0 shadow-sm shadow-blue-900/30 select-none`}
      >
        <span
          className={`${bluSizes[size]} font-black tracking-wider leading-none uppercase font-sans`}
          style={{ letterSpacing: '0.08em' }}
        >
          BLU
        </span>
        <span
          className={`${infinitySizes[size]} font-bold leading-none select-none`}
          aria-hidden="true"
        >
          ∞
        </span>
      </div>
    </div>
  );
};
