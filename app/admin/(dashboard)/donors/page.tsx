'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function DonorsPage() {

    const donors = [
        {
            name: "Renuka",
            email: "renuka@gmail.com",
            phone: "9898989898",
            amount: "₹1001",
            type: "Navratri",
            status: "Completed",
            date: "29 Apr, 2026"
        },
        {
            name: "Anu",
            email: "anu@gmail.com",
            phone: "9876543210",
            amount: "₹501",
            type: "General",
            status: "Pending",
            date: "28 Apr, 2026"
        }
    ];

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">Donors</h1>

            <div className="bg-white rounded-2xl shadow border overflow-hidden">

                <table className="w-full text-sm">

                    <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="p-4">Donor</th>
                            <th className="p-4">Contact</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {donors.map((d, i) => (
                            <tr key={i} className="border-t">

                                {/* Donor */}
                                <td className="p-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center font-bold">
                                        {d.name[0]}
                                    </div>
                                    {d.name}
                                </td>

                                {/* Contact */}
                                <td className="p-4">
                                    <div>{d.email}</div>
                                    <div className="text-xs text-gray-500">{d.phone}</div>
                                </td>

                                {/* Amount */}
                                <td className="p-4 font-semibold text-green-600">
                                    {d.amount}
                                </td>

                                {/* Type */}
                                <td className="p-4">{d.type}</td>

                                {/* Status */}
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${d.status === 'Completed'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {d.status}
                                    </span>
                                </td>

                                {/* Date */}
                                <td className="p-4">{d.date}</td>

                                {/* Actions */}
                                <td className="p-4 flex gap-2">
                                    <button className="text-blue-500">View</button>
                                    <button className="text-red-500">Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    );
}