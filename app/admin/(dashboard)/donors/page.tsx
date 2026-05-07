'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format } from 'date-fns';
import { X, CalendarDays, IndianRupee, Tag, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonorsPage() {
    const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);
    const [donors, setDonors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDonor, setSelectedDonor] = useState<any | null>(null);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const res = await fetch('/api/admin/donations', {
                    credentials: 'include',
                    headers: { Authorization: `Bearer ${token}` }
                });

                let data;
                if (res.status === 404) {
                    const fallbackRes = await fetch('/api/donations', {
                        credentials: 'include',
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    data = await fallbackRes.json();
                } else {
                    data = await res.json();
                }

                const donationsList = data.data || data;
                
                if (Array.isArray(donationsList)) {
                    // Group by email or mobileNumber
                    const grouped = donationsList.reduce((acc: any, curr: any) => {
                        const key = curr.email || curr.mobileNumber || curr.donorName;
                        if (!acc[key]) {
                            acc[key] = {
                                name: curr.donorName,
                                email: curr.email,
                                phone: curr.mobileNumber,
                                totalAmount: 0,
                                donationsCount: 0,
                                latestType: curr.reason || curr.purpose || 'General',
                                latestStatus: curr.paymentStatus,
                                latestDate: curr.donationDate || curr.createdAt,
                                history: []
                            };
                        }
                        acc[key].totalAmount += curr.amount || 0;
                        acc[key].donationsCount += 1;
                        acc[key].history.push(curr);

                        // Keep the latest type/status/date
                        const currDate = new Date(curr.donationDate || curr.createdAt);
                        const latestDate = new Date(acc[key].latestDate);
                        if (currDate > latestDate) {
                            acc[key].latestDate = currDate;
                            acc[key].latestType = curr.reason || curr.purpose || 'General';
                            acc[key].latestStatus = curr.paymentStatus;
                        }

                        return acc;
                    }, {});

                    // Convert back to array
                    const groupedArray = Object.values(grouped).sort((a: any, b: any) =>
                        new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime()
                    );

                    setDonors(groupedArray);
                }
            } catch (err) {
                console.error('Failed to fetch donors', err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDonors();
        } else {
            setLoading(false); // If no token, just stop loading
        }
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-secondary">Donors Directory</h1>

            <div className="bg-white rounded-2xl shadow border border-border overflow-hidden">
                {loading ? (
                    <div className="p-12 flex justify-center items-center">
                        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : donors.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        No donors found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Donor</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Contact</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Total Amount</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Last Occasion</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Status</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Last Date</th>
                                    <th className="p-4 font-bold text-muted-foreground uppercase text-[11px] tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {donors.map((d, i) => (
                                    <tr key={i} className="hover:bg-muted/20 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                {d.name ? d.name[0].toUpperCase() : 'U'}
                                            </div>
                                            <span className="font-bold text-secondary">{d.name || 'Unknown'}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-secondary">{d.email || 'No email'}</div>
                                            <div className="text-xs text-muted-foreground mt-0.5">{d.phone || 'No phone'}</div>
                                        </td>
                                        <td className="p-4 font-black text-primary">
                                            ₹{d.totalAmount.toLocaleString('en-IN')}
                                            <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                                                {d.donationsCount} {d.donationsCount === 1 ? 'Donation' : 'Donations'}
                                            </div>
                                        </td>
                                        <td className="p-4 text-secondary font-medium capitalize">
                                            {d.latestType}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${d.latestStatus === 'completed'
                                                    ? 'bg-green-50 text-green-700 border-green-200'
                                                    : d.latestStatus === 'failed'
                                                        ? 'bg-red-50 text-red-700 border-red-200'
                                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                                }`}>
                                                {d.latestStatus}
                                            </span>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {d.latestDate ? format(new Date(d.latestDate), 'dd MMM, yyyy') : 'N/A'}
                                        </td>
                                        <td className="p-4 flex gap-3">
                                            <button 
                                                onClick={() => setSelectedDonor(d)}
                                                className="text-black hover:text-gray-700 p-1 rounded-full hover:bg-muted/50 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="text-red-500 hover:text-red-600 font-bold text-xs">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detailed View Modal */}
            <AnimatePresence>
                {selectedDonor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xl">
                                        {selectedDonor.name ? selectedDonor.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-secondary">{selectedDonor.name}</h2>
                                        <p className="text-sm text-muted-foreground">{selectedDonor.email} • {selectedDonor.phone}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedDonor(null)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Modal Stats */}
                            <div className="px-6 py-6 border-b border-border grid grid-cols-2 gap-4 bg-white">
                                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total Contributions</div>
                                    <div className="text-2xl font-black text-primary">
                                        ₹{selectedDonor.totalAmount.toLocaleString('en-IN')}
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/10">
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Donation Count</div>
                                    <div className="text-2xl font-black text-secondary">
                                        {selectedDonor.donationsCount} Time{selectedDonor.donationsCount !== 1 ? 's' : ''}
                                    </div>
                                </div>
                            </div>

                            {/* Modal History List */}
                            <div className="p-6 overflow-y-auto bg-[#FFFDF9] flex-1">
                                <h3 className="font-bold text-secondary mb-4 flex items-center gap-2">
                                    <CalendarDays className="w-4 h-4 text-primary" /> Donation History
                                </h3>
                                
                                <div className="space-y-4">
                                    {selectedDonor.history.sort((a: any, b: any) => new Date(b.donationDate || b.createdAt).getTime() - new Date(a.donationDate || a.createdAt).getTime()).map((tx: any, idx: number) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Tag className="w-3.5 h-3.5 text-primary/60" />
                                                    <span className="font-bold text-secondary capitalize">{tx.reason || tx.purpose || 'General Foundation'}</span>
                                                </div>
                                                {tx.occasion && (
                                                    <div className="text-xs text-muted-foreground mb-1">Occasion: {tx.occasion}</div>
                                                )}
                                                <div className="text-[11px] text-muted-foreground font-medium">
                                                    {format(new Date(tx.donationDate || tx.createdAt), 'dd MMM yyyy, HH:mm a')}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center md:flex-col md:items-end gap-3 md:gap-1">
                                                <div className="font-black text-lg text-primary">
                                                    ₹{tx.amount?.toLocaleString('en-IN')}
                                                </div>
                                                <span className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-bold rounded border ${tx.paymentStatus === 'completed'
                                                        ? 'bg-green-50 text-green-700 border-green-200'
                                                        : tx.paymentStatus === 'failed'
                                                            ? 'bg-red-50 text-red-700 border-red-200'
                                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    {tx.paymentStatus}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}