'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'May 9', research: 28400, content: 52100, execution: 31200, optimization: 18900 },
  { day: 'May 10', research: 31200, content: 61400, execution: 38400, optimization: 22100 },
  { day: 'May 11', research: 24100, content: 44200, execution: 28900, optimization: 19400 },
  { day: 'May 12', research: 38900, content: 71200, execution: 44100, optimization: 27800 },
  { day: 'May 13', research: 42100, content: 68900, execution: 51200, optimization: 31200 },
  { day: 'May 14', research: 35800, content: 62400, execution: 42800, optimization: 24900 },
  { day: 'May 15', research: 41204, content: 68891, execution: 44749, optimization: 29447 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((sum: number, p: any) => sum + p.value, 0);
  return (
    <div className="glass-card border border-border rounded-xl p-3 shadow-elevated min-w-[180px]">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={`tooltip-${p.dataKey}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-muted-foreground capitalize">{p.dataKey}</span>
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground">{p.value.toLocaleString()}</span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex justify-between">
        <span className="text-xs text-muted-foreground">Total</span>
        <span className="text-xs font-bold tabular-nums text-foreground">{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default function AIActivityAreaChart() {
  return (
    <div className="glass-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">AI Action Volume</h2>
          <p className="text-xs text-muted-foreground mt-0.5">By agent type — last 7 days</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Research</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Content</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-xs text-muted-foreground">Execution</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Optimization</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="gradResearch" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradContent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExecution" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--success)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradOptimization" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--warning)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="content" stroke="var(--accent)" strokeWidth={2} fill="url(#gradContent)" />
          <Area type="monotone" dataKey="execution" stroke="var(--success)" strokeWidth={2} fill="url(#gradExecution)" />
          <Area type="monotone" dataKey="optimization" stroke="var(--warning)" strokeWidth={2} fill="url(#gradOptimization)" />
          <Area type="monotone" dataKey="research" stroke="var(--primary)" strokeWidth={2} fill="url(#gradResearch)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}