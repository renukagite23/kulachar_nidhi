'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  IndianRupee, Search, Filter, Download,
  Calendar, CreditCard, Tag, ArrowUpRight
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDonationsPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/admin/donations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setDonations(data);
        }
      } catch (err) {
        console.error('Failed to fetch donations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
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
            <IndianRupee className="w-4 h-4" /> Financial Ledger
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Charity Transactions</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border-2 border-border px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-secondary hover:bg-muted/50 transition-all flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export Ledger
          </button>
          <button className="spiritual-button !px-6 !py-2.5 text-xs">
            Generate Statement
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search by donor, receipt, or reason..."
            className="w-full pl-12 pr-4 h-12 bg-white border-2 border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-4">
          <button className="h-12 px-6 flex items-center gap-2 bg-white border-2 border-border rounded-xl font-bold text-xs text-secondary hover:bg-muted/50 transition-all shadow-sm">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
          <button className="h-12 w-12 flex items-center justify-center bg-white border-2 border-border rounded-xl hover:bg-muted/50 transition-all shadow-sm">
            <Filter className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>

      <div className="spiritual-card overflow-hidden bg-white border-gray-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Transaction Ref</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Donor Detail</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Source/Reason</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {donations.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="text-secondary font-black text-sm tracking-tighter uppercase">{tx.receiptNumber || 'MT-GEN-001'}</div>
                    <div className="flex items-center gap-1.5 mt-1 text-[9px] text-muted-foreground font-black uppercase">
                      <CreditCard className="w-2.5 h-2.5" /> ONLINE GATEWAY
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-secondary text-base leading-tight">{tx.donorName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{format(new Date(tx.donationDate), 'dd MMM yyyy, HH:mm')}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary/40" />
                      <span className="text-xs font-bold text-secondary">{tx.reason || 'General Foundation'}</span>
                    </div>
                    {tx.occasion && (
                      <div className="text-[9px] font-black text-primary uppercase mt-1 tracking-widest">{tx.occasion}</div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      tx.paymentStatus === 'completed' 
                        ? 'bg-green-50 text-green-700 border border-green-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${tx.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {tx.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="inline-flex items-center gap-1 text-primary font-black text-lg">
                      <IndianRupee className="w-4 h-4" />
                      {tx.amount.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
              {donations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                      <IndianRupee className="w-10 h-10" />
                    </div>
                    <p className="font-black text-secondary uppercase tracking-widest text-xs">No transactions recorded yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
