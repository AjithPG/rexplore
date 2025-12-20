import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ResourceCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    url: string;
    type: string;
}

// Gradient map for different categories
const categoryGradients: Record<string, string> = {
    "Course": "from-purple-500 via-blue-500 to-indigo-600",
    "Earning": "from-green-500 via-teal-500 to-cyan-600",
    "Event": "from-yellow-500 via-orange-500 to-red-500",
    "Job": "from-pink-500 via-rose-500 to-red-600",
};

export function ResourceCard({ id, title, description, category, tags, url, type }: ResourceCardProps) {
    const gradient = categoryGradients[category] || "from-gray-500 via-gray-600 to-gray-700";

    return (
        <Link href={`/resources/${id}`}>
            <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                {/* Gradient Preview */}
                <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                            {category}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="pb-3">
                    <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </CardHeader>

                <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs font-normal">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
