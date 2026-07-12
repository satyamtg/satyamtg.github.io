import { cn } from '@/lib/cn';
import { getChipStyle } from '@/lib/palette';
import type { ProjectItem } from '@/types';
import { motion } from 'framer-motion';
import React from 'react';

interface ProjectCardProps {
  item: ProjectItem;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ item, index }) => {
  // Track cursor position inside card for interactive M3 spotlight glow
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.a
      href={item.url ?? '#'}
      target={item.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      data-cursor="project"
      onMouseMove={handleMouseMove}
    className={cn(
      'm3-card group flex w-72 shrink-0 flex-col gap-5 rounded-2xl p-5 sm:p-7', // Responsive padding
      'transition-transform duration-500',
    )}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      {/* Year badge — M3 tonal chip */}
      <span className="relative z-10 self-start rounded-full border border-[rgba(208,188,255,0.2)] bg-[#2D2843] px-3 py-1 font-body text-[0.65rem] font-medium tracking-wide text-secondary">
        {item.year}
      </span>

      {/* Title */}
      <h3 className="relative z-10 font-display text-lg font-semibold text-primary leading-snug group-hover:text-accent transition-colors duration-300">
        {item.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 font-body text-sm leading-relaxed text-secondary">{item.description}</p>

      {/* Tags — multi-color M3 chips */}
      <div className="relative z-10 mt-auto flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="m3-chip"
            style={{ ...getChipStyle(tag), fontSize: '0.68rem', padding: '0.22rem 0.65rem' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <svg
        className="relative z-10 self-end text-muted group-hover:text-accent transition-colors duration-300"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </motion.a>
  );
};

export default ProjectCard;