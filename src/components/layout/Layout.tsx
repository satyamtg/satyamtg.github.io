import Cursor from '@/components/cursor';
import { createLenis, destroyLenis } from '@/lib/lenis';
import { Canvas } from '@react-three/fiber';
import { Suspense, lazy, useEffect } from 'react';

const ParticleField = lazy(() => import('../sections/Hero/ParticleField'));

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout. Initialises Lenis smooth scroll + mounts the global custom cursor
 * and lifts the 3D Undulating Particle Wave into a fixed global background layer.
 * CSS backdrop gradients are removed to let the 3D colored stardust shine.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    createLenis();
    return () => destroyLenis();
  }, []);

  return (
    /* noise-overlay adds the film grain pseudo-element */
    <div className="noise-overlay relative min-h-screen bg-bg text-primary overflow-x-hidden">
      {/* ── Fixed Background Volumetric Layer (Clean, Deep Space) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none h-screen w-screen overflow-hidden" aria-hidden="true">
        {/* Global Fixed Three.js Wave Background */}
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]}
          >
            <ParticleField />
          </Canvas>
        </Suspense>
      </div>

      {/* Global custom cursor layer */}
      <Cursor />

      {/* Main scrollable content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;