'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  IndianRupee, Search, Filter, Download,
  Calendar, CreditCard, Tag, CheckCircle2, AlertCircle, Eye, Trash2, X
} from 'lucide-react';
import { format } from 'date-fns';

// Simple Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-[100] text-sm font-bold text-white transition-all transform translate-y-0 opacity-100 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X className="w-4 h-4" /></button>
    </div>
  );
};

export default function AdminDonationsPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State for search, filter and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/admin/donations', {
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

  // Handlers
  const handleView = (donation: any) => {
    setSelectedDonation(donation);
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/donations/${deleteConfirmId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setDonations(donations.filter(d => d._id !== deleteConfirmId));
        showToast('Donation deleted successfully', 'success');
        setDeleteConfirmId(null);
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to delete donation', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('An error occurred while deleting', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (filteredDonations.length === 0) {
      showToast('No data to export', 'error');
      return;
    }

    const headers = ['Receipt Number', 'Donor Name', 'Email/Phone', 'Amount', 'Status', 'Date', 'Purpose'];
    const csvRows = [headers.join(',')];

    filteredDonations.forEach(tx => {
      const row = [
        tx.receiptNumber || 'MT-GEN-001',
        `"${tx.donorName || ''}"`,
        `"${tx.email || tx.mobileNumber || ''}"`,
        tx.amount || 0,
        tx.paymentStatus || '',
        `"${format(new Date(tx.donationDate || tx.createdAt), 'dd MMM yyyy')}"`,
        `"${tx.reason || tx.purpose || 'General'}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donations_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export downloaded successfully', 'success');
  };

  // Filter and Search logic
  const filteredDonations = donations.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (tx.donorName?.toLowerCase() || '').includes(query) ||
      (tx.receiptNumber?.toLowerCase() || '').includes(query) ||
      (tx.reason?.toLowerCase() || '').includes(query) ||
      (tx.email?.toLowerCase() || '').includes(query);

    const matchesStatus = statusFilter === 'all' || tx.paymentStatus === statusFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const txDate = new Date(tx.donationDate || tx.createdAt);
      const now = new Date();
      if (dateFilter === 'today') {
        matchesDate = txDate.toDateString() === now.toDateString();
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        matchesDate = txDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        matchesDate = txDate >= monthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
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
    <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <IndianRupee className="w-4 h-4" /> Financial Ledger
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Charity Transactions</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-white border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-secondary hover:bg-muted/50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 mb-8 bg-white p-2 rounded-2xl border border-border shadow-sm items-center">
        <div className="relative flex-grow w-full lg:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by donor name, email, receipt number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 h-11 bg-transparent border-transparent text-sm focus:outline-none transition-all placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="hidden lg:block w-px h-8 bg-border"></div>

        <div className="flex flex-row w-full lg:w-auto items-center divide-x divide-border border-t lg:border-t-0 border-border lg:mt-0 mt-2">
          <div className="relative flex-1 lg:flex-none">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-4 pr-10 appearance-none bg-transparent border-transparent font-bold text-xs text-secondary focus:outline-none cursor-pointer hover:bg-muted/30 transition-all rounded-bl-xl lg:rounded-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative flex-1 lg:flex-none">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-10 pr-10 appearance-none bg-transparent border-transparent font-bold text-xs text-secondary focus:outline-none cursor-pointer hover:bg-muted/30 transition-all rounded-br-xl lg:rounded-r-xl"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="spiritual-card overflow-hidden bg-white border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Transaction Ref</th>
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Donor Detail</th>
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Source/Purpose</th>
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Amount</th>
                <th className="px-4 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {paginatedDonations.map((tx: any) => (
                <tr key={tx._id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="text-secondary font-bold text-sm uppercase tracking-tight">{tx.receiptNumber || 'MT-GEN-001'}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      <CreditCard className="w-3 h-3" /> ONLINE GATEWAY
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-bold text-secondary text-sm">{tx.donorName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{tx.email || tx.mobileNumber || 'No Contact Info'}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{format(new Date(tx.donationDate || tx.createdAt), 'dd MMM yyyy, HH:mm')}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary/60" />
                      <span className="text-sm font-medium text-secondary capitalize">{tx.reason || tx.purpose || 'General Foundation'}</span>
                    </div>
                    {tx.occasion && (
                      <div className="text-[10px] font-bold text-primary uppercase mt-1 tracking-widest">{tx.occasion}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${tx.paymentStatus === 'completed'
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
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-baseline gap-1 text-primary font-black text-lg">
                      <span className="text-sm">₹</span>
                      {tx.amount?.toLocaleString('en-IN') || 0}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleView(tx)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeleteConfirmId(tx._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Donation">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedDonations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
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

      {/* ✅ VIEW MODAL */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
              <h2 className="text-xl font-bold text-secondary">Donation Details</h2>
              <button
                onClick={() => setSelectedDonation(null)}
                className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="bg-primary/5 rounded-2xl p-5 text-center border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Total Amount</p>
                <div className="text-3xl font-black text-secondary flex items-baseline justify-center gap-1">
                  <span className="text-xl">₹</span>
                  {selectedDonation.amount?.toLocaleString('en-IN') || 0}
                </div>
                <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedDonation.paymentStatus === 'completed' ? 'bg-green-100 text-green-700' : selectedDonation.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {selectedDonation.paymentStatus}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Receipt Number</span>
                  <span className="font-bold text-secondary uppercase">{selectedDonation.receiptNumber || '-'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Donor Name</span>
                  <span className="font-bold text-secondary">{selectedDonation.donorName}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Contact</span>
                  <span className="font-bold text-secondary">{selectedDonation.email || selectedDonation.mobileNumber || '-'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Purpose</span>
                  <span className="font-bold text-secondary capitalize">{selectedDonation.reason || selectedDonation.purpose || '-'}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Date</span>
                  <span className="font-bold text-secondary">
                    {format(new Date(selectedDonation.donationDate || selectedDonation.createdAt), 'dd MMM yyyy, HH:mm')}
                  </span>
                </div>
                {selectedDonation.panNumber && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                    <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">PAN Number</span>
                    <span className="font-bold text-secondary uppercase">{selectedDonation.panNumber}</span>
                  </div>
                )}
                {selectedDonation.address && (
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0">
                    <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Address</span>
                    <span className="font-bold text-secondary text-right max-w-[200px] truncate" title={selectedDonation.address}>{selectedDonation.address}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-secondary mb-2">Delete Donation?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Are you sure you want to delete this donation record? This action cannot be undone and will permanently remove this transaction.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={actionLoading}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-secondary text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-red-600/20 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
