"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Activity, 
  Mail, 
  Trophy, 
  Layers, 
  Cpu, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MissionControl() {
  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 grid-bg font-mono">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-blue-500 text-xs tracking-widest font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {siteConfig.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              {siteConfig.hero.title}
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 md:mt-0 text-right space-y-1"
          >
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Operator: Begu // IST</div>
            <div className="text-sm font-bold text-emerald-500 uppercase">{siteConfig.hero.status.value}</div>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-sm hover:border-zinc-700 transition-colors"
            >
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-[10px] text-zinc-400 mt-2 flex items-center gap-1">
                {stat.trend === "up" && <Zap size={10} className="text-blue-500" />}
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Projects Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <Layers size={18} className="text-blue-500" /> ACTIVE_PROJECTS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteConfig.projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="group relative bg-zinc-900/30 border border-zinc-800 p-5 hover:bg-zinc-800/40 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 border",
                      project.status === "COMPLETED" ? "border-emerald-900 text-emerald-500 bg-emerald-950/30" :
                      project.status === "IN PROGRESS" ? "border-blue-900 text-blue-500 bg-blue-950/30" :
                      "border-zinc-700 text-zinc-500 bg-zinc-900/30"
                    )}>
                      {project.status}
                    </span>
                    <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-black uppercase mb-2">{project.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-zinc-500 bg-zinc-950 px-2 py-1 rounded-full border border-zinc-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Inbox Intelligence */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-widest flex items-center gap-2">
                <Mail size={18} className="text-blue-500" /> INBOX_INTEL
              </h2>
              <div className="space-y-2">
                {siteConfig.inboxIntel.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.1) }}
                    className="flex items-center gap-3 p-3 bg-zinc-900/50 border-l-2 border-zinc-800 hover:border-blue-500 transition-all cursor-pointer"
                  >
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full shrink-0",
                      item.priority === "HIGH" ? "bg-red-500 animate-pulse" : "bg-blue-500"
                    )} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{item.subject}</div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-tighter truncate">{item.from}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Barça Section */}
            <section className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-sm space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-blue-400">
                <Trophy size={16} /> BARÇA_WATCH
              </h2>
              <div className="space-y-2">
                <div className="text-xs text-zinc-400 uppercase tracking-widest">Next Fixture</div>
                <div className="text-xl font-black uppercase tracking-tight text-white">{siteConfig.barca.nextMatch}</div>
                <div className="text-[10px] text-zinc-500 flex justify-between uppercase">
                  <span>{siteConfig.barca.date}</span>
                  <span>{siteConfig.barca.stadium}</span>
                </div>
              </div>
            </section>

            {/* Hardware Status */}
            <section className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-sm space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-zinc-400">
                <Cpu size={16} /> EDGE_HARDWARE
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-500 uppercase">Jetson Nano Status</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-widest">ONLINE</span>
                </div>
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[45%]" />
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-500 uppercase">GPU Load</span>
                  <span className="text-zinc-300 font-bold tracking-widest">45%</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer / Status Bar */}
        <footer className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-widest pb-12">
          <div className="flex items-center gap-6">
            <span>© 2026 BEGU_MISSION_CONTROL</span>
            <span className="flex items-center gap-1"><Activity size={10} /> LATENCY: 24MS</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={10} /> SYNC: OK</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-500">SYSTEM_READY</span>
            <div className="h-4 w-px bg-zinc-800" />
            <span>LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
