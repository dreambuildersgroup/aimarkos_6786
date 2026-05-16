'use client';

import React, { useState } from 'react';


import AppLogo from '@/components/ui/AppLogo';

import AuthBrandPanel from './AuthBrandPanel';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthContent() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Brand Panel */}
      <AuthBrandPanel />

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-12 xl:px-16 overflow-y-auto scrollbar-thin">
        <div className="w-full max-w-md">
          {/* Logo (mobile only) */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <AppLogo size={36} />
            <span className="font-bold text-lg gradient-text">AImarkOS</span>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl p-1 mb-8 glass-card">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'login' ?'bg-primary text-white shadow-glow-violet' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'signup' ?'bg-primary text-white shadow-glow-violet' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Forms */}
          {activeTab === 'login' ? (
            <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
          ) : (
            <SignUpForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
}