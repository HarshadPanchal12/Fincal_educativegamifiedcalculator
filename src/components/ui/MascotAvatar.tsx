'use client';

import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface MascotProps {
    healthScore: number; // 0-100
}

export default function MascotAvatar({ healthScore }: MascotProps) {
    const meshRef = useRef<THREE.Mesh>(null!);

    // Color transitions based on health
    // 0 -> Red (#da3832)
    // 50 -> Grey (#919090)
    // 100 -> Blue (#224c87)
    const getMascotColor = () => {
        if (healthScore >= 70) return '#224c87';
        if (healthScore >= 40) return '#919090';
        return '#da3832';
    };

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(time * 2) * 0.1 + 1; // Floating animation
        meshRef.current.rotation.y = time * 0.5;

        // Pulse distortion based on "excitement" (health)
        const factor = healthScore / 100;
        meshRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05 * factor);
    });

    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[2, 1, -1]}>
                <MeshDistortMaterial
                    color={getMascotColor()}
                    speed={4}
                    distort={0.3}
                    radius={1}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={getMascotColor()}
                    emissiveIntensity={0.2}
                />
            </Sphere>
        </Float>
    );
}
