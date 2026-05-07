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

interface DonationType {
    amount: number;
    donorName?: string;
    createdAt?: string;
}

export default function ReportsPage() {
    const [donations, setDonations] = useState<DonationType[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    const [totalDonations, setTotalDonations] = useState(0);
    const [monthlyDonations, setMonthlyDonations] = useState(0);
    const [yearlyDonations, setYearlyDonations] = useState(0);

    const [topDonorName, setTopDonorName] = useState('No Donor');
    const [topDonorAmount, setTopDonorAmount] = useState(0);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await fetch('/api/donations');

            if (!res.ok) {
                throw new Error('Failed to fetch donations');
            }

            const data = await res.json();

            const donationsData = Array.isArray(data)
                ? data
                : Array.isArray(data.donations)
                ? data.donations
                : [];

            setDonations(donationsData);

            // TOTAL DONATIONS
            const total = donationsData.reduce(
                (acc: number, curr: DonationType) =>
                    acc + Number(curr.amount || 0),
                0
            );

            setTotalDonations(total);

            // MONTHLY DONATIONS
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            const monthly = donationsData
                .filter((d: DonationType) => {
                    const date = new Date(d.createdAt || '');

                    return (
                        date.getMonth() === currentMonth &&
                        date.getFullYear() === currentYear
                    );
                })
                .reduce(
                    (acc: number, curr: DonationType) =>
                        acc + Number(curr.amount || 0),
                    0
                );

            setMonthlyDonations(monthly);

            // YEARLY DONATIONS
            const yearly = donationsData
                .filter((d: DonationType) => {
                    const date = new Date(d.createdAt || '');

                    return date.getFullYear() === currentYear;
                })
                .reduce(
                    (acc: number, curr: DonationType) =>
                        acc + Number(curr.amount || 0),
                    0
                );

            setYearlyDonations(yearly);

            // TOP DONOR
            const donorMap: Record<string, number> = {};

            donationsData.forEach((d: DonationType) => {
                const donor = d.donorName || 'Unknown';

                donorMap[donor] =
                    (donorMap[donor] || 0) + Number(d.amount || 0);
            });

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

            // MONTHLY CHART DATA
            const months = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];

            const monthlyData = months.map((month, index) => {
                const total = donationsData
                    .filter((d: DonationType) => {
                        const date = new Date(d.createdAt || '');

                        return (
                            date.getMonth() === index &&
                            date.getFullYear() === currentYear
                        );
                    })
                    .reduce(
                        (acc: number, curr: DonationType) =>
                            acc + Number(curr.amount || 0),
                        0
                    );

                return {
                    month,
                    amount: total,
                };
            });

            setChartData(monthlyData);

        } catch (error) {
            console.error('REPORT FETCH ERROR:', error);
        }
    };

    return (
        <div className="p-6 md:p-8 bg-[#f6f4f1] min-h-screen">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-[#2d1f1a]">
                    Reports & Analytics
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Financial insights and donation trends
                </p>
            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                {/* ALL TIME */}
                <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">

                    <div className="flex justify-between items-start mb-4">

                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                All Time Donations
                            </p>

                            <h2 className="text-3xl font-black text-[#ff6b00] mt-3">
                                ₹{totalDonations}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-lg">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-gray-400 font-medium">
                        Lifetime Contributions
                    </p>

                </div>

                {/* MONTH */}
                <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">

                    <div className="flex justify-between items-start mb-4">

                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                This Month
                            </p>

                            <h2 className="text-3xl font-black text-green-600 mt-3">
                                ₹{monthlyDonations}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 font-bold text-lg">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-green-500 font-semibold">
                        Monthly Contributions
                    </p>

                </div>

                {/* YEAR */}
                <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">

                    <div className="flex justify-between items-start mb-4">

                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                This Year
                            </p>

                            <h2 className="text-3xl font-black text-[#2d1f1a] mt-3">
                                ₹{yearlyDonations}
                            </h2>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-700 font-bold text-lg">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-green-500 font-semibold">
                        Yearly Contributions
                    </p>

                </div>

                {/* TOP DONOR */}
                <div className="bg-white rounded-2xl border border-[#ece7e2] p-5 shadow-sm hover:shadow-md transition-all">

                    <div className="flex justify-between items-start mb-4">

                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                                Top Donor
                            </p>

                            <h2 className="text-lg font-black text-[#2d1f1a] mt-3">
                                {topDonorName}
                            </h2>

                            <p className="text-2xl font-black text-[#ff6b00] mt-1">
                                ₹{topDonorAmount}
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-600 font-bold text-lg">
                                ₹
                            </span>
                        </div>

                    </div>

                    <p className="text-xs text-gray-400 font-medium">
                        Highest Contribution
                    </p>

                </div>

            </div>

            {/* CHART SECTION */}
            <div className="bg-white rounded-3xl border border-[#ece7e2] p-6 shadow-sm">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h2 className="text-xl font-bold text-[#2d1f1a]">
                            Monthly Donation Trend
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Last 12 months contribution overview
                        </p>
                    </div>

                    <span className="text-[11px] font-bold tracking-wider text-orange-500 uppercase">
                        Trend Analytics
                    </span>

                </div>

                {/* CHART */}
                <div className="h-[350px]">

                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={chartData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#f1f1f1"
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="amount"
                                radius={[10, 10, 0, 0]}
                                fill="#ff6b00"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}