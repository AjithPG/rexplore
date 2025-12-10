import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold tracking-tight">Rexplore</span>
                </Link>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/submit"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Submit
                    </Link>

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button size="sm">Sign Up</Button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
