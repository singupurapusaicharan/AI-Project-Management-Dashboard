"use client";

import { motion } from "framer-motion";

export const ScaleIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
  >
    {children}
  </motion.div>
);