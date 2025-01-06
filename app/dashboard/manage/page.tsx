"use client";

import { ProjectUpload } from "@/components/dashboard/manage/project-upload";
import { ProjectList } from "@/components/dashboard/manage/project-list";

export default function ManagePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage AI Projects</h1>
        <p className="text-gray-500">Upload and manage your AI models and tasks</p>
      </div>
      <div className="grid gap-8">
        <ProjectUpload />
        <ProjectList />
      </div>
    </div>
  );
}