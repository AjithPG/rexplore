import { Resource } from "@/entities/resource/model/types";
import { Tab } from "@/entities/admin/model/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Check, X, ExternalLink, Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const STATUS_BADGE_MAP: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    pending: { variant: "secondary", label: "Pending" },
    Approved: { variant: "default", label: "Approved" },
    approved: { variant: "default", label: "Approved" },
    rejected: { variant: "destructive", label: "Rejected" },
};

interface ResourcesTableProps {
    loading: boolean;
    search: string;
    paginated: Resource[];
    updateStatus: (id: string, status: Tab) => Promise<void>;
    openEdit: (resource: Resource) => void;
    openDelete: (resource: Resource) => void;
}

export function ResourcesTable({
    loading,
    search,
    paginated,
    updateStatus,
    openEdit,
    openDelete,
}: ResourcesTableProps) {
    const q = search.toLowerCase().trim();
    
    return (
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
    );
}
