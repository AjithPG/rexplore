import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        Made with 🖤 by the Rexplore Team
                    </p>
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Rexplore. Discover free learning & earning opportunities.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="https://twitter.com/rexplore"
                            target="_blank"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Twitter
                        </Link>
                        <Link
                            href="/submit"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Submit
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
