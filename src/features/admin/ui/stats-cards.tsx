import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface StatsCardsProps {
    total: number;
    pendingCount: number;
    approvedCount: number;
    rejectedCount: number;
}

export function StatsCards({ total, pendingCount, approvedCount, rejectedCount }: StatsCardsProps) {
    return (
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
    );
}
