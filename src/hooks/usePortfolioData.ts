"use client";

import { useState, useEffect } from "react";
import { profile as defaultProfile } from "@/data/profile";
import { projects as defaultProjects } from "@/data/projects";
import { loadProfile, loadProjects } from "@/lib/adminStorage";

// Hook to get profile data (admin overrides default)
export function useProfile() {
    const [profile, setProfile] = useState(defaultProfile);

    useEffect(() => {
        async function loadData() {
            const savedProfile = await loadProfile();
            if (savedProfile) {
                setProfile(savedProfile);
            }
        }
        loadData();

        // Listen for storage changes
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'portfolio_admin_profile' && e.newValue) {
                setProfile(JSON.parse(e.newValue));
            }
        };

        // Listen for custom event (for same-tab updates)
        const handleCustomUpdate = async () => {
            const savedProfile = await loadProfile();
            if (savedProfile) {
                setProfile(savedProfile);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('portfolioProfileUpdate', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('portfolioProfileUpdate', handleCustomUpdate);
        };
    }, []);

    return { profile };
}

// Hook to get projects data (admin overrides default)
export function useProjects() {
    const [projects, setProjects] = useState(defaultProjects);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const savedProjects = await loadProjects();
            // Ensure we always have an array, even if empty
            if (savedProjects && Array.isArray(savedProjects)) {
                setProjects(savedProjects);
            }
            setLoading(false);
        }
        loadData();

        // Listen for storage changes
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'portfolio_admin_projects' && e.newValue) {
                const newProjects = JSON.parse(e.newValue);
                if (Array.isArray(newProjects)) {
                    setProjects(newProjects);
                }
            }
        };

        // Listen for custom event (for same-tab updates)
        const handleCustomUpdate = async () => {
            const savedProjects = await loadProjects();
            if (savedProjects && Array.isArray(savedProjects)) {
                setProjects(savedProjects);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('portfolioProjectsUpdate', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('portfolioProjectsUpdate', handleCustomUpdate);
        };
    }, []);

    // Always return an array
    return { projects: Array.isArray(projects) ? projects : defaultProjects, loading };
}

// Hook to get single project by slug
export function useProject(slug: string) {
    const { projects, loading } = useProjects();
    const project = projects.find((p) => p.slug === slug);

    return { project, loading };
}

// Hook to get gallery images
import { loadGallery } from "@/lib/adminStorage";

export function useGallery() {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            const savedImages = await loadGallery();
            if (savedImages && Array.isArray(savedImages)) {
                setImages(savedImages);
            }
        }
        loadData();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'portfolio_admin_gallery' && e.newValue) {
                setImages(JSON.parse(e.newValue));
            }
        };

        const handleCustomUpdate = async () => {
            const savedImages = await loadGallery();
            if (savedImages) setImages(savedImages);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('portfolioGalleryUpdate', handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('portfolioGalleryUpdate', handleCustomUpdate);
        };
    }, []);

    return { images };
}
