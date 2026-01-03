"use client";

import Link from "next/link";
import { Project } from "@/data/projects";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectImage } from "@/components/ProjectImage";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={`/projects/${project.slug}`}>
                <Card className="overflow-hidden group cursor-pointer border-border hover:border-primary/50 transition-colors h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                        <ProjectImage
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="group-hover:scale-105 transition-transform duration-500"
                            title={project.title}
                            category={project.type}
                        />
                    </div>
                    <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                    {project.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {project.location} • {project.year}
                                </p>
                            </div>
                            <Badge variant="secondary">{project.type}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3">
                            {project.shortDesc}
                        </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="bg-secondary px-2 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                            {project.tags.length > 3 && (
                                <span className="px-2 py-1">+ {project.tags.length - 3}</span>
                            )}
                        </div>
                        <div className="ml-auto flex items-center gap-2 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                            View Project <ArrowRight className="w-4 h-4" suppressHydrationWarning />
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div >
    );
}
