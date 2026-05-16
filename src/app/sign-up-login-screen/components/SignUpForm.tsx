'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  plan: string;
  terms: boolean;
}

const plans = [
  {
    id: 'plan-free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    features: ['2 AI Agents', '500 contacts', '1 sub-account', '1,000 emails/mo'],
    color: 'border-border',
    highlight: false,
  },
  {
    id: 'plan-starter',
    name: 'Starter',
    price: '$49',
    period: '/mo',
    features: ['5 AI Agents', '5,000 contacts', '3 sub-accounts', '25,000 emails/mo'],
    color: 'border-accent/40',
    highlight: false,
  },
  {
    id: 'plan-pro',
    name: 'Pro',
    price: '$149',
    period: '/mo',
    features: ['15 AI Agents', '50,000 contacts', '15 sub-accounts', '250,000 emails/mo'],
    color: 'border-primary/60',
    highlight: true,
  },
  {
    id: 'plan-agency',
    name: 'Agency',
    price: '$399',
    period: '/mo',
    features: ['Unlimited Agents', 'Unlimited contacts', 'Unlimited sub-accounts', 'White-label'],
    color: 'border-warning/40',
    highlight: false,
  },
];

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

export default function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('plan-pro');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ defaultValues: { plan: 'plan-pro', role: 'agency-owner' } });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    // Backend integration point: POST /api/auth/signup
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
    window.location.href = '/marketing-os-dashboard';
  };

  return (
    <div className="fade-in">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground">Start for free</h2>
        <p className="text-sm text-muted-foreground mt-1">Launch your autonomous marketing OS in minutes</p>
      </div>

      {/* Google Auth */}
      <button type="button" className="w-full btn-secondary mb-4 h-11">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Sign up with Google
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className={`input-field ${errors.name ? 'input-error' : ''}`}
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
            />
            {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Work Email</label>
            <input
              type="email"
              placeholder="you@agency.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 8 characters"
                className={`input-field pr-11 ${errors.password ? 'input-error' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                  pattern: { value: /(?=.*[A-Z])(?=.*[0-9])/, message: 'Include at least one uppercase letter and number' },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1.5">Your Role</label>
            <p className="text-xs text-muted-foreground mb-2">Helps us configure your workspace defaults</p>
            <select
              className="input-field"
              {...register('role', { required: true })}
            >
              <option value="agency-owner">Agency Owner</option>
              <option value="marketing-lead">Marketing Lead</option>
              <option value="freelancer">Freelancer</option>
              <option value="in-house-marketer">In-House Marketer</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>
        </div>

        {/* Plan Selector */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Choose Your Plan</label>
          <div className="grid grid-cols-2 gap-2">
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative text-left p-3 rounded-xl border transition-all duration-150 ${
                  selectedPlan === plan.id
                    ? `${plan.color} bg-primary/10`
                    : 'border-border bg-muted/20 hover:bg-muted/40'
                }`}
              >
                {plan.highlight && selectedPlan === plan.id && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 badge badge-violet text-xs px-1.5">Popular</span>
                )}
                <div className="flex items-baseline gap-0.5 mb-1.5">
                  <span className="text-sm font-bold text-foreground">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">{plan.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{plan.features[0]}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 mt-0.5 rounded border-border bg-input accent-primary"
            {...register('terms', { required: 'You must accept the terms' })}
          />
          <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
            I agree to the{' '}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </label>
        </div>
        {errors.terms && <p className="text-xs text-danger">{errors.terms.message}</p>}

        <button type="submit" disabled={isLoading} className="btn-primary w-full h-11 text-sm">
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
              Creating workspace…
            </>
          ) : (
            <>
              <Icon name="RocketLaunchIcon" size={16} />
              Launch My Marketing OS
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="text-primary hover:text-primary/80 font-semibold">
          Sign in
        </button>
      </p>
    </div>
  );
}