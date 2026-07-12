import MetricCard from '@/components/ui/MetricCard';
import { cn } from '@/lib/cn';
import { getChipStyle } from '@/lib/palette';
import type { WorkItem } from '@/types';
import { motion } from 'framer-motion';
import React from 'react';

interface WorkCardProps {
  item: WorkItem;
  index: number;
  accentColor: string;
  fullWidth?: boolean;
}

const WorkCard: React.FC<WorkCardProps> = ({
  item,
  index,
  accentColor,
  fullWidth = false,
}) => {
  // Track cursor position inside card for interactive M3 spotlight glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.article
      className={cn(
        'm3-work-card p-5 sm:p-8 md:p-10', // Responsive paddings for full mobile screen reading real-estate
        'flex flex-col gap-7',
        fullWidth && 'md:col-span-2',
      )}
      style={{ '--card-accent': accentColor } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Card header ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h3
            className={cn(
              'font-display font-bold text-primary',
              fullWidth ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
            )}
          >
            {item.title}
          </h3>
          <p className="font-body text-sm font-semibold tracking-wide" style={{ color: accentColor }}>
            {item.subtitle}
          </p>
        </div>
        {/* Full tenure badge */}
        <span
          className="self-start rounded-full px-3 py-1 font-body text-xs font-medium whitespace-nowrap mt-1"
          style={{
            background: `${accentColor}18`,
            border: `1px solid ${accentColor}45`,
            color: accentColor,
          }}
        >
          {item.period}
        </span>
      </div>

      {/* ── Description ─────────────────────────────────────────────── */}
      <p className="relative z-10 font-body text-[0.92rem] leading-relaxed text-secondary">{item.description}</p>

      {/* ── TIMELINE ────────────────────────────────────────────────── */}
      {item.timeline && item.timeline.length > 0 ? (
        <div className={cn('relative z-10 gap-8', fullWidth && item.metrics?.length ? 'md:grid md:grid-cols-[1.5fr_1fr]' : '')}>

          {/* Left — vertical timeline */}
          <div className="relative flex flex-col gap-0">
            {/* Continuous vertical line */}
            <div
              className="absolute left-[0.4375rem] top-2 bottom-2 w-px"
              style={{ background: `linear-gradient(to bottom, ${accentColor}80, ${accentColor}20)` }}
              aria-hidden="true"
            />

            {item.timeline.map((entry, ei) => (
              <div key={ei} className="relative pl-8 pb-8 last:pb-0">
                {/* Timeline dot */}
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#0F0D13]"
                  style={{ background: accentColor }}
                  aria-hidden="true"
                />

                {/* Role heading + period */}
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <span className="font-display text-base font-semibold text-primary">
                    {entry.role}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-body text-[0.68rem] font-medium"
                    style={{
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}35`,
                      color: accentColor,
                    }}
                  >
                    {entry.period}
                  </span>
                </div>

                {/* Highlights */}
                {entry.highlights && (
                  <ul className="flex flex-col gap-2">
                    {entry.highlights.map((point, pi) => (
                      <li
                        key={pi}
                        className="flex items-start gap-2.5 font-body text-[0.86rem] text-secondary leading-relaxed"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full opacity-70"
                          style={{ background: accentColor }}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Right — metrics column */}
          {fullWidth && item.metrics && item.metrics.length > 0 && (
            <div className="flex flex-col gap-3 pt-1">
              {item.metrics.map((metric, mi) => (
                <MetricCard
                  key={metric.label}
                  {...metric}
                  accentColor={accentColor}
                  mini={mi > 0}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ── STANDARD layout (no timeline) ──────────────────────────── */
        <div className="relative z-10 flex flex-col gap-6">
          {item.highlights && item.highlights.length > 0 && (
            <ul className="flex flex-col gap-2.5">
              {item.highlights.slice(0, 4).map((point, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[0.875rem] text-secondary leading-relaxed">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accentColor }}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          )}
          {item.metrics && item.metrics.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {item.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} accentColor={accentColor} compact />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Links ───────────────────────────────────────────────────── */}
      {item.links.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-3">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200"
              style={{
                background: `${accentColor}15`,
                border: `1.5px solid ${accentColor}50`,
                color: accentColor,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = `${accentColor}28`;
                el.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = `${accentColor}15`;
                el.style.borderColor = `${accentColor}50`;
              }}
            >
              {link.icon === 'paper' && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              )}
              {link.icon === 'link' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              )}
              {link.label}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          ))}
        </div>
      )}

      {/* ── Tags — multi-color M3 chips ─────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="m3-chip" style={getChipStyle(tag)}>
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
};

export default WorkCard;