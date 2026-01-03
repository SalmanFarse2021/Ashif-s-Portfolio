"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { projects as defaultProjects } from "@/data/projects";
import { saveProjects, loadProjects } from "@/lib/adminStorage";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function ProjectEditor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const isNew = slug === "new";

    const [project, setProject] = useState<any>({
        slug: "",
        title: "",
        year: new Date().getFullYear().toString(),
        location: "",
        type: "Residential",
        role: "",
        tags: [],
        shortDesc: "",
        problem: "",
        solution: "",
        tools: [],
        images: [],
        metrics: [],
    });

    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (!isNew) {
                const savedProjects = await loadProjects();
                if (savedProjects) {
                    const existingProject = savedProjects.find((p: any) => p.slug === slug);
                    if (existingProject) {
                        setProject(existingProject);
                    }
                }
            }
        }
        loadData();
    }, [slug, isNew]);

    const handleSave = async () => {
        const savedProjects = await loadProjects();
        const allProjects = savedProjects || defaultProjects;
        let newProjects;

        if (isNew) {
            newProjects = [...allProjects, project];
        } else {
            newProjects = allProjects.map((p: any) =>
                p.slug === slug ? project : p
            );
        }

        const success = await saveProjects(newProjects);
        if (success) {
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
                if (isNew) {
                    router.push("/admin/projects");
                }
            }, 1000);
        } else {
            alert('Failed to save project');
        }
    };

    const addMetric = () => {
        setProject({
            ...project,
            metrics: [...(project.metrics || []), { label: "New Metric", value: "0" }],
        });
    };

    const removeMetric = (index: number) => {
        setProject({
            ...project,
            metrics: project.metrics.filter((_: any, i: number) => i !== index),
        });
    };

    const updateMetric = (index: number, field: string, value: string) => {
        const newMetrics = [...project.metrics];
        newMetrics[index] = { ...newMetrics[index], [field]: value };
        setProject({ ...project, metrics: newMetrics });
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/admin/projects")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {isNew ? "New Project" : "Edit Project"}
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {isNew ? "Add a new project to your portfolio" : "Update project details"}
                        </p>
                    </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saved ? "Saved!" : "Save Project"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Project Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Slug (URL)</label>
                            <input
                                type="text"
                                value={project.slug}
                                onChange={(e) => setProject({ ...project, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                placeholder="my-project"
                                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Year</label>
                            <input
                                type="number"
                                value={project.year}
                                onChange={(e) => setProject({ ...project, year: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Location</label>
                            <input
                                type="text"
                                value={project.location}
                                onChange={(e) => setProject({ ...project, location: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Type</label>
                            <select
                                value={project.type}
                                onChange={(e) => setProject({ ...project, type: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                            >
                                <option>Residential</option>
                                <option>Commercial</option>
                                <option>Public</option>
                                <option>Industrial</option>
                                <option>Mixed-Use</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Your Role</label>
                        <input
                            type="text"
                            value={project.role}
                            onChange={(e) => setProject({ ...project, role: e.target.value })}
                            placeholder="Lead Architect, Engineer, etc."
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Short Description</label>
                        <textarea
                            value={project.shortDesc}
                            onChange={(e) => setProject({ ...project, shortDesc: e.target.value })}
                            rows={3}
                            placeholder="A brief one-line description of the project"
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tags & Tools</CardTitle>
                    <CardDescription>Project categories, keywords, and tools used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ArrayInput
                        label="Tags"
                        values={project.tags}
                        onChange={(values) => setProject({ ...project, tags: values })}
                        placeholder="e.g., Residential, Modern"
                        description="Project categories and keywords"
                    />

                    <ArrayInput
                        label="Tools"
                        values={project.tools}
                        onChange={(values) => setProject({ ...project, tools: values })}
                        placeholder="e.g., AutoCAD, Revit"
                        description="Software and tools used in this project"
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Problem Statement</label>
                        <textarea
                            value={project.problem}
                            onChange={(e) => setProject({ ...project, problem: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Solution</label>
                        <textarea
                            value={project.solution}
                            onChange={(e) => setProject({ ...project, solution: e.target.value })}
                            rows={4}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Metrics</CardTitle>
                        <CardDescription>Key project metrics and achievements</CardDescription>
                    </div>
                    <Button onClick={addMetric} size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Metric
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {project.metrics?.map((metric: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex-1 grid gap-2">
                                <input
                                    type="text"
                                    value={metric.label}
                                    onChange={(e) => updateMetric(index, "label", e.target.value)}
                                    placeholder="Metric Label"
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md"
                                />
                            </div>
                            <div className="flex-1 grid gap-2">
                                <input
                                    type="text"
                                    value={metric.value}
                                    onChange={(e) => updateMetric(index, "value", e.target.value)}
                                    placeholder="Value"
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeMetric(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Project Images</CardTitle>
                    <CardDescription>
                        Upload images to Cloudinary or add image URLs
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ImageUploader
                        label="Project Images"
                        images={project.images}
                        onChange={(images) => setProject({ ...project, images })}
                        folder={`portfolio/projects/${project.slug || 'new'}`}
                        description="Upload project images to showcase your work"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
