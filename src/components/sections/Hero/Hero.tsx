import { META } from '@/data/portfolio';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC = () => {
  const [firstName, setFirstName] = useState('SATYAM');
  const [lastName, setLastName] = useState('KUMAR');
  const [isTG, setIsTG] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [isVariantOpen, setIsVariantOpen] = useState(false);
  const variantRef = useRef<HTMLDivElement>(null);

  // Dual-channel dynamic scramble decoder
  const triggerDualScramble = (targetFirst: string, targetLast: string) => {
    // Prevent overlapping animations
    if (isScrambling) return;
    setIsScrambling(true);

    const glyphs = '01!@#$%^&*{}:<>?[]_';
    const totalFrames = 15;
    let frame = 0;

    const scramble = () => {
      if (frame >= totalFrames) {
        setFirstName(targetFirst);
        setLastName(targetLast);
        setIsScrambling(false);
        return;
      }

      const progress = frame / totalFrames;

      // 1. Scramble First Name (SATYAM <---> "")
      if (targetFirst === '') {
        // Transitioning to handle: dissolve first name by shrinking its length dynamically
        const startLen = 6; // length of 'SATYAM'
        const currentLen = Math.floor(startLen * (1.0 - progress));
        const firstScrambled = Array.from({ length: currentLen })
          .map(() => glyphs[Math.floor(Math.random() * glyphs.length)])
          .join('');
        setFirstName(firstScrambled);
      } else {
        // Transitioning to real name: expand and decode first name left-to-right
        const firstScrambled = targetFirst
          .split('')
          .map((char, idx) => {
            if (idx / targetFirst.length < progress) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('');
        setFirstName(firstScrambled);
      }

      // 2. Scramble Second Name (KUMAR <---> satyamtg)
      const lastScrambled = targetLast
        .split('')
        .map((char, idx) => {
          if (idx / targetLast.length < progress) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');
      setLastName(lastScrambled);

      frame++;
      requestAnimationFrame(scramble);
    };

    scramble();
  };

  // Loop every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextTG = !isTG;
      setIsTG(nextTG);
      if (nextTG) {
        triggerDualScramble('', 'satyamtg');
      } else {
        triggerDualScramble('SATYAM', 'KUMAR');
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isTG, isScrambling]);

  // Direct manual hover triggers
  const handleMouseEnter = () => {
    if (!isTG && !isScrambling) {
      setIsTG(true);
      triggerDualScramble('', 'satyamtg');
    }
  };

  // Close variant dropdown on outside click
  useEffect(() => {
    if (!isVariantOpen) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (variantRef.current && !variantRef.current.contains(e.target as Node)) {
        setIsVariantOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [isVariantOpen]);

  const handleMouseLeave = () => {
    if (isTG && !isScrambling) {
      setIsTG(false);
      triggerDualScramble('SATYAM', 'KUMAR');
    }
  };

  return (
    <section
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Hero Content ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Role label — monospace prompt style */}
        <motion.p
          className="font-body text-xs tracking-[0.2em] text-secondary uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <span
            className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: '#D0BCFF' }}
            aria-hidden="true"
          />
          {META.role} · {META.company}
        </motion.p>

        {/* Morphing cybernetic title */}
        <h1 
          className="flex flex-col items-center leading-[0.88] tracking-tighter select-none cursor-pointer min-h-[7rem] sm:min-h-[11rem] md:min-h-[20rem] justify-center" 
          aria-label={META.name}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* First Line — collapses to empty string */}
          {firstName && (
            <NameLine text={firstName} delay={0.45} isDynamic />
          )}
          {/* Second Line — morphs between KUMAR and satyamtg */}
          <NameLine text={lastName} delay={0.6} gradient isDynamic />
        </h1>

        <motion.p
          className="mt-2 max-w-sm font-body text-base text-secondary md:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE_OUT_EXPO }}
        >
          {META.tagline}
        </motion.p>

        {/* CTAs — flat primary button + outlined */}
        <motion.div
          className="mt-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: EASE_OUT_EXPO }}
        >
          {/* ── Split download button ─────────────────────────────────── */}
          <div ref={variantRef} className="relative inline-flex rounded-full" style={{ boxShadow: '0 4px 20px rgba(109, 40, 217, 0.45)' }}>
            {/* Left — primary direct download */}
            <a
              href={META.resumeUrl}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-l-full py-3 pl-5 pr-4 text-sm font-semibold text-white transition-colors hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              résumé.pdf
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>

            {/* Divider */}
            <div className="self-stretch" style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }} />

            {/* Right — variant picker chevron */}
            <button
              onClick={() => setIsVariantOpen(v => !v)}
              className="inline-flex items-center rounded-r-full px-3 py-3 text-white transition-colors hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #5B21B6 100%)', fontFamily: "'Space Grotesk', sans-serif" }}
              aria-label="Other résumé formats"
              aria-expanded={isVariantOpen}
            >
              <svg
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                aria-hidden="true"
                style={{ transition: 'transform 0.2s', transform: isVariantOpen ? 'rotate(180deg)' : 'none' }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown — all 4 variants */}
            {isVariantOpen && (
              <div
                className="absolute left-0 top-full z-50 mt-2 min-w-[230px] overflow-hidden rounded-2xl"
                style={{
                  background: 'rgba(14, 11, 22, 0.97)',
                  border: '1px solid rgba(208, 188, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                }}
              >
                {META.resumeVariants.map((variant, i) => (
                  <a
                    key={variant.label}
                    href={variant.url}
                    rel="noopener noreferrer"
                    onClick={() => setIsVariantOpen(false)}
                    className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-white/5"
                    style={{
                      borderBottom: i < META.resumeVariants.length - 1
                        ? '1px solid rgba(208,188,255,0.08)'
                        : 'none',
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.875rem', fontWeight: 500, color: '#E8E0F0' }}>
                        {variant.label}
                      </span>
                      {variant.description && (
                        <span style={{ fontSize: '0.7rem', color: '#8B7BA0' }}>{variant.description}</span>
                      )}
                    </div>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2" aria-hidden="true" style={{ flexShrink: 0 }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#work" className="btn-terminal">
            see work
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-muted uppercase">scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-[#D0BCFF]/50 to-transparent" />
      </motion.div>

      <style>{`
        @keyframes blobFloat {
          from { transform: translateY(0px) scale(1); }
          to   { transform: translateY(-40px) scale(1.08); }
        }
      `}</style>
    </section>
  );
};

// ─── Name line ────────────────────────────────────────────────────────────────

interface NameLineProps {
  text: string;
  delay: number;
  gradient?: boolean;
  isDynamic?: boolean;
}

const NameLine: React.FC<NameLineProps> = ({ text, delay, gradient = false, isDynamic = false }) => {
  const chars = text.split('');

  // If text is actively scrambling/dynamic, render as flat text inside gradient to avoid jumpy character springs
  if (isDynamic) {
    return (
      <span
        className="font-display font-bold text-[clamp(2.2rem,11vw,10rem)] bg-gradient-to-r from-[#FFFFFF] via-[#E2D9F3] to-[#D0BCFF] bg-clip-text text-transparent transition-all duration-300"
        style={{ willChange: 'transform' }}
      >
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-flex overflow-hidden font-display font-bold text-[clamp(2.2rem,11vw,10rem)] ${
        gradient
          ? 'bg-gradient-to-r from-[#FFFFFF] via-[#E2D9F3] to-[#D0BCFF] bg-clip-text text-transparent'
          : 'text-primary'
      }`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { y: '110%', opacity: 0 },
            visible: {
              y: '0%',
              opacity: 1,
              transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-block"
          style={{ willChange: 'transform' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default Hero;