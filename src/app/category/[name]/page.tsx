'use client'
import { ResourceCard } from "@/entities/resource/ui/resource-card";
import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/shared/api/supabase";
import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import { Sidebar } from "@/widgets/sidebar/ui/sidebar";;
import { Button } from "@/shared/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shared/ui/pagination";
import { Resource } from "@/entities/resource/model/types";

const CategoryPage = () => {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

    // URL State
    const activeCategory = params.name ? decodeURIComponent(params.name as string) : "All";
    const searchQuery = searchParams.get("q") || "";
    const currentPage = Number(searchParams.get("page")) || 1;

    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 10;

    // Local state for search input to allow typing without constant URL updates
    const [localSearch, setLocalSearch] = useState(searchQuery);

    // Sync local search with URL when URL changes (e.g. back button)
    useEffect(() => {
        setLocalSearch(searchQuery);
    }, [searchQuery]);

    // Debounce search update to URL
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localSearch !== searchQuery) {
                const params = new URLSearchParams(searchParams.toString());
                if (localSearch) {
                    params.set("q", localSearch);
                } else {
                    params.delete("q");
                }
                params.delete("page"); // Reset to page 1 on search
                router.push(`${pathname}?${params.toString()}`);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearch, router, pathname, searchParams, searchQuery]);


    useEffect(() => {
        async function fetchResources() {
            try {
                const { data, error } = await supabase
                    .from('resources')
                    .select('*')
                    .eq('status', 'Approved');

                if (error) {
                    console.error('Error fetching resources:', error);
                } else {
                    setResources(data || []);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchResources();
    }, []);

    const filteredResources = resources.filter((resource) => {
        const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
        const matchesSearch = searchQuery === "" ||
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
    const paginatedResources = filteredResources.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`${pathname}?${params.toString()}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="h-screen overflow-hidden bg-background font-sans flex flex-col">

            <div className="flex flex-1 overflow-hidden container max-w-screen-2xl mx-auto">
                <Sidebar className="block w-64 shrink-0 hidden md:block border-r" />

                <main className="flex-1 w-full min-w-0 overflow-y-auto">
                    {/* Hero Section */}
                    <section className="py-12 md:py-20 px-4 md:px-8 bg-gradient-to-b from-muted/50 to-background">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                                Find Free Learning
                                <br />
                                <span className="text-primary">& Earning Opportunities</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl mb-10">
                                Curated resources for students, freelancers, developers and job seekers.
                            </p>

                            {/* Search Bar */}
                            <div className="max-w-xl mx-auto relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search resources, courses, jobs..."
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                    className="h-12 pl-12 pr-4 text-base rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Resource Grid */}
                    <section className="py-8 px-4 md:px-8">
                        {isLoading ? (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">Loading resources...</p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold tracking-tight">
                                        {activeCategory === 'All' ? 'All Resources' : activeCategory}
                                    </h2>
                                    {searchQuery && (
                                        <p className="text-sm text-muted-foreground">
                                            Found {filteredResources.length} results
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6 grid w-full gap-x-4 gap-y-6 pb-6 md:grid-cols-2 md:pb-20 lg:grid-cols-3 xl:grid-cols-4">
                                    {paginatedResources.map((resource) => (
                                        <ResourceCard
                                            key={resource.id}
                                            id={resource.id}
                                            title={resource.title}
                                            description={resource.description}
                                            category={resource.category}
                                            tags={resource.tags || []}
                                            url={resource.url}
                                            type={resource.type}
                                            image={resource?.image_url}
                                        />
                                    ))}
                                </div>

                                {filteredResources.length === 0 && (
                                    <div className="text-center py-20 border rounded-xl bg-muted/20">
                                        <p className="text-muted-foreground text-lg mb-2">
                                            {searchQuery
                                                ? `No resources found for "${searchQuery}"`
                                                : "No resources found in this category."}
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={() => {
                                                setLocalSearch("");
                                                router.push(pathname);
                                            }}
                                        >
                                            Clear all filters
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Pagination */}
                        {!isLoading && filteredResources.length > itemsPerPage && (
                            <div className="mt-12">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            // Show limited pages logic could go here, for now showing all if not too many
                                            if (totalPages > 7) {
                                                // Simple truncated logic could be implemented if requested, keeping it simple for now
                                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                                    return (
                                                        <PaginationItem key={page}>
                                                            <PaginationLink
                                                                isActive={currentPage === page}
                                                                onClick={() => handlePageChange(page)}
                                                                className="cursor-pointer"
                                                                size="icon"
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        </PaginationItem>
                                                    );
                                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                    return <PaginationItem key={page}><span className="flex h-9 w-9 items-center justify-center">...</span></PaginationItem>
                                                }
                                                return null;
                                            }

                                            return (
                                                <PaginationItem key={page}>
                                                    <PaginationLink
                                                        isActive={currentPage === page}
                                                        onClick={() => handlePageChange(page)}
                                                        className="cursor-pointer"
                                                        size="icon"
                                                    >
                                                        {page}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        })}

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );

}

export default CategoryPage