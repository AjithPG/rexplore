import { Navbar } from "@/components/navbar";
import { SubmissionForm } from "@/components/submission-form";

export default function SubmitPage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />
            <main className="container max-w-2xl py-16 px-4 md:px-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Submit a Resource</h1>
                    <p className="text-muted-foreground">
                        Know a great free resource? Share it with the community.
                    </p>
                </div>
                <div className="bg-card border rounded-lg p-6 md:p-8 shadow-sm">
                    <SubmissionForm />
                </div>
            </main>
        </div>
    );
}
