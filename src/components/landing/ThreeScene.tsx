'use client';

import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const FinancialCoin = () => {
    const meshRef = useRef<THREE.Group>(null!);

    useFrame((state: RootState) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(time * 1.5) * 0.2;
        // Make it spin like a coin
        meshRef.current.rotation.y = time * 2;
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2 + 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <group ref={meshRef} scale={1.2}>
                {/* Main Coin Body */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
                    <meshStandardMaterial
                        color="#10b981" // Emerald 500
                        emissive="#047857" // Emerald 700
                        emissiveIntensity={0.4}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
                {/* Inner Coin Rim */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
                    <cylinderGeometry args={[1.3, 1.3, 0.21, 64]} />
                    <meshStandardMaterial
                        color="#34d399" // Emerald 400
                        roughness={0.3}
                        metalness={0.6}
                    />
                </mesh>
                {/* Center Symbol (Mocking a simple '$' or '₹' with basic shapes, or just an inner core) */}
                <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.05]}>
                    <cylinderGeometry args={[0.8, 0.8, 0.22, 64]} />
                    <meshStandardMaterial
                        color="#059669" // Emerald 600
                        roughness={0.4}
                        metalness={0.5}
                    />
                </mesh>
            </group>
        </Float>
    );
};

const BackgroundParticles = () => {
    const points = useRef<THREE.Points>(null!);

    useFrame((state: RootState) => {
        points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#10b981" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
};

import MascotAvatar from '@/components/ui/MascotAvatar';

interface ThreeSceneProps {
    healthScore?: number;
}

export default function ThreeScene({ healthScore = 70 }: ThreeSceneProps) {
    return (
        <div className="fixed inset-0 -z-10 bg-slate-50">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />

                <FinancialCoin />
                <MascotAvatar healthScore={healthScore} />
                <BackgroundParticles />

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
                </mesh>
            </Canvas>
        </div>
    );
}
