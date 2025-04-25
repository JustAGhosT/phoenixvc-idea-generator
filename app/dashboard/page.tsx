"use client";

import { ActivityList } from "@/components/dashboard/ActivityList";
import { BarChart } from "@/components/dashboard/BarChart";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProjectsList } from "@/components/dashboard/ProjectsList";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuoteDisplay } from "@/components/layout/quote-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIdeas } from "@/lib/db";
import type { Idea } from "@/lib/types";
import { formatDate, toNumber } from "@/lib/utils/formatters";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"visual" | "text">("visual");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [userName, setUserName] = useState<string>("User");

  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedIdeas = await getIdeas();
      setIdeas(fetchedIdeas || []);
      setLastUpdated(new Date());
      setUserName("Demo User");
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
    const intervalId = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleViewMode = () => setViewMode(viewMode === "visual" ? "text" : "visual");

  // Calculate statistics
  const averageRating = ideas.length > 0
    ? ideas.reduce((sum, idea) => sum + toNumber(idea.rating), 0) / ideas.length
    : 0;
  
  const averageConfidence = ideas.length > 0
    ? ideas.reduce((sum, idea) => sum + toNumber(idea.confidence), 0) / ideas.length
    : 0;

  // Prepare chart data
  const confidenceChartData = ideas.map(idea => ({
    name: idea.title,
    value: toNumber(idea.confidence)
  }));

  const ratingChartData = ideas.map(idea => ({
    name: idea.title,
    value: toNumber(idea.rating)
  }));

  if (loading && ideas.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-8 px-4">
        <div className="flex items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
        
        {/* QuoteDisplay in loading state */}
        <div className="w-full max-w-md">
          <QuoteDisplay refreshInterval={10000} />
          </div>
      </div>
  );
}

  return (
    <DashboardLayout
      title="DeFi Project Analyzer Dashboard"
      userName={userName}
      lastUpdated={lastUpdated}
      isLoading={loading}
      onRefresh={loadData}
      viewMode={viewMode}
      onToggleViewMode={toggleViewMode}
    >
      {error ? (
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="Total Ideas" 
                value={ideas.length} 
                description="Number of project ideas analyzed" 
              />
              <StatCard 
                title="Average Confidence" 
                value={`${averageConfidence.toFixed(1)}%`} 
                description="Across all project ideas" 
              />
              <StatCard 
                title="Average Rating" 
                value={`${averageRating.toFixed(1)}/10`} 
                description="Across all project ideas" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {viewMode === "visual" ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Confidence by Project</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Confidence level for each project idea
                      </p>
                    </CardHeader>
                    <CardContent className="h-80">
                      {ideas.length > 0 ? (
                        <BarChart 
                          data={confidenceChartData} 
                          index="name"
                          categories={["value"]}
                          colors={["blue"]}
                          valueFormatter={(value) => `${value}%`}
                          yAxisWidth={40}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          No data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Rating by Project</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Rating score for each project idea
                      </p>
                    </CardHeader>
                    <CardContent className="h-80">
                      {ideas.length > 0 ? (
                        <BarChart 
                          data={ratingChartData} 
                          index="name"
                          categories={["value"]}
                          colors={["green"]}
                          valueFormatter={(value) => `${value}/10`}
                          yAxisWidth={40}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          No data available
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <ProjectsList 
                    ideas={ideas} 
                    toNumber={toNumber} 
                    formatDate={formatDate} 
                  />
                  <ActivityList 
                    ideas={ideas} 
                    formatDate={formatDate} 
                  />
                </>
              )}
            </div>
          </div>
          
          {/* Right sidebar with QuoteDisplay */}
          <div className="space-y-6">
            <QuoteDisplay className="shadow-sm" />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ideas.length > 0 ? (
                    ideas.slice(0, 5).map((idea, index) => (
                      <li key={index} className="text-sm">
                        {idea.title} was {idea.status || 'updated'} on {formatDate(idea.createdAt)}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted-foreground">No recent activity</li>
                  )}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High Risk Projects</span>
                    <span className="font-medium">
                      {ideas.filter(idea => toNumber(idea.rating) < 4).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium Risk Projects</span>
                    <span className="font-medium">
                      {ideas.filter(idea => toNumber(idea.rating) >= 4 && toNumber(idea.rating) < 7).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low Risk Projects</span>
                    <span className="font-medium">
                      {ideas.filter(idea => toNumber(idea.rating) >= 7).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}