'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Segment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  type: 'Dynamic' | 'Static' | 'AI-Built';
  conditions: string[];
  lastUpdated: string;
  avgOpenRate: number;
  avgCTR: number;
}

const segments: Segment[] = [
  { id: 'seg-001', name: 'All Subscribers', description: 'Every opted-in contact across all sub-accounts', contactCount: 18421, type: 'Dynamic', conditions: ['Status = Subscribed'], lastUpdated: '5m ago', avgOpenRate: 38.4, avgCTR: 8.2 },
  { id: 'seg-002', name: 'High-Intent Leads (Score >80)', description: 'Contacts with AI lead score above 80 — ready to convert', contactCount: 2841, type: 'AI-Built', conditions: ['Lead Score > 80', 'Last Activity < 14 days'], lastUpdated: '2m ago', avgOpenRate: 54.1, avgCTR: 22.4 },
  { id: 'seg-003', name: 'Newsletter Subscribers', description: 'Opted into weekly newsletter specifically', contactCount: 9204, type: 'Static', conditions: ['Tag = newsletter-opt-in'], lastUpdated: 'May 14, 2026', avgOpenRate: 42.8, avgCTR: 11.7 },
  { id: 'seg-004', name: 'Abandoned Cart (>$200 value)', description: 'Contacts who abandoned cart with value exceeding $200', contactCount: 1247, type: 'Dynamic', conditions: ['Cart Abandoned = True', 'Cart Value > $200', 'Last 30 days'], lastUpdated: '12m ago', avgOpenRate: 48.2, avgCTR: 19.1 },
  { id: 'seg-005', name: 'Inactive 90 Days', description: 'No email open or site visit in 90+ days', contactCount: 3891, type: 'Dynamic', conditions: ['Last Open > 90 days ago', 'Last Site Visit > 90 days'], lastUpdated: '1h ago', avgOpenRate: 12.4, avgCTR: 2.1 },
  { id: 'seg-006', name: 'Pro + Agency Plan Users', description: 'Current subscribers on Pro or Agency tier', contactCount: 847, type: 'Dynamic', conditions: ['Plan = Pro OR Plan = Agency', 'Status = Active'], lastUpdated: '30m ago', avgOpenRate: 61.2, avgCTR: 28.4 },
  { id: 'seg-007', name: 'New Agency Partners (Last 30d)', description: 'Agency accounts created in the last 30 days', contactCount: 204, type: 'Dynamic', conditions: ['Plan = Agency', 'Created < 30 days ago'], lastUpdated: '45m ago', avgOpenRate: 72.4, avgCTR: 44.1 },
  { id: 'seg-008', name: 'Webinar Attendees — May 2026', description: 'Attended or registered for May webinar series', contactCount: 612, type: 'Static', conditions: ['Tag = webinar-may-2026'], lastUpdated: 'May 13, 2026', avgOpenRate: 58.7, avgCTR: 24.8 },
  { id: 'seg-009', name: 'Churned — Last 60 Days', description: 'Cancelled subscription in the last 60 days — win-back target', contactCount: 184, type: 'AI-Built', conditions: ['Status = Churned', 'Churned < 60 days ago', 'LTV > $200'], lastUpdated: '3h ago', avgOpenRate: 22.1, avgCTR: 6.8 },
  { id: 'seg-010', name: 'Starter Plan — Upgrade Ready', description: 'AI-identified Starter users showing upgrade intent signals', contactCount: 1024, type: 'AI-Built', conditions: ['Plan = Starter', 'AI Upgrade Score > 65', 'Last Login < 7 days'], lastUpdated: '18m ago', avgOpenRate: 49.8, avgCTR: 18.2 },
  { id: 'seg-011', name: 'BrightPath Marketing — All Contacts', description: 'All contacts under the BrightPath sub-account', contactCount: 4821, type: 'Static', conditions: ['Sub-Account = BrightPath Marketing'], lastUpdated: 'May 12, 2026', avgOpenRate: 36.4, avgCTR: 9.1 },
  { id: 'seg-012', name: 'Clicked: AI Agents Feature Page', description: 'Contacts who clicked the AI Agents feature link in any email', contactCount: 2104, type: 'Dynamic', conditions: ['Clicked Link contains /ai-agents', 'Last 60 days'], lastUpdated: '2h ago', avgOpenRate: 52.4, avgCTR: 21.8 },
];

const typeConfig: Record<string, string> = {
  Dynamic: 'badge-info',
  Static: 'badge-neutral',
  'AI-Built': 'badge-violet',
};

export default function EmailSegmentsTab() {
  const [search, setSearch] = useState('');

  const filtered = segments.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search segments…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-8 py-2 text-xs h-9 w-60" />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs h-9">
            <Icon name="FunnelIcon" size={14} />
            Filter by Type
          </button>
          <button className="btn-primary text-xs h-9">
            <Icon name="SparklesIcon" size={14} />
            AI Build Segment
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border">
                {['Segment Name', 'Type', 'Contacts', 'Conditions', 'Avg Open Rate', 'Avg CTR', 'Last Updated', 'Actions'].map((h) => (
                  <th key={`seg-th-${h}`} className="px-4 py-3 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((seg) => (
                <tr key={seg.id} className="group hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 max-w-[220px]">
                    <p className="text-sm font-semibold text-foreground truncate">{seg.name}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{seg.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${typeConfig[seg.type]}`}>{seg.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold tabular-nums text-foreground">{seg.contactCount.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {seg.conditions.slice(0, 2).map((cond, ci) => (
                        <span key={`cond-${seg.id}-${ci}`} className="px-1.5 py-0.5 rounded text-xs bg-muted/40 text-muted-foreground font-mono truncate max-w-[140px]">{cond}</span>
                      ))}
                      {seg.conditions.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded text-xs bg-muted/40 text-muted-foreground">+{seg.conditions.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold tabular-nums ${
                      seg.avgOpenRate >= 50 ? 'text-success' :
                      seg.avgOpenRate >= 30 ? 'text-accent' : 'text-warning'
                    }`}>{seg.avgOpenRate}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold tabular-nums ${
                      seg.avgCTR >= 20 ? 'text-success' :
                      seg.avgCTR >= 10 ? 'text-accent' : 'text-muted-foreground'
                    }`}>{seg.avgCTR}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{seg.lastUpdated}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-ghost p-1.5" title="View contacts in segment">
                        <Icon name="EyeIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Send campaign to this segment">
                        <Icon name="PaperAirplaneIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Edit segment conditions">
                        <Icon name="PencilSquareIcon" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">{filtered.length} of {segments.length} segments</p>
          <p className="text-xs text-muted-foreground">
            Total reachable contacts: <span className="font-semibold text-foreground">18,421</span>
          </p>
        </div>
      </div>
    </div>
  );
}