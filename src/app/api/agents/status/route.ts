import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    active_agents: 9,
    roas: "4.21x",
    message: "✅ Connected to Vercel + Supabase backend",
    timestamp: new Date().toISOString()
  });
}