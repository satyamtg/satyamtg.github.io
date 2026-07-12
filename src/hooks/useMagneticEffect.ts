import { useCallback, useRef, useState } from 'react';

interface MagneticPosition {
  x: number;
  y: number;
}

interface UseMagneticEffectReturn {
  ref: React.RefObject<HTMLDivElement>;
  position: MagneticPosition;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * Returns mouse-relative position for magnetic hover effects.
 * `strength` controls how far the element drifts (0–1).
 */
export const useMagneticEffect = (strength = 0.28): UseMagneticEffectReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      setPosition({ x, y });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { ref, position, onMouseMove, onMouseLeave };
};