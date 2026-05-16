'use client';

import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const liveStats = [
  { id: 'stat-actions', label: 'AI Actions Today', value: '184,291', icon: 'BoltIcon', color: 'text-accent' },
  { id: 'stat-campaigns', label: 'Active Campaigns', value: '3,847', icon: 'MegaphoneIcon', color: 'text-primary' },
  { id: 'stat-agencies', label: 'Agencies Powered', value: '1,204', icon: 'BuildingOfficeIcon', color: 'text-success' },
  { id: 'stat-leads', label: 'Leads Generated', value: '92,441', icon: 'UserGroupIcon', color: 'text-warning' },
];

const agentTypes = [
  { id: 'agent-researcher', name: 'Researcher', status: 'Running', task: 'Competitor SERP analysis' },
  { id: 'agent-optimizer', name: 'Optimizer', status: 'Running', task: 'Adjusting PPC bids — $2.14 avg CPC' },
  { id: 'agent-executor', name: 'Executor', status: 'Running', task: 'Deploying email sequence #47' },
  { id: 'agent-writer', name: 'Content Writer', status: 'Running', task: 'Generating 12 ad variants' },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] flex-col justify-between p-10 xl:p-14 relative overflow-hidden bg-surface-1 border-r border-border">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
      <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />

      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <AppLogo size={40} />
          <div>
            <span className="font-bold text-xl gradient-text">AImarkOS</span>
            <p className="text-xs text-muted-foreground">Marketing Operating System</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-10">
          <h1 className="text-hero-xl font-bold text-foreground leading-tight mb-4">
            Your Autonomous
            <span className="block gradient-text">Marketing Agency</span>
            <span className="block text-foreground">In a Box</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Multi-agent AI crews run your campaigns, email sequences, SEO, and PPC — 24/7 — with zero micromanagement. White-label it as your own.
          </p>
        </div>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {liveStats.map((stat) => (
            <div key={stat.id} className="glass-card rounded-xl p-4 glass-card-hover">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={16} className={stat.color} />
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Live Agent Feed */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-success status-dot-pulse" />
            <span className="text-xs font-semibold text-success uppercase tracking-wider">Live Agent Activity</span>
          </div>
          <div className="space-y-2">
            {agentTypes.map((agent) => (
              <div key={agent.id} className="flex items-center gap-3 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-foreground">{agent.name}:</span>
                  <span className="text-xs text-muted-foreground ml-1 truncate">{agent.task}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom testimonial */}
      <div className="relative z-10">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full gradient-violet-cyan flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              SM
            </div>
            <div>
              <p className="text-sm text-foreground font-medium leading-snug">
                &ldquo;AImarkOS replaced 3 full-time hires. Our agency ROAS jumped 4.2x in 60 days.&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-1">Sarah Mitchell — CEO, Momentum Digital</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}