'use client';

import { useState } from 'react';
import { 
  Users, Search, Plus, Mail, Phone, Calendar, 
  Trash2, Edit, CheckCircle2, AlertCircle, 
  Loader2, Link as LinkIcon, Copy, Check, Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  useGetCollectorsQuery, 
  useCreateCollectorMutation, 
  useUpdateCollectorMutation, 
  useDeleteCollectorMutation 
} from '@/redux/api/collectorApiSlice';
import CollectorModal from '@/components/admin/CollectorModal';
import CollectorViewModal from '@/components/admin/CollectorViewModal';

// Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-[100] text-sm font-bold text-white animate-in slide-in-from-bottom-5 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
      <button onClick={onClose} className="ml-2 hover:opacity-70">✕</button>
    </div>
  );
};

export default function AdminCollectorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingCollectorId, setViewingCollectorId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useGetCollectorsQuery({ 
    search: searchQuery, 
    page, 
    limit: 10 
  });
  
  const [createCollector, { isLoading: isCreating }] = useCreateCollectorMutation();
  const [updateCollector, { isLoading: isUpdating }] = useUpdateCollectorMutation();
  const [deleteCollector, { isLoading: isDeleting }] = useDeleteCollectorMutation();

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAddModal = () => {
    setSelectedCollector(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (collector: any) => {
    setSelectedCollector(collector);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (id: string) => {
    setViewingCollectorId(id);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedCollector) {
        await updateCollector({ id: selectedCollector._id, ...formData }).unwrap();
        showToast('Collector updated successfully', 'success');
      } else {
        await createCollector(formData).unwrap();
        showToast('Collector created successfully', 'success');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showToast(err.data?.message || 'Something went wrong', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteCollector(deleteConfirmId).unwrap();
      showToast('Collector deleted successfully', 'success');
      setDeleteConfirmId(null);
    } catch (err: any) {
      showToast(err.data?.message || 'Failed to delete collector', 'error');
    }
  };

  const handleCopyLink = (code: string, id: string) => {
    const link = `${window.location.origin}/register?ref=${code}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto relative min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <Users className="w-4 h-4" /> Agent Management
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">
            Collectors
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 h-12 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>

          <button 
            onClick={handleOpenAddModal}
            className="h-12 px-6 flex items-center justify-center gap-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold text-sm"
          >
            <Plus className="w-4 h-4" /> Add Collector
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="spiritual-card overflow-hidden bg-white border-border shadow-sm rounded-3xl border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Collector</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">Referrals</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Referral Link</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Total Raised</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="font-bold text-secondary">Loading collectors...</p>
                  </td>
                </tr>
              ) : data?.collectors.map((collector: any) => (
                <tr key={collector._id} className="hover:bg-muted/20 transition-colors group">
                  {/* PROFILE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {collector.name ? collector.name[0].toUpperCase() : 'C'}
                      </div>
                      <div>
                        <div className="font-bold text-secondary text-sm">
                          {collector.name}
                        </div>
                        <div className="flex flex-col mt-0.5 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {collector.email}</span>
                          <span className="flex items-center gap-1 mt-0.5 text-primary font-mono font-bold">{collector.referralCode}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* REFERRALS COUNT */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-secondary">
                        {collector.referralCount || 0}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">Users</span>
                    </div>
                  </td>

                  {/* REFERRAL LINK */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <div className="flex-grow truncate text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border">
                        {`${typeof window !== 'undefined' ? window.location.origin : ''}/register?ref=${collector.referralCode}`}
                      </div>
                      <button
                        onClick={() => handleCopyLink(collector.referralCode, collector._id)}
                        className={`shrink-0 p-1.5 rounded-lg transition-all ${copiedId === collector._id ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                        title="Copy Link"
                      >
                        {copiedId === collector._id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>

                  {/* TOTAL RAISED */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black text-primary">
                        ₹{(collector.totalReferralDonations || 0).toLocaleString()}
                      </span>
                      <span className="text-[9px] text-muted-foreground uppercase tracking-tighter">Donations</span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${collector.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {collector.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-xs font-medium text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {format(new Date(collector.createdAt), 'dd MMM yyyy')}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenViewModal(collector._id)}
                        className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => handleOpenEditModal(collector)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="Edit Collector"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button 
                        onClick={() => setDeleteConfirmId(collector._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete Collector"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && data?.collectors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-secondary text-sm">No collectors found</p>
                    <p className="text-xs text-muted-foreground mt-1">Add your first collector to start tracking referrals</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/10">
            <p className="text-xs text-muted-foreground font-medium">
              Page <span className="font-bold text-secondary">{page}</span> of <span className="font-bold text-secondary">{data.pagination.totalPages}</span>
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1 || isFetching}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                className="px-3 py-1.5 text-xs font-bold bg-white border border-border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors flex items-center gap-1"
              >
                Previous
              </button>
              <button
                disabled={page === data.pagination.totalPages || isFetching}
                onClick={() => setPage(prev => Math.min(data.pagination.totalPages, prev + 1))}
                className="px-3 py-1.5 text-xs font-bold bg-white border border-border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors flex items-center gap-1"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      <CollectorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        collector={selectedCollector}
        loading={isCreating || isUpdating}
      />

      <CollectorViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        collectorId={viewingCollectorId}
      />

      {/* DELETE CONFIRMATION */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-secondary mb-2">Delete Collector?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Are you sure you want to delete this collector? This will permanently remove their access and referral records.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="flex-1 border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-secondary text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-red-600/20 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
