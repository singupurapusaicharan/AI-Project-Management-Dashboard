"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUserStore } from "@/lib/store/user-store";
import { useProjectStore } from "@/lib/store/project-store";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import axios from "axios";

interface FormErrors {
  name?: string;
  email?: string;
}

export function AccountSettings() {
  const { user, updateUser } = useUserStore();
  const { updateProjectsWithUser } = useProjectStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Update user in the database
        await axios.put(`http://localhost:5000/api/auth/users/${user.id}`, {
          name: formData.name.trim(),
          email: formData.email.trim()
        });

        // Update local state
        updateUser({
          ...user,
          name: formData.name.trim(),
          email: formData.email.trim(),
        });
        
        // Update projects with new user info
        updateProjectsWithUser();
        
        toast({
          title: "Success",
          description: "Your account settings have been updated.",
          className: "bg-green-700 border-green-800 text-white",
        });
      } catch (error) {
        console.error('Update error:', error);
        toast({
          title: "Error",
          description: "Failed to update account settings. Please try again.",
          className: "bg-red-700 border-red-800 text-white",
        });
      }
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
          <CardTitle className="text-white">Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`bg-white/5 border-white/10 text-white ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`bg-white/5 border-white/10 text-white ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
            </div>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}