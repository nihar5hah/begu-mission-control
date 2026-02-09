"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { DesktopSidebar, MobileSidebar, MobileMenuButton } from "@/components/Sidebar";

const Badge = ({ children, variant = "default", className }: { children: React.ReactNode, variant?: "default" | "accent" | "outline", className?: string }) => {
  const styles = {
    default: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-accent text-accent-foreground border-accent/20",
    outline: "border-zinc-800 text-zinc-500"
  };
  return (
    <span className={cn("text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 border rounded-sm", styles[variant], className)}>
      {children}
    </span>
  );
};

const Card = ({ children, className, glow = false, onClick }: { children: React.ReactNode, className?: string, glow?: boolean, onClick?: () => void }) => (
  <motion.div 
    className={cn(
      "relative group bg-zinc-900/30 border border-zinc-800 p-6 transition-all",
      glow && "glow-primary",
      "hover:bg-zinc-800/40 hover:border-zinc-700 cursor-pointer",
      className
    )}
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <motion.div 
      className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
    >
      <ArrowUpRight size={14} className="text-primary" />
    </motion.div>
    {children}
  </motion.div>
);

export default function ProjectsPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative industrial-grid overflow-x-hidden">
      <div className="grain-overlay" />
      
      <DesktopSidebar />
      <MobileMenuButton isOpen={isMenuOpen} onToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <div className="md:ml-16">
        <div className="sticky top-0 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-xl z-30">
          <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Projects</span>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                <motion.div 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                04 ACTIVE
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <Github size={14} />
                View on GitHub
              </motion.button>
            </div>
          </div>
        </div>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="default">WORKSPACE // PROJECTS</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Project_Grid
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Track progress on all AI research, embedded systems, and automation projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card glow={project.status === "IN PROGRESS" || project.status === "OPERATIONAL"}>
                  <div className="flex justify-between items-center mb-6">
                    <Badge variant={project.status === "COMPLETED" ? "accent" : "default"}>
                      {project.status}
                    </Badge>
                    <span className="text-[10px] text-zinc-600 font-mono">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-zinc-800 flex gap-3">
                    <Link 
                      href="#"
                      className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary hover:text-white transition-colors"
                    >
                      <Github size={12} />
                      View Repo
                    </Link>
                    {project.status !== "COMPLETED" && (
                      <Link 
                        href="#"
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-500 hover:text-white transition-colors"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </Link>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-6 bg-zinc-900/30 border border-zinc-800 rounded-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                <Layers size={20} />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tighter">Add New Project</h2>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              Track your research and development projects here. Click to add a new project to your workspace.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-6 py-3 rounded-sm transition-all glow-primary"
            >
              + New Project
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
