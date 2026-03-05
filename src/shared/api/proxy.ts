import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export const proxy = clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
        // Must be signed in to access admin
        const { userId } = await auth();

        if (!userId) {
            // Redirect unauthenticated users to home
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Emal check is handled strictly client-side 
        // to avoid issues with missing session claims in Clerk default setup
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
