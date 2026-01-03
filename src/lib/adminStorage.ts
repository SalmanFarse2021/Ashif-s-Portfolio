"use client";

// Admin data management using MongoDB API
export async function saveProfile(profile: any) {
    try {
        console.log('Saving profile to MongoDB...', profile);
        const response = await fetch('/api/admin/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Profile saved to MongoDB successfully');
            // Also keep in localStorage as cache
            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio_admin_profile', JSON.stringify(profile));
                window.dispatchEvent(new Event('portfolioProfileUpdate'));
            }
            return true;
        } else {
            console.error('Failed to save profile:', data);
            alert(`Failed to save: ${data.details || data.error}`);
            return false;
        }
    } catch (error: any) {
        console.error('Error saving profile:', error);
        alert(`Error: ${error.message}. Check console for details.`);
        return false;
    }
}

export async function loadProfile() {
    try {
        // Try API first
        const response = await fetch('/api/admin/profile');
        if (response.ok) {
            const data = await response.json();
            return data.profile;
        }
    } catch (error) {
        console.error('Error loading profile from API:', error);
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('portfolio_admin_profile');
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export async function saveProjects(projects: any) {
    try {
        console.log('Saving projects to MongoDB...');
        const response = await fetch('/api/admin/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projects),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Projects saved to MongoDB successfully');
            // Also keep in localStorage as cache
            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio_admin_projects', JSON.stringify(projects));
                window.dispatchEvent(new Event('portfolioProjectsUpdate'));
            }
            return true;
        } else {
            console.error('Failed to save projects:', data);
            alert(`Failed to save: ${data.details || data.error}`);
            return false;
        }
    } catch (error: any) {
        console.error('Error saving projects:', error);
        alert(`Error: ${error.message}. Check console for details.`);
        return false;
    }
}

export async function loadProjects() {
    try {
        // Try API first
        const response = await fetch('/api/admin/projects');
        if (response.ok) {
            const data = await response.json();
            return data.projects;
        }
    } catch (error) {
        console.error('Error loading projects from API:', error);
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('portfolio_admin_projects');
        return data ? JSON.parse(data) : null;
    }
    return null;
}

export async function saveGallery(images: any) {
    try {
        const response = await fetch('/api/admin/gallery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(images),
        });

        if (response.ok) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('portfolio_admin_gallery', JSON.stringify(images));
                window.dispatchEvent(new Event('portfolioGalleryUpdate'));
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error saving gallery:', error);
        return false;
    }
}

export async function loadGallery() {
    try {
        const response = await fetch('/api/admin/gallery');
        if (response.ok) {
            const data = await response.json();
            return data.images;
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }

    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('portfolio_admin_gallery');
        return data ? JSON.parse(data) : [];
    }
    return [];
}

export function exportAllData() {
    if (typeof window === 'undefined') return;

    const profile = localStorage.getItem('portfolio_admin_profile');
    const projects = localStorage.getItem('portfolio_admin_projects');

    const data = {
        profile: profile ? JSON.parse(profile) : null,
        projects: projects ? JSON.parse(projects) : null,
        exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export async function importData(jsonData: string) {
    try {
        const data = JSON.parse(jsonData);
        let success = true;

        if (data.profile) {
            success = await saveProfile(data.profile) && success;
        }
        if (data.projects) {
            success = await saveProjects(data.projects) && success;
        }
        if (data.gallery) {
            success = await saveGallery(data.gallery) && success;
        }

        return success;
    } catch (error) {
        console.error('Import failed:', error);
        return false;
    }
}

export function clearAllData() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('portfolio_admin_profile');
        localStorage.removeItem('portfolio_admin_projects');
        localStorage.removeItem('portfolio_admin_gallery');
    }
}
