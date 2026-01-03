"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, MeshReflectorMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Modern tapered skyscraper
function ModernTower({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={ref} position={position}>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.8, 1, 2, 8]} />
                <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.7, 0.8, 2, 8]} />
                <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[0.5, 0.7, 2, 8]} />
                <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 7, 0]}>
                <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
                <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, 8.5, 0]}>
                <coneGeometry args={[0.3, 1, 8]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

// Sleek office tower
function OfficeTower({ position, height = 6 }: { position: [number, number, number]; height?: number }) {
    return (
        <mesh position={[position[0], height / 2, position[2]]}>
            <boxGeometry args={[1.2, height, 1.2]} />
            <meshStandardMaterial
                color="#374151"
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
}

// Geometric accent structure
function GeometricAccent({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <octahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial
                color="#8b5cf6"
                metalness={0.9}
                roughness={0.1}
                emissive="#8b5cf6"
                emissiveIntensity={0.3}
            />
        </mesh>
    );
}

// Floating sphere accent
function FloatingSphere({ position }: { position: [number, number, number] }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial
                color="#06b6d4"
                metalness={0.9}
                roughness={0.1}
                emissive="#06b6d4"
                emissiveIntensity={0.4}
            />
        </mesh>
    );
}

// Enhanced ground with better reflections
function PremiumGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <planeGeometry args={[80, 80]} />
            <MeshReflectorMaterial
                blur={[400, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#030712"
                metalness={0.8}
            />
        </mesh>
    );
}

// Architectural cityscape
function ArchitecturalCity() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central hero tower */}
            {/* Central hero tower */}
            <group position={[4, 0, 0]}>
                <ModernTower position={[0, 0, 0]} />

                {/* Office towers */}
                <OfficeTower position={[-5, 0, -2]} height={5} />
                <OfficeTower position={[5, 0, -2]} height={6} />
                <OfficeTower position={[-4, 0, 4]} height={4} />
                <OfficeTower position={[4, 0, 4]} height={5} />
                <OfficeTower position={[-7, 0, 2]} height={3} />
                <OfficeTower position={[7, 0, 1]} height={4} />

                {/* Geometric accents */}
                <GeometricAccent position={[-3, 1.5, -5]} />
                <GeometricAccent position={[3, 1.5, 5]} />

                {/* Floating spheres */}
                <FloatingSphere position={[-6, 3, 5]} />
                <FloatingSphere position={[6, 3, -3]} />
            </group>
        </group>
    );
}

export function HeroScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[14, 10, 14]} fov={50} />

            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.2} />

            {/* Main key light */}
            <directionalLight
                position={[15, 15, 10]}
                intensity={2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Accent lights */}
            <pointLight position={[0, 12, 0]} intensity={80} color="#06b6d4" />
            <pointLight position={[-10, 8, -8]} intensity={50} color="#8b5cf6" />
            <pointLight position={[10, 6, 8]} intensity={40} color="#ec4899" />

            {/* Rim light */}
            <spotLight
                position={[0, 20, 0]}
                angle={0.4}
                penumbra={1}
                intensity={120}
                color="#06b6d4"
            />

            {/* Scene */}
            <PremiumGround />
            <ArchitecturalCity />

            {/* Atmospheric fog */}
            <fog attach="fog" args={['#030712', 18, 50]} />

            {/* Camera Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2.4}
                minPolarAngle={Math.PI / 7}
            />
        </>
    );
}
