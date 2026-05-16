'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  group: string;
}

const navItems: NavItem[] = [
  { id: 'nav-dashboard', label: 'Command Center', icon: 'CommandLineIcon', href: '/marketing-os-dashboard', group: 'core' },
  { id: 'nav-agents', label: 'AI Agents', icon: 'CpuChipIcon', href: '/marketing-os-dashboard', badge: 3, group: 'core' },
  { id: 'nav-campaigns', label: 'Campaigns', icon: 'MegaphoneIcon', href: '/marketing-os-dashboard', badge: 12, group: 'core' },
  { id: 'nav-email', label: 'Email Studio', icon: 'EnvelopeIcon', href: '/email-studio', group: 'core' },
  { id: 'nav-workflows', label: 'Workflows', icon: 'BoltIcon', href: '/marketing-os-dashboard', group: 'automation' },
  { id: 'nav-subaccounts', label: 'Sub-Accounts', icon: 'BuildingOfficeIcon', href: '/marketing-os-dashboard', badge: 2, group: 'agency' },
  { id: 'nav-whitelabel', label: 'White-Label', icon: 'PaintBrushIcon', href: '/marketing-os-dashboard', group: 'agency' },
  { id: 'nav-analytics', label: 'Analytics', icon: 'ChartBarIcon', href: '/marketing-os-dashboard', group: 'insights' },
  { id: 'nav-academy', label: 'Academy', icon: 'AcademicCapIcon', href: '/marketing-os-dashboard', group: 'insights' },
  { id: 'nav-settings', label: 'Settings', icon: 'Cog6ToothIcon', href: '/marketing-os-dashboard', group: 'system' },
];

const groupLabels: Record<string, string> = {
  core: 'Platform',
  automation: 'Automation',
  agency: 'Agency',
  insights: 'Insights',
  system: 'System',
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const groups = ['core', 'automation', 'agency', 'insights', 'system'];

  return (
    <aside
      className={`relative flex flex-col h-full bg-surface-1 border-r border-border sidebar-transition z-30 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border min-h-[64px] ${collapsed ? 'justify-center px-2' : ''}`}>
        <div className="flex-shrink-0">
          <AppLogo size={32} />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm tracking-tight text-foreground leading-none">AImarkOS</span>
            <span className="text-xs text-muted-foreground mt-0.5">Marketing OS</span>
          </div>
        )}
      </div>

      {/* Workspace Switcher */}
      {!collapsed && (
        <div className="px-3 py-2 border-b border-border">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors text-left">
            <div className="w-6 h-6 rounded-md gradient-violet-cyan flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Apex Digital Agency</p>
              <p className="text-xs text-muted-foreground">Agency Plan</p>
            </div>
            <Icon name="ChevronUpDownIcon" size={14} className="text-muted-foreground flex-shrink-0" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-2 py-3">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group);
          return (
            <div key={`group-${group}`} className="mb-4">
              {!collapsed && (
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {groupLabels[group]}
                </p>
              )}
              {items.map((item) => {
                const isActive = pathname === item.href || (item.href === '/marketing-os-dashboard' && pathname === '/');
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium nav-item-hover
                      ${isActive ? 'nav-item-active' : 'text-muted-foreground'}
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="badge badge-violet text-xs px-1.5 py-0.5">{item.badge}</span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge !== undefined && (
                      <span className="absolute left-8 top-1 w-2 h-2 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User + Collapse */}
      <div className="border-t border-border p-3 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full gradient-violet-cyan flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Arjun Kapoor</p>
              <p className="text-xs text-muted-foreground truncate">arjun@apexdigital.io</p>
            </div>
            <button className="btn-ghost p-1">
              <Icon name="EllipsisVerticalIcon" size={16} />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-150 text-xs font-medium"
        >
          <Icon name={collapsed ? 'ChevronRightIcon' : 'ChevronLeftIcon'} size={16} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}