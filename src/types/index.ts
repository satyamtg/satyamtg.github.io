// ─── Portfolio Data Types ────────────────────────────────────────────────────

export interface Metric {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export interface ExternalLink {
  label: string;
  url: string;
  icon?: 'paper' | 'github' | 'link';
}

export interface TimelineEntry {
  role: string;
  period: string;
  highlights?: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;       // current / most recent role
  description: string;
  period: string;         // full tenure (e.g. "Oct 2022 – Present")
  timeline?: TimelineEntry[]; // ordered new → old; renders inner timeline
  metrics?: Metric[];
  highlights?: string[];  // used when no timeline
  tags: string[];
  links: ExternalLink[];
  featured: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  year: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email';
}

export interface PortfolioMeta {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  tagline: string;
  email: string;
  resumeUrl: string;
}

// ─── Component Props Helpers ─────────────────────────────────────────────────

export type AnimatedTextMode = 'chars' | 'words';

export interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: AnimatedTextMode;
  once?: boolean;
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export interface MetricCardProps extends Metric {
  accentColor?: string;
  compact?: boolean;    // horizontal badge style
  mini?: boolean;       // reduced size
}

export interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}