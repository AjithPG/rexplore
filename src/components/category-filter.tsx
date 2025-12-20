"use client";

import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container py-4 px-4 md:px-6">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className="shrink-0"
                        >
                            <Badge
                                variant={activeCategory === category ? "default" : "outline"}
                                className="px-4 py-2 text-sm font-medium cursor-pointer hover:bg-accent transition-colors"
                            >
                                {category}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
