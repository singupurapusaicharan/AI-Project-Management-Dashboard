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
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormErrors {
  email?: string;
  password?: string;
}

const passwordRules = [
  { rule: "At least 8 characters long", regex: /.{8,}/ },
  { rule: "At least one uppercase letter", regex: /[A-Z]/ },
  { rule: "At least one lowercase letter", regex: /[a-z]/ },
  { rule: "At least one number", regex: /[0-9]/ },
  { rule: "At least one special character", regex: /[!@#$%^&*(),.?":{}|<>]/ }
];

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
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(
    passwordRules.map(rule => ({ ...rule, valid: false }))
  );

  const validatePassword = (password: string) => {
    return passwordRules.map(rule => ({
      ...rule,
      valid: rule.regex.test(password)
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));
    setPasswordValidation(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log('Attempting login with:', formData);
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        console.log('Login response:', response.data);
        
        const { success, message, data, errors: serverErrors } = response.data;
        
        if (success && data) {
          // Update user store with the received data
          updateUser({
            id: data.id,
            name: data.name,
            email: data.email,
            avatar: data.avatar || ""
          });

          // Fetch projects after successful login
          try {
            await fetchProjects();
          } catch (error) {
            console.error('Error fetching projects:', error);
            // Continue with login even if projects fetch fails
          }
          
          toast({
            title: "Success",
            description: message || "Login successful",
            className: "bg-green-700 border-green-800 text-white",
          });
          
          // Add a small delay before redirecting to ensure state is updated
          setTimeout(() => {
            router.push('/dashboard');
          }, 500);
        } else {
          const errorMessage = serverErrors?.[0] || message || "Login failed";
          toast({
            title: "Error",
            description: errorMessage,
            className: "bg-red-700 border-red-800 text-white",
          });
        }
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = "An unexpected error occurred";
        
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          errorMessage = error.response.data?.errors?.[0] || 
                        error.response.data?.message || 
                        `Server error: ${error.response.status}`;
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "No response from server. Please check if the server is running.";
        }
        
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
                transition={{ duration: 0.5, delay: 0.3 }}
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
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-200">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPasswordRules(!showPasswordRules)}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Password Rules
                    {showPasswordRules ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className={`bg-white/5 border-white/10 text-white ${errors.password ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
                
                <AnimatePresence>
                  {showPasswordRules && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-1 bg-white/5 p-2 rounded-md">
                        {passwordValidation.map((rule, index) => (
                          <p
                            key={index}
                            className={`text-xs ${rule.valid ? 'text-green-400' : 'text-gray-400'}`}
                          >
                            {rule.valid ? '✓' : '○'} {rule.rule}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
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
                transition={{ duration: 0.5, delay: 0.6 }}
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