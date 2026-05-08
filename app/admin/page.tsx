'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { ShieldCheck, Mail, Lock, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { setAdminCredentials } from '@/redux/slices/adminAuthSlice';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.user.role !== 'admin' && data.user.role !== 'president') {
        throw new Error('Access denied. Admin privileges required.');
      }

      dispatch(setAdminCredentials({ admin: data.user, token: data.token }));
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-orange-50 to-orange-100 px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none grayscale">
        <img src="/devi.png" alt="Pattern" className="w-full h-full object-cover scale-150 rotate-12" />
      </div>

      {/* Decorative Blur Shapes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md w-full bg-white rounded-[2rem] border border-orange-100 shadow-[0_20px_60px_-15px_rgba(230,81,0,0.15)] z-10 overflow-hidden"
      >
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-5 shadow-inner border border-orange-200/50">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-secondary tracking-tight">Trust Admin</h2>
            <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Secure Personnel Gateway</p>
          </div>

<<<<<<< Updated upstream
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border border-red-100 p-4 flex items-start gap-3 rounded-xl mb-6"
            >
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2 ml-1">Administrator Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full h-14 bg-gray-50/50 border border-gray-200 text-secondary text-sm rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 block pl-12 pr-4 transition-all"
                    placeholder="admin@templetrust.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-secondary uppercase tracking-widest mb-2 ml-1">Security Credential</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full h-14 bg-gray-50/50 border border-gray-200 text-secondary text-sm rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 block pl-12 pr-12 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-secondary hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
=======
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
>>>>>>> Stashed changes
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white rounded-xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

<<<<<<< Updated upstream
        {/* <div className="bg-gray-50 border-t border-gray-100 p-6 text-center">
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed max-w-[250px] mx-auto uppercase tracking-wider">
            Protected by advanced encryption. IP & Access logs are monitored.
          </p>
        </div> */}
=======
        <p className="text-center mt-8 text-[11px] font-bold text-secondary/30 uppercase tracking-[0.2em]">
          Powered by Paarsh Infotech pvt ltd
        </p>
>>>>>>> Stashed changes
      </motion.div>
    </div>
  );
}
