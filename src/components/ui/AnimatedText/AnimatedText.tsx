import { cn } from '@/lib/cn';
import type { AnimatedTextProps } from '@/types';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Animates text character-by-character (or word-by-word) with a
 * staggered slide-up reveal. Triggers on scroll entry by default.
 */
const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  delay = 0,
  mode = 'chars',
  once = true,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-5% 0px' });

  const tokens = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === 'words' ? 0.07 : 0.035,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
          style={{ willChange: 'transform' }}
        >
          {/* Preserve spaces between words */}
          {token === ' ' || (mode === 'chars' && token === ' ') ? '\u00A0' : token}
          {mode === 'words' && i < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;