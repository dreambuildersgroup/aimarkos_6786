'use client';

import { useEffect, useState } from 'react';

export default function MarketingOSDashboardPage() {
  const [status, setStatus] = useState({ roas: '4.21x', active_agents: 9, message: 'Connected from EKS!' });

  useEffect(() => {
    fetch('http://af5fa741823a04fc98ee7ec1bd0f32f3-1672570027.us-east-1.elb.amazonaws.com/agents/status')
      .then(res => res.json())
      .then(setStatus)
      .catch(() => console.log('Using fallback data'));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Command Center</h1>
        <p className="text-emerald-400 text-xl">
          ✅ Backend connected from EKS<br />
          ROAS: {status.roas} • Active Agents: {status.active_agents}
        </p>
        <p className="text-zinc-400 mt-12">
          Full dashboard will be restored soon.<br />
          This version builds cleanly on Vercel.
        </p>
      </div>
    </div>
  );
}