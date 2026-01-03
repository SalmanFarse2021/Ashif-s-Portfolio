import { cn } from "@/lib/utils";
import React from "react";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Divider({ className, ...props }: DividerProps) {
    return (
        <div
            className={cn("h-[1px] w-full bg-border", className)}
            {...props}
        />
    );
}
