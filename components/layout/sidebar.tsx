"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, Database } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/lib/store/user-store";
import { Logo } from "./logo";
import { motion } from "framer-motion";
import { SlideIn } from "../animations/slide-in";
import { LogoutButton } from "@/components/ui/logout-button";

const navigation = [
  {
    title: "AI Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage",
    href: "/dashboard/manage",
    icon: Database,
  },
  {
    title: "Account & Payments",
    href: "/dashboard/account",
    icon: Settings,
  },
];

const sidebarVariants = {
  hidden: { x: -300 },
  visible: { 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  
  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };
  
  return (
    <motion.div 
      className="flex h-screen flex-col justify-between w-64 p-6 bg-black/20 backdrop-blur-md border-r border-white/10"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div>
        <div className="mb-8">
          <Logo />
        </div>
        <nav className="space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            return (
              <SlideIn key={item.href} delay={index * 0.1}>
                <motion.div
                  whileHover={{ 
                    scale: 0.95,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-white/10",
                      pathname === item.href 
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </motion.div>
              </SlideIn>
            );
          })}
        </nav>
      </div>
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 p-3"
          whileHover={{ scale: 1.02 }}
        >
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        </motion.div>
        <LogoutButton onClick={handleLogout} />
      </motion.div>
    </motion.div>
  );
}