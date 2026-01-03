"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { X, Plus } from "lucide-react";

interface ArrayInputProps {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    description?: string;
}

export function ArrayInput({ label, values, onChange, placeholder, description }: ArrayInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            onChange([...values, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemove = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">{label}</label>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}

            {/* Display current values as chips */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-secondary/20 rounded-md border border-border">
                {values.length === 0 ? (
                    <span className="text-sm text-muted-foreground">No items added yet</span>
                ) : (
                    values.map((value, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/20"
                        >
                            {value}
                            <button
                                onClick={() => handleRemove(index)}
                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                type="button"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    ))
                )}
            </div>

            {/* Input for adding new values */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder || `Add ${label.toLowerCase()}`}
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm"
                />
                <Button
                    type="button"
                    onClick={handleAdd}
                    size="sm"
                    variant="outline"
                    className="gap-1"
                >
                    <Plus className="h-4 w-4" />
                    Add
                </Button>
            </div>
        </div>
    );
}
