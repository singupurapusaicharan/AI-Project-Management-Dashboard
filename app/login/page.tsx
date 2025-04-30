"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store/user-store";
import { useProjectStore } from "@/lib/store/project-store";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import axios from "axios";

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const updateUser = useUserStore((state) => state.updateUser);
  const { fetchProjects } = useProjectStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        const { success, message, data, errors: serverErrors } = response.data;
        
        if (success) {
          updateUser({
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: data.avatar
          });

          await fetchProjects();
          
          toast({
            title: "Success",
            description: message,
            className: "bg-green-700 border-green-800 text-white",
          });
          
          router.push('/dashboard');
        } else {
          toast({
            title: "Error",
            description: serverErrors?.[0] || "Login failed",
            className: "bg-red-700 border-red-800 text-white",
          });
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.errors?.[0] || "An unexpected error occurred";
        toast({
          title: "Error",
          description: errorMessage,
          className: "bg-red-700 border-red-800 text-white",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center radiant-background p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md"
      >
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-200">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white ${errors.email ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-200">Password</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white ${errors.password ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button 
                  type="submit" 
                  className="w-full gradient-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-sm text-gray-300 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  Sign Up
                </Link>
              </motion.p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}