'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { format, subMonths } from 'date-fns';
import {
    IndianRupee,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

export default function ReportsPage() {
    const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);

    const [loading, setLoading] = useState(true);

    const [allTime, setAllTime] = useState(0);
    const [thisMonth, setThisMonth] = useState(0);
    const [lastMonth, setLastMonth] = useState(0);
    const [thisYear, setThisYear] = useState(0);
    const [lastYear, setLastYear] = useState(0);
    const [topDonor, setTopDonor] = useState<any>(null);
    const [chartData, setChartData] = useState<any[]>([]);

    const currentMonthLabel = format(new Date(), 'MMMM yyyy');

    const growth = (curr: number, prev: number) => {
        if (curr === 0 && prev > 0) return -100;
        if (prev === 0 && curr > 0) return 100;
        if (prev === 0 && curr === 0) return 0;
        return Number(((curr - prev) / prev * 100).toFixed(1));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/donations', {
                    credentials: 'include',
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error('Failed to fetch data');

                const data = await res.json();
                const donations = data.data || data;

            const now = new Date();
            const prevDate = new Date();
            prevDate.setMonth(prevDate.getMonth() - 1);

            const currentYear = now.getFullYear();
            const prevYear = currentYear - 1;

            let all = 0,
                m = 0,
                lm = 0,
                y = 0,
                ly = 0;

            const monthlyMap: Record<string, number> = {};
            const donorMap: Record<string, any> = {};

            donations.forEach((d: any) => {
                if (d.paymentStatus !== 'completed') return;

                const rawDate = d.donationDate || d.createdAt;
                if (!rawDate) return;

                const date = new Date(rawDate);
                const amount = d.amount || 0;

                all += amount;

                // THIS MONTH
                if (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                ) {
                    m += amount;
                }

                // LAST MONTH
                if (
                    date.getMonth() === prevDate.getMonth() &&
                    date.getFullYear() === prevDate.getFullYear()
                ) {
                    lm += amount;
                }

                // YEARLY
                if (date.getFullYear() === currentYear) y += amount;
                if (date.getFullYear() === prevYear) ly += amount;

                // CHART
                const monthKey = format(date, 'yyyy-MM');
                monthlyMap[monthKey] = (monthlyMap[monthKey] || 0) + amount;

                // TOP DONOR
                const key = d.email || d.mobileNumber || d.donorName;
                if (!donorMap[key]) {
                    donorMap[key] = {
                        name: d.donorName,
                        total: 0,
                    };
                }
                donorMap[key].total += amount;
            });

            // FIND TOP DONOR
            const top = Object.values(donorMap).sort(
                (a: any, b: any) => b.total - a.total
            )[0];

            // LAST 6 MONTHS CHART
            const last6Months = [];
            for (let i = 5; i >= 0; i--) {
                const d = new Date();
                d.setMonth(d.getMonth() - i);

                const key = format(d, 'yyyy-MM');

                last6Months.push({
                    month: format(d, 'MMM yyyy'),
                    amount: monthlyMap[key] || 0,
                });
            }

            setAllTime(all);
            setThisMonth(m);
            setLastMonth(lm);
            setThisYear(y);
            setLastYear(ly);
            setTopDonor(top);
            setChartData(last6Months);
            } catch (error) {
                console.error('Failed to fetch reports', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
    }, [token]);

    if (loading) {
        return (
            <div className="p-12 flex justify-center">
                <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-black text-secondary">
                    Reports & Analytics
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Financial insights and donation trends
                </p>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* ALL TIME */}
                <div className="spiritual-card bg-white border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            All Time Donations
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IndianRupee className="w-5 h-5 text-primary" />
                        </div>
                    </div>

                    <div className="text-2xl font-black text-primary tracking-tight">
                        ₹{allTime.toLocaleString('en-IN')}
                    </div>

                    <div className="text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">
                        Lifetime Contributions
                    </div>
                </div>


                {/* THIS MONTH */}
                <div className="spiritual-card bg-white border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            {currentMonthLabel}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <IndianRupee className="w-5 h-5 text-green-600" />
                        </div>
                    </div>

                    <div className="text-2xl font-black text-green-600 tracking-tight">
                        ₹{thisMonth.toLocaleString('en-IN')}
                    </div>

                    {thisMonth === 0 ? (
                        <div className="text-[11px] text-muted-foreground mt-2 font-medium">
                            No donations this month
                            <br />
                            <span className="font-bold text-secondary">
                                Last month: ₹{lastMonth.toLocaleString('en-IN')}
                            </span>
                        </div>
                    ) : (
                        <div className="text-[11px] mt-2 flex items-center gap-1 font-bold">
                            {Number(growth(thisMonth, lastMonth)) >= 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-600" />
                            ) : (
                                <TrendingDown className="w-3 h-3 text-red-600" />
                            )}
                            {growth(thisMonth, lastMonth)}% vs last month
                        </div>
                    )}
                </div>


                {/* THIS YEAR */}
                <div className="spiritual-card bg-white border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            This Year
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                            <IndianRupee className="w-5 h-5 text-secondary" />
                        </div>
                    </div>

                    <div className="text-2xl font-black text-secondary tracking-tight">
                        ₹{thisYear.toLocaleString('en-IN')}
                    </div>

                    <div className="text-[11px] mt-2 flex items-center gap-1 font-bold">
                        {Number(growth(thisYear, lastYear)) >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                            <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        {growth(thisYear, lastYear)}% vs last year
                    </div>
                </div>


                {/* TOP DONOR */}
                <div className="spiritual-card bg-white border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            Top Donor
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <IndianRupee className="w-5 h-5 text-primary" />
                        </div>
                    </div>

                    {topDonor ? (
                        <>
                            <div className="text-lg font-black text-secondary">
                                {topDonor.name}
                            </div>
                            <div className="text-primary font-black text-xl mt-1">
                                ₹{topDonor.total.toLocaleString('en-IN')}
                            </div>

                            <div className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-medium">
                                Highest Contributor
                            </div>
                        </>
                    ) : (
                        <div className="text-sm text-muted-foreground">No data</div>
                    )}
                </div>

            </div>

            {/* CHART */}
            <div className="spiritual-card bg-white border-border shadow-sm p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="font-black text-secondary text-lg">
                            Monthly Donation Trend
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">
                            Last 6 months contribution overview
                        </p>
                    </div>

                    <div className="text-[10px] uppercase tracking-widest font-black text-primary flex items-center gap-1">
                        Trend Analysis
                    </div>
                </div>

                {/* Chart */}
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} barSize={40}>

                            {/* Gradient */}
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#E65100" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#E65100" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>

                            {/* Grid */}
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#E5E7EB"
                                vertical={false}
                            />

                            {/* X Axis */}
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            {/* Y Axis */}
                            <YAxis
                                tick={{ fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            {/* Tooltip */}
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: '1px solid #eee',
                                    fontSize: '12px',
                                }}
                                formatter={(value: any) => [`₹${value}`, 'Donations']}
                            />

                            {/* Bars */}
                            <Bar
                                dataKey="amount"
                                fill="url(#barGradient)"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}