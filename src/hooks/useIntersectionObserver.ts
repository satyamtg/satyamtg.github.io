import { useEffect, useRef, useState } from 'react';

/**
 * Returns `true` once the observed element has entered the viewport.
 * By default, fires only once (`triggerOnce: true`).
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit & { triggerOnce?: boolean } = {},
): [React.RefObject<HTMLDivElement>, boolean] => {
  const { triggerOnce = true, threshold = 0.15, rootMargin = '0px', ...rest } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin, ...rest },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerOnce, threshold, rootMargin]);

  return [ref, isVisible];
};