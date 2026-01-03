"use client";

import { use } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProjectImage } from "@/components/ProjectImage";
import { Divider } from "@/components/ui/Divider";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Tag } from "lucide-react";
import { useProject, useProjects } from "@/hooks/usePortfolioData";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = use(params);
    const { project, loading } = useProject(slug);
    const { projects } = useProjects();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!project) {
        notFound();
    }

    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <ProjectImage
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover"
                    title={project.title}
                    category={project.type}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <Container className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-12 md:pb-20">
                    <div className="space-y-4 max-w-4xl">
                        <Badge variant="secondary" className="mb-4">{project.type}</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{project.title}</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground">{project.shortDesc}</p>
                    </div>
                </Container>
            </div>

            <Container className="mt-12 md:mt-24">
                {/* Summary Table & Metrics */}
                <div className="grid md:grid-cols-3 gap-12 mb-20">
                    <div className="md:col-span-1 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Tag className="w-4 h-4" /> Role</h3>
                            <p className="text-muted-foreground">{project.role}</p>
                        </div>
                        <Divider />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-4 h-4" /> Year</h3>
                            <p className="text-muted-foreground">{project.year}</p>
                        </div>
                        <Divider />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
                            <p className="text-muted-foreground">{project.location}</p>
                        </div>
                        <Divider />
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Tools Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map(tool => (
                                    <Badge key={tool} variant="outline">{tool}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-12">
                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {project.metrics.map(metric => (
                                <div key={metric.label} className="bg-secondary/10 p-4 rounded-lg border border-border">
                                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                                    <p className="text-lg md:text-xl font-bold text-primary">{metric.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Problem / Solution */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">The Challenge</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold">The Solution</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <Section className="border-t">
                    <h2 className="text-3xl font-bold mb-12">Project Gallery</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {project.images.map((img, idx) => (
                            <div key={idx} className={`relative rounded-xl overflow-hidden aspect-video ${idx === 0 ? 'md:col-span-2 md:aspect-[2/1]' : ''}`}>
                                <ProjectImage
                                    src={img}
                                    alt={`${project.title} - View ${idx + 1}`}
                                    fill
                                    className="hover:scale-105 transition-transform duration-700"
                                    title={project.title}
                                    category={`View ${idx + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Navigation */}
                <div className="flex justify-between items-center py-12 border-t mt-12">
                    <Button variant="ghost" asChild className="group">
                        <Link href={`/projects/${prevProject.slug}`}>
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Previous Project
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild className="group">
                        <Link href={`/projects/${nextProject.slug}`}>
                            Next Project
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </Container>
        </div>
    );
}
