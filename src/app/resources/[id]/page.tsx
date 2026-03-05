"use client";
import { Navbar } from "@/widgets/header/ui/navbar";
import { Footer } from "@/widgets/footer/ui/footer";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ExternalLink, Loader2, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";
import { Resource } from "@/entities/resource/model/types";

export default function ResourceDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [resource, setResource] = useState<Resource | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            fetchResource();
        }
    }, [id]);

    const fetchResource = async () => {
        try {
            const response = await fetch(`/api/resources/${id}`);
            const data = await response.json();
            if (data.data) {
                setResource(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch resource", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background font-sans flex flex-col">

                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>

            </div>
        );
    }

    if (!resource) {
        return (
            <div className="min-h-screen bg-background font-sans flex flex-col">

                <div className="flex-1 container py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <div className="flex flex-1 overflow-hidden container max-w-screen-2xl mx-auto">
                <Sidebar className="block w-64 shrink-0 hidden md:block border-r" />

                <main className="flex-1 px-4 md:px-8 py-4">
                    <div className="container flex flex-col w-full relative z-10 mx-auto gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold text-primary-background">
                                {resource.title}
                            </h1>

                            <p className="text-ms text-muted-foreground leading-relaxed">
                                {resource.description}
                            </p>

                        </div>

                        <div data-orientation="horizontal" role="none" className="bg-border shrink-0 h-[1px] w-full"></div>
                        <div className="flex w-full flex-col items-start gap-6 md:flex-row">
                            <div className="flex flex-1 flex-col gap-6">
                                <h2 className="text-md font-semibold">Site Screenshot</h2>
                                {resource.image_url ? (
                                    <img src={resource.image_url} alt={resource.title} className="w-full rounded-lg object-cover" />
                                ) : (
                                    <div className="w-full aspect-video rounded-lg bg-muted flex items-center justify-center">
                                        <p className="text-muted-foreground">No screenshot available</p>
                                    </div>
                                )}
                            </div>
                            <div className="sticky top-20 border inline-flex h-auto w-full flex-col gap-4 rounded-lg bg-background p-4 shadow-light md:max-w-3xs dark:shadow-dark">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">Category</p>
                                    <Badge className="text-sm">{resource.category}</Badge>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resource?.tags?.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-sm px-3 py-1.5">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                </div>
                                <div className="pt-6 flex flex-col gap-4 items-start sm:items-center justify-between border-t mt-8">
                                    <Button size="lg" asChild className="h-14 px-8 text-lg w-full sm:w-auto">
                                        <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                            Visit Website <ExternalLink className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>

                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                                        <span className="text-sm text-muted-foreground mr-2">Share:</span>
                                        <Button variant="outline" size="icon" onClick={handleCopy} title="Copy Link">
                                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
