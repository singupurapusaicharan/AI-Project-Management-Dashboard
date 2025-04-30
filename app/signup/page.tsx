"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const passwordRules = [
  { rule: "At least 8 characters long", regex: /.{8,}/ },
  { rule: "At least one uppercase letter", regex: /[A-Z]/ },
  { rule: "At least one lowercase letter", regex: /[a-z]/ },
  { rule: "At least one number", regex: /[0-9]/ },
  { rule: "At least one special character", regex: /[!@#$%^&*(),.?":{}|<>]/ }
];

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
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
        console.log('Attempting registration with:', { ...formData, password: '[REDACTED]' });
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        console.log('Registration response:', response.data);
        
        const { success, message, errors: serverErrors } = response.data;
        
        if (success) {
          toast({
            title: "Success",
            description: message || "Registration successful",
            className: "bg-green-700 border-green-800 text-white",
          });
          setTimeout(() => {
            router.push('/login');
          }, 500);
        } else {
          const errorMessage = serverErrors?.[0] || message || "Registration failed";
          toast({
            title: "Error",
            description: errorMessage,
            className: "bg-red-700 border-red-800 text-white",
          });
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        let errorMessage = "An unexpected error occurred";
        
        if (error.response) {
          errorMessage = error.response.data?.errors?.[0] || 
                        error.response.data?.message || 
                        `Server error: ${error.response.status}`;
        } else if (error.request) {
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
                  disabled={isLoading}
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-200">Confirm Password</label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`bg-white/5 border-white/10 text-white ${errors.confirmPassword ? "border-red-500" : ""}`}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Button 
                  type="submit" 
                  className="w-full gradient-button"
                  disabled={isLoading || !passwordValidation.every(rule => rule.valid)}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </motion.div>

              <motion.p 
                className="text-center text-sm text-gray-300 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
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