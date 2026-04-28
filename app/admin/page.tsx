'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';
import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.user.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }

      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-150 rotate-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full spiritual-card p-8 bg-white/90 backdrop-blur-sm border-[#E8E2D9] shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-[#E65100]/10 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-primary/10">
            <ShieldCheck className="h-8 w-8 text-[#E65100]" />
          </div>
          <h2 className="text-3xl font-black text-[#4E342E]">Trust Admin</h2>
          <p className="mt-2 text-[10px] text-[#8B7361] uppercase tracking-[0.2em] font-black">Authorized Personnel Only</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 rounded-r-xl mb-6">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-[#4E342E] uppercase tracking-wider mb-2">Admin Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7361]/50 group-focus-within:text-[#E65100] transition-colors" />
                <input
                  type="email"
                  required
                  className="spiritual-input !pl-12"
                  placeholder="admin@temple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#4E342E] uppercase tracking-wider mb-2">Security Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7361]/50 group-focus-within:text-[#E65100] transition-colors" />
                <input
                  type="password"
                  required
                  className="spiritual-input !pl-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="spiritual-button w-full h-14 text-base font-black uppercase tracking-widest shadow-2xl shadow-primary/20"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span className="flex items-center gap-2">
                Secure Login <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-[#8B7361] font-bold leading-relaxed px-4 opacity-60">
            UNAUTHORIZED ACCESS IS STRICTLY MONITORED. IP ADDRESSES AND LOGIN ATTEMPTS ARE LOGGED.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
