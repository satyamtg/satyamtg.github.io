import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let instance: Lenis | null = null;

/**
 * Creates (or returns existing) Lenis instance, wired into GSAP's ticker
 * so ScrollTrigger stays in sync with the smooth scroll position.
 */
export const createLenis = (): Lenis => {
  if (instance) return instance;

  instance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Keep ScrollTrigger positions in sync with Lenis scroll
  instance.on('scroll', ScrollTrigger.update);

  // Drive Lenis via GSAP's ticker instead of its own requestAnimationFrame
  gsap.ticker.add((time) => {
    instance?.raf(time * 1000);
  });

  // Prevent GSAP from skipping frames during tab switches
  gsap.ticker.lagSmoothing(0);

  return instance;
};

export const destroyLenis = (): void => {
  if (!instance) return;
  instance.destroy();
  instance = null;
};

export const getLenis = (): Lenis | null => instance;