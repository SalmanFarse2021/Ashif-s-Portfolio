"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroScene } from "@/components/three/HeroScene";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

// Animation Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.610, 0.355, 1.000], // easeOutCubic
        },
    },
};

const letterContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.5
        },
    },
};

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "backOut" },
    },
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
    return (
        <motion.span
            variants={letterContainerVariants}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export function Hero() {
    return (
        <section className="relative h-[90vh] w-full bg-transparent overflow-hidden">
            {/* 3D Scene Background - Adjusted z-index and opacity */}
            <div className="absolute inset-x-0 top-0 h-[100%] z-0 opacity-80 md:opacity-100 mix-blend-screen pointer-events-none md:pointer-events-auto">
                {/* pointer-events-none on mobile if interaction interferes with text scroll, 
                     but kept auto on desktop for orbit controls. 
                     Refined mix-blend mode for better background integration.
                  */}
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                    camera={{ position: [5, 2, 10], fov: 45 }} // Slight angle adjust
                >
                    <Suspense fallback={null}>
                        <HeroScene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Overlay Content */}
            <Container className="relative z-10 h-full flex items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl w-full"
                >
                    {/* Glassmorphic Card for better readability */}
                    <div className="relative backdrop-blur-sm bg-background/30 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden group">
                        {/* Decorative glow */}
                        <div className="absolute -top-[200px] -left-[200px] w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />

                        <div className="relative z-10 space-y-8">
                            {/* Eyebrow Label */}
                            <motion.div variants={itemVariants}>
                                <span className="inline-block py-1 px-3 rounded-full bg-secondary/50 border border-secondary text-primary/80 text-xs font-mono tracking-widest uppercase mb-4">
                                    Portfolio 2026
                                </span>
                            </motion.div>

                            {/* Main Headline */}
                            <div className="flex flex-col gap-2 md:gap-4">
                                <motion.h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] text-foreground"
                                    variants={itemVariants}
                                >
                                    Engineering <span className="font-bold text-white">Logic</span> +
                                </motion.h1>
                                <motion.h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] text-foreground/80 pl-4 md:pl-12"
                                    variants={itemVariants}
                                >
                                    Architectural <span className="font-bold text-primary">Vision</span>
                                </motion.h1>
                            </div>

                            {/* CTAs */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-8">
                                <Button size="xl" className="rounded-full px-8 text-lg shadow-primary/20 shadow-lg hover:shadow-primary/40 transition-shadow" asChild>
                                    <Link href="/projects">View Projects</Link>
                                </Button>
                                <Button size="xl" variant="outline" className="rounded-full px-8 text-lg bg-transparent border-primary/20 hover:bg-primary/10" asChild>
                                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                        <ArrowDown className="mr-2 h-5 w-5" suppressHydrationWarning /> Resume
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">Scroll</span>
                    <ArrowDown className="text-primary h-5 w-5" suppressHydrationWarning />
                </motion.div>
            </Container>
        </section>
    );
}
