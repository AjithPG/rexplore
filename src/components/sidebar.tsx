"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Compass,
    Award,
    BookOpen,
    DollarSign,
    Calendar,
    Briefcase,
    LibraryBig,
    Bot
} from "lucide-react";

interface SidebarProps {
    className?: string;
}

const CATEGORIES = [
    { name: "All", label: "Discover", icon: Compass },
    { name: "AI", label: "AI", icon: Bot },
    { name: "Certification", label: "Certification", icon: Award },
    { name: "Course", label: "Course", icon: BookOpen },
    { name: "Resources", label: "Resources", icon: LibraryBig },
    { name: "Earning", label: "Earning", icon: DollarSign },
    { name: "Event", label: "Event", icon: Calendar },
    { name: "Job", label: "Job", icon: Briefcase },
];

export function Sidebar({ className }: SidebarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Determine current category from either search params or pathname
    const getCategoryFromPath = () => {
        if (pathname === "/") return "All";
        if (pathname.startsWith("/category/")) {
            return decodeURIComponent(pathname.split("/").pop() || "All");
        }
        return searchParams.get("category") || "All";
    };

    const currentCategory = getCategoryFromPath();

    const getHref = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("page");
        params.delete("category");
        const suffix = params.toString() ? `?${params.toString()}` : "";
        return category === "All" ? `/${suffix}` : `/category/${encodeURIComponent(category)}${suffix}`;
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
                                    asChild
                                    className={cn(
                                        "w-full justify-start font-normal cursor-pointer",
                                        isActive && "font-medium"
                                    )}
                                >
                                    <Link
                                        href={getHref(category.name)}

                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {category.label}
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
