"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FolderKanban, Download, Upload } from "lucide-react";
import { exportAllData } from "@/lib/adminStorage";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/profile", label: "Profile", icon: User },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-background">
            {/* Top Bar */}
            <div className="border-b bg-card">
                <div className="flex h-16 items-center px-6">
                    <Link href="/" className="text-xl font-bold">
                        Ashif Admin
                    </Link>
                    <div className="ml-auto flex items-center gap-4">
                        <button
                            onClick={exportAllData}
                            className="flex items-center gap-2 px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                        >
                            <Download className="h-4 w-4" suppressHydrationWarning />
                            Export Data
                        </button>
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                        >
                            View Site
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 border-r min-h-[calc(100vh-4rem)] bg-card">
                    <nav className="p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-secondary"
                                    )}
                                >
                                    <Icon className="h-5 w-5" suppressHydrationWarning />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
