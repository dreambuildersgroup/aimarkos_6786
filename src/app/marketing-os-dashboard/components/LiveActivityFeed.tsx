import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ActivityItem {
  id: string;
  agentName: string;
  action: string;
  entity: string;
  subAccount: string;
  timestamp: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

const activities: ActivityItem[] = [
  { id: 'act-001', agentName: 'Email Executor v2', action: 'Sent email sequence step 3 to', entity: '1,204 contacts', subAccount: 'Momentum Digital', timestamp: '1s ago', type: 'success' },
  { id: 'act-002', agentName: 'PPC Optimizer Prime', action: 'Increased bid +$0.18 on keyword', entity: '"digital marketing agency"', subAccount: 'BrightPath Mktg', timestamp: '14s ago', type: 'info' },
  { id: 'act-003', agentName: 'Reputation Monitor', action: 'API rate limit exceeded —', entity: 'retrying in 58min', subAccount: 'Apex Digital', timestamp: '1h ago', type: 'error' },
  { id: 'act-004', agentName: 'Content Writer Pro', action: 'Generated 12 ad variants for', entity: 'Summer Sale campaign', subAccount: 'Apex Digital', timestamp: '2m ago', type: 'success' },
  { id: 'act-005', agentName: 'Lead Qualifier AI', action: 'Flagged 3 high-intent leads from', entity: 'Facebook Lead Ads', subAccount: 'BrightPath Mktg', timestamp: '8s ago', type: 'success' },
  { id: 'act-006', agentName: 'SEO Researcher Alpha', action: 'Found 14 backlink opportunities for', entity: 'apexclient.com', subAccount: 'Apex Digital', timestamp: '4m ago', type: 'info' },
  { id: 'act-007', agentName: 'Social Scheduler', action: 'Budget threshold 80% reached on', entity: 'LinkedIn Ads — Q2', subAccount: 'UrbanFlow Agency', timestamp: '7m ago', type: 'warning' },
  { id: 'act-008', agentName: 'Analytics Analyst', action: 'Generated weekly performance report for', entity: 'CoreMetrics Inc', subAccount: 'CoreMetrics Inc', timestamp: '22m ago', type: 'info' },
];

const typeConfig: Record<string, { icon: string; color: string }> = {
  success: { icon: 'CheckCircleIcon', color: 'text-success' },
  warning: { icon: 'ExclamationTriangleIcon', color: 'text-warning' },
  info: { icon: 'InformationCircleIcon', color: 'text-accent' },
  error: { icon: 'XCircleIcon', color: 'text-danger' },
};

export default function LiveActivityFeed() {
  return (
    <div className="glass-card rounded-xl border border-border h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success status-dot-pulse" />
          <h2 className="text-base font-semibold text-foreground">Live Action Feed</h2>
        </div>
        <button className="text-xs text-primary hover:text-primary/80 font-medium">View all</button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin divide-y divide-border/40">
        {activities.map((item) => {
          const tc = typeConfig[item.type];
          return (
            <div key={item.id} className="px-5 py-3 hover:bg-muted/20 transition-colors">
              <div className="flex items-start gap-2.5">
                <Icon name={tc.icon as Parameters<typeof Icon>[0]['name']} size={14} className={`${tc.color} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug">
                    <span className="font-semibold">{item.agentName}</span>
                    {' '}{item.action}{' '}
                    <span className="font-semibold text-accent">{item.entity}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{item.subAccount}</span>
                    <span className="text-xs text-muted-foreground/50">·</span>
                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}