"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/lib/store/project-store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FormErrors {
  name?: string;
  description?: string;
  budget?: string;
  file?: string;
}

export function ProjectUpload() {
  const router = useRouter();
  const { toast } = useToast();
  const addProject = useProjectStore((state) => state.addProject);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    file: null as File | null,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Project name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.file) newErrors.file = "AI model file is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, file: "Only PDF and ZIP files are allowed" }));
        return;
      }
      setFormData(prev => ({ ...prev, file }));
      setErrors(prev => ({ ...prev, file: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newProject = {
        name: formData.name,
        description: formData.description,
        budget: Number(formData.budget),
        status: "pending" as const,
        userId: "1"
      };

      addProject(newProject);
      
      toast({
        title: "Success!",
        description: "Project has been created successfully.",
        className: "bg-green-700 border-green-800 text-white",
      });

      setFormData({ name: "", description: "", budget: "", file: null });
      setErrors({});
      router.push("/dashboard");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-white">Upload New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Project Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`bg-white/5 border-white/10 text-white ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={`bg-white/5 border-white/10 text-white ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-sm text-red-400">{errors.description}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Budget</label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className={`bg-white/5 border-white/10 text-white ${errors.budget ? "border-red-500" : ""}`}
              />
              {errors.budget && <p className="text-sm text-red-400">{errors.budget}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">AI Model File (PDF or ZIP)</label>
              <Input
                type="file"
                accept=".pdf,.zip"
                onChange={handleFileChange}
                className={`bg-white/5 border-white/10 text-white ${errors.file ? "border-red-500" : ""}`}
              />
              {errors.file && <p className="text-sm text-red-400">{errors.file}</p>}
            </div>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Upload Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}