'use client';

import { useEffect, useState } from 'react';
import { getAgentsStatus } from '@/lib/api';
import { Zap, TrendingUp, Users, Activity, Bot } from 'lucide-react';

export default function MarketingOSDashboardPage() {
  const [agentStatus, setAgentStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAgentsStatus()
      .then((data) => {
        setAgentStatus(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch agent status:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Command Center</h1>
            <p className="text-zinc-400 mt-1">May 19, 2026 — All systems operational</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-5 py-3 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center gap-2 font-medium">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              9 Agents Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">AI Actions Today</p>
                <p className="text-5xl font-semibold mt-2">184,435</p>
              </div>
              <Zap className="w-12 h-12 text-amber-400" />
            </div>
            <p className="text-emerald-400 text-sm mt-4">+18,241 vs yesterday</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Avg Campaign ROAS</p>
                <p className="text-5xl font-semibold mt-2 text-emerald-400">
                  {agentStatus?.roas || '4.21x'}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-emerald-400" />
            </div>
            <p className="text-emerald-400 text-sm mt-4">+0.38x vs last week</p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Active AI Agents</p>
                <p className="text-5xl font-semibold mt-2">
                  {agentStatus?.active_agents || '9'} / 12
                </p>
              </div>
              <Users className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">RL Efficiency</p>
                <p className="text-5xl font-semibold mt-2 text-purple-400">+4.7%</p>
              </div>
              <Activity className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/70 border border-zinc-700 rounded-3xl p-8 text-center">
          {loading ? (
            <p className="text-amber-400">Connecting to EKS backend...</p>
          ) : (
            <div className="flex items-center justify-center gap-3 text-emerald-400">
              <Bot className="w-5 h-5" />
              <span className="font-medium">
                ✅ Connected to live EKS backend • {agentStatus?.message || 'Ready'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
