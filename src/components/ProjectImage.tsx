"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
    title?: string;
    category?: string;
    className?: string; // Add className to props
}

export function ProjectImage({
    src,
    alt,
    fill,
    width,
    height,
    priority = false,
    title = "Project",
    category = "Architecture",
    className,
    ...props
}: ProjectImageProps) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    if (error) {
        return (
            <div
                className={cn(
                    "flex flex-col items-center justify-center bg-gradient-to-br from-secondary/50 via-secondary to-background p-6 text-center text-muted-foreground transition-colors hover:from-secondary hover:to-secondary/50",
                    className
                )}
                style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
                {...props}
            >
                <div className="space-y-2">
                    <p className="text-lg font-bold text-foreground">{title}</p>
                    <p className="text-sm uppercase tracking-wider opacity-70">
                        {category}
                    </p>
                    <span className="text-xs opacity-50 block mt-4">(Image Placeholder)</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn("relative overflow-hidden bg-secondary/20", className)}
            style={{
                width: fill ? "100%" : width,
                height: fill ? "100%" : height,
                position: fill ? "absolute" : "relative",
            }}
            {...props}
        >
            <Image
                src={src}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                priority={priority}
                className={cn(
                    "object-cover transition-all duration-700",
                    loading ? "scale-105 blur-sm" : "scale-100 blur-0"
                )}
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                suppressHydrationWarning
            />
            {loading && (
                <div className="absolute inset-0 bg-secondary/10 animate-pulse" />
            )}
        </div>
    );
}
