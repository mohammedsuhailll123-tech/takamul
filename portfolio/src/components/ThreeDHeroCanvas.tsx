import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Component: Mouse Light Tracker ───
// Follows the mouse cursor on screen to direct spot/point lighting dynamically
const MouseLight: React.FC = () => {
  const { viewport } = useThree();
  const lightRef = useRef<THREE.PointLight>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (lightRef.current) {
      // Map to 3D space based on viewport scale
      const targetX = mouse.x * (viewport.width / 2);
      const targetY = mouse.y * (viewport.height / 2);
      
      // Interpolate for smooth trailing effect
      lightRef.current.position.x += (targetX - lightRef.current.position.x) * 0.1;
      lightRef.current.position.y += (targetY - lightRef.current.position.y) * 0.1;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={8}
      color="#00f0ff"
      distance={8}
      decay={2}
    />
  );
};

// ─── Component: Wireframe Globe ───
// Slowly rotating wireframe sphere with pulsing dots representing electrical nodes
const WireframeGlobe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <mesh ref={globeRef} position={[0, 0, -1]}>
      <sphereGeometry args={[1.8, 24, 24]} />
      <meshBasicMaterial 
        color="#0088ff" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
      {/* Node rings */}
      <mesh>
        <sphereGeometry args={[1.82, 6, 6]} />
        <meshBasicMaterial 
          color="#00f0ff" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </mesh>
  );
};

// ─── Component: Glowing Energy Cable ───
// Renders a curving wire/cabling with an energy pulse moving along it
interface CableProps {
  start: [number, number, number];
  end: [number, number, number];
  control: [number, number, number];
  speed?: number;
  color?: string;
}

const EnergyCable: React.FC<CableProps> = ({ start, end, control, speed = 0.5, color = '#00f0ff' }) => {
  const pulseRef = useRef<THREE.Mesh>(null);

  // Generate curve path using QuadraticBezier
  const curve = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const vControl = new THREE.Vector3(...control);
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
  }, [start, end, control]);

  // Retrieve line points for rendering the cable line
  const linePoints = useMemo(() => {
    return curve.getPoints(50);
  }, [curve]);

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      // Calculate animated progress along the curve path
      const t = (clock.getElapsedTime() * speed) % 1;
      const position = curve.getPointAt(t);
      pulseRef.current.position.copy(position);
    }
  });

  return (
    <group>
      {/* The static cable wire */}
      <Line
        points={linePoints}
        color={color}
        lineWidth={1.2}
        opacity={0.25}
        transparent
      />
      {/* Glowing current pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
        {/* Outer glow ring around the pulse */}
        <pointLight intensity={2} distance={1.2} color={color} decay={2} />
      </mesh>
    </group>
  );
};

// ─── Component: Floating Industrial Blocks (Transformers) ───
// Gentle floating, rotating metallic blocks representing transformers and machinery
const FloatingComponents: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      
      // Floating translation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
      
      // Rotate child items at individual rates
      groupRef.current.children.forEach((child, idx) => {
        child.rotation.y = time * (0.1 + idx * 0.05);
        child.rotation.x = Math.sin(time * (0.05 + idx * 0.02)) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Transformer cube 1 */}
      <mesh position={[-2.8, 1.2, -1.5]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#1e293b" 
          roughness={0.2} 
          metalness={0.8}
          emissive="#3b82f6"
          emissiveIntensity={0.15}
        />
        {/* Glow rings around box */}
        <Line 
          points={[[-0.26,-0.26,-0.26], [0.26,-0.26,-0.26], [0.26,0.26,-0.26], [-0.26,0.26,-0.26], [-0.26,-0.26,-0.26]]} 
          color="#06b6d4" 
          lineWidth={2}
        />
      </mesh>

      {/* Transformer cube 2 */}
      <mesh position={[2.5, -1.0, -1.2]}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial 
          color="#1e293b" 
          roughness={0.1} 
          metalness={0.9}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
        <Line 
          points={[[-0.31,-0.21,-0.31], [0.31,-0.21,-0.31], [0.31,0.21,-0.31], [-0.31,0.21,-0.31], [-0.31,-0.21,-0.31]]} 
          color="#3b82f6" 
          lineWidth={2.5}
        />
      </mesh>

      {/* Floating isolator ring */}
      <mesh position={[-2.2, -1.5, -2]}>
        <torusGeometry args={[0.35, 0.08, 8, 24]} />
        <meshStandardMaterial 
          color="#334155" 
          roughness={0.3} 
          metalness={0.7}
          emissive="#00f0ff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

// ─── Component: Particle Starfield (Energy Field) ───
// Ambient floating grid particles representing static electricity and energy pulses
const EnergyField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 180;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sp = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // Spawn within a generous spherical grid boundary
      const radius = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 2; // Offset back slightly

      sp[i] = 0.05 + Math.random() * 0.15;
    }
    return [pos, sp];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < particleCount; i++) {
        // Slow rising floating vector motion
        positionsArray[i * 3 + 1] += speeds[i] * delta * 4;
        
        // Add waving motion
        positionsArray[i * 3] += Math.sin(time + i) * 0.003;

        // Reset if floats too high
        if (positionsArray[i * 3 + 1] > 5) {
          positionsArray[i * 3 + 1] = -5;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        transparent
        opacity={0.65}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

// ─── Component: Interactive Power Grid Lines ───
// A background grid layout representing grid connections with minor pulse highlights
const PowerGridLines: React.FC = () => {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      // Slow rotation on the floor grid
      gridRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group position={[0, -2.5, -2]}>
      <gridHelper
        ref={gridRef}
        args={[15, 12, '#3b82f6', '#1e293b']}
        position={[0, 0, 0]}
      />
    </group>
  );
};

// ─── MAIN CANVAS CONTAINER ───
export const ThreeDHeroCanvas: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft atmospheric base lights */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        
        {/* Interactive Mouse pointer light */}
        <MouseLight />

        {/* 3D Core Geometries */}
        <WireframeGlobe />
        <FloatingComponents />
        <EnergyField />
        <PowerGridLines />

        {/* Cable Networks with Energy flows */}
        {/* Left curve (electric blue) */}
        <EnergyCable 
          start={[-4, 2, -2]} 
          end={[0, 1.8, -1]} 
          control={[-2, 3, -1]} 
          speed={0.4} 
          color="#3b82f6" 
        />
        {/* Right curve (cyan) */}
        <EnergyCable 
          start={[4, -2, -2]} 
          end={[0, -1.8, -1]} 
          control={[2, -3, -1]} 
          speed={0.5} 
          color="#06b6d4" 
        />
        {/* Cross center link */}
        <EnergyCable 
          start={[-2.8, 1.2, -1.5]} 
          end={[2.5, -1.0, -1.2]} 
          control={[0, 0, -3]} 
          speed={0.3} 
          color="#a855f7" 
        />

        {/* Gentle scroll orbit controllers */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 1.8} 
          minPolarAngle={Math.PI / 2.2} 
        />
      </Canvas>
    </div>
  );
};
export default ThreeDHeroCanvas;
