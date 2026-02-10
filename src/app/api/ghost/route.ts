import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Look for data in the bundled project structure first
    const ghostDir = path.join(process.cwd(), 'src/data/ghost');
    const changelogPath = path.join(ghostDir, 'CHANGELOG.md');

    // Local development fallback
    const localChangelogPath = '/home/hyper/clawd/tools/project-ghost/CHANGELOG.md';

    let content = '';
    if (fs.existsSync(changelogPath)) {
      content = fs.readFileSync(changelogPath, 'utf-8');
    } else if (fs.existsSync(localChangelogPath)) {
      content = fs.readFileSync(localChangelogPath, 'utf-8');
    } else {
      return NextResponse.json({ events: [] });
    }

    // Parse CHANGELOG.md into events
    // Format: ## [YYYY-MM-DD] - Session Archived
    // ### Added / ### Fixed / ### Modified
    const events: any[] = [];
    const sections = content.split('## ').filter(s => s.trim() !== '' && !s.startsWith('#'));

    sections.forEach(section => {
      const lines = section.split('\n');
      const header = lines[0];
      const dateMatch = header.match(/\[(.*?)\]/);
      const date = dateMatch ? dateMatch[1] : 'Unknown Date';
      
      const body = lines.slice(1).join('\n').trim();
      
      // Extract bullet points
      const entries: string[] = [];
      body.split('\n').forEach(line => {
        if (line.trim().startsWith('- ')) {
          entries.push(line.replace('- ', '').trim());
        }
      });

      events.push({
        date,
        type: 'ARCHIVE',
        entries
      });
    });

    return NextResponse.json({ events: events.slice(0, 10) });
  } catch (error) {
    console.error('Error fetching ghost logs:', error);
    return NextResponse.json({ error: 'Failed to fetch ghost logs' }, { status: 500 });
  }
}
