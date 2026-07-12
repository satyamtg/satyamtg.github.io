import MagneticButton from '@/components/ui/MagneticButton';
import SectionLabel from '@/components/ui/SectionLabel';
import { META, SOCIAL_LINKS } from '@/data/portfolio';
import { cn } from '@/lib/cn';
import { motion } from 'framer-motion';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const SocialIcon: React.FC<{ icon: string }> = ({ icon }) => {
  if (icon === 'github')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  if (icon === 'linkedin')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (icon === 'twitter')
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  // email fallback
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
};

// Custom brand-specific colors on hover for elite colorization
const SOCIAL_HOVER_STYLES: Record<string, string> = {
  github: 'hover:text-[#FFFFFF] hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]',
  linkedin: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_12px_rgba(10,102,194,0.2)]',
  twitter: 'hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 hover:bg-[#1DA1F2]/10 hover:shadow-[0_0_12px_rgba(29,161,242,0.2)]',
  email: 'hover:text-[#EFB8C8] hover:border-[#EFB8C8]/50 hover:bg-[#EFB8C8]/10 hover:shadow-[0_0_12px_rgba(239,184,200,0.2)]',
};

// ─── Contact Section ──────────────────────────────────────────────────────────

const Contact: React.FC = () => (
  <section id="contact" className="mx-auto max-w-5xl px-6 py-28 md:py-48">
    <SectionLabel number="04" label="Contact" className="mb-16" />

    <div className="flex flex-col items-center gap-12 text-center">
      {/* Headline */}
      <motion.h2
        className="font-display font-bold leading-[0.9] tracking-tighter text-primary"
        style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        Let&apos;s build
        <br />
        <span className="text-gradient">
          something.
        </span>
      </motion.h2>

      {/* Subtext */}
      <motion.p
        className="max-w-sm font-body text-base text-secondary"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Open to interesting roles, collaborations, and conversations about AI and developer tooling.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <MagneticButton href={`mailto:${META.email}`} strength={0.35}>
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </MagneticButton>
      </motion.div>

      {/* Social links — dynamically brand colorized */}
      <motion.div
        className="flex items-center gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              'border border-[rgba(208,188,255,0.2)] bg-[#1E1A2E] text-secondary',
              'transition-all duration-250 hover:scale-115',
              SOCIAL_HOVER_STYLES[link.icon] || 'hover:border-accent hover:text-accent',
            )}
          >
            <SocialIcon icon={link.icon} />
          </a>
        ))}
      </motion.div>

      {/* Footer note */}
      <p className="font-body text-[0.65rem] tracking-widest text-muted">
        {new Date().getFullYear()} · {META.name} · Crafted with care
      </p>
    </div>
  </section>
);

export default Contact;