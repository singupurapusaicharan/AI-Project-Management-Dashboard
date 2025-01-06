"use client";

import { motion } from "framer-motion";

export const SlideIn = ({ children, direction = "left", delay = 0 }) => {
  const directionOffset = {
    left: -100,
    right: 100,
    top: -100,
    bottom: 100,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: directionOffset[direction] }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
    >
      {children}
    </motion.div>
  );
};