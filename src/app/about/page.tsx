"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useProfile } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";
import { Download, Award, GraduationCap } from "lucide-react";

export default function AboutPage() {
    const { profile } = useProfile();

    return (
        <div className="min-h-screen pt-12">
            {/* Intro */}
            <Section>
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl space-y-8"
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {profile.profileImage && (
                                <motion.img
                                    src={profile.profileImage}
                                    alt={profile.name}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-2 border-border shadow-xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            )}
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-6xl font-bold">
                                    Engineering Logic. <br />
                                    <span className="text-muted-foreground">Architectural Soul.</span>
                                </h1>
                            </div>
                        </div>
                        <div className="text-xl leading-relaxed space-y-6 text-muted-foreground">
                            <p>{profile.bioLong.split('\n')[0]}</p>
                            <p>{profile.bioLong.split('\n').slice(1).join(' ')}</p>
                        </div>

                        <Button size="lg" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                Download Resume <Download className="ml-2 h-4 w-4" />
                            </a>
                        </Button>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            {profile.socials
                                .filter(social => social.href && social.href.length > 10 && social.href !== 'https://')
                                .map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm font-medium transition-colors"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Philosophy */}
            <Section className="bg-secondary/5">
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Design Philosophy</h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p>
                                    I believe that great architecture is born from the rigorous application of engineering principles.
                                    It is not enough for a space to look beautiful; it must perform.
                                </p>
                                <p>
                                    My work seeks the intersection of these two disciplines.
                                    I use structural constraints as design generators, not limitations.
                                    Functionality drives form, and material honesty drives aesthetics.
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-video bg-secondary/20 rounded-2xl flex items-center justify-center overflow-hidden">
                            <span className="text-muted-foreground opacity-50 font-bold text-xl uppercase tracking-widest">Philosophy Image Placeholder</span>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Credentials */}
            <Section>
                <Container>
                    <h2 className="text-3xl font-bold mb-12">Credentials</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardContent className="pt-6 flex flex-col gap-4">
                                <GraduationCap className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="font-bold">Master of Architecture</h3>
                                    <p className="text-sm text-muted-foreground">University of Design, 2021</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 flex flex-col gap-4">
                                <GraduationCap className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="font-bold">B.S. Civil Engineering</h3>
                                    <p className="text-sm text-muted-foreground">Tech Institute, 2019</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6 flex flex-col gap-4">
                                <Award className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="font-bold">LEED Accredited Professional</h3>
                                    <p className="text-sm text-muted-foreground">Green Building Council</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
