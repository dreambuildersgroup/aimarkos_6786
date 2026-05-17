import { useEffect, useState } from 'react';
import { getAgentsStatus } from '@/lib/api';

export default function CommandCenter() {
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    getAgentsStatus().then(setStatus).catch(console.error);
  }, []);

  // Use status.active_agents, status.roas, etc. in your dashboard cards

export default function MarketingOSDashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              May 15, 2026 — All systems operational
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-success status-dot-pulse" />
              Updated 47s ago
            </div>
            <button className="btn-secondary text-xs h-9">
              <span>Last 7 days</span>
            </button>
          </div>
        </div>

        {/* KPI Bento Grid */}
        <DashboardBentoGrid />

        {/* Agent Status + Activity Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <AgentStatusGrid />
          </div>
          <div className="xl:col-span-1">
            <LiveActivityFeed />
          </div>
        </div>

        {/* Charts Row */}
        <DashboardChartsRow />

        {/* Campaign Table */}
        <CampaignPerformanceTable />
      </div>
    </AppLayout>
  );
}
