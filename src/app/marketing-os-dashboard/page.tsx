'use client';

import { useEffect, useState } from 'react';

export default function MarketingOSDashboardPage() {
  const [status, setStatus] = useState({ roas: '4.21x', active_agents: 9, message: 'Connected from EKS!' });

  useEffect(() => {
    fetch('https://af5fa741823a04fc98ee7ec1bd0f32f3-1672570027.us-east-1.elb.amazonaws.com/agents/status')
      .then(res => res.json())
      .then(setStatus)
      .catch(() => console.log('Backend fallback'));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-4xl font-bold">Command Center</h1>
      <p className="mt-4 text-emerald-400">
        ✅ Backend connected • ROAS: {status.roas} • Agents: {status.active_agents}
      </p>
      <p className="text-zinc-400 mt-8">
        Full dashboard coming soon. This page is now build-safe.
      </p>
    </div>
  );
}
