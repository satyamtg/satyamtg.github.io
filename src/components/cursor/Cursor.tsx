import { useEffect, useRef } from 'react';

/**
 * Custom cursor — two layers:
 *  1. `dot`  — follows mouse exactly (instant, no lag)
 *  2. `ring` — follows with lerp smoothing (trailing feel)
 *
 * Position is driven via RAF + direct style mutation (no React state)
 * for maximum performance at 60/120fps.
 */
const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const isHoveringLink = useRef(false);
  const isHoveringProject = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseEnterLink = () => {
      isHoveringLink.current = true;
      ring.classList.add('cursor-ring--expanded');
      dot.classList.add('cursor-dot--hidden');
    };

    const onMouseLeaveLink = () => {
      isHoveringLink.current = false;
      ring.classList.remove('cursor-ring--expanded');
      dot.classList.remove('cursor-dot--hidden');
    };

    const onMouseEnterProject = () => {
      isHoveringProject.current = true;
      ring.classList.add('cursor-ring--project');
    };

    const onMouseLeaveProject = () => {
      isHoveringProject.current = false;
      ring.classList.remove('cursor-ring--project');
    };

    const animate = () => {
      const lerp = 0.14;
      smooth.current.x += (mouse.current.x - smooth.current.x) * lerp;
      smooth.current.y += (mouse.current.y - smooth.current.y) * lerp;

      dot.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${smooth.current.x}px, ${smooth.current.y}px) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(animate);
    };

    // Attach link/project hover listeners via event delegation
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        onMouseEnterLink();
      } else if (target.closest('[data-cursor="project"]')) {
        onMouseEnterProject();
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        onMouseLeaveLink();
      } else if (target.closest('[data-cursor="project"]')) {
        onMouseLeaveProject();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Dot — instant, M3 primary purple */}
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full opacity-0 transition-[width,height,opacity] duration-150"
        style={{ willChange: 'transform', backgroundColor: '#D0BCFF' }}
      />
      {/* Ring — smoothed */}
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full opacity-0 transition-[width,height,border-color,opacity] duration-200"
        style={{ willChange: 'transform', border: '1px solid rgba(208,188,255,0.4)' }}
      />

      <style>{`
        .cursor-dot--hidden { opacity: 0 !important; }
        .cursor-ring--expanded {
          width: 3rem !important;
          height: 3rem !important;
          border-color: rgba(208, 188, 255, 0.7) !important;
        }
        .cursor-ring--project {
          width: 5rem !important;
          height: 5rem !important;
          background-color: rgba(208, 188, 255, 0.06) !important;
          border-color: rgba(208, 188, 255, 0.5) !important;
        }
      `}</style>
    </>
  );
};

export default Cursor;