"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getIdeas } from "@/lib/db";
import { format } from "date-fns";
import { ArrowUpDown, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Component, ReactNode, useEffect, useState } from "react";
// Import the Idea type from your project's types file
import type { Idea } from "@/lib/types";

// Custom error boundary component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="p-6 border border-red-500 rounded-lg bg-red-50 text-red-800">
          <h2 className="text-lg font-semibold mb-2">Something went wrong:</h2>
          <p className="mb-4">{this.state.error?.message || "Unknown error"}</p>
          <Button 
            onClick={() => this.setState({ hasError: false, error: null })} 
            variant="outline"
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error fallback component
function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-6 border border-red-500 rounded-lg bg-red-50 text-red-800">
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4">There was an error loading your projects.</p>
      <Button onClick={onRetry} variant="outline">
        Try again
      </Button>
    </div>
  );
}

// Convert to client component for state management
export default function ProjectsPageWrapper() {
  const [key, setKey] = useState(0);
  
  const handleReset = () => {
    setKey(prev => prev + 1);
  };
  
  return (
    <ErrorBoundary 
      fallback={<ErrorFallback onRetry={handleReset} />}
    >
      <ProjectsPage key={key} />
    </ErrorBoundary>
  );
}

function ProjectsPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const ideasPerPage = 6;

  // Format date with more options
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    try {
      const date = new Date(dateString);
      return format(date, "PPP"); // Format like "April 25th, 2025"
    } catch (e) {
      return "Invalid date";
    }
  };

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedIdeas = await getIdeas();
      // Use type assertion to resolve the type mismatch
      setIdeas(fetchedIdeas || []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to load ideas:", err);
      setError("Failed to load projects. Please try again later.");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    
    // Set up a refresh interval (every 5 minutes)
    const intervalId = setInterval(loadData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Helper function to ensure a value is a number
  const toNumber = (value: any): number => {
    if (typeof value === 'number') return value;
    if (value === undefined || value === null) return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Sort and filter ideas
  const filteredIdeas = ideas
    .filter((idea) =>
      idea.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Handle sorting
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? (a.title || "").localeCompare(b.title || "")
          : (b.title || "").localeCompare(a.title || "");
      } else if (sortBy === "rating") {
        return sortOrder === "asc"
          ? toNumber(a.rating) - toNumber(b.rating)
          : toNumber(b.rating) - toNumber(a.rating);
      } else if (sortBy === "confidence") {
        return sortOrder === "asc"
          ? toNumber(a.confidence) - toNumber(b.confidence)
          : toNumber(b.confidence) - toNumber(a.confidence);
      } else { // updatedAt
        const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(0);
        const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(0);
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
    });

  // Calculate averages safely
  const calculateAverageRating = (): string => {
    if (ideas.length === 0) return "0";
    const sum = ideas.reduce((acc, idea) => acc + toNumber(idea.rating), 0);
    return (sum / ideas.length).toFixed(1);
  };

  const calculateAverageConfidence = (): string => {
    if (ideas.length === 0) return "0";
    const sum = ideas.reduce((acc, idea) => acc + toNumber(idea.confidence), 0);
    return (sum / ideas.length).toFixed(0);
  };

  // Pagination
  const totalPages = Math.ceil(filteredIdeas.length / ideasPerPage);
  const paginatedIdeas = filteredIdeas.slice(
    (currentPage - 1) * ideasPerPage,
    currentPage * ideasPerPage
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and compare your DeFi project ideas
            {lastUpdated && (
              <span className="ml-2 text-xs opacity-70">
                (updated {formatRelativeTime(lastUpdated)})
              </span>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
          </Button>
          <Button asChild>
            <Link href="/projects/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      {loading && ideas.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading projects...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12 border rounded-lg bg-red-50 text-red-800">
          <p>{error}</p>
          <Button
            onClick={loadData}
            variant="outline"
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      ) : (
        <>
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex gap-2 items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="confidence">Confidence</SelectItem>
                  <SelectItem value="updatedAt">Last Updated</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                <ArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Stats summary */}
          {ideas.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="border rounded-lg p-4 bg-background">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Projects</h3>
                <p className="text-2xl font-bold">{ideas.length}</p>
              </div>
              <div className="border rounded-lg p-4 bg-background">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Rating</h3>
                <p className="text-2xl font-bold">
                  {calculateAverageRating()}/10
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-background">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Confidence</h3>
                <p className="text-2xl font-bold">
                  {calculateAverageConfidence()}%
                </p>
              </div>
            </div>
          )}

          {filteredIdeas.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedIdeas.map((idea) => (
                  <Link 
                    key={idea.id.toString()}
                    href={`/editor/${idea.id}`}
                    className="block border rounded-lg p-6 hover:bg-accent/50 transition-colors"
                  >
                    <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
                    <div className="flex justify-between text-sm text-muted-foreground mb-4">
                      <span>Rating: {toNumber(idea.rating)}/10</span>
                      <span>Confidence: {toNumber(idea.confidence)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {formatDate(idea.updatedAt)}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h2 className="text-xl font-semibold mb-2">No projects found</h2>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? "Try a different search term" : "Create your first project to get started"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/projects/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Project
                  </Link>
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}