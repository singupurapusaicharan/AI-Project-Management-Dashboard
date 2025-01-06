"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export const Logo = () => (
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      type: "spring",
      stiffness: 100
    }}
  >
    <motion.div
      animate={{
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Brain className="h-8 w-8 text-blue-600" />
    </motion.div>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      AI Dashboard
    </span>
  </motion.div>
);