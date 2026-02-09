"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Globe, 
  Activity, 
  BarChart3, 
  Mail, 
  Trophy, 
  FileText, 
  Settings,
  ArrowUpRight,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: <Globe size={20} /> },
  { label: "Projects", href: "/projects", icon: <Activity size={20} /> },
  { label: "Stats", href: "/stats", icon: <BarChart3 size={20} /> },
  { label: "Inbox", href: "/inbox", icon: <Mail size={20} /> },
  { label: "Sports", href: "/sports", icon: <Trophy size={20} /> },
  { label: "Docs", href: "/docs", icon: <FileText size={20} /> },
];

interface DesktopSidebarProps {
  className?: string;
}

export function DesktopSidebar({ className }: DesktopSidebarProps) {
  const [pathname, setPathname] = useState("/");
  
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={cn(
      "fixed left-0 top-0 bottom-0 w-16 border-r border-zinc-800 bg-black/50 backdrop-blur-xl z-40 hidden md:flex flex-col items-center py-8 justify-between",
      className
    )}>
      <div className="space-y-8">
        <motion.div 
          className={cn(
            "p-2 rounded-lg cursor-pointer transition-colors",
            isActive("/") ? "bg-primary text-white glow-primary" : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={20} />
        </motion.div>
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "cursor-pointer transition-colors",
                  isActive(item.href) ? "text-primary" : "hover:text-white text-zinc-500"
                )}
              >
                {item.icon}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <Link href="/settings">
        <motion.div 
          className={cn(
            "cursor-pointer transition-colors",
            isActive("/settings") ? "text-primary" : "text-zinc-500 hover:text-white"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={20} />
        </motion.div>
      </Link>
    </nav>
  );
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [pathname, setPathname] = useState("/");
  
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          />
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 bottom-0 left-0 w-80 bg-zinc-900 border-r border-zinc-800 z-50 md:hidden"
          >
            <div className="p-6">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
              <div className="pt-8">
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
                  <div className={cn(
                    "p-2 rounded-lg",
                    isActive("/") ? "bg-primary text-white glow-primary" : "bg-zinc-900 text-zinc-500"
                  )}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-tighter">Mission_Control</div>
                    <div className="text-[10px] text-zinc-500">v1.0.0</div>
                  </div>
                </div>
                
                <nav className="space-y-2 mt-6">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={onClose}>
                      <motion.button
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-3 text-sm font-bold transition-all rounded-sm",
                          isActive(item.href) ? "text-primary bg-zinc-800/50" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                        )}
                      >
                        {item.icon}
                        {item.label}
                        {isActive(item.href) && <ArrowUpRight size={14} className="ml-auto" />}
                      </motion.button>
                    </Link>
                  ))}
                </nav>
                
                <div className="pt-4 border-t border-zinc-800 mt-6">
                  <Link href="/settings" onClick={onClose}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-sm transition-all"
                    >
                      <Settings size={16} />
                      Settings
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <motion.button 
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="md:hidden fixed top-4 left-4 z-30 text-zinc-400 hover:text-white p-2"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </motion.button>
  );
}
