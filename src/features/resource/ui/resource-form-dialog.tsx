"use client";

import { useEffect, useState } from "react";
import { Resource } from "@/entities/resource/model/types";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["AI", "Certification", "Course", "Resources", "Earning", "Event", "Job"];
const TYPES = ["coding", "design", "productivity", "tools", "marketing", "business", "other"];
const STATUSES = ["pending", "Approved", "rejected"];

interface ResourceFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    resource?: Resource | null; // null = create mode
    onSuccess: () => void;
}

type FormData = {
    title: string;
    url: string;
    description: string;
    category: string;
    type: string;
    tags: string;
    image_url: string;
    status: string;
};

const EMPTY_FORM: FormData = {
    title: "",
    url: "",
    description: "",
    category: "",
    type: "",
    tags: "",
    image_url: "",
    status: "pending",
};

export function ResourceFormDialog({
    open,
    onOpenChange,
    resource,
    onSuccess,
}: ResourceFormDialogProps) {
    const isEditMode = !!resource;
    const [form, setForm] = useState<FormData>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            if (resource) {
                setForm({
                    title: resource.title ?? "",
                    url: resource.url ?? "",
                    description: resource.description ?? "",
                    category: resource.category ?? "",
                    type: resource.type ?? "",
                    tags: resource.tags ? resource.tags.join(", ") : "",
                    image_url: resource.image_url ?? "",
                    status: resource.status ?? "pending",
                });
            } else {
                setForm(EMPTY_FORM);
            }
            setError(null);
        }
    }, [open, resource]);

    const handleChange = (field: keyof FormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const payload = {
            ...form,
            tags: form.tags
                ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : [],
        };

        try {
            const url = isEditMode
                ? `/api/resources/${resource!.id}`
                : `/api/resources`;

            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Request failed");
            }

            onSuccess();
            onOpenChange(false);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Resource" : "Add New Resource"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label htmlFor="rf-title">Title *</Label>
                        <Input
                            id="rf-title"
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Resource title"
                            required
                        />
                    </div>

                    {/* URL */}
                    <div className="space-y-1.5">
                        <Label htmlFor="rf-url">URL *</Label>
                        <Input
                            id="rf-url"
                            type="url"
                            value={form.url}
                            onChange={(e) => handleChange("url", e.target.value)}
                            placeholder="https://example.com"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <Label htmlFor="rf-desc">Description *</Label>
                        <Textarea
                            id="rf-desc"
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            placeholder="Brief description of the resource"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Category + Type row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label>Category *</Label>
                            <Select
                                value={form.category}
                                onValueChange={(v) => handleChange("category", v)}
                                required
                            >
                                <SelectTrigger id="rf-category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <Label>Type *</Label>
                            <Select
                                value={form.type}
                                onValueChange={(v) => handleChange("type", v)}
                                required
                            >
                                <SelectTrigger id="rf-type">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TYPES.map((t) => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Status (only relevant for editing or set at creation) */}
                    <div className="space-y-1.5">
                        <Label>Status</Label>
                        <Select
                            value={form.status}
                            onValueChange={(v) => handleChange("status", v)}
                        >
                            <SelectTrigger id="rf-status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUSES.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tags */}
                    <div className="space-y-1.5">
                        <Label htmlFor="rf-tags">Tags</Label>
                        <Input
                            id="rf-tags"
                            value={form.tags}
                            onChange={(e) => handleChange("tags", e.target.value)}
                            placeholder="e.g. python, ai, free (comma-separated)"
                        />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-1.5">
                        <Label htmlFor="rf-image">Image URL</Label>
                        <Input
                            id="rf-image"
                            type="url"
                            value={form.image_url}
                            onChange={(e) => handleChange("image_url", e.target.value)}
                            placeholder="https://example.com/image.png (optional)"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditMode ? "Save Changes" : "Add Resource"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
