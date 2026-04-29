'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  LayoutDashboard, Users, IndianRupee, TrendingUp, 
  ArrowUpRight, Clock, ShieldCheck, Download
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <ShieldCheck className="w-4 h-4" /> Administrative Terminal
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Trust Overview</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border-2 border-border px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-secondary hover:bg-muted/50 transition-all flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export Logs
          </button>
          <button className="spiritual-button !px-6 !py-2.5 text-xs">
            Generate Quarterly Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="spiritual-card p-6 bg-white flex items-start justify-between border-gray-100 shadow-sm">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Devotees</p>
            <h3 className="text-3xl font-black text-secondary">{stats?.totalUsers || 0}</h3>
            <div className="mt-2 flex items-center gap-1 text-green-600 font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> +12% growth
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="spiritual-card p-6 bg-white flex items-start justify-between border-gray-100 shadow-sm">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Kulachar Collection</p>
            <div className="text-3xl font-black text-secondary flex items-baseline gap-1">
              <IndianRupee className="w-5 h-5 text-accent" />
              {stats?.totalDonationAmount?.toLocaleString() || 0}
            </div>
            <div className="mt-2 flex items-center gap-1 text-green-600 font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> Target reached
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-primary">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        <div className="spiritual-card p-6 bg-white flex items-start justify-between border-gray-100 shadow-sm">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Terminal Activity</p>
            <h3 className="text-3xl font-black text-secondary">Active</h3>
            <div className="mt-2 flex items-center gap-1 text-amber-600 font-bold text-[10px]">
              <Clock className="w-3 h-3" /> Updated just now
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-secondary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="spiritual-card overflow-hidden bg-white border-gray-100 shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-black text-secondary capitalize italic">Recent Charity Flow</h3>
            <button className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
              View Detailed Ledger <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Donor Detail</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {stats?.recentTransactions?.map((tx: any) => (
                  <tr key={tx._id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-secondary text-sm">{tx.donorName}</div>
                      <div className="text-[9px] text-muted-foreground font-medium uppercase">{tx.receiptNumber || 'MT-GEN'}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">
                      {format(new Date(tx.donationDate), 'dd MMM, HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-primary text-sm flex items-center justify-end gap-0.5">
                        <IndianRupee className="w-3 h-3" />
                        {tx.amount.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Summary */}
        <div className="space-y-6">
          <div className="spiritual-card p-10 bg-secondary text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
              <ShieldCheck className="w-64 h-64 -translate-y-12 translate-x-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tighter italic">Administrative Gateway</h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed max-w-sm">
                Secure access for managing the trust's spiritual and financial integrity. All activities are recorded for transparency.
              </p>
              <div className="flex items-center gap-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex-grow">
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Access Level</p>
                  <p className="font-black text-accent text-lg">SUPER_ADMIN</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex-grow">
                  <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Pending Audits</p>
                  <p className="font-black text-accent text-lg">00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button className="spiritual-card p-8 flex flex-col items-center gap-4 bg-white border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-primary">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Registered Devotees</span>
            </button>
            <button className="spiritual-card p-8 flex flex-col items-center gap-4 bg-white border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <IndianRupee className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Donation Streams</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
