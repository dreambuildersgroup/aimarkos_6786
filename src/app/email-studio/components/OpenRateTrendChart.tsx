'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';

const data = [
  { date: 'May 1', openRate: 38.2, clickRate: 12.4, deliverability: 96.8 },
  { date: 'May 3', openRate: 41.8, clickRate: 14.1, deliverability: 97.2 },
  { date: 'May 5', openRate: 44.2, clickRate: 16.8, deliverability: 97.1 },
  { date: 'May 7', openRate: 39.4, clickRate: 13.2, deliverability: 96.4 },
  { date: 'May 8', openRate: 57.1, clickRate: 42.3, deliverability: 97.8 },
  { date: 'May 10', openRate: 72.4, clickRate: 44.8, deliverability: 98.5 },
  { date: 'May 12', openRate: 36.8, clickRate: 11.4, deliverability: 95.2 },
  { date: 'May 13', openRate: 42.1, clickRate: 14.8, deliverability: 0 },
  { date: 'May 14', openRate: 46.4, clickRate: 17.5, deliverability: 97.4 },
  { date: 'May 15', openRate: 41.8, clickRate: 14.2, deliverability: 94.2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card border border-border rounded-xl p-3 shadow-elevated">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={`ltt-${p.dataKey}`} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-muted-foreground">{p.name}</span>
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground">{p.value > 0 ? `${p.value}%` : 'N/A'}</span>
        </div>
      ))}
    </div>
  );
};

export default function OpenRateTrendChart() {
  return (
    <div className="glass-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Email Performance Trend</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Open rate, CTR, and deliverability — May 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" /><span className="text-xs text-muted-foreground">Open Rate</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /><span className="text-xs text-muted-foreground">CTR</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-xs text-muted-foreground">Deliverability</span></div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="openRate" name="Open Rate" stroke="var(--success)" strokeWidth={2} dot={{ fill: 'var(--success)', r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="clickRate" name="CTR" stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)', r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="deliverability" name="Deliverability" stroke="var(--primary)" strokeWidth={2} strokeDasharray="4 2" dot={false} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}