'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import EmailCampaignsTab from './EmailCampaignsTab';
import EmailSequencesTab from './EmailSequencesTab';
import EmailTemplatesTab from './EmailTemplatesTab';
import EmailSegmentsTab from './EmailSegmentsTab';
import EmailReportsTab from './EmailReportsTab';

const tabs = [
  { id: 'tab-campaigns', label: 'Campaigns', icon: 'MegaphoneIcon', badge: 8 },
  { id: 'tab-sequences', label: 'Sequences', icon: 'ArrowsRightLeftIcon', badge: 5 },
  { id: 'tab-templates', label: 'Templates', icon: 'DocumentDuplicateIcon' },
  { id: 'tab-segments', label: 'Segments', icon: 'UserGroupIcon', badge: 12 },
  { id: 'tab-reports', label: 'Reports', icon: 'ChartBarIcon' },
];

export default function EmailStudioContent() {
  const [activeTab, setActiveTab] = useState('tab-campaigns');

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Email Studio</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Full-stack email marketing — campaigns, sequences, templates, and analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* SES Usage Meter */}
          <div className="glass-card rounded-xl px-4 py-2.5 border border-border min-w-[180px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-muted-foreground">AWS SES Usage</span>
              <span className="text-xs font-bold tabular-nums text-foreground">68,241 / 250,000</span>
            </div>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full bg-accent" style={{ width: '27%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">27% used · $0.136 this month</p>
          </div>

          {/* Sender Reputation */}
          <div className="glass-card rounded-xl px-4 py-2.5 border border-warning/30">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={16} className="text-warning" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Sender Reputation</p>
                <p className="text-sm font-bold text-warning">84 / 100</p>
              </div>
            </div>
          </div>

          <button className="btn-primary text-sm h-10">
            <Icon name="PlusIcon" size={16} />
            New Campaign
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-150 -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} size={15} />
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`badge text-xs px-1.5 py-0.5 ${activeTab === tab.id ? 'badge-violet' : 'badge-neutral'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="fade-in">
        {activeTab === 'tab-campaigns' && <EmailCampaignsTab />}
        {activeTab === 'tab-sequences' && <EmailSequencesTab />}
        {activeTab === 'tab-templates' && <EmailTemplatesTab />}
        {activeTab === 'tab-segments' && <EmailSegmentsTab />}
        {activeTab === 'tab-reports' && <EmailReportsTab />}
      </div>
    </div>
  );
}