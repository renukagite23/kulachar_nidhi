'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  Users, Search, Filter, MoreVertical, 
  Mail, Calendar, MapPin, UserCheck
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminUsersPage() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
            <UserCheck className="w-4 h-4" /> Devotee Management
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Registered Users</h1>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search by name, email or mobile..."
              className="w-full pl-12 pr-4 h-12 bg-white border-2 border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all shadow-sm"
            />
          </div>
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
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Contact Information</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Registration Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {users.map((user_obj: any) => (
                <tr key={user_obj._id} className="hover:bg-muted/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg shadow-inner">
                        {user_obj.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-secondary text-base leading-tight uppercase tracking-tight">{user_obj.name}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${user_obj.role === 'admin' ? 'bg-amber-500' : 'bg-green-500'}`} />
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{user_obj.role}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                      <Mail className="w-3.5 h-3.5 text-primary/40" />
                      {user_obj.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary">
                      <MapPin className="w-3.5 h-3.5 text-primary/40" />
                      {user_obj.mobile || 'No Mobile'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-muted-foreground/40" />
                      <span className="text-sm font-bold text-secondary">
                        {format(new Date(user_obj.createdAt), 'dd MMM, yyyy')}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="p-2.5 hover:bg-muted rounded-xl transition-colors text-muted-foreground hover:text-secondary border border-transparent hover:border-border">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center">
                    <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6 text-muted-foreground/30">
                      <Users className="w-10 h-10" />
                    </div>
                    <p className="font-black text-secondary uppercase tracking-widest text-xs">No registered devotees found</p>
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
