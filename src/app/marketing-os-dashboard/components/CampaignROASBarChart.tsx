'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { id: 'roas-social', campaign: 'Social Retarget', roas: 6.8, spend: 4200 },
  { id: 'roas-email', campaign: 'Email Drip Q2', roas: 5.2, spend: 1800 },
  { id: 'roas-search', campaign: 'Google Search', roas: 4.1, spend: 8900 },
  { id: 'roas-display', campaign: 'Display Brand', roas: 2.9, spend: 3400 },
  { id: 'roas-youtube', campaign: 'YouTube Pre-roll', roas: 2.1, spend: 5100 },
  { id: 'roas-linkedin', campaign: 'LinkedIn Ads', roas: 1.8, spend: 6200 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card border border-border rounded-xl p-3 shadow-elevated">
      <p className="text-xs font-semibold text-foreground mb-1.5">{label}</p>
      <div className="flex items-center justify-between gap-6">
        <span className="text-xs text-muted-foreground">ROAS</span>
        <span className="text-sm font-bold tabular-nums text-foreground">{payload[0].value}x</span>
      </div>
      <div className="flex items-center justify-between gap-6 mt-1">
        <span className="text-xs text-muted-foreground">Spend</span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">${payload[0].payload.spend.toLocaleString()}</span>
      </div>
    </div>
  );
};

const getBarColor = (roas: number) => {
  if (roas >= 5) return 'var(--success)';
  if (roas >= 3.5) return 'var(--accent)';
  if (roas >= 2.5) return 'var(--primary)';
  return 'var(--warning)';
};

export default function CampaignROASBarChart() {
  return (
    <div className="glass-card rounded-xl border border-border p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Campaign ROAS</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Active campaigns · this period</p>
        </div>
        <div className="badge badge-success">Avg 4.21x</div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} domain={[0, 8]} />
          <YAxis type="category" dataKey="campaign" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} width={96} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
          <Bar dataKey="roas" radius={[0, 4, 4, 0]} maxBarSize={18}>
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={getBarColor(entry.roas)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}