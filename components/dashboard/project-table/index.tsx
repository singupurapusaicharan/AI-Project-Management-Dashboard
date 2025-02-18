"use client";

import { AIProject } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectRow } from "./project-row";

interface ProjectTableProps {
  projects: AIProject[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>AI Performance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}