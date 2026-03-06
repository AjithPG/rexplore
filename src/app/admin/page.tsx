"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
    Loader2,
    Plus,
    LayoutDashboard,
    Search,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Resource } from "@/entities/resource/model/types";
import { ResourceFormDialog } from "@/features/resource/ui/resource-form-dialog";
import { ResourcesTable } from "@/widgets/admin-panel/ui/resources-table";
import { StatsCards } from "@/features/admin/ui/stats-cards";
import { FilterTabs } from "@/features/admin/ui/filter-tabs";
import { DeleteConfirmationDialog } from "@/shared/ui/delete-confirmation-dialog";
import { PaginationControls } from "@/shared/ui/pagination-controls";
import { Tab } from "@/entities/admin/model/types";



const ITEMS_PER_PAGE = 10;
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

    const updateStatus = async (id: string, status: Tab) => {
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

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // While Clerk is loading or user isn't admin, show spinner (redirect is running in useEffect)
    if (!mounted || !isLoaded || !user || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <main className="container py-10 px-4 md:px-6 max-w-7xl mx-auto">
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
                <StatsCards 
                    total={total} 
                    pendingCount={pendingCount} 
                    approvedCount={approvedCount} 
                    rejectedCount={rejectedCount} 
                />

                {/* Tabs + Search row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    {/* Tabs */}
                    <FilterTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

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
                <ResourcesTable
                    loading={loading}
                    search={search}
                    paginated={paginated}
                    updateStatus={updateStatus}
                    openEdit={openEdit}
                    openDelete={openDelete}
                />

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
            <DeleteConfirmationDialog 
                open={deleteOpen} 
                onOpenChange={setDeleteOpen} 
                title="Delete Resource"
                itemName={deletingResource?.title}
                onConfirm={handleDelete}
                loading={deleteLoading}
            />
        </div>
    );
}
