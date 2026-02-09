"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, RefreshCw, Trash2, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { DesktopSidebar, MobileSidebar, MobileMenuButton } from "@/components/Sidebar";
import { Modal } from "@/components/ui/modal";

interface InboxItem {
  id: string;
  subject: string;
  from: string;
  priority: string;
  snippet: string;
  timestamp?: string;
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

export default function InboxPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whatsappTasks, setWhatsappTasks] = useState<WhatsAppTask[]>([]);
  const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(false);
  const [filter, setFilter] = useState<"all" | "high" | "medium">("all");

  const inboxIntel: InboxItem[] = siteConfig.inboxIntel.map(item => ({
    ...item,
    snippet: `This is an automated summary of the email from ${item.from}. The email discusses important matters related to "${item.subject}" that require attention. Priority level: ${item.priority}. Please review the full email in your inbox for complete details.`,
    timestamp: "Today"
  }));

  const filteredItems = filter === "all" 
    ? inboxIntel 
    : inboxIntel.filter(item => item.priority === filter.toUpperCase());

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

  const handleItemClick = (item: InboxItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Inbox_Intel</span>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                <motion.div 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {inboxIntel.length} NEW
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchWhatsAppTasks}
              className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <RefreshCw size={14} className={isLoadingWhatsApp ? "animate-spin" : ""} />
              Refresh
            </motion.button>
          </div>
        </div>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="default">INBOX // INTEL</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Inbox_Intelligence
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              AI-powered analysis of your emails and messages. Automatically identifies action items, deadlines, and important communications.
            </p>
          </motion.div>

          <div className="flex items-center gap-3 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all",
                filter === "all" ? "bg-primary text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
              )}
            >
              All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("high")}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all",
                filter === "high" ? "bg-red-500 text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
              )}
            >
              High Priority
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("medium")}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wider rounded-sm transition-all",
                filter === "medium" ? "bg-amber-500 text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
              )}
            >
              Medium
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                  <Mail size={18} className="text-blue-500" /> Gmail_Intel
                </h2>
                <Badge variant="outline">{filteredItems.length} Items</Badge>
              </div>
              <div className="space-y-3">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleItemClick(item)}
                    className={cn(
                      "p-4 bg-zinc-900/30 border border-zinc-800 flex gap-4 cursor-pointer group transition-all",
                      item.priority === "HIGH" && "hover:border-red-500/50"
                    )}
                  >
                    <div className={cn(
                      "w-1 h-10 shrink-0 transition-colors",
                      item.priority === "HIGH" ? "bg-red-500 group-hover:bg-red-400" : "bg-blue-500 group-hover:bg-blue-400"
                    )} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <div className="text-xs font-black uppercase group-hover:text-primary transition-colors truncate">
                          {item.subject}
                        </div>
                        <Badge variant={item.priority === "HIGH" ? "default" : "outline"} 
                              className={item.priority === "HIGH" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}>
                          {item.priority}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">
                        {item.from} · {item.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black uppercase tracking-tighter flex items-center gap-2">
                  <MessageCircle size={18} className="text-emerald-500" /> WhatsApp_Intel
                </h2>
                <Badge variant="outline">Live</Badge>
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
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 bg-zinc-900/30 border border-zinc-800 flex gap-4 cursor-pointer group transition-all hover:border-emerald-500/50"
                    >
                      <div className="w-1 h-10 shrink-0 bg-emerald-500 group-hover:bg-emerald-400 transition-colors" />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="text-xs font-black uppercase group-hover:text-emerald-500 transition-colors truncate">
                          {task.title.replace(/💬\s*/, '')}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">
                          {task.tags?.find((t: string) => t.includes('s.whatsapp.net'))?.replace('@s.whatsapp.net', '') || 'WhatsApp'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem?.subject || "Email Details"}
      >
        {selectedItem && (
          <div className="space-y-6">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">From</div>
              <div className="text-sm font-bold text-white">{selectedItem.from}</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Priority</div>
              <Badge variant={selectedItem.priority === "HIGH" ? "default" : "outline"} 
                     className={selectedItem.priority === "HIGH" ? "bg-red-500/10 text-red-500 border-red-500/20" : ""}>
                {selectedItem.priority}
              </Badge>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-2">Summary</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedItem.snippet}</p>
            </div>
            <div className="pt-4 border-t border-zinc-800 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-4 py-3 rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={12} />
                Open in Gmail
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white font-black uppercase tracking-widest text-xs px-4 py-3 rounded-sm transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={12} />
                Archive
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
