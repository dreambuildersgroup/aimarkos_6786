'use client';

import React, { useState } from 'react';

import Icon from '@/components/ui/AppIcon';

export default function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-border bg-surface-1/80 backdrop-blur-sm z-20 flex-shrink-0">
      {/* Left: Search */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents, campaigns, contacts… (⌘K)"
            className="input-field pl-9 pr-4 py-2 text-sm w-72 h-9"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Agent Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <span className="w-2 h-2 rounded-full bg-success status-dot-pulse" />
          <span className="text-xs font-semibold text-success">9 Agents Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative btn-ghost p-2"
          >
            <Icon name="BellIcon" size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 glass-card rounded-xl shadow-elevated z-50 fade-in">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">Notifications</span>
                <button className="text-xs text-primary hover:text-primary/80">Mark all read</button>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin">
                {[
                  { id: 'notif-1', icon: 'ExclamationTriangleIcon', color: 'text-warning', title: 'PPC Agent: Budget threshold reached', time: '2m ago', type: 'warning' },
                  { id: 'notif-2', icon: 'CheckCircleIcon', color: 'text-success', title: 'Email campaign "Q2 Launch" sent to 4,821 contacts', time: '14m ago', type: 'success' },
                  { id: 'notif-3', icon: 'CpuChipIcon', color: 'text-accent', title: 'SEO Researcher Agent completed site audit', time: '1h ago', type: 'info' },
                  { id: 'notif-4', icon: 'UserPlusIcon', color: 'text-primary', title: 'New sub-account: BrightPath Marketing activated', time: '3h ago', type: 'info' },
                ].map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer border-b border-border/50 last:border-0">
                    <Icon name={n.icon as Parameters<typeof Icon>[0]['name']} size={16} className={`${n.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground leading-snug">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <button className="btn-primary text-xs px-3 py-2 h-9">
          <Icon name="PlusIcon" size={14} />
          New Campaign
        </button>

        {/* Plan Badge */}
        <div className="px-2.5 py-1 rounded-lg border-gradient text-xs font-semibold text-primary">
          Agency Plan
        </div>
      </div>
    </header>
  );
}