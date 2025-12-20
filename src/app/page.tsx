"use client";
import { Navbar } from "@/components/navbar";
import { ResourceCard } from "@/components/resource-card";
import { CategoryFilter } from "@/components/category-filter";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Resource Interface
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  type: string;
}

const CATEGORIES = ["All", "Course", "Earning", "Event", "Job"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('status', 'approved');

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

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Find Free Learning
              <br />
              <span className="text-primary">& Earning Opportunities</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl mb-10">
              Curated resources for students, freelancers,developers and job seekers.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources, courses, jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-base rounded-xl shadow-lg border-2 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Resource Grid */}
        <section className="py-12 container px-4 md:px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading resources...</p>
            </div>
          ) : (
            <>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mb-6">
                  Found {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    description={resource.description}
                    category={resource.category}
                    tags={resource.tags || []}
                    url={resource.url}
                    type={resource.type}
                  />
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-2">
                    {searchQuery
                      ? `No resources found for "${searchQuery}"`
                      : "No resources found in this category."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
