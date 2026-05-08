'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  Users, Search, Filter,
  Mail, MapPin, UserCheck, Trash2, Edit, Eye, X, CheckCircle2, AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

// Toast Component
const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg z-[100] text-sm font-bold text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      {message}
      <button onClick={onClose} className="ml-2"><X className="w-4 h-4" /></button>
    </div>
  );
};

export default function AdminUsersPage() {
  const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    isActive: true
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // ✅ FIXED FETCH USERS (MAIN FIX)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users', {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();


        console.log('USERS API RESPONSE:', data);

        let usersArray: any[] = [];

        if (Array.isArray(data)) {
          usersArray = data;
        } else if (Array.isArray(data?.users)) {
          usersArray = data.users;
        } else if (Array.isArray(data?.data)) {
          usersArray = data.data;
        }

        setUsers(usersArray || []);
      } catch (err) {
        console.error('Failed to fetch users', err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };


    if (token) {
      fetchUsers();
    } else {
      setLoading(false);
    }

  }, [token]);


  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.phone?.includes(q)
    );
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCheck /> Users
        </h1>

        <input
          className="border px-3 py-2 rounded-lg"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>
                  {u.isActive !== false ? 'Active' : 'Inactive'}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}