'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Users, Search, Filter,
  Mail, Calendar, MapPin, UserCheck, Trash2, Edit, Eye, X, CheckCircle2, AlertCircle
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

export default function AdminUsersPage() {
  const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal & Action States
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', role: '', isActive: true });
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Handlers
  const handleView = (user: any) => {
    setSelectedUser(user);
    setIsEditing(false);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      role: user.role || 'user',
      isActive: user.isActive !== false,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
        showToast('User updated successfully', 'success');
        setSelectedUser(null);
        setIsEditing(false);
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to update user', 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      showToast('An error occurred while updating', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteConfirmId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter(u => u._id !== deleteConfirmId));
        showToast('Deleted successfully', 'success');
        setDeleteConfirmId(null);
      } else {
        const data = await res.json();
        showToast(data.message || 'Failed to delete user', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showToast('An error occurred while deleting', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.phone?.includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
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

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <UserCheck className="w-4 h-4" /> Devotee Management
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">
            Registered Users
          </h1>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 h-12 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>

          <button className="h-12 w-12 flex items-center justify-center bg-white border border-border rounded-xl hover:bg-muted/50 transition-all shadow-sm">
            <Filter className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="spiritual-card overflow-hidden bg-white border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">User Profile</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Registered On</th>
                <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/50">
              {paginatedUsers.map((user_obj: any) => (
                <tr key={user_obj._id} className="hover:bg-muted/20 transition-colors">
                  {/* PROFILE */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user_obj.name ? user_obj.name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-bold text-secondary text-sm">
                          {user_obj.name || 'Unknown'}
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase">
                          {user_obj.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-6 py-4 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      {user_obj.email}
                    </div>
                    {user_obj.phone && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        {user_obj.phone}
                      </div>
                    )}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${user_obj.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user_obj.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-sm font-medium text-secondary">
                    {format(new Date(user_obj.createdAt), 'dd MMM yyyy')}
                  </td>

                  {/* ACTIONS (ALWAYS VISIBLE) */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleView(user_obj)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>

                      <button onClick={() => handleEditClick(user_obj)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit User">
                        <Edit className="w-4 h-4" />
                      </button>

                      <button onClick={() => setDeleteConfirmId(user_obj._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="font-bold text-secondary text-sm">No users found</p>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your search criteria</p>
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
              Showing <span className="font-bold text-secondary">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-secondary">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-bold text-secondary">{filteredUsers.length}</span> results
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

      {/* ✅ VIEW/EDIT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
              <h2 className="text-xl font-bold text-secondary">
                {isEditing ? 'Edit Devotee Profile' : 'Devotee Profile'}
              </h2>
              <button
                onClick={() => { setSelectedUser(null); setIsEditing(false); }}
                className="text-gray-400 hover:text-gray-600 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {!isEditing ? (
                <>
                  {/* VIEW MODE */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-xl font-bold text-orange-600 shrink-0">
                      {selectedUser.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary">
                        {selectedUser.name || 'Unknown'}
                      </h3>
                      <span className="inline-block mt-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                        {selectedUser.role || 'User'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                      <p className={`font-bold text-sm ${selectedUser.isActive !== false ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedUser.isActive !== false ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Donations</p>
                      <p className="font-bold text-sm text-secondary">
                        ₹ {(selectedUser.totalDonations || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3 text-sm">
                    <div className="flex justify-between items-center py-1 border-b border-gray-200/50 last:border-0">
                      <span className="text-gray-500 font-medium text-xs">Email</span>
                      <span className="font-bold text-secondary">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-200/50 last:border-0">
                      <span className="text-gray-500 font-medium text-xs">Phone</span>
                      <span className="font-bold text-secondary">{selectedUser.phone || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-200/50 last:border-0">
                      <span className="text-gray-500 font-medium text-xs">Joined</span>
                      <span className="font-bold text-secondary">
                        {format(new Date(selectedUser.createdAt), 'dd MMM yyyy')}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* EDIT MODE */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-gray-50"
                        disabled // Usually emails shouldn't be edited freely, but we'll leave it disabled for safety or enable if needed
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-secondary mb-1">Role</label>
                        <select
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-secondary mb-1">Status</label>
                        <select
                          value={editForm.isActive ? 'true' : 'false'}
                          onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value === 'true' })}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm bg-white"
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 mt-4">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 text-sm"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="flex-1 border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-secondary text-sm"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleUpdate}
                      disabled={actionLoading}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-primary/20 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {actionLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                      Save Changes
                    </button>
                    <button
                      onClick={() => { setIsEditing(false); setEditForm({ ...selectedUser }); }}
                      disabled={actionLoading}
                      className="flex-1 border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-secondary text-sm disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </>
                )}
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
            <h3 className="text-xl font-black text-secondary mb-2">Delete User?</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Are you sure you want to delete this user? This action cannot be undone and will permanently remove their data from the trust portal.
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
