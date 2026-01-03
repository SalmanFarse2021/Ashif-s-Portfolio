"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, Text, useCursor, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { projects } from "@/data/projects";

// Geometry for the room
function Room() {
    const material = new THREE.MeshStandardMaterial({
        color: "#f0f0f0",
        roughness: 0.8,
        side: THREE.BackSide, // Render inside of box
    });

    return (
        <mesh receiveShadow position={[0, 5, 0]}>
            <boxGeometry args={[20, 10, 20]} />
            <meshStandardMaterial color="#e0e0e0" side={THREE.BackSide} />
        </mesh>
    );
}

// Frame component
function Frame({ project, position, rotation, index }: { project: any; position: [number, number, number]; rotation: [number, number, number]; index: number }) {
    const router = useRouter();
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    // Animate scale on hover
    const group = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (group.current) {
            const targetScale = hovered ? 1.1 : 1;
            group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 10);
        }
    });

    // Create gradient texture for demo
    const gradientTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Gradient based on index for variety
            const colors = [
                ['#06b6d4', '#8b5cf6'],
                ['#8b5cf6', '#ec4899'],
                ['#ec4899', '#f97316'],
                ['#f97316', '#06b6d4'],
                ['#10b981', '#06b6d4'],
                ['#f59e0b', '#ec4899'],
            ];
            const [color1, color2] = colors[index % colors.length];

            const gradient = ctx.createLinearGradient(0, 0, 512, 512);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);

            // Add project title
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.font = 'bold 36px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Wrap text if too long
            const maxWidth = 450;
            const words = project.title.split(' ');
            let line = '';
            let y = 256;

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && i > 0) {
                    ctx.fillText(line, 256, y);
                    line = words[i] + ' ';
                    y += 45;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 256, y);

            // Add project type
            ctx.font = '20px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fillText(project.type, 256, y + 50);
        }
        return new THREE.CanvasTexture(canvas);
    }, [project.title, project.type, index]);

    return (
        <group ref={group} position={position} rotation={rotation}>
            <mesh
                onClick={() => router.push(`/projects/${project.slug}`)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <planeGeometry args={[3, 2]} />
                <meshBasicMaterial map={gradientTexture} />
            </mesh>

            {/* Frame Border */}
            <mesh position={[0, 0, -0.05]}>
                <boxGeometry args={[3.2, 2.2, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Label */}
            <Text
                position={[0, -1.3, 0]}
                fontSize={0.15}
                color="#fff"
                anchorX="center"
                anchorY="middle"
            >
                {project.title}
            </Text>
        </group>
    );
}

export function GalleryScene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 8, 0]} intensity={50} />

            <Room />

            <group position={[0, -1, 0]}>
                {projects.map((project, i) => {
                    // Arrange frames in a circle or on walls
                    // For simplicity: 3 walls
                    // 6 projects. 2 per wall (left, back, right)

                    let pos: [number, number, number] = [0, 0, 0];
                    let rot: [number, number, number] = [0, 0, 0];

                    if (i < 2) {
                        // Left Wall
                        pos = [-9, 2, -4 + (i * 8)];
                        rot = [0, Math.PI / 2, 0];
                    } else if (i < 4) {
                        // Back Wall
                        pos = [-4 + ((i - 2) * 8), 2, -9];
                        rot = [0, 0, 0];
                    } else {
                        // Right Wall
                        pos = [9, 2, -4 + ((i - 4) * 8)];
                        rot = [0, -Math.PI / 2, 0];
                    }

                    return <Frame key={project.slug} project={project} position={pos} rotation={rot} index={i} />;
                })}
            </group>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2}
                rotateSpeed={0.5}
            />
        </>
    );
}
