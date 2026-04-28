'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  LayoutDashboard, Users, IndianRupee, TrendingUp, 
  ArrowUpRight, Clock, ShieldCheck, Download
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
      return;
    }

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
  }, [isAuthenticated, user, router, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
              <ShieldCheck className="w-4 h-4" /> Administrative Terminal
            </div>
            <h1 className="text-4xl font-black text-secondary tracking-tight">Trust Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <button className="spiritual-button-outline !px-4 !py-2.5 text-xs">
              <Download className="w-4 h-4" /> Export Data
            </button>
            <button className="spiritual-button !px-6 !py-2.5 text-xs">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="spiritual-card p-6 bg-white flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Registered Users</p>
              <h3 className="text-3xl font-black text-secondary">{stats?.totalUsers || 0}</h3>
              <div className="mt-2 flex items-center gap-1 text-green-600 font-bold text-[10px]">
                <TrendingUp className="w-3 h-3" /> +12% from last month
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          <div className="spiritual-card p-6 bg-white flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Collection</p>
              <div className="text-3xl font-black text-secondary flex items-baseline gap-1">
                <IndianRupee className="w-5 h-5 text-accent" />
                {stats?.totalDonationAmount?.toLocaleString() || 0}
              </div>
              <div className="mt-2 flex items-center gap-1 text-green-600 font-bold text-[10px]">
                <TrendingUp className="w-3 h-3" /> +18% from last month
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="spiritual-card p-6 bg-white flex items-start justify-between">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Active Sessions</p>
              <h3 className="text-3xl font-black text-secondary">24</h3>
              <div className="mt-2 flex items-center gap-1 text-amber-600 font-bold text-[10px]">
                <Clock className="w-3 h-3" /> Peak hours detected
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="spiritual-card overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-black text-secondary capitalize">Recent Spiritual Charity</h3>
              <button className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
                View All <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Devotee</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentTransactions?.map((tx: any) => (
                    <tr key={tx._id}>
                      <td className="font-bold text-secondary">{tx.donorName}</td>
                      <td className="text-muted-foreground">{format(new Date(tx.donationDate), 'dd MMM')}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase ${
                           tx.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tx.paymentStatus}
                        </span>
                      </td>
                      <td className="text-right font-black text-secondary">₹{tx.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="spiritual-card p-8 bg-secondary text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 tracking-tight">Financial Overview</h3>
                <p className="text-white/60 text-sm mb-6 max-w-sm">
                  Review and analyze the trust's financial health, manage donor records, and generate compliance reports.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1 text-center">Last Receipt</p>
                    <p className="text-center font-bold text-accent">#MT-8942</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1 text-center">Active Donors</p>
                    <p className="text-center font-bold text-accent">1,204</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button className="spiritual-card p-6 flex flex-col items-center gap-3 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-black text-secondary uppercase tracking-wider">Manage Users</span>
              </button>
              <button className="spiritual-card p-6 flex flex-col items-center gap-3 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-xs font-black text-secondary uppercase tracking-wider">Backup Data</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
