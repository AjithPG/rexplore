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
                <div className={`relative aspect-video select-none overflow-hidden rounded-md shadow-border-small`}>
                    <img src="../python.png" alt={title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                            {category}
                        </Badge>
                    </div>
                </div>

                <CardHeader>
                    <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {description}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
