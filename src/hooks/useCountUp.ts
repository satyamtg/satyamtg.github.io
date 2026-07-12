import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
}

/**
 * Animates a number from 0 to `end` with an ease-out cubic curve,
 * triggered once when the target element enters the viewport.
 */
export const useCountUp = (
  targetRef: React.RefObject<Element>,
  { end, duration = 2, decimals = 0 }: UseCountUpOptions,
): number => {
  const [current, setCurrent] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTs = performance.now();

        const tick = (now: number) => {
          const elapsed = (now - startTs) / (duration * 1000);
          const progress = Math.min(elapsed, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const next = parseFloat((eased * end).toFixed(decimals));

          setCurrent(next);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setCurrent(end);
            observer.disconnect();
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, end, duration, decimals]);

  return current;
};