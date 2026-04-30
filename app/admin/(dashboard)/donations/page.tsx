'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  IndianRupee, Search, Filter, Download,
  Calendar, CreditCard, Tag, CheckCircle2, AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDonationsPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State for search, filter and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/admin/donations', { // Assuming /api/admin/donations exists, if not, use /api/donations
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fallback if /api/admin/donations doesn't exist but /api/donations does
        if (res.status === 404) {
          const fallbackRes = await fetch('/api/donations', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const fallbackData = await fallbackRes.json();
          if (fallbackRes.ok) setDonations(fallbackData.data || fallbackData);
          return;
        }

        const data = await res.json();
        if (res.ok) {
          setDonations(data.data || data); // Handle both wrapped and unwrapped array responses
        }
      } catch (err) {
        console.error('Failed to fetch donations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [token]);

  // Filter and Search logic
  const filteredDonations = donations.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (tx.donorName?.toLowerCase() || '').includes(query) ||
      (tx.receiptNumber?.toLowerCase() || '').includes(query) ||
      (tx.reason?.toLowerCase() || '').includes(query) ||
      (tx.email?.toLowerCase() || '').includes(query);

    const matchesStatus = statusFilter === 'all' || tx.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <IndianRupee className="w-4 h-4" /> Financial Ledger
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Charity Transactions</h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-secondary hover:bg-muted/50 transition-all flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by donor name, email, receipt number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 h-11 bg-muted/20 border border-transparent rounded-xl text-sm focus:bg-white focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-4">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 pl-4 pr-10 appearance-none bg-muted/20 border border-transparent rounded-xl font-bold text-xs text-secondary hover:bg-muted/50 focus:bg-white focus:outline-none focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all min-w-[140px]"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
          <button className="h-11 px-4 flex items-center gap-2 bg-muted/20 border border-transparent rounded-xl font-bold text-xs text-secondary hover:bg-muted/50 transition-all min-w-max">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
        </div>
      </div>

      <div className="spiritual-card overflow-hidden bg-white border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Transaction Ref</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Donor Detail</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Source/Purpose</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedDonations.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-secondary font-bold text-sm uppercase tracking-tight">{tx.receiptNumber || 'MT-GEN-001'}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      <CreditCard className="w-3 h-3" /> ONLINE GATEWAY
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-secondary text-sm">{tx.donorName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{tx.email || tx.mobileNumber || 'No Contact Info'}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{format(new Date(tx.donationDate), 'dd MMM yyyy, HH:mm')}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary/60" />
                      <span className="text-sm font-medium text-secondary capitalize">{tx.reason || tx.purpose || 'General Foundation'}</span>
                    </div>
                    {tx.occasion && (
                      <div className="text-[10px] font-bold text-primary uppercase mt-1 tracking-widest">{tx.occasion}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${tx.paymentStatus === 'completed'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : tx.paymentStatus === 'failed'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                      {tx.paymentStatus === 'completed' ? <CheckCircle2 className="w-3 h-3" /> :
                        tx.paymentStatus === 'failed' ? <AlertCircle className="w-3 h-3" /> :
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                      {tx.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-baseline gap-1 text-primary font-black text-lg">
                      <span className="text-sm">₹</span>
                      {tx.amount?.toLocaleString('en-IN') || 0}
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedDonations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
                      <IndianRupee className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-secondary text-sm">No transactions found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search query</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/10">
            <p className="text-xs text-muted-foreground font-medium">
              Showing <span className="font-bold text-secondary">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-secondary">{Math.min(currentPage * itemsPerPage, filteredDonations.length)}</span> of <span className="font-bold text-secondary">{filteredDonations.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 text-xs font-bold bg-white border border-border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-3 py-1.5 text-xs font-bold bg-white border border-border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
