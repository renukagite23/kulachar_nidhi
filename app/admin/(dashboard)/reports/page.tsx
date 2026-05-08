'use client';

import { useEffect, useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface DonationType {
    amount: number;
    donorName?: string;
    createdAt?: string;
    paymentStatus?: string;
}

export default function ReportsPage() {
    const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState<any[]>([]);

    const [totalDonations, setTotalDonations] = useState(0);
    const [monthlyDonations, setMonthlyDonations] = useState(0);
    const [yearlyDonations, setYearlyDonations] = useState(0);

    const [topDonorName, setTopDonorName] = useState('No Donor');
    const [topDonorAmount, setTopDonorAmount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/donations', {
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch donations');
                }

                const data = await res.json();
                const donationsData: DonationType[] = Array.isArray(data) ? data : (data.data || data.donations || []);

                // Only consider completed payments for reports
                const completedDonations = donationsData.filter(d => d.paymentStatus === 'completed' || !d.paymentStatus);

                // TOTAL DONATIONS
                const total = completedDonations.reduce(
                    (acc, curr) => acc + Number(curr.amount || 0),
                    0
                );
                setTotalDonations(total);

                // MONTHLY & YEARLY
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                let monthly = 0;
                let yearly = 0;
                const donorMap: Record<string, number> = {};

                completedDonations.forEach((d) => {
                    const date = new Date(d.createdAt || '');
                    const amount = Number(d.amount || 0);

                    if (date.getFullYear() === currentYear) {
                        yearly += amount;
                        if (date.getMonth() === currentMonth) {
                            monthly += amount;
                        }
                    }

                    const donor = d.donorName || 'Unknown';
                    donorMap[donor] = (donorMap[donor] || 0) + amount;
                });

                setMonthlyDonations(monthly);
                setYearlyDonations(yearly);

                // TOP DONOR
                let highestAmount = 0;
                let highestDonor = 'No Donor';
                Object.entries(donorMap).forEach(([name, amount]) => {
                    if (amount > highestAmount) {
                        highestAmount = amount;
                        highestDonor = name;
                    }
                });
                setTopDonorName(highestDonor);
                setTopDonorAmount(highestAmount);

                // MONTHLY CHART DATA (Last 6 Months)
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const last6Months = [];
                for (let i = 5; i >= 0; i--) {
                    const d = new Date();
                    d.setMonth(d.getMonth() - i);
                    const m = d.getMonth();
                    const y = d.getFullYear();
                    
                    const monthlyTotal = completedDonations
                        .filter(don => {
                            const date = new Date(don.createdAt || '');
                            return date.getMonth() === m && date.getFullYear() === y;
                        })
                        .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

                    last6Months.push({
                        month: monthNames[m],
                        amount: monthlyTotal
                    });
                }
                setChartData(last6Months);

            } catch (error) {
                console.error('REPORT FETCH ERROR:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return (
            <div className="p-12 flex justify-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 bg-[#f6f4f1] min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-[#2d1f1a]">Reports & Analytics</h1>
                <p className="text-sm text-gray-500 mt-1">Financial insights and donation trends</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                <ReportCard title="All Time" value={totalDonations} label="Lifetime" color="orange" />
                <ReportCard title="This Month" value={monthlyDonations} label="Current Month" color="green" />
                <ReportCard title="This Year" value={yearlyDonations} label="Current Year" color="brown" />
                <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Top Donor</p>
                            <h2 className="text-lg font-black text-[#2d1f1a] mt-3 line-clamp-1">{topDonorName}</h2>
                            <p className="text-2xl font-black text-[#ff6b00] mt-1">₹{topDonorAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">₹</div>
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Highest Contributor</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#ece7e2] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-[#2d1f1a]">Donation Trend</h2>
                        <p className="text-sm text-gray-400 mt-1">Last 6 months overview</p>
                    </div>
                    <span className="text-[11px] font-bold tracking-wider text-orange-500 uppercase">Trend Analytics</span>
                </div>

                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                            <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                            <Bar dataKey="amount" radius={[10, 10, 0, 0]} fill="#ff6b00" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

function ReportCard({ title, value, label, color }: { title: string, value: number, label: string, color: string }) {
    const colorClasses: Record<string, string> = {
        orange: 'text-[#ff6b00] bg-orange-100 text-orange-600',
        green: 'text-green-600 bg-green-100 text-green-600',
        brown: 'text-[#2d1f1a] bg-gray-100 text-gray-700',
    };

    const [textClass, iconClass] = colorClasses[color].split(' ');

    return (
        <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{title}</p>
                    <h2 className={`text-3xl font-black mt-3 ${textClass}`}>₹{value.toLocaleString('en-IN')}</h2>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg ${iconClass}`}>₹</div>
            </div>
            <p className="text-xs text-gray-400 font-medium">{label}</p>
        </div>
    );
}