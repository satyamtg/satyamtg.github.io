import { cn } from '@/lib/cn';
import type { SectionLabelProps } from '@/types';

/**
 * Bold M3 Expressive section label.
 * Renders: ── 01 ──── WORK EXPERIENCE
 */
const SectionLabel: React.FC<SectionLabelProps> = ({ number, label, className }) => (
  <div className={cn('flex items-center gap-4', className)}>
    {/* Number — filled tonal pill */}
    <span
      className="flex h-8 min-w-[2rem] items-center justify-center rounded-full px-3 font-mono text-xs font-semibold"
      style={{
        background: 'rgba(139,92,246,0.18)',
        border: '1px solid rgba(139,92,246,0.4)',
        color: '#C4B5FD',
      }}
    >
      {number}
    </span>

    {/* Divider line */}
    <span className="line-accent" aria-hidden="true" />

    {/* Label */}
    <span className="font-display text-sm font-semibold tracking-[0.18em] text-secondary uppercase">
      {label}
    </span>
  </div>
);

export default SectionLabel;