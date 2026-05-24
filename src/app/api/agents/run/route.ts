import { NextResponse } from 'next/server';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();
    const url = new URL(`${BACKEND_BASE}/agents/run`);

    if (goal) {
      url.searchParams.set('goal', String(goal));
    }

    const backendResponse = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const backendData = await backendResponse.json();
    return NextResponse.json(backendData, { status: backendResponse.status });

  } catch (error) {
    return NextResponse.json({ 
      status: "❌ Error",
      error: "Failed to run AI agents" 
    }, { status: 500 });
  }
}