import React from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';

const OpenRateTrendChart = dynamic(() => import('./OpenRateTrendChart'), { ssr: false });
const DeliverabilityBreakdownChart = dynamic(() => import('./DeliverabilityBreakdownChart'), { ssr: false });

const summaryStats = [
  { id: 'rep-stat-1', label: 'Total Emails Sent', value: '68,241', change: '+12.4%', up: true, icon: 'PaperAirplaneIcon' },
  { id: 'rep-stat-2', label: 'Avg Open Rate', value: '41.8%', change: '+3.2pp', up: true, icon: 'EyeIcon' },
  { id: 'rep-stat-3', label: 'Avg Click Rate', value: '14.2%', change: '+1.8pp', up: true, icon: 'CursorArrowRaysIcon' },
  { id: 'rep-stat-4', label: 'Deliverability Rate', value: '94.2%', change: '-2.1pp', up: false, icon: 'CheckCircleIcon' },
  { id: 'rep-stat-5', label: 'Bounce Rate', value: '2.8%', change: '+0.4pp', up: false, icon: 'ExclamationTriangleIcon' },
  { id: 'rep-stat-6', label: 'Unsubscribe Rate', value: '0.41%', change: '-0.08pp', up: true, icon: 'UserMinusIcon' },
];

export default function EmailReportsTab() {
  return (
    <div className="space-y-5">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
        {summaryStats.map((stat) => (
          <div key={stat.id} className="glass-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} size={14} className={stat.up ? 'text-success' : 'text-warning'} />
              <span className="text-xs text-muted-foreground font-medium truncate">{stat.label}</span>
            </div>
            <p className="text-xl font-bold tabular-nums text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name={stat.up ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={11} className={stat.up ? 'text-success' : 'text-danger'} />
              <span className={`text-xs font-semibold ${stat.up ? 'text-success' : 'text-danger'}`}>{stat.change}</span>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <OpenRateTrendChart />
        </div>
        <div className="lg:col-span-1">
          <DeliverabilityBreakdownChart />
        </div>
      </div>

      {/* Top Performing Campaigns */}
      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">Top Performing Campaigns</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Ranked by open rate — last 30 days</p>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border">
                {['Rank', 'Campaign', 'Sent', 'Open Rate', 'CTR', 'Conversions', 'Revenue Attr.'].map((h) => (
                  <th key={`rep-th-${h}`} className="px-4 py-3 text-left">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {[
                { id: 'top-1', rank: 1, name: 'Agency Onboarding — Step 1', sent: 204, openRate: 92.2, ctr: 72.1, conversions: 88, revenue: 35200 },
                { id: 'top-2', rank: 2, name: 'High-Intent Lead Nurture', sent: 2841, openRate: 72.4, ctr: 44.8, conversions: 624, revenue: 124800 },
                { id: 'top-3', rank: 3, name: 'Case Study: 4.2x ROAS', sent: 5104, openRate: 57.1, ctr: 42.3, conversions: 412, revenue: 82400 },
                { id: 'top-4', rank: 4, name: 'Webinar Invite — May 2026', sent: 892, openRate: 52.4, ctr: 38.4, conversions: 241, revenue: 0 },
                { id: 'top-5', rank: 5, name: 'Flash Sale — 48h Only', sent: 4821, openRate: 46.4, ctr: 17.5, conversions: 847, revenue: 169400 },
              ].map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      row.rank === 1 ? 'bg-warning/20 text-warning' :
                      row.rank === 2 ? 'bg-muted-foreground/20 text-muted-foreground' :
                      row.rank === 3 ? 'bg-warning/10 text-warning/70' : 'text-muted-foreground'
                    }`}>{row.rank}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-foreground truncate max-w-[200px]">{row.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm tabular-nums text-muted-foreground">{row.sent.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold tabular-nums text-success">{row.openRate}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold tabular-nums text-accent">{row.ctr}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm tabular-nums text-foreground font-medium">{row.conversions.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm tabular-nums text-success font-semibold">
                      {row.revenue > 0 ? `$${row.revenue.toLocaleString()}` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}