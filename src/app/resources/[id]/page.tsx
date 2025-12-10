"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, ArrowLeft, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Resource {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
    type: string;
    tags: string[];
}

// Gradient map matching ResourceCard
const categoryGradients: Record<string, string> = {
    "Course": "from-purple-500 via-blue-500 to-indigo-600",
    "Earning": "from-green-500 via-teal-500 to-cyan-600",
    "Event": "from-yellow-500 via-orange-500 to-red-500",
    "Job": "from-pink-500 via-rose-500 to-red-600",
};

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

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
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="min-h-screen bg-background font-sans flex flex-col">
                <Navbar />
                <div className="flex-1 container py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = `Check out ${resource?.title} on Rexplore!`;

        let shareUrl = "";

        switch (platform) {
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank", "width=600,height=400");
        }
    };

    const gradient = categoryGradients[resource.category] || "from-gray-500 via-gray-600 to-gray-700";

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Gradient */}
                <div className={`h-64 bg-gradient-to-br ${gradient} relative`}>
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="container max-w-4xl px-4 md:px-6 -mt-32 relative z-10">
                    <Button variant="ghost" asChild className="mb-6 text-white hover:text-white/80 hover:bg-white/10">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Resources
                        </Link>
                    </Button>

                    <div className="bg-background rounded-lg border shadow-lg p-8 md:p-12">
                        <div className="space-y-6">
                            <div className="flex gap-2">
                                <Badge className="text-sm">{resource.category}</Badge>
                                <Badge variant="outline" className="text-sm">{resource.type}</Badge>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                {resource.title}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {resource.description}
                            </p>

                            {resource.tags && resource.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-4">
                                    {resource.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-sm px-3 py-1.5">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="pt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-t mt-8">
                                <Button size="lg" asChild className="h-14 px-8 text-lg w-full sm:w-auto">
                                    <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                                        Visit Website <ExternalLink className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>

                                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                                    <span className="text-sm text-muted-foreground mr-2">Share:</span>
                                    <Button variant="outline" size="icon" onClick={() => handleShare("twitter")} title="Share on Twitter">
                                        <TwitterIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")} title="Share on LinkedIn">
                                        <LinkedinIcon className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={handleCopy} title="Copy Link">
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
