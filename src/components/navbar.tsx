import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold tracking-tight">Rexplore</span>
                    <Badge className="px-1.5 text-[0.6rem] h-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-sm">Alpha</Badge>
                </Link>

                {/* Right Side */}
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-4">
                    <Button size="sm" asChild className="px-8 text-lg w-auto">
                        <Link
                            href="https://forms.gle/z46LQ5DZK9LcDzmc9"
                            className="text-sm font-medium text-muted-foreground transition-colors"
                        >
                            Request Resources
                        </Link>
                    </Button>

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

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-4 mt-8">


                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button variant="ghost" size="sm" className="w-full justify-start">Sign In</Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button size="sm" className="w-full justify-start">Sign Up</Button>
                                    </SignUpButton>
                                </SignedOut>
                                <Button size="sm" asChild className="w-full justify-start">
                                    <Link
                                        href="https://forms.gle/z46LQ5DZK9LcDzmc9"
                                        className="text-sm font-medium transition-colors"
                                    >
                                        Request Resources
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
