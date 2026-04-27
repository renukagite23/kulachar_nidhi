'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('chairman');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      alert('Invalid Password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-150 rotate-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-secondary tracking-tight">Trust Admin</h1>
          <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-2">Secure Access Gateway</p>
        </div>

        <div className="spiritual-card p-8 bg-white/80 backdrop-blur-sm border-border shadow-2xl shadow-secondary/10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-secondary/60 uppercase tracking-wider">Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('chairman')}
                  className={`p-3 rounded-xl border text-sm font-bold transition-all ${role === 'chairman'
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-border text-secondary/40 hover:border-primary/20'
                    }`}
                >
                  <UserCheck className="w-4 h-4 mx-auto mb-1" />
                  Chairman
                </button>
                <button
                  type="button"
                  onClick={() => setRole('collector')}
                  className={`p-3 rounded-xl border text-sm font-bold transition-all ${role === 'collector'
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-border text-secondary/40 hover:border-primary/20'
                    }`}
                >
                  <UserCheck className="w-4 h-4 mx-auto mb-1" />
                  Collector
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-secondary/60 uppercase tracking-wider">Access Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="spiritual-input pl-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="spiritual-button w-full h-12 text-sm shadow-lg shadow-primary/20">
              Enter Dashboard <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                Unauthorized access is strictly prohibited. <br />
                Login attempts and IP addresses are recorded.
              </p>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-[11px] font-bold text-secondary/30 uppercase tracking-[0.2em]">
          Powered by Paarsh Projects
        </p>
      </motion.div>
    </div>
  );
}
