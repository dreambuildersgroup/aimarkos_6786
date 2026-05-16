'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AIActionsHeroCard() {
  const [count, setCount] = useState(184291);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 8 + 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-[148px] rounded-xl overflow-hidden border border-primary/30 bg-surface-2 glass-card-hover p-5 flex flex-col justify-between">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 20% 50%, #7C3AED 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at 80% 20%, #06B6D4 0%, transparent 50%)' }} />
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg gradient-violet-cyan flex items-center justify-center">
              <Icon name="BoltIcon" size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">AI Actions Executed</p>
              <p className="text-xs text-muted-foreground">Today — updates live</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-bold tabular-nums gradient-text glow-text-violet">
              {count?.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-success font-semibold">+18,241</span> vs yesterday · Reinforcement learning: <span className="text-accent font-semibold">+4.7% efficiency</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <span className="badge badge-success">
            <span className="w-1.5 h-1.5 rounded-full bg-success status-dot-pulse" />
            All Systems Live
          </span>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Actions/min</p>
            <p className="text-lg font-bold tabular-nums text-foreground">128</p>
          </div>
        </div>
      </div>
      <div className="relative z-10 flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
        {[
          { id: 'hero-stat-1', label: 'Research', value: '41,204', color: 'text-accent' },
          { id: 'hero-stat-2', label: 'Content Gen', value: '68,891', color: 'text-primary' },
          { id: 'hero-stat-3', label: 'Optimization', value: '29,447', color: 'text-success' },
          { id: 'hero-stat-4', label: 'Execution', value: '44,749', color: 'text-warning' },
        ]?.map((s) => (
          <div key={s?.id} className="flex-1 text-center">
            <p className={`text-sm font-bold tabular-nums ${s?.color}`}>{s?.value}</p>
            <p className="text-xs text-muted-foreground">{s?.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}