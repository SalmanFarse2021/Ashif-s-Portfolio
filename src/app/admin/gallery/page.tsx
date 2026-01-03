"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { saveGallery, loadGallery } from "@/lib/adminStorage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Loader2 } from "lucide-react";

export default function GalleryManager() {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            const saved = await loadGallery();
            if (saved) setImages(saved);
            setLoading(false);
        }
        load();
    }, []);

    const handleSave = async (newImages: string[]) => {
        setImages(newImages);
        setSaving(true);
        await saveGallery(newImages);
        setSaving(false);
    };

    if (loading) return <div className="p-8"><Loader2 className="animate-spin" /> Loading...</div>;

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Gallery Manager</h1>
                <p className="text-muted-foreground mt-2">
                    Manage standalone images for your gallery page (renders, photography, etc).
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                    <ImageUploader
                        label="Upload Images"
                        images={images}
                        onChange={handleSave}
                        folder="portfolio/gallery"
                        description="Drag and drop to reorder. These will appear in the 2D gallery grid."
                    />
                    {saving && <p className="text-sm text-yellow-500 mt-2">Saving changes...</p>}
                </CardContent>
            </Card>
        </div>
    );
}
