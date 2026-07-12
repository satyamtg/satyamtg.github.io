import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// ─── Custom GLSL Shader Code for soft circular stardust stars ───────────────────

const vertexShader = `
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation: larger when closer to camera
    gl_PointSize = 32.0 / -mvPosition.z;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // SDF (Signed Distance Field) to shape default square points into gorgeous soft circles
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float glow = smoothstep(0.5, 0.05, dist);
    gl_FragColor = vec4(vColor, glow * 0.75);
  }
`;

/**
 * Premium Google-Prism Spotlight 3D Undulating Wave Grid
 * 
 * - Grid rests as a quiet, flat, low-opacity matte slate-silver star field.
 * - Global window tracking ensures mouse swell works perfectly with fixed/pointer-events-none overlays.
 * - Only stardust directly inside the mouse spotlight lights up with solid Google brand colors:
 *   Google Blue (#4285F4) | Google Red (#EA4335) | Google Yellow (#FBBC05) | Google Green (#34A853).
 */
const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseInfluence = useRef({ x: 0, y: 0 });
  const globalMouse = useRef({ x: 0, y: 0 }); // Global window coordinate tracking

  // Capture global mouse movements because pointer-events-none blocks canvas state.mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalise screen client mouse positions to -1.0 -> 1.0
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { positions, colors, count, cols, rows } = useMemo(() => {
    const cols = 55;
    const rows = 55;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    let index = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const xPos = (x - cols / 2) * 0.7;
        const zPos = (z - rows / 2) * 0.7;

        positions[index * 3] = xPos;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = zPos;

        // Base resting color: clean, flat M3 slate-silver-grey (RGB: 92, 88, 102)
        colors[index * 3] = 92 / 255;
        colors[index * 3 + 1] = 88 / 255;
        colors[index * 3 + 2] = 102 / 255;
        index++;
      }
    }

    return { positions, colors, count, cols, rows };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth cursor coordinate tracking driven by global mouse coordinates
    mouseInfluence.current.y += (globalMouse.current.x * 1.5 - mouseInfluence.current.y) * 0.04;
    mouseInfluence.current.x += (-globalMouse.current.y * 1.0 - mouseInfluence.current.x) * 0.04;

    // Map 2D global screen mouse positions to WebGL X-Z coordinates
    const mouseX = globalMouse.current.x * 12;
    const mouseZ = -globalMouse.current.y * 12;

    const geoPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const geoColors = pointsRef.current.geometry.attributes.color.array as Float32Array;

    // Base resting color: matte slate-silver-grey
    const baseR = 92 / 255;
    const baseG = 88 / 255;
    const baseB = 102 / 255;

    // Flat solid Google Brand colors
    const gBlue   = { r: 66 / 255,  g: 133 / 255, b: 244 / 255 }; // #4285F4
    const gRed    = { r: 234 / 255, g: 67 / 255,  b: 53 / 255  }; // #EA4335
    const gYellow = { r: 251 / 255, g: 188 / 255, b: 5 / 255   }; // #FBBC05
    const gGreen  = { r: 52 / 255,  g: 168 / 255, b: 83 / 255  }; // #34A853

    let index = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const xPos = (x - cols / 2) * 0.7;
        const zPos = (z - rows / 2) * 0.7;

        // Base undulating sine wave rolling
        const distance = Math.sqrt(xPos * xPos + zPos * zPos);
        let yPos =
          Math.sin(distance * 0.38 - t * 1.3) * 0.85 +
          Math.cos(xPos * 0.22 + t * 0.8) * 0.45 +
          Math.sin(zPos * 0.3 + t) * 0.25;

        // Mouse distance calculations relative to global mouse coordinates
        const dx = xPos - mouseX;
        const dz = zPos - mouseZ;
        const distToMouse = Math.sqrt(dx * dx + dz * dz);

        // Swell is locally confined to the mouse radius
        const mouseSwell = Math.max(0, 4.0 - distToMouse) * 0.45;
        yPos += mouseSwell;

        // Apply WebGL grid positions with cursor parallax tilt
        geoPositions[index * 3] = xPos + mouseInfluence.current.y * 0.7;
        geoPositions[index * 3 + 1] = yPos + mouseInfluence.current.x * 1.2 - 2.2;
        geoPositions[index * 3 + 2] = zPos + mouseInfluence.current.y * 0.7;

        // ── Google Prism Spotlight Mathematics ────────────────────────────────────
        let r = baseR;
        let g = baseG;
        let b = baseB;

        const spotlightRadius = 4.0;
        if (distToMouse < spotlightRadius) {
          // Calculate spotlight transition intensity (smooth falloff near circle boundary)
          const intensity = Math.pow(Math.max(0, 1.0 - distToMouse / spotlightRadius), 1.5);

          // Find the angle of the star relative to your cursor center to map the 4 brand colors
          const angle = Math.atan2(dz, dx); // range -PI to PI

          let targetR = baseR;
          let targetG = baseG;
          let targetB = baseB;

          // Split the cursor spotlight area into four distinct quadrants (Google Blue, Red, Yellow, Green)
          if (angle >= -Math.PI && angle < -Math.PI / 2) {
            targetR = gBlue.r; targetG = gBlue.g; targetB = gBlue.b;
          } else if (angle >= -Math.PI / 2 && angle < 0) {
            targetR = gRed.r; targetG = gRed.g; targetB = gRed.b;
          } else if (angle >= 0 && angle < Math.PI / 2) {
            targetR = gYellow.r; targetG = gYellow.g; targetB = gYellow.b;
          } else {
            targetR = gGreen.r; targetG = gGreen.g; targetB = gGreen.b;
          }

          // Linearly blend from base slate-silver to solid Google brand color based on intensity
          r = baseR + intensity * (targetR - baseR);
          g = baseG + intensity * (targetG - baseG);
          b = baseB + intensity * (targetB - baseB);
        }

        geoColors[index * 3] = r;
        geoColors[index * 3 + 1] = g;
        geoColors[index * 3 + 2] = b;

        index++;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    // Slow organic ambient spin
    pointsRef.current.rotation.y = t * 0.015;
  });

  return (
    <>
      <fog attach="fog" args={['#0F0D13', 10, 26]} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        </bufferGeometry>
        {/* Custom shader material for soft round glow stars */}
        <shaderMaterial
          attach="material"
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default ParticleField;