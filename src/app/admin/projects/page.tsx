"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { projects as defaultProjects } from "@/data/projects";
import { saveProjects, loadProjects } from "@/lib/adminStorage";
import { Plus, Edit, Trash2, Copy } from "lucide-react";

export default function ProjectsManager() {
    const router = useRouter();
    const [projects, setProjects] = useState(defaultProjects);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const savedProjects = await loadProjects();
            // Allow empty array if user deleted everything
            if (savedProjects && Array.isArray(savedProjects)) {
                setProjects(savedProjects);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const duplicateProject = async (project: any) => {
        if (!confirm('Are you sure you want to duplicate this project?')) return;

        const newSlug = `${project.slug}-copy-${Date.now()}`;
        const newProject = {
            ...project,
            slug: newSlug,
            title: `${project.title} (Copy)`,
            // Ensure arrays are cloned
            images: [...(project.images || [])],
            tags: [...(project.tags || [])],
            tools: [...(project.tools || [])],
            metrics: [...(project.metrics || [])],
        };

        const newProjects = [...projects, newProject];
        const success = await saveProjects(newProjects);

        if (success) {
            setProjects(newProjects);
        }
    };

    const handleDelete = async (slug: string) => {
        if (confirm("Are you sure you want to delete this project?")) {
            const newProjects = projects.filter((p) => p.slug !== slug);
            const success = await saveProjects(newProjects);
            if (success) {
                setProjects(newProjects);
            } else {
                alert('Failed to delete project');
            }
        }
    };

    return (
        <div className="space-y-8 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your portfolio projects
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={async () => {
                            if (confirm('Are you sure you want to restore all demo projects? This will replace your current list.')) {
                                const success = await saveProjects(defaultProjects);
                                if (success) {
                                    setProjects(defaultProjects);
                                }
                            }
                        }}
                        className="gap-2"
                    >
                        Restore Demo Data
                    </Button>
                    <Link href="/admin/projects/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Project
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.slug}>
                        <CardHeader>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription>{project.type} • {project.year}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {(project as any).description || project.role}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => duplicateProject(project)}
                                    title="Duplicate"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Link href={`/admin/projects/${project.slug}`} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(project.slug)}
                                    className="gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {projects.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground mb-4">No projects yet</p>
                        <Link href="/admin/projects/new">
                            <Button>Add Your First Project</Button>
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
