"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { profile as defaultProfile } from "@/data/profile";
import { saveProfile, loadProfile } from "@/lib/adminStorage";
import { Save, Plus, X } from "lucide-react";
import { ProcessStepsEditor } from "@/components/admin/ProcessStepsEditor";
import { ArrayInput } from "@/components/admin/ArrayInput";

export default function ProfileEditor() {
    const [profile, setProfile] = useState(defaultProfile);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const savedProfile = await loadProfile();
            if (savedProfile) {
                setProfile(savedProfile);
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const handleSave = async () => {
        const success = await saveProfile(profile);
        if (success) {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } else {
            alert('Failed to save profile');
        }
    };

    const handleReset = () => {
        setProfile(defaultProfile);
    };

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profile Editor</h1>
                    <p className="text-muted-foreground mt-2">
                        Update your personal information and skills
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset}>
                        Reset to Default
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                        <Save className="h-4 w-4" />
                        {saved ? "Saved!" : "Save Changes"}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Your name and title</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Profile Picture</label>
                        <div className="flex items-center gap-4">
                            {profile.profileImage && (
                                <img
                                    src={profile.profileImage}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-border"
                                />
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // Show loading state
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            formData.append('folder', 'portfolio/profile');

                                            try {
                                                const response = await fetch('/api/upload', {
                                                    method: 'POST',
                                                    body: formData,
                                                });

                                                if (response.ok) {
                                                    const data = await response.json();
                                                    setProfile({ ...profile, profileImage: data.url as any });
                                                } else {
                                                    alert('Upload failed. Using local preview instead.');
                                                    // Fallback to base64
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setProfile({ ...profile, profileImage: reader.result as any });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            } catch (error) {
                                                console.error('Upload error:', error);
                                                alert('Upload failed. Using local preview instead.');
                                            }
                                        }
                                    }}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Upload to Cloudinary or paste a URL below
                                </p>
                                <input
                                    type="text"
                                    value={typeof profile.profileImage === 'string' ? profile.profileImage : ''}
                                    onChange={(e) => setProfile({ ...profile, profileImage: e.target.value as any })}
                                    placeholder="/profile.jpg or https://..."
                                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value as any })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            placeholder="e.g., Dallas, TX"
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Tagline</label>
                        <input
                            type="text"
                            value={profile.tagline}
                            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                            placeholder="A short catchy tagline"
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Bio</CardTitle>
                    <CardDescription>Short and long descriptions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Short Bio</label>
                        <textarea
                            value={profile.bioShort}
                            onChange={(e) => setProfile({ ...profile, bioShort: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Long Bio</label>
                        <textarea
                            value={profile.bioLong}
                            onChange={(e) => setProfile({ ...profile, bioLong: e.target.value })}
                            rows={6}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Your technical skills organized by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <ArrayInput
                        label="Design Skills"
                        values={profile.skills.design}
                        onChange={(values) => setProfile({
                            ...profile,
                            skills: { ...profile.skills, design: values }
                        })}
                        placeholder="e.g., Architectural Design"
                    />

                    <ArrayInput
                        label="Engineering Skills"
                        values={profile.skills.engineering}
                        onChange={(values) => setProfile({
                            ...profile,
                            skills: { ...profile.skills, engineering: values }
                        })}
                        placeholder="e.g., Structural Analysis"
                    />

                    <ArrayInput
                        label="Software Skills"
                        values={profile.skills.software}
                        onChange={(values) => setProfile({
                            ...profile,
                            skills: { ...profile.skills, software: values }
                        })}
                        placeholder="e.g., AutoCAD, Revit"
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Process Steps</CardTitle>
                    <CardDescription>Your design and engineering workflow</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProcessStepsEditor
                        steps={profile.process}
                        onChange={(steps) => setProfile({ ...profile, process: steps })}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Contact & Social Links</CardTitle>
                    <CardDescription>Your email and social profiles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Social Links</label>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setProfile({
                                        ...profile,
                                        socials: [...profile.socials, { label: "New Platform", href: "https://" }]
                                    });
                                }}
                                className="gap-1"
                            >
                                <Plus className="h-4 w-4" />
                                Add Social Link
                            </Button>
                        </div>

                        {profile.socials.map((social, index) => (
                            <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-end p-3 bg-secondary/20 rounded-md">
                                <div className="grid gap-2">
                                    <label className="text-xs font-medium text-muted-foreground">Platform</label>
                                    <input
                                        type="text"
                                        value={social.label}
                                        onChange={(e) => {
                                            const newSocials = [...profile.socials];
                                            newSocials[index] = { ...newSocials[index], label: e.target.value };
                                            setProfile({ ...profile, socials: newSocials });
                                        }}
                                        placeholder="e.g., LinkedIn"
                                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-xs font-medium text-muted-foreground">URL</label>
                                    <input
                                        type="url"
                                        value={social.href}
                                        onChange={(e) => {
                                            const newSocials = [...profile.socials];
                                            newSocials[index] = { ...newSocials[index], href: e.target.value };
                                            setProfile({ ...profile, socials: newSocials });
                                        }}
                                        placeholder="https://"
                                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setProfile({
                                            ...profile,
                                            socials: profile.socials.filter((_, i) => i !== index)
                                        });
                                    }}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
