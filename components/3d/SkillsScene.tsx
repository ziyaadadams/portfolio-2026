'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d9ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SkillNode({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, color, speed = 1 }: { radius: number; color: string; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * speed * 0.1) * 0.2;
    }
  });

  const nodes = useMemo(() => {
    const count = 6;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.3,
          Math.sin(angle) * radius * 0.5,
        ] as [number, number, number],
        size: 0.15 + Math.random() * 0.1,
      };
    });
  }, [radius]);

  return (
    <group ref={groupRef}>
      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <SkillNode key={i} position={node.position} color={color} size={node.size} />
      ))}
    </group>
  );
}

function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.05);
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#0a0e27"
          emissive="#00d9ff"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0.1}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function SkillsVisualization() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d9ff" />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#a78bfa" />
      <Stars radius={50} depth={30} count={500} factor={3} fade speed={0.5} />
      
      <FloatingParticles />
      <CentralCore />
      
      <OrbitRing radius={2.5} color="#00d9ff" speed={1} />
      <OrbitRing radius={4} color="#a78bfa" speed={0.7} />
      <OrbitRing radius={5.5} color="#10b981" speed={0.5} />
    </>
  );
}

export default function SkillsScene() {
  return (
    <Canvas 
      camera={{ position: [0, 2, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SkillsVisualization />
      </Suspense>
    </Canvas>
  );
}
