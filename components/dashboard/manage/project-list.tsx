"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/lib/store/project-store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import axios from "axios";

export function ProjectList() {
  const { projects, deleteProject } = useProjectStore();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      // Delete from database
      const response = await axios.delete(`http://localhost:5000/api/projects/${id}`);
      if (response.status === 200) {
        // Update local state
        deleteProject(id);
        toast({
          title: "Success",
          description: "Project has been successfully deleted.",
          className: "bg-green-700 border-green-800 text-white",
        });
      } else {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        className: "bg-red-700 border-red-800 text-white",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-500/80 hover:bg-emerald-500/90 text-white border-emerald-400';
      case 'pending':
        return 'bg-amber-500/80 hover:bg-amber-500/90 text-white border-amber-400';
      case 'rejected':
        return 'bg-rose-500/80 hover:bg-rose-500/90 text-white border-rose-400';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-white">Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm">
                <TableHead className="text-gray-200">Name</TableHead>
                <TableHead className="text-gray-200">Status</TableHead>
                <TableHead className="text-gray-200">Last Updated</TableHead>
                <TableHead className="text-gray-200">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id} className="border-white/10 transition-all duration-300 hover:bg-blue-500/10 hover:backdrop-blur-sm">
                  <TableCell className="text-gray-300">{project.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`${getStatusColor(project.status)} backdrop-blur-sm`}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300">{project.timestamp}</TableCell>
                  <TableCell>
                    {project.status === "pending" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}