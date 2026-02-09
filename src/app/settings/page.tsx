"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Globe, Shield, Database, ChevronRight, LogOut, Save } from "lucide-react";
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

const SettingSection = ({ icon, title, description, children, delay }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  children: React.ReactNode; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-zinc-900/40 border border-zinc-800 p-8"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-zinc-800 text-zinc-400 rounded-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-black uppercase tracking-tighter">{title}</h3>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

export default function SettingsPage() {
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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Settings</span>
              <div className="h-4 w-px bg-zinc-800" />
              <Badge variant="outline">System Config</Badge>
            </div>
          </div>
        </div>

        <section className="px-6 py-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge variant="default">SYSTEM // CONFIG</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Settings
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Configure your Mission Control preferences, integrations, and system settings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <SettingSection
              icon={<Bell size={20} />}
              title="Notifications"
              description="Manage notification preferences"
              delay={0.2}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Telegram Notifications</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Receive daily briefs and alerts</div>
                  </div>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Email Alerts</div>
                    <div className="text-[10px] text-zinc-500 uppercase">High priority emails only</div>
                  </div>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Sports Ticker</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Live match updates</div>
                  </div>
                  <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </SettingSection>

            <SettingSection
              icon={<Globe size={20} />}
              title="Integrations"
              description="Connected services and APIs"
              delay={0.3}
            >
              <div className="space-y-3">
                <Link href="#" className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 text-blue-500 rounded flex items-center justify-center font-bold text-xs">G</div>
                    <div>
                      <div className="text-sm font-bold">Google Workspace</div>
                      <div className="text-[10px] text-emerald-500 uppercase">Connected</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600" />
                </Link>
                <Link href="#" className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/10 text-emerald-500 rounded flex items-center justify-center font-bold text-xs">W</div>
                    <div>
                      <div className="text-sm font-bold">WhatsApp</div>
                      <div className="text-[10px] text-emerald-500 uppercase">Connected</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600" />
                </Link>
                <Link href="#" className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 text-purple-500 rounded flex items-center justify-center font-bold text-xs">T</div>
                    <div>
                      <div className="text-sm font-bold">Telegram</div>
                      <div className="text-[10px] text-emerald-500 uppercase">Connected</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600" />
                </Link>
              </div>
            </SettingSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <SettingSection
              icon={<Shield size={20} />}
              title="Security"
              description="System security settings"
              delay={0.4}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Two-Factor Auth</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Enabled for all sessions</div>
                  </div>
                  <Badge variant="accent">ACTIVE</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Session Timeout</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Auto-logout after 24h</div>
                  </div>
                  <span className="text-sm text-zinc-400">24 hours</span>
                </div>
              </div>
            </SettingSection>

            <SettingSection
              icon={<Database size={20} />}
              title="Data Management"
              description="Memory and data storage"
              delay={0.5}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Daily Logs</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Auto-cleanup after 90 days</div>
                  </div>
                  <Badge variant="outline">ENABLED</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm">
                  <div>
                    <div className="text-sm font-bold">Memory Storage</div>
                    <div className="text-[10px] text-zinc-500 uppercase">Local file-based</div>
                  </div>
                  <span className="text-sm text-zinc-400">24.3 MB</span>
                </div>
              </div>
            </SettingSection>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-black uppercase tracking-widest text-xs px-6 py-3 rounded-sm transition-all glow-primary"
            >
              <Save size={14} />
              Save Changes
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-red-500 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-sm transition-all"
            >
              <LogOut size={14} />
              Logout
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
