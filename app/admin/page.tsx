'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('chairman');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic
    if (password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      alert('Invalid Password');
    }
  };

  return (
    <div className="min-h-screen spiritual-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 text-center bg-[#4a3728] text-[#ff9933]">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-black">Trust Admin</h1>
          <p className="text-[#fffdf5]/60 text-sm mt-1 uppercase tracking-widest">Secure Access Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="p-10 space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-[#4a3728]">Select Role</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('chairman')}
                className={`p-4 rounded-xl border-2 transition-all font-bold ${role === 'chairman' ? 'border-[#ff9933] bg-[#ff9933]/5 text-[#ff9933]' : 'border-[#d4af37]/10 text-[#4a3728]/60'}`}
              >
                Chairman
              </button>
              <button
                type="button"
                onClick={() => setRole('collector')}
                className={`p-4 rounded-xl border-2 transition-all font-bold ${role === 'collector' ? 'border-[#ff9933] bg-[#ff9933]/5 text-[#ff9933]' : 'border-[#d4af37]/10 text-[#4a3728]/60'}`}
              >
                Collector
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#4a3728]">Access Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff9933] w-5 h-5" />
              <input
                type="password"
                placeholder="••••••••"
                className="spiritual-input pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="spiritual-button w-full h-14 text-lg">
            Login to Dashboard
          </button>

          <p className="text-center text-xs text-[#4a3728]/40 mt-4">
            Unauthorized access is strictly prohibited.<br />
            IP Address and Login attempts are being logged.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
