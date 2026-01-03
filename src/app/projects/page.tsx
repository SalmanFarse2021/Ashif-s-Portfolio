"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/usePortfolioData";

export default function ProjectsPage() {
    const { projects } = useProjects();

    // Helper to get unique values
    const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))), [projects]);
    const allTypes = useMemo(() => Array.from(new Set(projects.map((p) => p.type))), [projects]);
    const allYears = useMemo(() => Array.from(new Set(projects.map((p) => p.year))).sort().reverse(), [projects]);

    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [sort, setSort] = useState<"newest" | "oldest" | "az">("newest");

    const filteredProjects = useMemo(() => {
        return projects
            .filter((project) => {
                const matchesSearch = project.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
                const matchesType = selectedType ? project.type === selectedType : true;
                const matchesYear = selectedYear ? project.year === selectedYear : true;
                return matchesSearch && matchesTag && matchesType && matchesYear;
            })
            .sort((a, b) => {
                if (sort === "newest") return parseInt(b.year) - parseInt(a.year);
                if (sort === "oldest") return parseInt(a.year) - parseInt(b.year);
                return a.title.localeCompare(b.title);
            });
    }, [search, selectedTag, selectedType, selectedYear, sort]);

    const [visibleCount, setVisibleCount] = useState(6);

    // Reset visible count when filters change
    useMemo(() => {
        setVisibleCount(6);
    }, [search, selectedTag, selectedType, selectedYear, sort]);

    const clearFilters = () => {
        setSearch("");
        setSelectedTag(null);
        setSelectedType(null);
        setSelectedYear(null);
        setSort("newest");
        setVisibleCount(6);
    };

    return (
        <div className="min-h-screen pt-12 pb-20">
            <Section>
                <Container>
                    <div className="mb-12 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold">All Projects</h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Explore a collection of architectural and engineering works,
                            ranging from conceptual designs to realized structures.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="space-y-6 mb-12">
                        {/* Search and Sort Row */}
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="relative w-full md:max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value as any)}
                                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="az">Alphabetic (A-Z)</option>
                                </select>

                                <select
                                    value={selectedType || ""}
                                    onChange={(e) => setSelectedType(e.target.value || null)}
                                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">All Types</option>
                                    {allTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedYear || ""}
                                    onChange={(e) => setSelectedYear(e.target.value || null)}
                                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="">All Years</option>
                                    {allYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Tags Row */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                            <Button
                                variant={selectedTag === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTag(null)}
                            >
                                All
                            </Button>
                            {allTags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                    className={selectedTag === tag ? "bg-primary text-primary-foreground" : ""}
                                >
                                    {tag}
                                </Button>
                            ))}
                            {(selectedTag || selectedType || selectedYear || search) && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                                    <X className="h-4 w-4 mr-2" /> Clear All
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.slice(0, visibleCount).map((project) => (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            No projects found matching your criteria.
                        </div>
                    )}

                    {filteredProjects.length > visibleCount && (
                        <div className="mt-12 text-center">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setVisibleCount(prev => prev + 6)}
                            >
                                Show More
                            </Button>
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}
