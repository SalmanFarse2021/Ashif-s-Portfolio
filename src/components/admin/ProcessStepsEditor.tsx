"use client";

import { Button } from "@/components/ui/Button";
import { Plus, X, MoveUp, MoveDown } from "lucide-react";

interface ProcessStep {
    step: string;
    title: string;
    desc: string;
}

interface ProcessStepsEditorProps {
    steps: ProcessStep[];
    onChange: (steps: ProcessStep[]) => void;
}

export function ProcessStepsEditor({ steps, onChange }: ProcessStepsEditorProps) {
    const handleAdd = () => {
        const newStep: ProcessStep = {
            step: String(steps.length + 1).padStart(2, "0"),
            title: "",
            desc: "",
        };
        onChange([...steps, newStep]);
    };

    const handleRemove = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index);
        // Re-number steps
        const renumbered = newSteps.map((step, i) => ({
            ...step,
            step: String(i + 1).padStart(2, "0"),
        }));
        onChange(renumbered);
    };

    const handleChange = (index: number, field: keyof ProcessStep, value: string) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        onChange(newSteps);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const newSteps = [...steps];
        [newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]];
        // Re-number steps
        const renumbered = newSteps.map((step, i) => ({
            ...step,
            step: String(i + 1).padStart(2, "0"),
        }));
        onChange(renumbered);
    };

    const handleMoveDown = (index: number) => {
        if (index === steps.length - 1) return;
        const newSteps = [...steps];
        [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
        // Re-number steps
        const renumbered = newSteps.map((step, i) => ({
            ...step,
            step: String(i + 1).padStart(2, "0"),
        }));
        onChange(renumbered);
    };

    return (
        <div className="space-y-4">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="p-4 bg-secondary/20 rounded-md border border-border space-y-3"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary/30">{step.step}</span>
                        <div className="flex gap-1">
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                            >
                                <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === steps.length - 1}
                            >
                                <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleRemove(index)}
                                className="text-destructive hover:text-destructive"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <label className="text-xs font-medium text-muted-foreground">Title</label>
                        <input
                            type="text"
                            value={step.title}
                            onChange={(e) => handleChange(index, "title", e.target.value)}
                            placeholder="e.g., Research"
                            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                        />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-xs font-medium text-muted-foreground">Description</label>
                        <textarea
                            value={step.desc}
                            onChange={(e) => handleChange(index, "desc", e.target.value)}
                            placeholder="Brief description of this step"
                            rows={2}
                            className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm"
                        />
                    </div>
                </div>
            ))}

            <Button type="button" onClick={handleAdd} variant="outline" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Process Step
            </Button>
        </div>
    );
}
