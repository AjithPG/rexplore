"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Compass,
    Award,
    BookOpen,
    DollarSign,
    Calendar,
    Briefcase,
} from "lucide-react";

interface SidebarProps {
    className?: string;
}

const CATEGORIES = [
    { name: "All", label: "Discover", icon: Compass },
    { name: "Certification", label: "Certification", icon: Award },
    { name: "Course", label: "Course", icon: BookOpen },
    { name: "Earning", label: "Earning", icon: DollarSign },
    { name: "Event", label: "Event", icon: Calendar },
    { name: "Job", label: "Job", icon: Briefcase },
];

export function Sidebar({ className }: SidebarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategory = searchParams.get("category") || "All";

    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        // Reset pagination to 1 when changing category
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className={cn("pb-12 w-64 border-r h-full pt-4 bg-background overflow-y-auto", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Explore
                    </h2>
                    <div className="space-y-1">
                        {CATEGORIES.map((category) => {
                            const isActive = currentCategory === category.name;
                            const Icon = category.icon;

                            return (
                                <Button
                                    key={category.name}
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start font-normal",
                                        isActive && "font-medium"
                                    )}
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {category.label}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
