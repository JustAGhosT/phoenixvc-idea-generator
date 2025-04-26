'use client';

import { StatCard } from "@/components/common/cards/StatCard";

// Define the trend direction type to match StatCardTrend
type TrendDirection = "up" | "down" | "neutral";

// Fetch data from your Vercel Analytics API
async function getAnalyticsData() {
  try {
    // In a server component, you can directly fetch from your API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/analytics`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    
    const data = await response.json();
    
    // Calculate conversion rate (this is an example - adjust based on your metrics)
    const conversionRate = data.conversions ? (data.conversions / data.totalVisits) * 100 : 0;
    
    return {
      totalVisits: data.totalVisits || 0,
      conversionRate: conversionRate || 0,
      bounceRate: data.bounceRate || 0,
      avgSession: data.avgSessionDuration || 0,
      // Explicitly type the direction as TrendDirection
      trends: {
        visits: { value: 5.2, direction: "up" as TrendDirection, isGood: true },
        conversion: { value: 2.3, direction: "up" as TrendDirection, isGood: true },
        bounce: { value: 0.8, direction: "down" as TrendDirection, isGood: true },
        session: { value: 3.1, direction: "up" as TrendDirection, isGood: true },
      }
    };
      } catch (error) {
    console.error('Error:', error);
    // Return fallback data if the API call fails
    return {
      totalVisits: 0,
      conversionRate: 0,
      bounceRate: 0,
      avgSession: 0,
      trends: {
        visits: { value: 0, direction: "neutral" as TrendDirection, isGood: true },
        conversion: { value: 0, direction: "neutral" as TrendDirection, isGood: true },
        bounce: { value: 0, direction: "neutral" as TrendDirection, isGood: true },
        session: { value: 0, direction: "neutral" as TrendDirection, isGood: true },
}
    };
  }
}

export default async function AnalyticsDashboard() {
  // Fetch analytics data
  const { totalVisits, conversionRate, bounceRate, avgSession, trends } = await getAnalyticsData();
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard 
          title="Total Visits" 
          value={totalVisits} 
          description="Visits this month" 
          icon="users"
          variant="primary"
          trend={trends.visits.value > 0 ? {
            value: trends.visits.value,
            label: "vs last month",
            direction: trends.visits.direction,
            isGood: trends.visits.isGood
          } : undefined}
        />
        <StatCard 
          title="Conversion Rate" 
          value={`${conversionRate.toFixed(1)}%`} 
          description="Current conversion rate" 
          icon="trending"
          variant="success"
          trend={trends.conversion.value > 0 ? {
            value: trends.conversion.value,
            label: "vs last month",
            direction: trends.conversion.direction,
            isGood: trends.conversion.isGood
          } : undefined}
        />
        <StatCard 
          title="Bounce Rate" 
          value={`${bounceRate.toFixed(1)}%`} 
          description="User bounce rate" 
          icon="activity"
          variant="warning"
          trend={trends.bounce.value > 0 ? {
            value: trends.bounce.value,
            label: "vs last month",
            direction: trends.bounce.direction,
            isGood: trends.bounce.isGood
          } : undefined}
        />
        <StatCard 
          title="Avg. Session" 
          value={`${avgSession.toFixed(0)}s`} 
          description="Average session duration" 
          icon="chart"
          variant="info"
          trend={trends.session.value > 0 ? {
            value: trends.session.value,
            label: "vs last month",
            direction: trends.session.direction,
            isGood: trends.session.isGood
          } : undefined}
        />
    </div>
      
      {/* You can add more detailed analytics components here */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <p className="text-muted-foreground mb-4">
          These metrics are collected from real users of your application.
          They help identify performance bottlenecks and areas for improvement.
        </p>
        
        {/* Add more detailed analytics visualizations here */}
      </div>
    </div>
  );
}