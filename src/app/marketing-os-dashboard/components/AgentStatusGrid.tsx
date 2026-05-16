'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'Running' | 'Idle' | 'Paused' | 'Error';
  currentTask: string;
  subAccount: string;
  actionsToday: number;
  efficiency: number;
  lastAction: string;
}

const agents: Agent[] = [
  { id: 'agent-001', name: 'SEO Researcher Alpha', type: 'Researcher', status: 'Running', currentTask: 'Competitor backlink gap analysis for apexclient.com', subAccount: 'Apex Digital', actionsToday: 2841, efficiency: 94, lastAction: '12s ago' },
  { id: 'agent-002', name: 'PPC Optimizer Prime', type: 'Optimizer', status: 'Running', currentTask: 'Adjusting Google Ads bids — 47 keywords updated', subAccount: 'BrightPath Mktg', actionsToday: 1924, efficiency: 89, lastAction: '4s ago' },
  { id: 'agent-003', name: 'Email Executor v2', type: 'Executor', status: 'Running', currentTask: 'Deploying drip sequence #47 — 1,204 sends queued', subAccount: 'Momentum Digital', actionsToday: 4102, efficiency: 97, lastAction: '1s ago' },
  { id: 'agent-004', name: 'Content Writer Pro', type: 'Writer', status: 'Running', currentTask: 'Generating 12 Facebook ad variants — A/B test batch', subAccount: 'Apex Digital', actionsToday: 891, efficiency: 91, lastAction: '28s ago' },
  { id: 'agent-005', name: 'Social Scheduler', type: 'Executor', status: 'Running', currentTask: 'Scheduling 34 posts across 6 platforms for next 7 days', subAccount: 'UrbanFlow Agency', actionsToday: 1247, efficiency: 88, lastAction: '3m ago' },
  { id: 'agent-006', name: 'Analytics Analyst', type: 'Researcher', status: 'Idle', currentTask: 'Awaiting new campaign data — next run in 22min', subAccount: 'All Accounts', actionsToday: 412, efficiency: 82, lastAction: '22m ago' },
  { id: 'agent-007', name: 'Landing Page Builder', type: 'Executor', status: 'Paused', currentTask: 'Paused: waiting for client brand assets approval', subAccount: 'CoreMetrics Inc', actionsToday: 88, efficiency: 76, lastAction: '4h ago' },
  { id: 'agent-008', name: 'Lead Qualifier AI', type: 'Optimizer', status: 'Running', currentTask: 'Scoring 892 new leads — 3 high-intent flagged', subAccount: 'BrightPath Mktg', actionsToday: 3241, efficiency: 95, lastAction: '8s ago' },
  { id: 'agent-009', name: 'Reputation Monitor', type: 'Researcher', status: 'Error', currentTask: 'Error: Google My Business API rate limit exceeded', subAccount: 'Apex Digital', actionsToday: 204, efficiency: 61, lastAction: '1h ago' },
];

const statusConfig: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
  Running: { label: 'Running', badgeClass: 'badge-success', dotClass: 'bg-success' },
  Idle: { label: 'Idle', badgeClass: 'badge-neutral', dotClass: 'bg-muted-foreground' },
  Paused: { label: 'Paused', badgeClass: 'badge-warning', dotClass: 'bg-warning' },
  Error: { label: 'Error', badgeClass: 'badge-danger', dotClass: 'bg-danger' },
};

export default function AgentStatusGrid() {
  const [filter, setFilter] = useState<string>('all');

  const filters = [
    { id: 'filter-all', value: 'all', label: 'All' },
    { id: 'filter-running', value: 'Running', label: 'Running' },
    { id: 'filter-idle', value: 'Idle', label: 'Idle' },
    { id: 'filter-error', value: 'Error', label: 'Error' },
  ];

  const filtered = filter === 'all' ? agents : agents.filter((a) => a.status === filter);

  return (
    <div className="glass-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-base font-semibold text-foreground">AI Agent Fleet</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {agents.filter((a) => a.status === 'Running').length} running · {agents.filter((a) => a.status === 'Error').length} errors
          </p>
        </div>
        <div className="flex items-center gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filter === f.value
                  ? 'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {filtered.map((agent) => {
          const sc = statusConfig[agent.status];
          return (
            <div key={agent.id} className="px-5 py-3 hover:bg-muted/20 transition-colors group">
              <div className="flex items-start gap-3">
                {/* Agent Icon */}
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  agent.status === 'Running' ? 'agent-running' :
                  agent.status === 'Error' ? 'agent-error' :
                  agent.status === 'Paused' ? 'agent-paused' : 'agent-idle'
                }`}>
                  <Icon
                    name={
                      agent.type === 'Researcher' ? 'MagnifyingGlassIcon' :
                      agent.type === 'Optimizer' ? 'AdjustmentsHorizontalIcon' :
                      agent.type === 'Executor' ? 'PlayIcon' : 'PencilSquareIcon'
                    }
                    size={16}
                    className={
                      agent.status === 'Running' ? 'text-success' :
                      agent.status === 'Error' ? 'text-danger' :
                      agent.status === 'Paused' ? 'text-warning' : 'text-muted-foreground'
                    }
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-foreground truncate">{agent.name}</span>
                    <span className={`badge ${sc.badgeClass} flex-shrink-0`}>
                      {agent.status === 'Running' && (
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dotClass} status-dot-pulse`} />
                      )}
                      {sc.label}
                    </span>
                    <span className="badge badge-neutral text-xs">{agent.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{agent.currentTask}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium tabular-nums">{agent.actionsToday.toLocaleString()}</span> actions today
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Sub: <span className="text-foreground font-medium">{agent.subAccount}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{agent.lastAction}</span>
                  </div>
                </div>

                {/* Efficiency + Actions */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-sm font-bold tabular-nums ${
                      agent.efficiency >= 90 ? 'text-success' :
                      agent.efficiency >= 75 ? 'text-warning' : 'text-danger'
                    }`}>{agent.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">efficiency</p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="btn-ghost p-1" title="View agent logs">
                      <Icon name="DocumentTextIcon" size={14} />
                    </button>
                    <button className="btn-ghost p-1" title={agent.status === 'Running' ? 'Pause agent' : 'Resume agent'}>
                      <Icon name={agent.status === 'Running' ? 'PauseIcon' : 'PlayIcon'} size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}