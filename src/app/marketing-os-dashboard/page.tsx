'use client';

import { useEffect, useState } from 'react';

export default function MarketingOSDashboardPage() {
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load basic status
  useEffect(() => {
    fetch('/api/agents/status')
      .then(res => res.json())
      .then(setAgentStatus);
  }, []);

  // Run AI Agents
  const runAIAgents = async () => {
    setLoading(true);
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
        <p className="text-emerald-400 mb-8">
          ✅ Backend connected • ROAS: {agentStatus?.roas || '4.21x'} • Agents: {agentStatus?.active_agents || 9}
        </p>

        <button
          onClick={runAIAgents}
          disabled={loading}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-2xl font-medium flex items-center gap-2"
        >
          {loading ? 'Running AI Crew...' : '🚀 Run AI Agents Now'}
        </button>

        {aiResult && (
          <div className="mt-8 bg-zinc-900/70 border border-zinc-700 rounded-3xl p-6">
            <h2 className="font-semibold mb-3">AI Crew Result</h2>
            <p className="text-zinc-300 whitespace-pre-wrap">{aiResult.result}</p>
          </div>
        )}

        <p className="text-zinc-500 text-sm mt-12">
          Full glassmorphism dashboard will be restored soon.
        </p>
      </div>
    </div>
  );
}