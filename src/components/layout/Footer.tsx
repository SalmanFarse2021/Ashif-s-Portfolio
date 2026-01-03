"use client";

import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { useProfile } from "@/hooks/usePortfolioData";

export function Footer() {
    const { profile } = useProfile();

    return (
        <footer className="bg-secondary/20 border-t py-12 md:py-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h3 className="text-xl font-bold tracking-widest uppercase">
                            Ashif
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {profile.tagline}
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm text-muted-foreground">
                        {profile.socials
                            .filter(social => social.href && social.href.length > 10 && social.href !== 'https://')
                            .map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    {social.label}
                                </Link>
                            ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
