'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface DemoCredential {
  role: string;
  email: string;
  password: string;
}

const demoCredentials: DemoCredential[] = [
  { role: 'Agency Owner', email: 'agency@aimarkos.com', password: 'Agency2026!' },
  { role: 'Marketing Lead', email: 'marketer@aimarkos.com', password: 'Marketer2026!' },
  { role: 'Sub-Account', email: 'client@aimarkos.com', password: 'Client2026!' },
];

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({ defaultValues: { remember: false } });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    // Backend integration point: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 1200));
    const isValid = demoCredentials.some(
      (c) => c.email === data.email && c.password === data.password
    );
    if (isValid) {
      window.location.href = '/marketing-os-dashboard';
    } else {
      setLoginError('Invalid credentials — use the demo accounts below to sign in');
    }
    setIsLoading(false);
  };

  const autofill = (cred: DemoCredential) => {
    setValue('email', cred.email);
    setValue('password', cred.password);
    setLoginError(null);
  };

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your AImarkOS workspace</p>
      </div>

      {/* Google Auth */}
      <button
        type="button"
        className="w-full btn-secondary mb-5 h-11"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">or sign in with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {loginError && (
        <div className="mb-4 flex items-start gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20">
          <Icon name="ExclamationCircleIcon" size={16} className="text-danger mt-0.5 flex-shrink-0" />
          <p className="text-xs text-danger font-medium">{loginError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1.5">Email Address</label>
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-semibold text-foreground">Password</label>
            <button type="button" className="text-xs text-primary hover:text-primary/80 font-medium">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••"
              className={`input-field pr-11 ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-border bg-input accent-primary"
            {...register('remember')}
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Remember me for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full h-11 text-sm"
        >
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
              Authenticating…
            </>
          ) : (
            <>
              <Icon name="ArrowRightIcon" size={16} />
              Sign In to AImarkOS
            </>
          )}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="KeyIcon" size={14} className="text-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Demo Accounts</span>
        </div>
        <div className="space-y-1.5">
          {demoCredentials.map((cred, idx) => (
            <div key={`demo-cred-${idx}`} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-foreground">{cred.role}</span>
                <p className="text-xs text-muted-foreground font-mono truncate">{cred.email}</p>
              </div>
              <button
                type="button"
                onClick={() => autofill(cred)}
                className="btn-ghost text-xs px-2 py-1 text-accent hover:text-accent/80 flex-shrink-0"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-5">
        No account?{' '}
        <button onClick={onSwitchToSignup} className="text-primary hover:text-primary/80 font-semibold">
          Create one free
        </button>
      </p>
    </div>
  );
}