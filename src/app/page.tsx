"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Activity, 
  Globe,
  Bell,
  Search,
  Menu,
  X,
  Trash2,
  MessageCircle,
  Mail,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { DesktopSidebar, MobileSidebar, MobileMenuButton } from "@/components/Sidebar";

interface Project {
  title: string;
  status: string;
  desc: string;
  tags: string[];
}

interface InboxItem {
  id: string;
  subject: string;
  from: string;
  priority: string;
  snippet: string;
}

interface WhatsAppTask {
  id: string;
  title: string;
  description: string | null;
  status: string;
  category: string;
  tags: string[];
  createdAt: string;
}

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

const Card = ({ children, className, glow = false, onClick, href }: { children: React.ReactNode, className?: string, glow?: boolean, onClick?: () => void, href?: string }) => {
  const content = (
    <motion.div 
      className={cn(
        "relative group bg-zinc-900/30 border border-zinc-800 p-6 transition-all",
        glow && "glow-primary",
        "hover:bg-zinc-800/40 hover:border-zinc-700 cursor-pointer",
        className
      )}
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

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return <div onClick={onClick}>{content}</div>;
};

const Terminal = ({ onClear }: { onClear: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchGhostLogs = async () => {
      try {
        const response = await fetch('/api/ghost');
        if (response.ok) {
          const data = await response.json();
          const ghostEntries = data.events.flatMap((e: any) => [
            `ARCHIVE: [${e.date}] Session Sync`,
            ...e.entries.map((entry: string) => `  ▪ ${entry}`)
          ]);
          
          if (ghostEntries.length > 0) {
            setLogs(ghostEntries.slice(0, 15));
          } else {
            setLogs(["SYSTEM_BOOT: Begubot v2.4.0 initialized...", "SYNC: Project Ghost connected (waiting for logs)"]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch ghost logs:', error);
      }
    };

    fetchGhostLogs();
    const interval = setInterval(fetchGhostLogs, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = () => {
    setLogs([]);
    onClear();
  };

  return (
    <div className="bg-black border border-zinc-800 rounded-md overflow-hidden font-mono shadow-2xl">
      <div className="terminal-header flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">System_Feed_v2.log</span>
        </div>
        <motion.button
          onClick={handleClear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-zinc-500 hover:text-red-500 transition-colors p-1 rounded-sm hover:bg-zinc-900"
          title="Clear Logs"
        >
          <Trash2 size={12} />
        </motion.button>
      </div>
      <div className="p-4 space-y-1 min-h-[160px]">
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-[10px] leading-relaxed flex gap-2"
            >
              <span className="text-zinc-700">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
              <span className={cn(
                log.includes("OK") || log.includes("ACTIVE") ? "text-emerald-500" :
                log.includes("v2.4.0") ? "text-blue-500" : "text-zinc-400"
              )}>
                {log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex gap-2 text-[10px]">
          <span className="text-primary animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
};

export default function MissionControl() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedInboxItem, setSelectedInboxItem] = useState<InboxItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [whatsappTasks, setWhatsappTasks] = useState<WhatsAppTask[]>([]);
  const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(false);

  const inboxIntelWithSnippet: InboxItem[] = siteConfig.inboxIntel.map(item => ({
    ...item,
    snippet: `This is an automated summary of the email from ${item.from}. The email discusses important matters related to "${item.subject}" that require attention. Priority level: ${item.priority}. Please review the full email in your inbox for complete details.`
  }));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleInboxClick = (item: InboxItem) => {
    setSelectedInboxItem(item);
    setIsInboxModalOpen(true);
  };

  const handleClearLogs = () => {
    console.log("Logs cleared");
  };

  const fetchWhatsAppTasks = async () => {
    setIsLoadingWhatsApp(true);
    try {
      const response = await fetch('/api/whatsapp-tasks');
      if (response.ok) {
        const tasks = await response.json();
        setWhatsappTasks(tasks);
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp tasks:', error);
    } finally {
      setIsLoadingWhatsApp(false);
    }
  };

  useEffect(() => {
    fetchWhatsAppTasks();
  }, []);

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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Mission_Control</span>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                <motion.div 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                GATEWAY_ONLINE
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="SEARCH_COMMANDS..." 
                  className="bg-zinc-900/50 border border-zinc-800 rounded-full py-1.5 pl-10 pr-4 text-[10px] w-64 focus:outline-none focus:border-primary transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <Bell size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto overflow-hidden">
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Badge variant="default">{siteConfig.hero.badge}</Badge>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white">
                {siteConfig.hero.title}
              </h1>
              <p className="text-lg text-zinc-400 max-w-md leading-relaxed">
                {siteConfig.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/projects">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-sm transition-all glow-primary flex items-center gap-2"
                  >
                    View Projects <ArrowUpRight size={14} />
                  </motion.button>
                </Link>
                <Link href="/docs">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-sm transition-all"
                  >
                    Documentation
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Terminal onClear={handleClearLogs} />
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.stats.map((stat, i) => (
              <Link href="/stats" key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="bg-zinc-900/40 border-l border-t border-zinc-800 p-6 relative overflow-hidden group cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full opacity-5 group-hover:opacity-10 transition-opacity" />
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">{stat.label}</div>
                  <div className="text-4xl font-black text-white">{stat.value}</div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant={stat.trend === "up" ? "accent" : "outline"}>
                      {stat.trend === "up" ? "+12.5%" : "STABLE"}
                    </Badge>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">{stat.subtext}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                  <Layers size={20} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Project_Grid</h2>
              </div>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xs font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  View All <ArrowUpRight size={14} />
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {siteConfig.projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card 
                    glow={project.status === "IN PROGRESS"}
                    onClick={() => handleProjectClick(project)}
                  >
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
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/inbox" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                    <Mail size={18} className="text-blue-500" /> Inbox_Intel
                  </h2>
                </Link>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="space-y-3">
                {inboxIntelWithSnippet.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInboxClick(item)}
                    className={cn(
                      "p-4 bg-zinc-900/30 border border-zinc-800 flex gap-4 cursor-pointer group transition-all",
                      item.priority === "HIGH" && "hover:border-red-500/50"
                    )}
                  >
                    <div className={cn(
                      "w-1 h-10 shrink-0 transition-colors",
                      item.priority === "HIGH" ? "bg-red-500 group-hover:bg-red-400" : "bg-blue-500 group-hover:bg-blue-400"
                    )} />
                    <div className="space-y-1">
                      <div className="text-xs font-black uppercase group-hover:text-primary transition-colors">{item.subject}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{item.from}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/inbox" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                    <MessageCircle size={18} className="text-emerald-500" /> Social_Intel
                  </h2>
                </Link>
                <Badge variant="outline">WhatsApp</Badge>
              </div>
              {isLoadingWhatsApp ? (
                <div className="text-[10px] text-zinc-500 font-bold uppercase animate-pulse">
                  Syncing messages...
                </div>
              ) : whatsappTasks.length === 0 ? (
                <div className="text-[10px] text-zinc-500 font-bold uppercase">
                  No actionable messages
                </div>
              ) : (
                <div className="space-y-3">
                  {whatsappTasks.filter(t => t.category === 'social' && t.tags?.includes('whatsapp')).slice(0, 5).map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-zinc-900/30 border border-zinc-800 flex gap-4 cursor-pointer group transition-all hover:border-emerald-500/50"
                    >
                      <div className="w-1 h-10 shrink-0 bg-emerald-500 group-hover:bg-emerald-400 transition-colors" />
                      <div className="space-y-1 min-w-0">
                        <div className="text-xs font-black uppercase group-hover:text-emerald-500 transition-colors truncate">
                          {task.title.replace(/💬\s*/, '')}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                          {task.tags?.find((t: string) => t.includes('s.whatsapp.net'))?.replace('@s.whatsapp.net', '') || 'WhatsApp'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <motion.div 
              className="relative group bg-blue-600/5 border border-blue-500/20 p-8 overflow-hidden cursor-pointer"
              whileHover={{ y: -4 }}
              onClick={() => window.location.href = '/sports'}
            >
              <motion.div 
                className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Trophy size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Barça_Watch</span>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">Next Fixture</div>
                  <div className="text-3xl font-black uppercase tracking-tighter text-white">{siteConfig.barca.nextMatch}</div>
                </div>
                <div className="pt-4 flex justify-between items-end border-t border-blue-500/10">
                  <div className="text-[10px] text-zinc-500 font-bold uppercase">{siteConfig.barca.date}</div>
                  <Badge variant="outline">La Liga</Badge>
                </div>
              </div>
            </motion.div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 space-y-6">
               <div className="flex items-center gap-2 text-zinc-400">
                  <Cpu size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Hardware_Nodes</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-zinc-500 uppercase">Jetson_Nano_01</span>
                      <span className="text-emerald-500 uppercase">Online</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-zinc-500 uppercase">WSL2_Ubuntu_24.04</span>
                      <span className="text-blue-500 uppercase">Syncing</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "72%" }}
                        className="h-full bg-blue-500" 
                      />
                    </div>
                  </div>
                </div>
            </div>

          </div>
        </section>

        <footer className="px-6 py-12 border-t border-zinc-900 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-600 font-bold tracking-[0.3em] uppercase">
            <div className="flex flex-wrap justify-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <CheckCircle2 size={12} /> Sync_Status: OK
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Activity size={12} /> Latency: 24ms
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Globe size={12} /> Endpoint: iad1
              </motion.button>
            </div>
            <div>© 2026 Begu // Deep_Learning_Agent_v2.4.0</div>
          </div>
        </footer>
      </div>

      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title={selectedProject?.title || "Project Details"}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Status</div>
              <Badge variant={selectedProject.status === "COMPLETED" ? "accent" : "default"}>
                {selectedProject.status}
              </Badge>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Description</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedProject.desc}</p>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-bold text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-1 uppercase tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isInboxModalOpen}
        onClose={() => setIsInboxModalOpen(false)}
        title={selectedInboxItem?.subject || "Email Details"}
      >
        {selectedInboxItem && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">From</div>
              <div className="text-sm font-bold text-white">{selectedInboxItem.from}</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Priority</div>
              <Badge variant={selectedInboxItem.priority === "HIGH" ? "default" : "outline"} 
                     className={selectedInboxItem.priority === "HIGH" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}>
                {selectedInboxItem.priority}
              </Badge>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Snippet</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedInboxItem.snippet}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
