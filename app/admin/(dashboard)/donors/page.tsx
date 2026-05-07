'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format } from 'date-fns';
import {
    X,
    Eye,
    Trash2,
    Pencil,
    Mail,
    Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonorsPage() {
    const { token } = useSelector((state: RootState) => state.auth);

    const [donors, setDonors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDonor, setSelectedDonor] = useState<any | null>(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/admin/donations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch donations');
                }

                const data = await res.json();

                console.log('DONATIONS API:', data);

                // ✅ SAFE ARRAY FIX
                const donationsList = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.data)
                        ? data.data
                        : [];

                // ✅ GROUP DONORS
                const grouped = donationsList.reduce((acc: any, curr: any) => {

                    if (!curr) return acc;

                    const key =
                        curr.email ||
                        curr.mobileNumber ||
                        curr.donorName ||
                        Math.random().toString();

                    if (!acc[key]) {
                        acc[key] = {
                            name: curr.donorName || 'Unknown',
                            email: curr.email || '',
                            phone: curr.mobileNumber || '',
                            totalAmount: 0,
                            donationsCount: 0,
                            latestType:
                                curr.reason ||
                                curr.purpose ||
                                'General',
                            latestStatus:
                                curr.paymentStatus || 'pending',
                            latestDate:
                                curr.donationDate ||
                                curr.createdAt ||
                                new Date(),
                            history: [],
                        };
                    }

                    acc[key].totalAmount += Number(curr.amount || 0);

                    acc[key].donationsCount += 1;

                    acc[key].history.push(curr);

                    const currDate = new Date(
                        curr.donationDate || curr.createdAt || new Date()
                    );

                    const latestDate = new Date(acc[key].latestDate);

                    // ✅ UPDATE LATEST DONATION
                    if (currDate > latestDate) {
                        acc[key].latestDate = currDate;

                        acc[key].latestType =
                            curr.reason ||
                            curr.purpose ||
                            'General';

                        acc[key].latestStatus =
                            curr.paymentStatus || 'pending';
                    }

                    return acc;
                }, {});

                // ✅ SORT DONORS
                const groupedArray = Object.values(grouped).sort(
                    (a: any, b: any) =>
                        new Date(b.latestDate).getTime() -
                        new Date(a.latestDate).getTime()
                );

                setDonors(groupedArray);

            } catch (err) {
                console.error('Failed to fetch donors:', err);
                setDonors([]);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDonors();
        } else {
            setLoading(false);
        }
    }, [token]);

    // 🔍 SEARCH
    const filteredDonors = donors.filter((d) =>
        d.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.email?.toLowerCase().includes(search.toLowerCase()) ||
        d.phone?.includes(search)
    );

    // ✏️ EDIT
    const handleEdit = (donor: any) => {
        console.log('Edit donor:', donor);
    };

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-secondary">
                    Donors Directory
                </h1>

                {/* SEARCH */}
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 px-4 rounded-xl border border-border bg-muted/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow border border-border overflow-hidden">

                {loading ? (
                    <div className="p-12 flex justify-center">
                        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : filteredDonors.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground">
                        No donors found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">

                            {/* HEADER */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4">Donor</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Total Amount</th>
                                    <th className="p-4">Last Occasion</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Last Date</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody className="divide-y divide-border/50">

                                {filteredDonors.map((d, i) => (

                                    <tr
                                        key={i}
                                        className="hover:bg-muted/20"
                                    >

                                        {/* DONOR */}
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                {d.name?.[0]?.toUpperCase() || 'U'}
                                            </div>

                                            <span className="font-bold text-secondary">
                                                {d.name}
                                            </span>
                                        </td>

                                        {/* CONTACT */}
                                        <td className="p-4 space-y-1 text-xs">

                                            <div className="flex items-center gap-2 text-secondary">
                                                <Mail className="w-3.5 h-3.5 text-gray-700" />
                                                {d.email || 'No email'}
                                            </div>

                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="w-3.5 h-3.5 text-gray-700" />
                                                {d.phone || 'No phone'}
                                            </div>

                                        </td>

                                        {/* AMOUNT */}
                                        <td className="p-4 font-black text-primary">
                                            ₹{Number(d.totalAmount || 0).toLocaleString('en-IN')}
                                        </td>

                                        {/* OCCASION */}
                                        <td className="p-4">
                                            {d.latestType}
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4">
                                            <span className="text-green-600 text-xs font-bold">
                                                {d.latestStatus}
                                            </span>
                                        </td>

                                        {/* DATE */}
                                        <td className="p-4">
                                            {d.latestDate
                                                ? format(
                                                    new Date(d.latestDate),
                                                    'dd MMM yyyy'
                                                )
                                                : 'N/A'}
                                        </td>

                                        {/* ACTIONS */}
                                        <td className="p-4 flex gap-3">

                                            {/* VIEW */}
                                            <button
                                                onClick={() => setSelectedDonor(d)}
                                                className="text-black hover:text-gray-700 p-1 rounded-full hover:bg-muted/50"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            {/* EDIT */}
                                            <button
                                                onClick={() => handleEdit(d)}
                                                className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedDonor && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white p-6 rounded-2xl w-full max-w-xl"
                        >

                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">
                                    {selectedDonor.name}
                                </h2>

                                <button
                                    onClick={() => setSelectedDonor(null)}
                                >
                                    <X />
                                </button>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Donation history available below
                            </p>

                        </motion.div>

                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}