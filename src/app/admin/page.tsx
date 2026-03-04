"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Check,
    X,
    ExternalLink,
    Loader2,
    Pencil,
    Trash2,
    Plus,
    LayoutDashboard,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Resource } from "@/types/resource";
import { ResourceFormDialog } from "@/components/resource-form-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationControls } from "@/components/pagination-controls";

type Tab = "all" | "pending" | "Approved" | "rejected";

const ITEMS_PER_PAGE = 10;

const STATUS_BADGE_MAP: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    pending: { variant: "secondary", label: "Pending" },
    Approved: { variant: "default", label: "Approved" },
    approved: { variant: "default", label: "Approved" },
    rejected: { variant: "destructive", label: "Rejected" },
};

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "ajithpg2411@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase());

export default function AdminPage() {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("all");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Form dialog state
    const [formOpen, setFormOpen] = useState(false);
    const [editingResource, setEditingResource] = useState<Resource | null>(null);

    // Delete confirm dialog state
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingResource, setDeletingResource] = useState<Resource | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Admin guard
    const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";
    const isAdmin = ADMIN_EMAILS.includes(userEmail.toLowerCase());

    useEffect(() => {
        if (!isLoaded) return;
        if (!user || !isAdmin) {
            router.replace("/");
        }
    }, [isLoaded, user, isAdmin, router]);

    const fetchResources = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/resources?status=all');
            const data = await response.json();
            if (data.data) {
                setResources(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch resources", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    // Reset page when tab or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, search]);

    const updateStatus = async (id: string, status: 'Approved' | 'rejected') => {
        try {
            const response = await fetch(`/api/resources/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                setResources((prev) =>
                    prev.map((r) => (r.id === id ? { ...r, status } : r))
                );
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleDelete = async () => {
        if (!deletingResource) return;
        setDeleteLoading(true);
        try {
            const response = await fetch(`/api/resources/${deletingResource.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setResources((prev) => prev.filter((r) => r.id !== deletingResource.id));
                setDeleteOpen(false);
                setDeletingResource(null);
            } else {
                alert("Failed to delete resource");
            }
        } catch (error) {
            console.error("Error deleting resource", error);
        } finally {
            setDeleteLoading(false);
        }
    };

    const openAdd = () => {
        setEditingResource(null);
        setFormOpen(true);
    };

    const openEdit = (resource: Resource) => {
        setEditingResource(resource);
        setFormOpen(true);
    };

    const openDelete = (resource: Resource) => {
        setDeletingResource(resource);
        setDeleteOpen(true);
    };

    // Stats (always from full list, ignoring current search)
    const total = resources.length;
    const pendingCount = resources.filter((r) => r.status === "pending").length;
    const approvedCount = resources.filter((r) => r.status === "Approved" || r.status === "approved").length;
    const rejectedCount = resources.filter((r) => r.status === "rejected").length;

    // Tab filter
    const tabFiltered = activeTab === "all"
        ? resources
        : resources.filter((r) => {
            if (activeTab === "Approved") return r.status === "Approved" || r.status === "approved";
            return r.status === activeTab;
        });

    // Search filter (title, category, type, url, tags)
    const q = search.toLowerCase().trim();
    const searchFiltered = q
        ? tabFiltered.filter((r) =>
            r.title.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q) ||
            r.type.toLowerCase().includes(q) ||
            r.url.toLowerCase().includes(q) ||
            (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
        )
        : tabFiltered;

    // Pagination
    const totalPages = Math.ceil(searchFiltered.length / ITEMS_PER_PAGE);
    const paginated = searchFiltered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const tabs: { id: Tab; label: string; count: number }[] = [
        { id: "all", label: "All", count: total },
        { id: "pending", label: "Pending", count: pendingCount },
        { id: "Approved", label: "Approved", count: approvedCount },
        { id: "rejected", label: "Rejected", count: rejectedCount },
    ];

    // While Clerk is loading or user isn't admin, show spinner (redirect is running in useEffect)
    if (!isLoaded || !user || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">


            <main className="container py-10 px-4 md:px-6 max-w-screen-xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="h-7 w-7 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground mt-0.5">Manage all resources</p>
                        </div>
                    </div>
                    <Button onClick={openAdd} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Resource
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{total}</p>
                            <p className="text-xs text-muted-foreground mt-1">All resources</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-yellow-500" /> Pending
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Approved
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                            <p className="text-xs text-muted-foreground mt-1">Live resources</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                                <XCircle className="h-3.5 w-3.5 text-red-500" /> Rejected
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-red-600">{rejectedCount}</p>
                            <p className="text-xs text-muted-foreground mt-1">Not approved</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs + Search row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    {/* Tabs */}
                    <div className="flex gap-1 border-b sm:border-b-0">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {tab.label}
                                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search resources..."
                            className="pl-9 h-9 text-sm"
                        />
                    </div>
                </div>

                {/* Results summary */}
                {q && (
                    <p className="text-xs text-muted-foreground mb-2">
                        {searchFiltered.length} result{searchFiltered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
                    </p>
                )}

                {/* Table */}
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40">
                                <TableHead className="w-[260px]">Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-16">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                                    </TableCell>
                                </TableRow>
                            ) : paginated.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                                        {q ? `No resources match "${search}".` : "No resources found."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginated.map((resource) => {
                                    const statusInfo = STATUS_BADGE_MAP[resource.status ?? "pending"] ?? { variant: "outline" as const, label: resource.status ?? "—" };
                                    return (
                                        <TableRow key={resource.id} className="group">
                                            <TableCell className="font-medium max-w-[260px]">
                                                <span className="line-clamp-1">{resource.title}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                                            </TableCell>
                                            <TableCell className="capitalize text-sm text-muted-foreground">{resource.type}</TableCell>
                                            <TableCell>
                                                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={resource.url}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    Link <ExternalLink className="h-3 w-3" />
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {/* Approve */}
                                                    {resource.status !== "Approved" && resource.status !== "approved" && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                            title="Approve"
                                                            onClick={() => updateStatus(resource.id, 'Approved')}
                                                        >
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {/* Reject */}
                                                    {resource.status !== "rejected" && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                                                            title="Reject"
                                                            onClick={() => updateStatus(resource.id, 'rejected')}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {/* Edit */}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        title="Edit"
                                                        onClick={() => openEdit(resource)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    {/* Delete */}
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        title="Delete"
                                                        onClick={() => openDelete(resource)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination footer */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                        <span>
                            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, searchFiltered.length)} of {searchFiltered.length}
                        </span>
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </main>

            {/* Add / Edit Form Dialog */}
            <ResourceFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                resource={editingResource}
                onSuccess={fetchResources}
            />

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Delete Resource</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">&ldquo;{deletingResource?.title}&rdquo;</span>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteOpen(false)}
                            disabled={deleteLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteLoading}
                        >
                            {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
