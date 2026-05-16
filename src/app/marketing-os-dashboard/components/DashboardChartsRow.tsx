'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const AIActivityAreaChart = dynamic(() => import('./AIActivityAreaChart'), { ssr: false });
const CampaignROASBarChart = dynamic(() => import('./CampaignROASBarChart'), { ssr: false });

export default function DashboardChartsRow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
      <div className="lg:col-span-3 xl:col-span-3 2xl:col-span-3">
        <AIActivityAreaChart />
      </div>
      <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2">
        <CampaignROASBarChart />
      </div>
    </div>
  );
}