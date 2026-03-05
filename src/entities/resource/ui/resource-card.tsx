import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";

interface ResourceCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    url: string;
    type: string;
    image?: string;
}

export function ResourceCard({ id, title, description, category, tags, url, type, image }: ResourceCardProps) {

    return (
        <Link href={`/resources/${id}`}>
            <Card className="group h-full overflow-hidden transition-all hover:shadow-sm hover:scale-[1.02] cursor-pointer duration-200 ease-in-out hover:bg-background-100  active:scale-99">

                <div className="relative aspect-video select-none overflow-hidden rounded-md shadow-border-small p-2">
                    <div className="relative">
                        {image ? (
                            <img src={image} alt={title} className="w-full h-full object-cover" />
                        ) : (
                            <img src="../no-screenshot.png" alt={title} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/5" />
                    </div>

                    <div className="absolute top-5 right-6 flex gap-2">
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
