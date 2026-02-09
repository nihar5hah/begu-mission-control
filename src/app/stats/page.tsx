"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Clock, Activity, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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

const StatCard = ({ label, value, subtext, trend, icon, delay }: { 
  label: string; 
  value: string; 
  subtext: string; 
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900/40 border-l border-t border-zinc-800 p-8 relative overflow-hidden group cursor-pointer"
    whileHover={{ y: -4 }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full opacity-5 group-hover:opacity-10 transition-opacity" />
    <div className="flex items-center justify-between mb-6">
      <div className="p-2 bg-zinc-800 text-zinc-400 rounded-sm">
        {icon}
      </div>
      <Badge variant={trend === "up" ? "accent" : "outline"}>
        {trend === "up" ? "+12.5%" : trend === "down" ? "-2.3%" : "STABLE"}
      </Badge>
    </div>
    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">{label}</div>
    <div className="text-5xl font-black text-white mb-2">{value}</div>
    <div className="text-[10px] text-zinc-500 font-bold uppercase">{subtext}</div>
  </motion.div>
);

export default function StatsPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const stats = [
    { label: "NPTEL PROGRESS", value: "5.56%", subtext: "Deep Learning - IIT Ropar", trend: "up" as const, icon: <Activity size={18} /> },
    { label: "ACTIVE PROJECTS", value: "04", subtext: "AI & Embedded Systems", trend: "neutral" as const, icon: <Zap size={18} /> },
    { label: "INTEL ITEMS", value: "04", subtext: "New tasks today", trend: "up" as const, icon: <ArrowUpRight size={18} /> },
    { label: "SYSTEM UPTIME", value: "99.9%", subtext: "Local Gateway", trend: "neutral" as const, icon: <Clock size={18} /> },
  ];

  const activityData = [
    { task: "Deep Learning Week 4 Quiz", status: "Completed", time: "2 hours ago" },
    { task: "NPTEL Week 3 Assignment", status: "Submitted", time: "Yesterday" },
    { task: "Task Manager API Integration", status: "In Progress", time: "2 days ago" },
    { task: "Voice Agent Evaluation", status: "Pending", time: "3 days ago" },
  ];

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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Stats</span>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                <motion.div 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                LIVE DATA
              </div>
            </div>
          </div>
        </div>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="default">ANALYTICS // STATS</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Performance_Metrics
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Real-time monitoring of academic progress, system performance, and task completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.1} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900/40 border border-zinc-800 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-lg font-black uppercase tracking-tighter">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {activityData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                    <div className="space-y-1">
                      <div className="text-sm font-bold">{item.task}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">{item.time}</div>
                    </div>
                    <Badge variant={item.status === "Completed" ? "accent" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-zinc-900/40 border border-zinc-800 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                  <Activity size={20} />
                </div>
                <h2 className="text-lg font-black uppercase tracking-tighter">Weekly Goals</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-sm font-bold mb-2">
                    <span>Complete NPTEL Week 4 Quiz</span>
                    <span className="text-emerald-500">100%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm font-bold mb-2">
                    <span>Voice Agent Evaluation</span>
                    <span className="text-primary">60%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ delay: 0.9, duration: 1 }}
                      className="h-full bg-primary" 
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-sm font-bold mb-2">
                    <span>Task Manager 2.0 Features</span>
                    <span className="text-blue-500">80%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ delay: 1, duration: 1 }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
