// src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function getAgentsStatus() {
  const res = await fetch(`${API_BASE}/agents/status`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Backend not responding');
  return res.json();
}

// We'll add more functions here later (email studio, white-label, etc.)
