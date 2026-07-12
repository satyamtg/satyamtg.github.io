import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { cn } from '@/lib/cn';
import type { MagneticButtonProps } from '@/types';
import { motion } from 'framer-motion';

/**
 * M3 Expressive + terminal glass magnetic button.
 * Flat transparent surface, thin neutral border, monospace text.
 * On hover: border becomes accent-tinted, text goes accent.
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  href,
  onClick,
  strength = 0.28,
}) => {
  const { ref, position, onMouseMove, onMouseLeave } = useMagneticEffect(strength);

  const inner = (
    <motion.div
      ref={ref}
      className={cn(
        // M3 flat tonal surface — no glass, no blur
        'inline-flex items-center gap-3 rounded-full px-8 py-4',
        'border border-white/10 bg-[#2B2930]',
        // Text — monospace, dim
        'font-mono text-sm text-secondary',
        // Hover — M3 purple tint
        'transition-colors duration-200',
        'hover:border-[rgba(208,188,255,0.35)] hover:bg-[rgba(208,188,255,0.08)] hover:text-accent',
        className,
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.8 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <button onClick={onClick}>{inner}</button>;
};

export default MagneticButton;