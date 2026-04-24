'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  HandHeart,
  Users,
  Calendar,
  Download,
  Search,
  Filter,
  TrendingUp,
  Cake,
  FileSpreadsheet,
  Share2,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get('/api/donations');
      if (res.data.success) {
        setDonations(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = (donor: any) => {
    const message = `Happy Birthday to our dear donor ${donor.donorName}! 🎂\nThank you for your continuous support to Kuldaivat Trust. 🙏`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(donations);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");
    XLSX.writeFile(workbook, "Trust_Donations_Report.xlsx");
  };

  const stats = [
    { label: 'Total Donations', value: `₹${donations.reduce((acc, curr: any) => acc + curr.amount, 0)}`, icon: HandHeart, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Today\'s Count', value: donations.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Collectors', value: '5', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const filteredDonations = donations.filter((d: any) =>
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fffdf5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4a3728] text-white p-6 hidden lg:block">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#ff9933]">Admin Panel</h2>
          <p className="text-xs text-[#fffdf5]/60">Kuldaivat Trust</p>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 p-3 bg-[#ff9933]/10 text-[#ff9933] rounded-xl font-bold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <HandHeart className="w-5 h-5" /> Donations
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <Users className="w-5 h-5" /> Collectors
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
            <Cake className="w-5 h-5" /> Birthdays
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#800000]">Dashboard Overview</h1>
            <p className="text-[#4a3728]/60 mt-1">Welcome back, Chairman</p>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-white rounded-xl font-bold hover:bg-[#b8962d] transition-all shadow-lg"
          >
            <FileSpreadsheet className="w-5 h-5" /> Export Report
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-[#d4af37]/10 flex items-center gap-4"
            >
              <div className={`${s.bg} p-4 rounded-2xl`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm text-[#4a3728]/60 font-medium">{s.label}</p>
                <p className="text-2xl font-black text-[#4a3728]">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Birthday Module Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-[#d4af37]/10 overflow-hidden">
            <div className="p-8 border-b border-[#d4af37]/10 flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#800000] flex items-center gap-2">
                <Cake className="w-5 h-5 text-[#ff9933]" /> Upcoming Birthdays
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {donations.slice(0, 3).map((d: any, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#fffdf5] border border-[#d4af37]/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#ff9933]/20 flex items-center justify-center text-[#ff9933] font-bold">
                        {d.donorName[0]}
                      </div>
                      <div>
                        <p className="font-bold text-[#4a3728]">{d.donorName}</p>
                        <p className="text-xs text-[#4a3728]/60">Tomorrow, 25th April</p>
                      </div>
                    </div>
                    <button
                      onClick={() => shareOnWhatsApp(d)}
                      className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-md"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#800000] text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 grayscale pointer-events-none -mr-8 -mt-8">
              <img src="/devi.png" alt="Devi" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Chairman's Corner</h4>
              <p className="text-white/60 text-sm">Review and approve sensitive trust actions.</p>
            </div>
            <div className="space-y-3 mt-8">
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-sm font-bold border border-white/10">
                Approve Bank Changes
              </button>
              <button className="w-full py-3 bg-[#ff9933] text-white rounded-xl transition-all text-sm font-bold shadow-lg">
                Add New Collector
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#d4af37]/10 overflow-hidden">
          <div className="p-8 border-b border-[#d4af37]/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-[#800000]">Recent Donations</h3>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4a3728]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by donor name or receipt..."
                className="w-full bg-[#fffdf5] border-2 border-[#d4af37]/10 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-[#ff9933]/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#fffdf5] text-[#4a3728]/60 uppercase text-xs font-bold">
                <tr>
                  <th className="px-8 py-5">Receipt No</th>
                  <th className="px-8 py-5">Donor Name</th>
                  <th className="px-8 py-5">Amount</th>
                  <th className="px-8 py-5">Reason</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/5">
                {filteredDonations.map((d: any) => (
                  <tr key={d._id} className="hover:bg-[#fffdf5]/50 transition-all">
                    <td className="px-8 py-5 font-mono text-sm font-bold text-[#ff9933]">{d.receiptNumber}</td>
                    <td className="px-8 py-5 font-bold text-[#4a3728]">{d.donorName}</td>
                    <td className="px-8 py-5">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold text-sm">
                        ₹{d.amount}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[#4a3728]/70 font-medium">{d.reason}</td>
                    <td className="px-8 py-5 text-[#4a3728]/60 text-sm">{formatDate(d.donationDate)}</td>
                    <td className="px-8 py-5">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-600" /> Completed
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-[#d4af37]/10 rounded-lg text-[#d4af37]">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredDonations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-8 py-20 text-center text-[#4a3728]/40">
                      No donations found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
