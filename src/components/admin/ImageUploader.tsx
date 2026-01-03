"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
    label: string;
    images: string[];
    onChange: (images: string[]) => void;
    folder?: string;
    maxImages?: number;
    description?: string;
}

export function ImageUploader({
    label,
    images,
    onChange,
    folder = "portfolio",
    maxImages,
    description,
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (maxImages && images.length + files.length > maxImages) {
            alert(`Maximum ${maxImages} images allowed`);
            return;
        }

        setUploading(true);
        const newImages: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);

                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", folder);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    newImages.push(data.url);
                } else {
                    console.error(`Failed to upload ${file.name}`);
                }
            }

            onChange([...images, ...newImages]);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload some images");
        } finally {
            setUploading(false);
            setUploadProgress("");
            // Reset input
            e.target.value = "";
        }
    };

    const handleRemove = (index: number) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const handleUrlAdd = () => {
        const url = prompt("Enter image URL:");
        if (url && url.trim()) {
            onChange([...images, url.trim()]);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <label className="text-sm font-medium">{label}</label>
                    {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        onClick={handleUrlAdd}
                        size="sm"
                        variant="outline"
                        disabled={uploading || (maxImages ? images.length >= maxImages : false)}
                    >
                        Add URL
                    </Button>
                    <Button
                        type="button"
                        onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
                        size="sm"
                        variant="outline"
                        disabled={uploading || (maxImages ? images.length >= maxImages : false)}
                        className="gap-2"
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {uploadProgress}
                            </>
                        ) : (
                            <>
                                <Upload className="h-4 w-4" />
                                Upload
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <input
                id={`file-upload-${label}`}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-secondary/20 rounded-md border border-border min-h-[120px]">
                {images.length === 0 ? (
                    <div className="col-span-full flex items-center justify-center text-sm text-muted-foreground">
                        No images uploaded yet
                    </div>
                ) : (
                    images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-video bg-secondary rounded-md overflow-hidden group border border-border"
                        >
                            <Image
                                src={image}
                                alt={`${label} ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                            <button
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                                type="button"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                                {index + 1}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {maxImages && (
                <p className="text-xs text-muted-foreground">
                    {images.length} / {maxImages} images
                </p>
            )}
        </div>
    );
}
