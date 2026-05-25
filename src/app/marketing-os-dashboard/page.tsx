'use client';

import { useEffect, useState } from 'react';

export default function MarketingOSDashboardPage() {
  const [status, setStatus] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/agents/status')
      .then(res => res.json())
      .then(setStatus);
  }, []);

  const runAIAgents = async () => {
    setLoading(true);
    setAiResult(null); // clear previous result
    try {
      const res = await fetch('/api/agents/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: "Create a high-ROAS LinkedIn campaign for a digital agency"
        })
      });
      const data = await res.json();
      setAiResult(data);
    } catch (error) {
      console.error(error);
      setAiResult({ result: "Error running AI crew" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Command Center</h1>
        
        <div className="flex items-center gap-2 mb-8">
          <span className="text-emerald-400">✅</span>
          <span className="text-emerald-400">Backend connected from Vercel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <p className="text-zinc-400 text-sm">Avg Campaign ROAS</p>
            <p className="text-5xl font-semibold mt-2 text-emerald-400">
              {status?.roas || '4.21x'}
            </p>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <p className="text-zinc-400 text-sm">Active AI Agents</p>
            <p className="text-5xl font-semibold mt-2">
              {status?.active_agents || 9} / 12
            </p>
          </div>
        </div>

        <button
          onClick={runAIAgents}
          disabled={loading}
          className="px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-3xl font-medium text-lg flex items-center gap-3 transition-colors"
        >
          {loading ? '🚀 Running AI Crew...' : '🚀 Run Autonomous AI Agents'}
        </button>

        {aiResult && (
          <div className="mt-10 bg-zinc-900/70 border border-zinc-700 rounded-3xl p-8">
            <h3 className="font-semibold mb-4 text-lg">AI Crew Result</h3>
            <p className="text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">
              {aiResult.result}
            </p>
          </div>
        )}

        <p className="text-zinc-500 text-sm mt-16">
          Full beautiful glassmorphism dashboard coming soon.
        </p>
      </div>
    </div>
  );
}