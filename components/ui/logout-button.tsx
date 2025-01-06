"use client";

import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface LogoutButtonProps {
  onClick: () => void;
}

export function LogoutButton({ onClick }: LogoutButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full h-[40px] group"
      whileHover="hover"
      initial="initial"
    >
      {/* Base layer with brighter color */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 backdrop-blur-sm border border-white/20" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${20 + i * 12}%`,
              top: "50%",
            }}
            variants={{
              initial: { y: 0, opacity: 0 },
              hover: {
                y: [-15, 15],
                opacity: [0, 1, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                },
              },
            }}
          />
        ))}
      </div>

      {/* Button content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex items-center gap-2 text-gray-300 group-hover:text-white"
          variants={{
            initial: { x: 0 },
            hover: {
              x: [0, -2, 2, 0],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              },
            },
          }}
        >
          <motion.div
            variants={{
              initial: { rotate: 0 },
              hover: {
                rotate: [0, -10, 10, 0],
                transition: {
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            }}
          >
            <LogOut className="h-4 w-4" />
          </motion.div>
          <span>Logout</span>
        </motion.div>
      </div>

      {/* Click effect */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
      />
    </motion.button>
  );
}