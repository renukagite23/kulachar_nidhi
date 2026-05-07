'use client';

import { X, Mail, Phone, Calendar, Users, IndianRupee, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useGetCollectorQuery } from '@/redux/api/collectorApiSlice';

interface CollectorViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectorId: string | null;
}

export default function CollectorViewModal({
  isOpen,
  onClose,
  collectorId
}: CollectorViewModalProps) {
  const { data: collector, isLoading, error } = useGetCollectorQuery(collectorId, {
    skip: !collectorId || !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-6 border-b shrink-0 bg-muted/30">
          <div>
            <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
              Collector Profile
              {collector?.isActive !== false ? (
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-widest">Active</span>
              ) : (
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase tracking-widest">Inactive</span>
              )}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Detailed statistics and referral registrations</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-grow overflow-y-auto p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-bold text-secondary">Fetching collector data...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-bold text-lg">Error loading details</p>
              <p className="text-muted-foreground text-sm">Please try again later</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* TOP INFO CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-muted/30 p-6 rounded-3xl border border-border flex flex-col gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total Referrals</p>
                    <p className="text-3xl font-black text-secondary">{collector?.referredUsers?.length || 0}</p>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Total Funds Raised</p>
                    <p className="text-3xl font-black text-primary">₹{(collector?.totalRaised || 0).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-6 rounded-3xl border border-border flex flex-col gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Referral Code</p>
                    <p className="text-xl font-mono font-black text-secondary">{collector?.referralCode || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* COLLECTOR DETAILS SECTION */}
              <div className="bg-white rounded-3xl border border-border p-8 space-y-6">
                <h3 className="text-sm font-black text-secondary uppercase tracking-widest border-b pb-4">Collector Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                      {collector?.name?.[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Full Name</p>
                      <p className="font-bold text-secondary">{collector?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email Address</p>
                      <p className="font-bold text-secondary">{collector?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Phone Number</p>
                      <p className="font-bold text-secondary">{collector?.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Joined Date</p>
                      <p className="font-bold text-secondary">{new Date(collector?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* REFERRED USERS LIST */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black text-secondary uppercase tracking-widest">Registered Users List</h3>
                  <span className="text-[10px] bg-muted px-2 py-1 rounded font-bold text-muted-foreground">{collector?.referredUsers?.length || 0} Registrations</span>
                </div>

                <div className="border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Devotee</th>
                        <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Contact Info</th>
                        <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Donation Total</th>
                        <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {collector?.referredUsers && collector.referredUsers.length > 0 ? (
                        collector.referredUsers.map((user: any) => (
                          <tr key={user._id} className="hover:bg-muted/20 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-secondary">
                                  {user.name?.[0].toUpperCase()}
                                </div>
                                <div className="text-sm font-bold text-secondary">{user.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {user.email}</span>
                                <span className="flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> {user.phone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`text-sm font-black ${user.totalDonated > 0 ? 'text-primary' : 'text-muted-foreground/40'}`}>
                                ₹{(user.totalDonated || 0).toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-[10px] font-medium text-muted-foreground">
                                {new Date(user.createdAt).toLocaleDateString('en-IN')}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic text-sm">
                            No users registered under this collector yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-8 py-4 border-t shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-border text-sm font-bold text-secondary hover:bg-muted transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
