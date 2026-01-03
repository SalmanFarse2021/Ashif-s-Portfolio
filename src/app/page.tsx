"use client";

import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { useProfile, useProjects } from "@/hooks/usePortfolioData";

export default function Home() {
    const { profile } = useProfile();
    const { projects } = useProjects();
    const featuredProjects = projects.slice(0, 3); // Get first 3 as featured

    return (
        <div className="flex flex-col min-h-screen">
            <Hero />

            {/* About Preview */}
            <Section className="bg-background">
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
                                Md Golam Mawla Ashif
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                {profile.bioShort}
                            </p>
                            <div className="flex gap-4">
                                <Button asChild>
                                    <Link href="/about">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" suppressHydrationWarning />
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/contact">
                                        Contact Me <ArrowRight className="ml-2 h-4 w-4" suppressHydrationWarning />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative aspect-square md:aspect-[4/3] bg-secondary/30 rounded-2xl overflow-hidden"
                        >
                            {profile.profileImage ? (
                                <Image
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    suppressHydrationWarning
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-bold text-4xl">
                                    PROFILE IMAGE
                                </div>
                            )}
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Featured Projects */}
            <Section className="bg-secondary/5">
                <Container>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
                            <p className="text-muted-foreground">Select projects demonstrating technical and design expertise.</p>
                        </div>
                        <Button variant="ghost" asChild className="hidden md:inline-flex">
                            <Link href="/projects">
                                View All Projects <ArrowRight className="ml-2 h-4 w-4" suppressHydrationWarning />
                            </Link>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Button variant="outline" asChild>
                            <Link href="/projects">View All Projects</Link>
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* Process */}
            <Section>
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Process</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A systematic approach from analysis to delivery, ensuring every design decision is grounded in logic.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profile.process.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <Card className="h-full border-none bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                    <CardContent className="pt-6">
                                        <span className="text-4xl font-bold text-primary/20 mb-4 block">
                                            {step.step}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.desc}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Skills */}
            <Section className="bg-secondary/5">
                <Container>
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Technical Proficiency</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold border-b pb-2">Design</h3>
                            <ul className="space-y-3">
                                {profile.skills.design.map((skill) => (
                                    <li key={skill} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-primary" suppressHydrationWarning />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold border-b pb-2">Engineering</h3>
                            <ul className="space-y-3">
                                {profile.skills.engineering.map((skill) => (
                                    <li key={skill} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle2 className="h-4 w-4 text-primary" suppressHydrationWarning />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold border-b pb-2">Software</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.software.map((skill) => (
                                    <span
                                        key={skill}
                                        className="bg-background border px-3 py-1.5 rounded-full text-sm text-muted-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="py-24">
                <Container>
                    <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to bring your vision to life?
                        </h2>
                        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
                            Check out the virtual gallery or get in touch regarding your next project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/contact">Contact Me</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                                <Link href="/gallery">Visit Virtual Gallery</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
