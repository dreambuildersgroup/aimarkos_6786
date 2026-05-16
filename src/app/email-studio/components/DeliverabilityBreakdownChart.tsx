'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { id: 'deliv-delivered', name: 'Delivered', value: 94.2, color: 'var(--success)' },
  { id: 'deliv-bounced', name: 'Bounced', value: 2.8, color: 'var(--danger)' },
  { id: 'deliv-spam', name: 'Spam Folder', value: 1.9, color: 'var(--warning)' },
  { id: 'deliv-other', name: 'Other', value: 1.1, color: 'var(--muted-foreground)' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card border border-border rounded-xl p-3 shadow-elevated">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
        <span className="text-xs font-semibold text-foreground">{payload[0].name}</span>
      </div>
      <span className="text-lg font-bold tabular-nums text-foreground">{payload[0].value}%</span>
    </div>
  );
};

export default function DeliverabilityBreakdownChart() {
  return (
    <div className="glass-card rounded-xl border border-border p-5 h-full">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Deliverability Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Email routing outcomes — May 2026</p>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.id}`} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 mt-2">
        {data.map((item) => (
          <div key={`legend-${item.id}`} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
            <span className={`text-xs font-bold tabular-nums ${
              item.name === 'Delivered' ? 'text-success' :
              item.name === 'Bounced' ? 'text-danger' :
              item.name === 'Spam Folder' ? 'text-warning' : 'text-muted-foreground'
            }`}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}