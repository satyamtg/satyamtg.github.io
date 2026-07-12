import type React from 'react';

/**
 * Assigns a deterministic M3 tonal color to a chip/tag based on its string hash.
 * Four families: purple, blue, pink, teal — all dark-mode safe.
 */
const CHIP_PALETTES: React.CSSProperties[] = [
  { background: '#2D1B69', borderColor: 'rgba(208,188,255,0.45)', color: '#D0BCFF' }, // M3 purple
  { background: '#172554', borderColor: 'rgba(147,197,253,0.45)', color: '#93C5FD' }, // M3 blue
  { background: '#4A1942', borderColor: 'rgba(244,143,177,0.45)', color: '#F48FB1' }, // M3 pink
  { background: '#064E3B', borderColor: 'rgba(110,231,183,0.45)', color: '#6EE7B7' }, // M3 teal
];

export function getChipStyle(tag: string): React.CSSProperties {
  const hash = tag.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return CHIP_PALETTES[hash % CHIP_PALETTES.length];
}

/**
 * Per-work-item accent colors — applied as left border on work cards.
 * Cycles through M3 primary, tertiary, blue, teal.
 */
export const WORK_ACCENT_COLORS = [
  '#8B5CF6', // violet — M3 primary strong
  '#EC4899', // M3 tertiary pink
  '#3B82F6', // blue
  '#10B981', // teal/emerald
];