'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  previewText: string;
  lastUsed: string;
  usageCount: number;
  aiGenerated: boolean;
  thumbnail: string;
}

const templates: EmailTemplate[] = [
  { id: 'tpl-001', name: 'Product Launch Announcement', category: 'Marketing', subject: '🚀 Introducing [Product Name]', previewText: 'The wait is over — here\'s what we\'ve been building', lastUsed: 'May 14, 2026', usageCount: 12, aiGenerated: true, thumbnail: 'launch' },
  { id: 'tpl-002', name: 'Weekly Newsletter', category: 'Newsletter', subject: 'Your [Brand] weekly digest', previewText: 'Here\'s what happened this week + what\'s coming', lastUsed: 'May 15, 2026', usageCount: 47, aiGenerated: false, thumbnail: 'newsletter' },
  { id: 'tpl-003', name: 'Abandoned Cart Recovery', category: 'E-commerce', subject: 'You left something behind…', previewText: 'Your cart is waiting — complete your purchase', lastUsed: 'May 13, 2026', usageCount: 8, aiGenerated: true, thumbnail: 'cart' },
  { id: 'tpl-004', name: 'Welcome Sequence — Step 1', category: 'Onboarding', subject: 'Welcome to [Brand] — let\'s get started', previewText: 'Your account is ready. Here\'s how to get the most out of it', lastUsed: 'May 10, 2026', usageCount: 31, aiGenerated: false, thumbnail: 'welcome' },
  { id: 'tpl-005', name: 'Flash Sale — 48h Countdown', category: 'Promotional', subject: '⚡ 48 hours only: [X]% off ends tonight', previewText: 'Don\'t miss this — the clock is ticking', lastUsed: 'May 8, 2026', usageCount: 6, aiGenerated: true, thumbnail: 'sale' },
  { id: 'tpl-006', name: 'Case Study / Social Proof', category: 'Content', subject: 'How [Client] achieved [Result] in [Timeframe]', previewText: 'Real results from real customers — see the full story', lastUsed: 'May 8, 2026', usageCount: 9, aiGenerated: false, thumbnail: 'case-study' },
  { id: 'tpl-007', name: 'Re-engagement — 60 Day Inactive', category: 'Retention', subject: 'We miss you — here\'s what\'s new', previewText: 'A lot has changed since you last visited', lastUsed: 'May 5, 2026', usageCount: 4, aiGenerated: true, thumbnail: 're-engage' },
  { id: 'tpl-008', name: 'Webinar / Event Invite', category: 'Events', subject: 'You\'re invited: [Event Name] — [Date]', previewText: 'Join us live for an exclusive session on [Topic]', lastUsed: 'May 3, 2026', usageCount: 3, aiGenerated: false, thumbnail: 'webinar' },
  { id: 'tpl-009', name: 'Referral Program Launch', category: 'Growth', subject: 'Earn [Reward] for every friend you refer', previewText: 'Share [Brand] and get rewarded — it\'s that simple', lastUsed: 'Apr 28, 2026', usageCount: 2, aiGenerated: true, thumbnail: 'referral' },
];

const categoryColors: Record<string, string> = {
  Marketing: 'badge-violet',
  Newsletter: 'badge-info',
  'E-commerce': 'badge-success',
  Onboarding: 'badge-warning',
  Promotional: 'badge-danger',
  Content: 'badge-neutral',
  Retention: 'badge-warning',
  Events: 'badge-info',
  Growth: 'badge-success',
};

const thumbnailGradients: Record<string, string> = {
  launch: 'from-primary/30 to-accent/20',
  newsletter: 'from-accent/20 to-success/20',
  cart: 'from-warning/20 to-danger/20',
  welcome: 'from-success/20 to-accent/20',
  sale: 'from-danger/20 to-warning/20',
  'case-study': 'from-primary/20 to-success/20',
  're-engage': 'from-warning/20 to-primary/20',
  webinar: 'from-accent/20 to-primary/20',
  referral: 'from-success/20 to-accent/20',
};

export default function EmailTemplatesTab() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(templates.map((t) => t.category)))];

  const filtered = templates.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || t.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search templates…" value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-8 py-2 text-xs h-9 w-52" />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {categories.map((cat) => (
              <button
                key={`cat-${cat}`}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  category === cat ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-primary text-xs h-9">
          <Icon name="SparklesIcon" size={14} />
          AI Generate Template
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {filtered.map((tpl) => (
          <div key={tpl.id} className="glass-card rounded-xl border border-border overflow-hidden group glass-card-hover cursor-pointer">
            {/* Thumbnail */}
            <div className={`h-28 bg-gradient-to-br ${thumbnailGradients[tpl.thumbnail] ?? 'from-primary/20 to-accent/20'} relative flex items-center justify-center`}>
              <Icon name="EnvelopeOpenIcon" size={32} className="text-foreground/20" />
              {tpl.aiGenerated && (
                <span className="absolute top-2 right-2 badge badge-violet text-xs">AI</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 gap-2">
                <button className="btn-primary text-xs px-3 py-2 h-8">Use Template</button>
                <button className="btn-secondary text-xs px-3 py-2 h-8">Preview</button>
              </div>
            </div>
            {/* Info */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold text-foreground leading-snug">{tpl.name}</p>
                <span className={`badge flex-shrink-0 ${categoryColors[tpl.category] ?? 'badge-neutral'}`}>{tpl.category}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mb-2">{tpl.subject}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Used {tpl.usageCount}×</span>
                <span className="text-xs text-muted-foreground">{tpl.lastUsed}</span>
              </div>
            </div>
          </div>
        ))}
        {/* New Template Card */}
        <div className="glass-card rounded-xl border border-dashed border-primary/30 overflow-hidden group hover:border-primary/60 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[180px] p-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <Icon name="PlusIcon" size={20} className="text-primary" />
          </div>
          <p className="text-sm font-semibold text-primary mb-1">New Template</p>
          <p className="text-xs text-muted-foreground text-center">Build from scratch or let AI generate one</p>
        </div>
      </div>
    </div>
  );
}