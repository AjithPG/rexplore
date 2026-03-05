import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/shared/ui/dialog";
import React from "react";

interface DeleteConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    itemName?: string | null;
    onConfirm: () => void;
    loading?: boolean;
    description?: React.ReactNode;
}

export function DeleteConfirmationDialog({
    open,
    onOpenChange,
    title = "Delete Item",
    itemName,
    onConfirm,
    loading = false,
    description,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            {description ? (
                                description
                            ) : (
                                <>
                                    Are you sure you want to delete{" "}
                                    {itemName && <span className="font-semibold">&ldquo;{itemName}&rdquo;</span>}?
                                    {" "}This action cannot be undone.
                                </>
                            )}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
