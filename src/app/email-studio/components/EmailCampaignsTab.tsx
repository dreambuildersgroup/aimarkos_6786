'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  fromName: string;
  segment: string;
  status: 'Sent' | 'Sending' | 'Scheduled' | 'Draft' | 'Paused' | 'Failed';
  sentCount: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  scheduledAt: string;
  aiGenerated: boolean;
}

const emailCampaigns: EmailCampaign[] = [
  { id: 'ec-001', name: 'Q2 Product Launch Announcement', subject: '🚀 Introducing our biggest update yet — see what\'s new', fromName: 'Arjun @ Apex Digital', segment: 'All Subscribers', status: 'Sent', sentCount: 4821, delivered: 4703, opened: 2241, clicked: 847, bounced: 118, unsubscribed: 24, scheduledAt: 'May 14, 2026', aiGenerated: true },
  { id: 'ec-002', name: 'Weekly Newsletter — May Week 3', subject: 'Your marketing week in review + 3 quick wins', fromName: 'Team AImarkOS', segment: 'Newsletter Subscribers', status: 'Sending', sentCount: 3204, delivered: 2891, opened: 1204, clicked: 312, bounced: 44, unsubscribed: 8, scheduledAt: 'May 15, 2026', aiGenerated: false },
  { id: 'ec-003', name: 'Abandoned Cart Recovery — High Value', subject: 'Still thinking it over? Here\'s 15% off your cart', fromName: 'Momentum Digital', segment: 'Abandoned Cart (>$200)', status: 'Scheduled', sentCount: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, scheduledAt: 'May 16, 2026 09:00', aiGenerated: true },
  { id: 'ec-004', name: 'Re-engagement — 90 Day Inactive', subject: 'We miss you — here\'s what you\'ve been missing', fromName: 'BrightPath Marketing', segment: 'Inactive 90d', status: 'Sent', sentCount: 1847, delivered: 1802, opened: 421, clicked: 94, bounced: 45, unsubscribed: 67, scheduledAt: 'May 12, 2026', aiGenerated: true },
  { id: 'ec-005', name: 'Agency Partner Onboarding — Step 1', subject: 'Welcome to AImarkOS — your setup guide is inside', fromName: 'AImarkOS Academy', segment: 'New Agency Partners', status: 'Sent', sentCount: 204, delivered: 201, opened: 188, clicked: 147, bounced: 3, unsubscribed: 1, scheduledAt: 'May 10, 2026', aiGenerated: false },
  { id: 'ec-006', name: 'Flash Sale — 48 Hours Only', subject: '⚡ 48-hour sale: 30% off Agency plan ends tonight', fromName: 'Arjun @ Apex Digital', segment: 'Starter + Pro Users', status: 'Draft', sentCount: 0, delivered: 0, opened: 0, clicked: 0, bounced: 0, unsubscribed: 0, scheduledAt: '—', aiGenerated: true },
  { id: 'ec-007', name: 'Case Study: 4.2x ROAS in 60 Days', subject: 'How Momentum Digital scaled with AI agents [case study]', fromName: 'Team AImarkOS', segment: 'All Subscribers', status: 'Sent', sentCount: 5104, delivered: 4988, opened: 2847, clicked: 1204, bounced: 116, unsubscribed: 18, scheduledAt: 'May 8, 2026', aiGenerated: false },
  { id: 'ec-008', name: 'Webinar Invite — AI Marketing in 2026', subject: 'Join us live: How to 10x your agency with AI agents', fromName: 'AImarkOS Academy', segment: 'Pro + Agency Users', status: 'Failed', sentCount: 892, delivered: 0, opened: 0, clicked: 0, bounced: 892, unsubscribed: 0, scheduledAt: 'May 13, 2026', aiGenerated: false },
];

const statusConfig: Record<string, string> = {
  Sent: 'badge-success',
  Sending: 'badge-info',
  Scheduled: 'badge-violet',
  Draft: 'badge-neutral',
  Paused: 'badge-warning',
  Failed: 'badge-danger',
};

export default function EmailCampaignsTab() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = emailCampaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((c) => c.id));
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const openRate = (c: EmailCampaign) =>
    c.delivered > 0 ? ((c.opened / c.delivered) * 100).toFixed(1) + '%' : '—';
  const clickRate = (c: EmailCampaign) =>
    c.opened > 0 ? ((c.clicked / c.opened) * 100).toFixed(1) + '%' : '—';
  const deliverRate = (c: EmailCampaign) =>
    c.sentCount > 0 ? ((c.delivered / c.sentCount) * 100).toFixed(1) + '%' : '—';

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-8 py-2 text-xs h-9 w-60"
            />
          </div>
          {/* Status Filter Chips */}
          <div className="flex items-center gap-1">
            {['all', 'Sent', 'Sending', 'Scheduled', 'Draft', 'Failed'].map((s) => (
              <button
                key={`chip-${s}`}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === s
                    ? 'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs h-9">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export
          </button>
          <button className="btn-primary text-xs h-9">
            <Icon name="SparklesIcon" size={14} />
            AI Create Campaign
          </button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 slide-up">
          <span className="text-xs font-semibold text-primary">{selected.length} selected</span>
          <button className="btn-ghost text-xs py-1 px-2"><Icon name="PaperAirplaneIcon" size={13} /> Send Now</button>
          <button className="btn-ghost text-xs py-1 px-2"><Icon name="ArchiveBoxIcon" size={13} /> Archive</button>
          <button className="btn-danger text-xs py-1 px-2"><Icon name="TrashIcon" size={13} /> Delete</button>
        </div>
      )}

      {/* Table */}
      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="w-4 h-4 rounded border-border bg-input accent-primary" />
                </th>
                {[
                  'Campaign', 'Segment', 'Status', 'Sent', 'Delivered', 'Open Rate', 'Click Rate', 'Bounced', 'Scheduled', 'Actions'
                ].map((h) => (
                  <th key={`ec-th-${h}`} className="px-4 py-3 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((campaign) => (
                <tr key={campaign.id} className={`group transition-colors ${selected.includes(campaign.id) ? 'bg-primary/5' : 'hover:bg-muted/20'}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.includes(campaign.id)} onChange={() => toggleOne(campaign.id)} className="w-4 h-4 rounded border-border bg-input accent-primary" />
                  </td>
                  <td className="px-4 py-3 max-w-[240px]">
                    <div className="flex items-start gap-2">
                      {campaign.aiGenerated && (
                        <span className="badge badge-violet mt-0.5 flex-shrink-0 text-xs">AI</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{campaign.subject}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-foreground font-medium truncate max-w-[120px]">{campaign.segment}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statusConfig[campaign.status]}`}>{campaign.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm tabular-nums font-semibold text-foreground">
                      {campaign.sentCount > 0 ? campaign.sentCount.toLocaleString() : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm tabular-nums font-medium ${
                      parseFloat(deliverRate(campaign)) >= 97 ? 'text-success' :
                      parseFloat(deliverRate(campaign)) >= 90 ? 'text-foreground' :
                      deliverRate(campaign) !== '—' ? 'text-danger' : 'text-muted-foreground'
                    }`}>
                      {deliverRate(campaign)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm tabular-nums font-semibold ${
                        parseFloat(openRate(campaign)) >= 40 ? 'text-success' :
                        parseFloat(openRate(campaign)) >= 20 ? 'text-accent' :
                        openRate(campaign) !== '—' ? 'text-muted-foreground' : 'text-muted-foreground'
                      }`}>
                        {openRate(campaign)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm tabular-nums font-semibold ${
                      parseFloat(clickRate(campaign)) >= 15 ? 'text-success' :
                      parseFloat(clickRate(campaign)) >= 5 ? 'text-accent' :
                      clickRate(campaign) !== '—' ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      {clickRate(campaign)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm tabular-nums ${
                      campaign.bounced > 100 ? 'text-danger font-semibold' : 'text-muted-foreground'
                    }`}>
                      {campaign.bounced > 0 ? campaign.bounced.toLocaleString() : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">{campaign.scheduledAt}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-ghost p-1.5" title="View campaign report">
                        <Icon name="ChartBarIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Edit campaign">
                        <Icon name="PencilSquareIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Duplicate campaign">
                        <Icon name="DocumentDuplicateIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Delete campaign — this cannot be undone">
                        <Icon name="TrashIcon" size={14} className="text-danger/70 hover:text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Icon name="EnvelopeIcon" size={40} className="text-muted-foreground/30 mb-3" />
            <p className="text-base font-semibold text-foreground mb-1">No campaigns match your filters</p>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting the status filter or search term</p>
            <button className="btn-primary text-sm">
              <Icon name="PlusIcon" size={16} />
              Create First Campaign
            </button>
          </div>
        )}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {filtered.length} of {emailCampaigns.length} campaigns
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="InformationCircleIcon" size={13} className="text-accent" />
            <span>Open rates above 35% indicate strong subject line performance</span>
          </div>
        </div>
      </div>
    </div>
  );
}