import React from 'react';
import AIActionsHeroCard from './AIActionsHeroCard';
import MetricKPICard from './MetricKPICard';

export default function DashboardBentoGrid() {
  return (
    // 8 cards: grid-cols-4
    // Row 1: Hero (2-col) + Campaign ROAS + Active Agents
    // Row 2: Lead Velocity + Email Deliverability + Sub-Account Health (2-col)
    // Row 3: Spend vs Budget + Active Workflows (handled as 2 regular in a sub-grid)
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      {/* Hero: AI Actions — spans 2 cols */}
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
        <AIActionsHeroCard />
      </div>

      {/* Campaign ROAS */}
      <div className="col-span-1">
        <MetricKPICard
          id="kpi-roas"
          label="Avg Campaign ROAS"
          value="4.21x"
          change="+0.38x"
          changeDirection="up"
          changeLabel="vs last week"
          icon="ChartBarIcon"
          iconColor="text-accent"
          bgAccent="bg-accent/5"
          borderAccent="border-accent/20"
          subMetric="Best: Social Retarget 6.8x"
          subMetricColor="text-accent"
        />
      </div>

      {/* Active Agents */}
      <div className="col-span-1">
        <MetricKPICard
          id="kpi-agents"
          label="Active AI Agents"
          value="9 / 12"
          change="3 idle"
          changeDirection="neutral"
          changeLabel="2 scheduled"
          icon="CpuChipIcon"
          iconColor="text-primary"
          bgAccent="bg-primary/5"
          borderAccent="border-primary/20"
          subMetric="99.1% uptime this week"
          subMetricColor="text-success"
        />
      </div>

      {/* Lead Velocity */}
      <div className="col-span-1">
        <MetricKPICard
          id="kpi-leads"
          label="Lead Velocity (24h)"
          value="1,847"
          change="+23.4%"
          changeDirection="up"
          changeLabel="vs yesterday"
          icon="UserGroupIcon"
          iconColor="text-success"
          bgAccent="bg-success/5"
          borderAccent="border-success/20"
          subMetric="$3.12 avg CPL"
          subMetricColor="text-muted-foreground"
        />
      </div>

      {/* Email Deliverability — WARNING STATE */}
      <div className="col-span-1">
        <MetricKPICard
          id="kpi-email-deliv"
          label="Email Deliverability"
          value="94.2%"
          change="-2.1%"
          changeDirection="down"
          changeLabel="check SES config"
          icon="EnvelopeIcon"
          iconColor="text-warning"
          bgAccent="bg-warning/5"
          borderAccent="border-warning/30"
          subMetric="⚠ 3 domains flagged"
          subMetricColor="text-warning"
          isAlert
        />
      </div>

      {/* Sub-Account Health — spans 2 cols */}
      <div className="md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
        <MetricKPICard
          id="kpi-subaccounts"
          label="Sub-Account Health"
          value="38 / 41"
          change="2 at risk"
          changeDirection="warning"
          changeLabel="1 suspended"
          icon="BuildingOfficeIcon"
          iconColor="text-primary"
          bgAccent="bg-primary/5"
          borderAccent="border-primary/20"
          subMetric="93% health score avg · $28,400 MRR managed"
          subMetricColor="text-muted-foreground"
          isWide
        />
      </div>
    </div>
  );
}