"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, TrendingUp, Shield, Flag, Loader2 } from "lucide-react";
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

interface Match {
  id: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  status: "upcoming" | "live" | "finished";
  score?: string;
}

interface Standing {
  pos: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

interface SportsData {
  nextFixture: Match | null;
  upcomingFixtures: Match[];
  standings: Standing[];
  lastUpdated: string;
}

export default function SportsPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [sportsData, setSportsData] = React.useState<SportsData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchSportsData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sports');

        if (!response.ok) {
          throw new Error('Failed to fetch sports data');
        }

        const data = await response.json();
        setSportsData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching sports data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchSportsData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchSportsData, 5 * 60 * 1000);
    return () => clearInterval(interval);
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
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">Sports</span>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold">
                <motion.div 
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                LIVE UPDATES
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
            <Badge variant="default">SPORTS // TRACKER</Badge>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-4">
              Sports_Nexus
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Live tracking of FC Barcelona fixtures, standings, and results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-blue-600/5 border border-blue-500/20 p-8 overflow-hidden relative"
            >
              <motion.div
                className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Trophy size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">Next Fixture</span>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-sm">Error: {error}</div>
                ) : sportsData?.nextFixture ? (
                  <>
                    <div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">
                        {sportsData.nextFixture.competition}
                      </div>
                      <div className="text-3xl font-black uppercase tracking-tighter text-white">
                        {sportsData.nextFixture.homeTeam} vs {sportsData.nextFixture.awayTeam}
                      </div>
                    </div>
                    <div className="pt-4 flex justify-between items-end border-t border-blue-500/10">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar size={12} />
                          {sportsData.nextFixture.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          {sportsData.nextFixture.venue}
                        </div>
                      </div>
                      <Badge variant="outline">{sportsData.nextFixture.competition}</Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-zinc-500 text-sm">No upcoming fixtures</div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-zinc-900/40 border border-zinc-800 p-8 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400">
                  <TrendingUp size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">La Liga Standings</span>
                </div>
                <Badge variant="outline">Season 24/25</Badge>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin text-blue-500" size={32} />
                </div>
              ) : error ? (
                <div className="text-red-500 text-sm">Error: {error}</div>
              ) : (
                <div className="space-y-2">
                  {sportsData?.standings.map((team, i) => (
                    <motion.div
                      key={team.team}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.05) }}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-sm transition-colors",
                        team.team === "Barcelona" ? "bg-blue-600/10 border border-blue-500/20" : "bg-zinc-800/30"
                      )}
                    >
                      <div className={cn(
                        "w-6 text-center font-black text-sm",
                        team.pos <= 2 ? "text-emerald-500" : team.pos <= 4 ? "text-blue-500" : "text-zinc-500"
                      )}>
                        {team.pos}
                      </div>
                      <div className="flex-1 font-bold text-sm">{team.team}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        P:{team.played} W:{team.won} D:{team.drawn} L:{team.lost}
                      </div>
                      <div className="text-sm font-black">{team.points}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/40 border border-zinc-800 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20">
                <Calendar size={20} />
              </div>
              <h2 className="text-lg font-black uppercase tracking-tighter">Upcoming Fixtures</h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-blue-500" size={32} />
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">Error: {error}</div>
            ) : (
              <div className="space-y-4">
                {sportsData?.upcomingFixtures.map((match, i) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.05) }}
                    className="flex items-center justify-between p-4 bg-zinc-800/30 border border-zinc-800 rounded-sm hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                        <Shield size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase text-blue-400">{match.competition}</div>
                        <div className="text-sm font-bold">{match.homeTeam} vs {match.awayTeam}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                          <Calendar size={10} />
                          {match.date}
                          <span>·</span>
                          <MapPin size={10} />
                          {match.venue}
                        </div>
                      </div>
                    </div>
                    <Badge variant={match.status === "live" ? "accent" : "outline"}>
                      {match.status === "live" ? "LIVE" : match.status.toUpperCase()}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
