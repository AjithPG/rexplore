"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Resource {
    id: string;
    title: string;
    url: string;
    category: string;
    status: string;
    submitted_by: string;
}

export default function AdminPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await fetch('/api/resources?status=pending');
            const data = await response.json();
            if (data.data) {
                setResources(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch resources", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
        try {
            const response = await fetch(`/api/resources/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                // Remove from list
                setResources(resources.filter(r => r.id !== id));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main className="container py-16 px-4 md:px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <Badge variant="outline">Admin Access</Badge>
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                    </TableCell>
                                </TableRow>
                            ) : resources.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No pending resources found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                resources.map((resource) => (
                                    <TableRow key={resource.id}>
                                        <TableCell className="font-medium">{resource.title}</TableCell>
                                        <TableCell>{resource.category}</TableCell>
                                        <TableCell>
                                            <Link href={resource.url} target="_blank" className="flex items-center hover:underline text-muted-foreground">
                                                Link <ExternalLink className="ml-1 h-3 w-3" />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{resource.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                onClick={() => updateStatus(resource.id, 'approved')}
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => updateStatus(resource.id, 'rejected')}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}
