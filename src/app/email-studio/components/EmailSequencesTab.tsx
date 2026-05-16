'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SequenceStep {
  id: string;
  stepNum: number;
  type: 'email' | 'wait' | 'condition' | 'action';
  label: string;
  detail: string;
  metrics?: { sent: number; opened: number; clicked: number };
}

interface EmailSequence {
  id: string;
  name: string;
  trigger: string;
  status: 'Active' | 'Paused' | 'Draft';
  contacts: number;
  completed: number;
  conversionRate: number;
  steps: SequenceStep[];
}

const sequences: EmailSequence[] = [
  {
    id: 'seq-001',
    name: 'New Lead Nurture — Free Trial',
    trigger: 'Signup: Free Plan',
    status: 'Active',
    contacts: 1847,
    completed: 624,
    conversionRate: 33.8,
    steps: [
      { id: 'step-001-1', stepNum: 1, type: 'email', label: 'Welcome Email', detail: 'Subject: Your AImarkOS workspace is ready 🚀', metrics: { sent: 1847, opened: 1402, clicked: 891 } },
      { id: 'step-001-2', stepNum: 2, type: 'wait', label: 'Wait 2 Days', detail: 'Delay: 48 hours' },
      { id: 'step-001-3', stepNum: 3, type: 'email', label: 'Feature Highlight: AI Agents', detail: 'Subject: Meet your AI marketing crew', metrics: { sent: 1804, opened: 1024, clicked: 412 } },
      { id: 'step-001-4', stepNum: 4, type: 'condition', label: 'Opened Email?', detail: 'Branch: Yes → Step 5 / No → Step 6' },
      { id: 'step-001-5', stepNum: 5, type: 'email', label: 'Case Study Send', detail: 'Subject: How agencies 4x ROAS with AI agents', metrics: { sent: 1024, opened: 714, clicked: 298 } },
      { id: 'step-001-6', stepNum: 6, type: 'email', label: 'Re-engagement Nudge', detail: 'Subject: Still exploring? Here\'s a quick win', metrics: { sent: 780, opened: 241, clicked: 88 } },
      { id: 'step-001-7', stepNum: 7, type: 'wait', label: 'Wait 3 Days', detail: 'Delay: 72 hours' },
      { id: 'step-001-8', stepNum: 8, type: 'email', label: 'Upgrade Offer', detail: 'Subject: Unlock unlimited agents — 20% off first month', metrics: { sent: 1804, opened: 891, clicked: 624 } },
      { id: 'step-001-9', stepNum: 9, type: 'action', label: 'Tag: Upgrade Offer Sent', detail: 'Add tag to contact profile' },
    ],
  },
  {
    id: 'seq-002',
    name: 'Agency Onboarding — 7-Day Setup',
    trigger: 'Plan Upgrade: Agency',
    status: 'Active',
    contacts: 204,
    completed: 88,
    conversionRate: 43.1,
    steps: [
      { id: 'step-002-1', stepNum: 1, type: 'email', label: 'Agency Welcome + Setup Guide', detail: 'Subject: Your white-label setup checklist is inside', metrics: { sent: 204, opened: 198, clicked: 181 } },
      { id: 'step-002-2', stepNum: 2, type: 'wait', label: 'Wait 1 Day', detail: 'Delay: 24 hours' },
      { id: 'step-002-3', stepNum: 3, type: 'email', label: 'Sub-Account Creation Tutorial', detail: 'Subject: Add your first client in 3 minutes', metrics: { sent: 204, opened: 187, clicked: 142 } },
      { id: 'step-002-4', stepNum: 4, type: 'action', label: 'Assign Onboarding Agent', detail: 'Trigger: AI Executor — agency-onboard-v2' },
      { id: 'step-002-5', stepNum: 5, type: 'email', label: 'White-Label Branding Guide', detail: 'Subject: Make it yours — branding your agency OS', metrics: { sent: 204, opened: 164, clicked: 121 } },
    ],
  },
  {
    id: 'seq-003',
    name: 'Abandoned Cart — E-commerce',
    trigger: 'Cart Abandoned > 1hr',
    status: 'Paused',
    contacts: 892,
    completed: 201,
    conversionRate: 22.5,
    steps: [
      { id: 'step-003-1', stepNum: 1, type: 'email', label: 'Cart Reminder', detail: 'Subject: You left something behind…', metrics: { sent: 892, opened: 502, clicked: 241 } },
      { id: 'step-003-2', stepNum: 2, type: 'wait', label: 'Wait 24 Hours', detail: 'Delay: 24 hours' },
      { id: 'step-003-3', stepNum: 3, type: 'condition', label: 'Purchased?', detail: 'Branch: Yes → End / No → Step 4' },
      { id: 'step-003-4', stepNum: 4, type: 'email', label: 'Discount Offer', detail: 'Subject: Still thinking? Here\'s 15% off your cart', metrics: { sent: 651, opened: 381, clicked: 201 } },
    ],
  },
];

const stepTypeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  email: { icon: 'EnvelopeIcon', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
  wait: { icon: 'ClockIcon', color: 'text-muted-foreground', bg: 'bg-muted/20 border-border' },
  condition: { icon: 'ArrowsRightLeftIcon', color: 'text-accent', bg: 'bg-accent/10 border-accent/20' },
  action: { icon: 'BoltIcon', color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
};

export default function EmailSequencesTab() {
  const [selectedSeq, setSelectedSeq] = useState('seq-001');
  const activeSeq = sequences.find((s) => s.id === selectedSeq) ?? sequences[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
      {/* Sequence List */}
      <div className="xl:col-span-1 space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Sequences</h3>
          <button className="btn-primary text-xs h-8 px-3">
            <Icon name="PlusIcon" size={13} />
            New
          </button>
        </div>
        {sequences.map((seq) => (
          <button
            key={seq.id}
            onClick={() => setSelectedSeq(seq.id)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-150 ${
              selectedSeq === seq.id
                ? 'bg-primary/10 border-primary/30' :'glass-card border-border hover:bg-muted/20'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold text-foreground truncate pr-2">{seq.name}</span>
              <span className={`badge flex-shrink-0 ${
                seq.status === 'Active' ? 'badge-success' :
                seq.status === 'Paused' ? 'badge-warning' : 'badge-neutral'
              }`}>{seq.status}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">Trigger: {seq.trigger}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-foreground font-semibold tabular-nums">{seq.contacts.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">contacts</span>
              <span className="text-xs text-success font-semibold">{seq.conversionRate}% conv</span>
            </div>
          </button>
        ))}
      </div>

      {/* Sequence Builder / Viewer */}
      <div className="xl:col-span-3 glass-card rounded-xl border border-border overflow-hidden">
        {/* Sequence Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-foreground">{activeSeq.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">Trigger: <span className="text-foreground font-medium">{activeSeq.trigger}</span></span>
              <span className="text-xs text-muted-foreground">{activeSeq.steps.length} steps</span>
              <span className={`badge ${activeSeq.status === 'Active' ? 'badge-success' : activeSeq.status === 'Paused' ? 'badge-warning' : 'badge-neutral'}`}>{activeSeq.status}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right mr-3">
              <p className="text-xs text-muted-foreground">Conversion Rate</p>
              <p className="text-xl font-bold tabular-nums text-success">{activeSeq.conversionRate}%</p>
            </div>
            <button className="btn-secondary text-xs h-9">
              <Icon name="PencilSquareIcon" size={14} />
              Edit
            </button>
            <button className={`text-xs h-9 ${activeSeq.status === 'Active' ? 'btn-secondary' : 'btn-primary'}`}>
              <Icon name={activeSeq.status === 'Active' ? 'PauseIcon' : 'PlayIcon'} size={14} />
              {activeSeq.status === 'Active' ? 'Pause' : 'Activate'}
            </button>
          </div>
        </div>

        {/* Steps Visual Builder */}
        <div className="p-5 overflow-y-auto max-h-[520px] scrollbar-thin">
          <div className="flex flex-col items-center">
            {/* Trigger Node */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 border border-accent/30 mb-2 w-full max-w-lg">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon name="BoltIcon" size={16} className="text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Trigger</p>
                <p className="text-sm font-semibold text-foreground">{activeSeq.trigger}</p>
              </div>
            </div>

            {/* Connector line */}
            <div className="w-px h-6 bg-gradient-to-b from-accent/40 to-primary/40" />

            {/* Steps */}
            {activeSeq.steps.map((step, idx) => {
              const sc = stepTypeConfig[step.type];
              const isLast = idx === activeSeq.steps.length - 1;
              return (
                <div key={step.id} className="flex flex-col items-center w-full max-w-lg">
                  <div className={`w-full flex items-start gap-3 p-4 rounded-xl border ${sc.bg} group hover:opacity-90 transition-opacity cursor-pointer`}>
                    {/* Step number */}
                    <div className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold tabular-nums text-muted-foreground">{step.stepNum}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${sc.bg}`}>
                      <Icon name={sc.icon as Parameters<typeof Icon>[0]['name']} size={16} className={sc.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>
                      {step.metrics && (
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Icon name="PaperAirplaneIcon" size={11} className="text-muted-foreground" />
                            <span className="text-xs tabular-nums text-muted-foreground">{step.metrics.sent.toLocaleString()} sent</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="EyeIcon" size={11} className="text-accent" />
                            <span className="text-xs tabular-nums text-accent font-semibold">
                              {((step.metrics.opened / step.metrics.sent) * 100).toFixed(0)}% open
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="CursorArrowRaysIcon" size={11} className="text-success" />
                            <span className="text-xs tabular-nums text-success font-semibold">
                              {((step.metrics.clicked / step.metrics.opened) * 100).toFixed(0)}% CTR
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button className="btn-ghost p-1" title="Edit step">
                        <Icon name="PencilSquareIcon" size={13} />
                      </button>
                      <button className="btn-ghost p-1" title="Delete step">
                        <Icon name="TrashIcon" size={13} className="text-danger/60" />
                      </button>
                    </div>
                  </div>

                  {/* Connector */}
                  {!isLast && (
                    <div className="flex flex-col items-center my-1">
                      <div className="w-px h-5 bg-gradient-to-b from-primary/40 to-primary/20" />
                      <button className="w-6 h-6 rounded-full border border-dashed border-primary/30 flex items-center justify-center hover:bg-primary/10 transition-colors" title="Add step here">
                        <Icon name="PlusIcon" size={12} className="text-primary/60" />
                      </button>
                      <div className="w-px h-5 bg-gradient-to-b from-primary/20 to-primary/10" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Step Button */}
            <div className="w-px h-5 bg-border mt-1" />
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-primary/40 text-primary/70 hover:text-primary hover:bg-primary/5 hover:border-primary/60 transition-all text-sm font-semibold mt-1">
              <Icon name="PlusIcon" size={16} />
              Add Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}