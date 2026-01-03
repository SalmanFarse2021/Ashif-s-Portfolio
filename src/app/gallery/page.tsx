"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GalleryScene } from "@/components/three/GalleryScene";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function GalleryPage() {
    return (
        <div className="h-screen w-full relative bg-gray-100">
            <div className="absolute top-20 left-4 md:left-8 z-10">
                <Button variant="outline" asChild className="bg-background/80 backdrop-blur">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back Home
                    </Link>
                </Button>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                <p className="text-sm font-medium bg-background/80 backdrop-blur px-4 py-2 rounded-full">
                    Drag to look around • Click a frame to view project
                </p>
            </div>

            <Canvas camera={{ position: [0, 2, 5], fov: 60 }} shadows className="h-full">
                <Suspense fallback={null}>
                    <GalleryScene />
                </Suspense>
            </Canvas>

            {/* Gallery Grid Overlay (Scrollable if needed, or toggle) */}
            <GalleryGrid />
        </div>
    );
}

function GalleryGrid() {
    const { images } = useGallery();
    const [isOpen, setIsOpen] = useState(false);

    if (images.length === 0) return null;

    return (
        <>
            <div className="absolute bottom-8 right-8 z-20">
                <Button onClick={() => setIsOpen(true)} className="gap-2 shadow-xl">
                    <Grid2X2 className="h-4 w-4" /> View Gallery Grid
                </Button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto p-4 md:p-8 animate-in fade-in duration-300">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bold">Image Gallery</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                            {images.map((img, i) => (
                                <div key={i} className="relative group break-inside-avoid rounded-xl overflow-hidden">
                                    <img
                                        src={img}
                                        alt={`Gallery image ${i}`}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import { Grid2X2, X } from "lucide-react";
import { useGallery } from "@/hooks/usePortfolioData";
