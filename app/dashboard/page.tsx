"use client";

import { ProjectTable } from "@/components/dashboard/project-table";
import { useProjectStore } from "@/lib/store/project-store";

export default function DashboardPage() {
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Overview</h1>
        <p className="text-gray-500">Manage and monitor your AI projects</p>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
}