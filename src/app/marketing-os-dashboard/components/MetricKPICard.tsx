import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface MetricKPICardProps {
  id: string;
  label: string;
  value: string;
  change: string;
  changeDirection: 'up' | 'down' | 'neutral' | 'warning';
  changeLabel: string;
  icon: string;
  iconColor: string;
  bgAccent: string;
  borderAccent: string;
  subMetric?: string;
  subMetricColor?: string;
  isAlert?: boolean;
  isWide?: boolean;
}

export default function MetricKPICard({
  id,
  label,
  value,
  change,
  changeDirection,
  changeLabel,
  icon,
  iconColor,
  bgAccent,
  borderAccent,
  subMetric,
  subMetricColor,
  isAlert,
  isWide,
}: MetricKPICardProps) {
  const changeColors: Record<string, string> = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-muted-foreground',
    warning: 'text-warning',
  };

  const changeIcons: Record<string, string> = {
    up: 'ArrowTrendingUpIcon',
    down: 'ArrowTrendingDownIcon',
    neutral: 'MinusIcon',
    warning: 'ExclamationTriangleIcon',
  };

  return (
    <div
      className={`relative h-full min-h-[120px] rounded-xl border ${borderAccent} ${bgAccent} glass-card-hover p-4 flex flex-col justify-between transition-all duration-200 ${
        isAlert ? 'shadow-[0_0_16px_rgba(245,158,11,0.1)]' : ''
      }`}
    >
      {isAlert && (
        <div className="absolute top-3 right-3">
          <Icon name="ExclamationTriangleIcon" size={14} className="text-warning" />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${bgAccent} border ${borderAccent}`}>
          <Icon name={icon as Parameters<typeof Icon>[0]['name']} size={16} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground leading-none mb-1.5">
            {label}
          </p>
          <p className={`font-bold tabular-nums text-foreground leading-none ${isWide ? 'text-3xl' : 'text-2xl'}`}>
            {value}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <Icon
            name={changeIcons[changeDirection] as Parameters<typeof Icon>[0]['name']}
            size={13}
            className={changeColors[changeDirection]}
          />
          <span className={`text-xs font-semibold ${changeColors[changeDirection]}`}>{change}</span>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </div>

      {subMetric && (
        <p className={`text-xs font-medium mt-1.5 ${subMetricColor}`}>{subMetric}</p>
      )}
    </div>
  );
}