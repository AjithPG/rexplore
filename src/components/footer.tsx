import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background container max-w-screen-2xl mx-auto">
            <div className="container py-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Made with 🖤 by the Rexplore Team
                    </p>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Rexplore. Discover free learning & earning opportunities.
                    </p>
                </div>
            </div>
        </footer>
    );
}
