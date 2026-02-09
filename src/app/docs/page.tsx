"use client";

import React from "react";
import { motion } from "framer-motion";
import { Book, Github, ExternalLink, Terminal, Zap, Cpu, Globe, Activity, ArrowRight, ChevronRight } from "lucide-react";
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

const DocCard = ({ icon, title, description, href, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  href: string; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Link href={href} className="block h-full">
      <motion.div 
        className="h-full bg-zinc-900/40 border border-zinc-800 p-6 transition-all hover:bg-zinc-800/50 hover:border-zinc-700 cursor-pointer"
        whileHover={{ scale: 1.01, y: -4 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-zinc-800 text-zinc-400 rounded-sm">
            {icon}
          </div>
          <ChevronRight size={16} className="ml-auto text-zinc-600 group-hover:text-primary" />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </motion.div>
    </Link>
  </motion.div>
);

const QuickLink = ({ label, href, delay }: { label: string; href: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <Link href={href} className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors">
      <ArrowRight size={14} className="text-zinc-600 group-hover:text-primary" />
      {label}
    </Link>
  </motion.div>
);

export default function DocsPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const quickStartSteps = [
    { icon: <Terminal size={16} />, title: "1. Setup Environment", description: "Install Node.js 22+, clone the repo, and run npm install" },
    { icon: <Zap size={16} />, title: "2. Configure Begubot", description: "Set up your Telegram bot, Google Workspace, and WhatsApp integrations" },
    { icon: <Cpu size={16} />, title: "3. Deploy Systems", description: "Run Task Manager, Inbox Intelligence, and start the cron jobs" },
  ];

  const systemDocs = [
    { icon: <Globe size={18} />, title: "Mission Control", description: "Main dashboard overview, navigation, and features", href: "#mission-control" },
    { icon: <Activity size={18} />, title: "Task Manager", description: "Kanban board, REST API, and CLI usage guide", href: "#task-manager" },
    { icon: <Terminal size={18} />, title: "Cron Jobs", description: "Scheduled tasks, reminders, and automation setup", href: "#cron-jobs" },
    { icon: <Github size={18} />, title: "Inbox Intelligence", description: "Gmail analysis, action item detection, and routing", href: "#inbox-intel" },
  ];

  const quickLinks = [
    { label: "API Reference", href: "#api" },
    { label: "Deployment Guide", href: "#deployment" },
    { label: "Troubleshooting", href: "#troubleshoot" },
    { label: "GitHub Repository", href: "https://github.com/nihar5hah/begu-mission-control" },
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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Documentation</span>
              <div className="h-4 w-px bg-zinc-800" />
              <Badge variant="accent">v1.0.0</Badge>
            </div>
            <motion.a
              href="https://github.com/nihar5hah/begu-mission-control"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={14} />
              View on GitHub
            </motion.a>
          </div>
        </div>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="default">DOCS // GUIDE</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Documentation
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Complete guide to setting up, configuring, and using the Begu Mission Control system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="lg:col-span-3">
              <div className="bg-zinc-900/40 border border-zinc-800 p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 text-primary rounded border border-primary/20">
                    <Zap size={20} />
                  </div>
                  <h2 className="text-lg font-black uppercase tracking-tighter">Quick Start</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickStartSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      className="p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm"
                    >
                      <div className="flex items-center gap-2 mb-3 text-primary">
                        {step.icon}
                      </div>
                      <h3 className="text-sm font-black uppercase mb-2">{step.title}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                    <Book size={20} />
                  </div>
                  <h2 className="text-lg font-black uppercase tracking-tighter">System Components</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemDocs.map((doc, i) => (
                    <DocCard key={doc.title} {...doc} delay={0.3 + (i * 0.05)} />
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                    <Terminal size={20} />
                  </div>
                  <h2 className="text-lg font-black uppercase tracking-tighter">Common Commands</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-black/50 border border-zinc-800 rounded-sm font-mono text-xs text-zinc-400">
                    <div className="text-zinc-600 mb-1"># View all tasks</div>
                    <div className="text-white">./task-cli.sh list</div>
                  </div>
                  <div className="p-4 bg-black/50 border border-zinc-800 rounded-sm font-mono text-xs text-zinc-400">
                    <div className="text-zinc-600 mb-1"># Add new task</div>
                    <div className="text-white">./task-cli.sh add &quot;Task name&quot;</div>
                  </div>
                  <div className="p-4 bg-black/50 border border-zinc-800 rounded-sm font-mono text-xs text-zinc-400">
                    <div className="text-zinc-600 mb-1"># Mark task complete</div>
                    <div className="text-white">./task-cli.sh done &lt;task-id&gt;</div>
                  </div>
                  <div className="p-4 bg-black/50 border border-zinc-800 rounded-sm font-mono text-xs text-zinc-400">
                    <div className="text-zinc-600 mb-1"># Sync cron jobs</div>
                    <div className="text-white">node sync-cron-jobs-v2.js</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900/40 border border-zinc-800 p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, i) => (
                    <QuickLink key={link.label} {...link} delay={0.4 + (i * 0.05)} />
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Resources</h3>
                <div className="space-y-4">
                  <motion.a
                    href="https://github.com/nihar5hah/begu-mission-control"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors"
                  >
                    <Github size={16} className="text-zinc-400" />
                    <div>
                      <div className="text-xs font-bold">GitHub Repository</div>
                      <div className="text-[10px] text-zinc-500">Source code & issues</div>
                    </div>
                  </motion.a>
                  <motion.a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors"
                  >
                    <ExternalLink size={16} className="text-zinc-400" />
                    <div>
                      <div className="text-xs font-bold">Live Deployment</div>
                      <div className="text-[10px] text-zinc-500">Vercel hosting</div>
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
