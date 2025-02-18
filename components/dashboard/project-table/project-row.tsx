"use client";

import { AIProject } from "@/lib/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ChevronRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { StatusButtons } from "./status-buttons";
import { useProjectStore } from "@/lib/store/project-store";
import { motion } from "framer-motion";

interface ProjectRowProps {
  project: AIProject;
}

export function ProjectRow({ project }: ProjectRowProps) {
  const deleteProject = useProjectStore((state) => state.deleteProject);

  return (
    <motion.tr
      className="group relative transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <TableCell className="group-hover:text-white">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={project.user.avatar} />
            <AvatarFallback>{project.user.name[0]}</AvatarFallback>
          </Avatar>
          <span>{project.user.name}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium group-hover:text-white">{project.name}</TableCell>
      <TableCell className="max-w-xs truncate group-hover:text-white">{project.description}</TableCell>
      <TableCell className="group-hover:text-white">{project.timestamp}</TableCell>
      <TableCell>
        <Link 
          href={`/dashboard/insights/${project.id}`}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
        >
          Insights
          <ChevronRight className="h-4 w-4" />
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-4">
          <StatusButtons status={project.status} />
          {project.status === 'pending' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteProject(project.id)}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className="flex items-center gap-1 text-white border-white/20 bg-blue-500/10 backdrop-blur-sm"
        >
          <DollarSign className="h-4 w-4" />
          <span className="text-white font-medium">${project.budget.toLocaleString()}</span>
        </Badge>
      </TableCell>
    </motion.tr>
  );
}