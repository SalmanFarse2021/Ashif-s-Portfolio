"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { User, FolderOpen, Eye } from "lucide-react";
import { useProfile, useProjects } from "@/hooks/usePortfolioData";

export default function AdminDashboard() {
    const { profile } = useProfile();
    const { projects } = useProjects();

    return (
        <div className="space-y-8 max-w-6xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your portfolio content
                </p>
            </div>

            {/* Profile Preview Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Preview</CardTitle>
                    <CardDescription>Your current profile information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-6">
                        {profile.profileImage && (
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="w-24 h-24 rounded-full object-cover border-2 border-border"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold">{profile.name}</h3>
                            <p className="text-primary">{profile.title}</p>
                            <p className="text-sm text-muted-foreground mt-2">{profile.bioShort}</p>
                        </div>
                        <Link href="/admin/profile">
                            <Button variant="outline">Edit Profile</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{projects.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Portfolio projects
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {profile.profileImage ? 'Complete' : 'Incomplete'}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {profile.profileImage ? 'Profile pic set' : 'Add profile picture'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Skills</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Object.values(profile.skills).flat().length}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Listed skills
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Profile</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Edit</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Name, bio, skills, and social links
                        </p>
                        <Link href="/admin/profile">
                            <Button variant="outline" className="w-full mt-4" size="sm">
                                Manage Profile
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projects</CardTitle>
                        <FolderOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Manage</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Add, edit, or delete projects
                        </p>
                        <Link href="/admin/projects">
                            <Button variant="outline" className="w-full mt-4" size="sm">
                                Manage Projects
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Preview</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">View</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            See your live portfolio
                        </p>
                        <Link href="/">
                            <Button variant="outline" className="w-full mt-4" size="sm">
                                View Site
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Link href="/admin/profile">
                        <Button variant="ghost" className="w-full justify-start">
                            Update your bio and skills
                        </Button>
                    </Link>
                    <Link href="/admin/projects">
                        <Button variant="ghost" className="w-full justify-start">
                            Add a new project
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="w-full justify-start">
                            Preview changes on live site
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
