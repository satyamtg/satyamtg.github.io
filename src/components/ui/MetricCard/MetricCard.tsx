import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/lib/cn';
import type { MetricCardProps } from '@/types';
import { useRef } from 'react';

/**
 * Three display variants:
 *  - default: tonal card block (used in featured full-width card)
 *  - mini:    smaller block
 *  - compact: horizontal pill badge (used in non-featured cards)
 */
const MetricCard: React.FC<MetricCardProps> = ({
  value,
  suffix,
  label,
  decimals = 0,
  accentColor = '#D0BCFF',
  compact = false,
  mini = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(ref, { end: value, duration: 2.0, decimals });

  if (compact) {
    return (
      <div
        ref={ref}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2"
        style={{
          background: `${accentColor}12`,
          border: `1px solid ${accentColor}35`,
        }}
      >
        <span
          className="font-display text-xl font-bold tabular-nums leading-none"
          style={{ color: accentColor }}
        >
          {count}{suffix}
        </span>
        <span className="font-body text-xs text-secondary">{label}</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-1.5 rounded-2xl',
        mini ? 'p-4' : 'p-5',
      )}
      style={{
        background: `${accentColor}10`,
        border: `1px solid ${accentColor}25`,
      }}
    >
      <span
        className={cn(
          'font-display font-bold tabular-nums leading-none',
          mini ? 'text-2xl' : 'text-4xl',
        )}
        style={{ color: accentColor }}
      >
        {count}{suffix}
      </span>
      <span className="font-body text-sm text-secondary">{label}</span>
    </div>
  );
};

export default MetricCard;