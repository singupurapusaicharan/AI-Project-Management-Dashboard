"use client";

import { useParams } from "next/navigation";
import { PerformanceMetrics } from "@/components/dashboard/insights/performance-metrics";
import { UsageStatistics } from "@/components/dashboard/insights/usage-statistics";
import { ActivityLogs } from "@/components/dashboard/insights/activity-logs";

// This generates all possible paths for static site generation
export function generateStaticParams() {
  // Generate paths for all projects we know about
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" }
  ];
}

export default function InsightsPage() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Project Insights</h1>
        <p className="text-gray-500">Performance metrics and analytics for project #{id}</p>
      </div>
      <div className="grid gap-8">
        <PerformanceMetrics />
        <UsageStatistics />
        <ActivityLogs />
      </div>
    </div>
  );
}