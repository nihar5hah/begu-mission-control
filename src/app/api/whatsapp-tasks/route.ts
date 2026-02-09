import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const TASKS_FILE = path.join(process.cwd(), '../../tools/task-manager/tasks.json');

export async function GET() {
  try {
    if (!fs.existsSync(TASKS_FILE)) {
      return NextResponse.json([], { status: 200 });
    }

    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    const tasks = JSON.parse(data);

    const whatsappTasks = tasks.filter((task: any) => 
      task.category === 'social' && 
      task.tags?.includes('whatsapp')
    );

    return NextResponse.json(whatsappTasks, { status: 200 });
  } catch (error) {
    console.error('Error reading tasks:', error);
    return NextResponse.json({ error: 'Failed to read tasks' }, { status: 500 });
  }
}
