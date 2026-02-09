import { NextResponse } from 'next/server';

const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports';
const BARCELONA_TEAM_ID = '83';
const LA_LIGA_CODE = 'esp.1';

interface ESPNEvent {
  id: string;
  name: string;
  shortName: string;
  date: string;
  competitions: Array<{
    id: string;
    venue?: {
      fullName?: string;
    };
    competitors: Array<{
      id: string;
      homeAway: string;
      team: {
        id: string;
        displayName: string;
        shortDisplayName: string;
      };
      score?: string;
    }>;
    status: {
      type: {
        id: string;
        name: string;
        state: string;
        completed: boolean;
        description: string;
      };
    };
  }>;
}

interface StandingsTeam {
  team: {
    id: string;
    displayName: string;
  };
  stats: Array<{
    name: string;
    displayValue: string;
    value: number;
  }>;
}

async function fetchESPN(endpoint: string) {
  const url = `${ESPN_BASE}/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
    next: { revalidate: 300 } // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`ESPN API error: ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  try {
    // Fetch Barcelona's scoreboard (current/recent matches)
    const scoreboardData = await fetchESPN(`soccer/${LA_LIGA_CODE}/scoreboard`);
    
    // Fetch upcoming matches for the month to ensure we find the next Barcelona match
    const upcomingMonthScoreboard = await fetchESPN(`soccer/${LA_LIGA_CODE}/scoreboard?dates=20260201-20260228`);

    // Fetch La Liga standings - NOTE: Using v2 for standings
    const standingsResponse = await fetch(`https://site.api.espn.com/apis/v2/sports/soccer/${LA_LIGA_CODE}/standings`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 300 }
    });
    const standingsData = await standingsResponse.json();

    // Collect all matches from both sources
    const allEvents: any[] = [
      ...(scoreboardData.events || []),
      ...(upcomingMonthScoreboard.events || [])
    ];

    const barcelonaMatches = allEvents
      .filter((event: any) => {
        const competition = event.competitions?.[0];
        // Team ID 83 is FC Barcelona
        return competition?.competitors.some((c: any) => c.team.id === BARCELONA_TEAM_ID || c.id === BARCELONA_TEAM_ID);
      })
      .map((event: any) => {
        const competition = event.competitions[0];
        const homeTeam = competition.competitors.find((c: any) => c.homeAway === 'home');
        const awayTeam = competition.competitors.find((c: any) => c.homeAway === 'away');

        return {
          id: event.id,
          competition: 'La Liga',
          homeTeam: homeTeam?.team.displayName || 'TBD',
          awayTeam: awayTeam?.team.displayName || 'TBD',
          date: new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          venue: competition.venue?.fullName || 'Spotify Camp Nou',
          status: (competition.status?.type?.completed ? 'finished' : 
                   competition.status?.type?.state === 'in' ? 'live' : 'upcoming') as any,
          rawDate: new Date(event.date)
        };
      })
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i); // Deduplicate

    // Separate finished and upcoming
    const upcomingFixtures = barcelonaMatches
      .filter(m => m.status !== 'finished' || m.rawDate > new Date(Date.now() - 12 * 60 * 60 * 1000))
      .sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
      .slice(0, 5);

    // Get next fixture (the earliest upcoming one)
    const nextFixture = upcomingFixtures[0] || null;

    // Process standings
    const standingsEntries = standingsData.children?.[0]?.standings?.entries || [];
    const standings = standingsEntries
      .slice(0, 5)
      .map((entry: StandingsTeam, index: number) => {
        const stats = entry.stats || [];
        const getStatValue = (name: string) => {
          const stat = stats.find(s => s.name === name);
          return stat ? stat.value : 0;
        };

        return {
          pos: index + 1,
          team: entry.team.displayName,
          played: getStatValue('gamesPlayed'),
          won: getStatValue('wins'),
          drawn: getStatValue('ties'),
          lost: getStatValue('losses'),
          points: getStatValue('points'),
        };
      });

    return NextResponse.json({
      nextFixture,
      upcomingFixtures,
      standings,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching ESPN data:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch sports data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
