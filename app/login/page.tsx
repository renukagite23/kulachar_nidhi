'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slices/authSlice';
import { useLoginMutation } from '@/redux/api/authApiSlice';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login({ email, password }).unwrap();

      if (data.user.role === 'admin') {
        throw new Error('This portal is for devotees only. Please use the Admin Portal.');
      }

      dispatch(setCredentials({ user: data.user, token: data.token }));
      router.push('/');
    } catch (err: any) {
      setError(err?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9] px-4 py-12">
      <div className="max-w-md w-full spiritual-card p-8 space-y-8 bg-white border border-[#E8E2D9] shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#E65100]/10 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8 text-[#E65100]" />
          </div>
          <h2 className="text-3xl font-black text-[#4E342E]">Kulachar Nidhi</h2>
          <p className="mt-2 text-sm text-[#8B7361] uppercase tracking-widest font-bold">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3 rounded-r-xl">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
             <div>
               <label className="block text-xs font-black text-[#4E342E] uppercase tracking-wider mb-2">Email Address</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7361]/50" />
                 <input
                   type="email"
                   required
                   className="spiritual-input !pl-12"
                   placeholder="name@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </div>
             </div>
 
             <div>
               <label className="block text-xs font-black text-[#4E342E] uppercase tracking-wider mb-2">Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B7361]/50" />
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

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="spiritual-button w-full h-12 text-base"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-[#8B7361]">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[#E65100] hover:underline underline-offset-4">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
