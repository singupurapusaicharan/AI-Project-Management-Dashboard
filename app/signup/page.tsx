"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import axios from "axios";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/auth/register', formData);
        
        toast({
          title: "Success",
          description: "Account created successfully. Please login.",
          className: "bg-green-700 border-green-800 text-white",
        });
        router.push('/login');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create account. Please try again.",
          className: "bg-red-700 border-red-800 text-white",
        });
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
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-200">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-400">{errors.name}</p>}
              </motion.div>

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
                >
                  Sign Up
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-sm text-gray-300 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </motion.p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}