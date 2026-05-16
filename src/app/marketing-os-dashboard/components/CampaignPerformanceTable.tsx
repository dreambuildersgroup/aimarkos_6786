'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Campaign {
  id: string;
  name: string;
  type: string;
  subAccount: string;
  status: 'Active' | 'Paused' | 'Scheduled' | 'Completed' | 'Draft';
  roas: number;
  spend: number;
  budget: number;
  leads: number;
  cpl: number;
  impressions: number;
  agentAssigned: string;
}

const campaigns: Campaign[] = [
  { id: 'camp-001', name: 'Summer Sale — Social Retarget', type: 'Social Ads', subAccount: 'Apex Digital', status: 'Active', roas: 6.8, spend: 4200, budget: 6000, leads: 847, cpl: 4.96, impressions: 284100, agentAssigned: 'PPC Optimizer Prime' },
  { id: 'camp-002', name: 'Q2 Email Drip — New Leads', type: 'Email', subAccount: 'Momentum Digital', status: 'Active', roas: 5.2, spend: 1800, budget: 2500, leads: 1204, cpl: 1.50, impressions: 0, agentAssigned: 'Email Executor v2' },
  { id: 'camp-003', name: 'Google Search — Brand Terms', type: 'PPC', subAccount: 'BrightPath Mktg', status: 'Active', roas: 4.1, spend: 8900, budget: 12000, leads: 441, cpl: 20.18, impressions: 128400, agentAssigned: 'PPC Optimizer Prime' },
  { id: 'camp-004', name: 'Display Awareness — Q2', type: 'Display', subAccount: 'UrbanFlow Agency', status: 'Active', roas: 2.9, spend: 3400, budget: 4000, leads: 182, cpl: 18.68, impressions: 891200, agentAssigned: 'Social Scheduler' },
  { id: 'camp-005', name: 'LinkedIn B2B Lead Gen', type: 'Social Ads', subAccount: 'CoreMetrics Inc', status: 'Paused', roas: 1.8, spend: 6200, budget: 8000, leads: 94, cpl: 65.96, impressions: 42800, agentAssigned: 'Lead Qualifier AI' },
  { id: 'camp-006', name: 'YouTube Pre-roll — Brand', type: 'Video', subAccount: 'Apex Digital', status: 'Active', roas: 2.1, spend: 5100, budget: 7000, leads: 228, cpl: 22.37, impressions: 1204800, agentAssigned: 'Content Writer Pro' },
  { id: 'camp-007', name: 'SEO Content Cluster — AI Tools', type: 'SEO', subAccount: 'BrightPath Mktg', status: 'Active', roas: 8.4, spend: 900, budget: 1500, leads: 312, cpl: 2.88, impressions: 0, agentAssigned: 'SEO Researcher Alpha' },
  { id: 'camp-008', name: 'Abandoned Cart Recovery Flow', type: 'Email', subAccount: 'Momentum Digital', status: 'Scheduled', roas: 0, spend: 0, budget: 800, leads: 0, cpl: 0, impressions: 0, agentAssigned: 'Email Executor v2' },
  { id: 'camp-009', name: 'Facebook Lead Ads — Free Trial', type: 'Social Ads', subAccount: 'Apex Digital', status: 'Active', roas: 3.7, spend: 2800, budget: 3500, leads: 624, cpl: 4.49, impressions: 184200, agentAssigned: 'Lead Qualifier AI' },
  { id: 'camp-010', name: 'Landing Page Test — V2 vs V3', type: 'CRO', subAccount: 'CoreMetrics Inc', status: 'Draft', roas: 0, spend: 0, budget: 2000, leads: 0, cpl: 0, impressions: 0, agentAssigned: 'Landing Page Builder' },
];

const statusConfig: Record<string, string> = {
  Active: 'badge-success',
  Paused: 'badge-warning',
  Scheduled: 'badge-info',
  Completed: 'badge-neutral',
  Draft: 'badge-neutral',
};

export default function CampaignPerformanceTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<keyof Campaign>('roas');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = campaigns
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subAccount.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (key: keyof Campaign) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const toggleAll = () => {
    setSelected(selected.length === paged.length ? [] : paged.map((c) => c.id));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const SortIcon = ({ col }: { col: keyof Campaign }) => (
    <Icon
      name={sortKey === col ? (sortDir === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon') : 'ChevronUpDownIcon'}
      size={12}
      className={sortKey === col ? 'text-primary' : 'text-muted-foreground'}
    />
  );

  return (
    <div className="glass-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-base font-semibold text-foreground">Campaign Performance</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{campaigns.length} campaigns · all sub-accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search campaigns…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-8 py-2 text-xs h-9 w-52"
            />
          </div>
          <button className="btn-secondary text-xs h-9">
            <Icon name="FunnelIcon" size={14} />
            Filter
          </button>
          <button className="btn-secondary text-xs h-9">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-2.5 bg-primary/10 border-b border-primary/20 slide-up">
          <span className="text-xs font-semibold text-primary">{selected.length} selected</span>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs py-1 px-2">
              <Icon name="PauseIcon" size={13} /> Pause
            </button>
            <button className="btn-ghost text-xs py-1 px-2">
              <Icon name="PlayIcon" size={13} /> Resume
            </button>
            <button className="btn-danger text-xs py-1 px-2">
              <Icon name="TrashIcon" size={13} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  checked={selected.length === paged.length && paged.length > 0}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-border bg-input accent-primary"
                />
              </th>
              {[
                { key: 'name' as keyof Campaign, label: 'Campaign' },
                { key: 'type' as keyof Campaign, label: 'Type' },
                { key: 'subAccount' as keyof Campaign, label: 'Sub-Account' },
                { key: 'status' as keyof Campaign, label: 'Status' },
                { key: 'roas' as keyof Campaign, label: 'ROAS' },
                { key: 'spend' as keyof Campaign, label: 'Spend / Budget' },
                { key: 'leads' as keyof Campaign, label: 'Leads' },
                { key: 'cpl' as keyof Campaign, label: 'CPL' },
                { key: 'agentAssigned' as keyof Campaign, label: 'AI Agent' },
              ].map((col) => (
                <th
                  key={`th-${col.key}`}
                  className="px-4 py-3 text-left cursor-pointer select-none hover:bg-muted/20 transition-colors"
                  onClick={() => toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {col.label}
                    </span>
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {paged.map((campaign) => {
              const budgetPct = campaign.budget > 0 ? Math.round((campaign.spend / campaign.budget) * 100) : 0;
              const isSelected = selected.includes(campaign.id);
              return (
                <tr
                  key={campaign.id}
                  className={`group transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/20'}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(campaign.id)}
                      className="w-4 h-4 rounded border-border bg-input accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-foreground truncate max-w-[200px]">{campaign.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge badge-neutral text-xs">{campaign.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-foreground font-medium truncate max-w-[120px]">{campaign.subAccount}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge ${statusConfig[campaign.status]}`}>{campaign.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold tabular-nums ${
                      campaign.roas >= 4 ? 'text-success' :
                      campaign.roas >= 2.5 ? 'text-accent' :
                      campaign.roas > 0 ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {campaign.roas > 0 ? `${campaign.roas}x` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="min-w-[100px]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs tabular-nums text-foreground font-medium">${campaign.spend.toLocaleString()}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">${campaign.budget.toLocaleString()}</span>
                      </div>
                      {campaign.budget > 0 && (
                        <div className="h-1 rounded-full bg-border overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              budgetPct >= 85 ? 'bg-warning' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(budgetPct, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {campaign.leads > 0 ? campaign.leads.toLocaleString() : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {campaign.cpl > 0 ? `$${campaign.cpl.toFixed(2)}` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-muted-foreground truncate max-w-[140px]">{campaign.agentAssigned}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="btn-ghost p-1.5" title="View campaign details">
                        <Icon name="EyeIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title="Edit campaign">
                        <Icon name="PencilSquareIcon" size={14} />
                      </button>
                      <button className="btn-ghost p-1.5" title={campaign.status === 'Active' ? 'Pause campaign' : 'Resume campaign'}>
                        <Icon name={campaign.status === 'Active' ? 'PauseIcon' : 'PlayIcon'} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)}</span> of{' '}
          <span className="font-semibold text-foreground">{filtered.length}</span> campaigns
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="btn-ghost p-1.5 disabled:opacity-40"
          >
            <Icon name="ChevronLeftIcon" size={14} />
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
                page === i + 1
                  ? 'bg-primary/20 text-primary border border-primary/30' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="btn-ghost p-1.5 disabled:opacity-40"
          >
            <Icon name="ChevronRightIcon" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}