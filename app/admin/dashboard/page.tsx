'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  HandHeart,
  Users,
  Calendar,
  Download,
  Search,
  TrendingUp,
  Cake,
  FileSpreadsheet,
  MessageCircle,
  Bell,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Link from 'next/link';

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
    { label: 'Total Donations', value: `₹${donations.reduce((acc, curr: any) => acc + curr.amount, 0)}`, icon: HandHeart, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Donations Today', value: donations.length, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Collectors', value: '5', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Monthly Growth', value: '+12%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const filteredDonations = donations.filter((d: any) =>
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Professional & Slim */}
      <aside className="w-64 bg-secondary text-white hidden lg:flex flex-col border-r border-white/5">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center p-1.5">
              <img src="/devi.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight">KULDAIVAT TRUST</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <a href="#" className="flex items-center gap-3 p-3 bg-white/5 text-primary rounded-xl text-sm font-bold border border-white/5">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 text-white/60 hover:text-white rounded-xl text-sm font-semibold transition-all">
            <HandHeart className="w-4 h-4" /> Donations
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 text-white/60 hover:text-white rounded-xl text-sm font-semibold transition-all">
            <Users className="w-4 h-4" /> Collectors
          </a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 text-white/60 hover:text-white rounded-xl text-sm font-semibold transition-all">
            <Cake className="w-4 h-4" /> Birthdays
          </a>
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link href="/admin" className="flex items-center gap-3 p-3 text-white/40 hover:text-red-400 text-sm font-semibold transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Minimal */}
        <header className="h-16 bg-white border-b border-border px-8 flex justify-between items-center shrink-0">
          <div>
            <h1 className="text-lg font-bold text-secondary">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:text-primary transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-secondary leading-none">Chairman</p>
                <p className="text-[10px] text-muted-foreground mt-1">Trust Board</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold text-secondary">
                CH
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-black text-secondary tracking-tight">Welcome Back</h2>
              <p className="text-xs text-muted-foreground font-medium mt-1">Here is what's happening with the trust today.</p>
            </div>
            <button
              onClick={exportToExcel}
              className="spiritual-button-outline !py-2.5 !px-5 text-xs shadow-sm bg-white"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export Report
            </button>
          </div>

          {/* Stats Grid - Compact Soft Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="spiritual-card p-5 flex items-center gap-4 border-none shadow-md shadow-secondary/5"
              >
                <div className={`${s.bg} p-3 rounded-xl`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{s.label}</p>
                  <p className="text-xl font-black text-secondary mt-0.5">{s.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Donations Table - Compact */}
            <div className="lg:col-span-2 space-y-4">
              <div className="spiritual-card overflow-hidden border-none shadow-lg shadow-secondary/5">
                <div className="p-5 border-b border-border/50 flex justify-between items-center bg-white">
                  <h3 className="font-bold text-secondary text-sm">Recent Donations</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Search donor..."
                      className="bg-muted/50 border-none rounded-lg pl-9 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary/20 w-48 md:w-64 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Receipt</th>
                        <th>Donor Name</th>
                        <th>Amount</th>
                        <th>Reason</th>
                        <th>Date</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonations.map((d: any) => (
                        <tr key={d._id}>
                          <td className="font-mono text-[11px] font-bold text-primary">{d.receiptNumber}</td>
                          <td className="font-semibold text-secondary">{d.donorName}</td>
                          <td>
                            <span className="font-bold text-secondary">₹{d.amount}</span>
                          </td>
                          <td className="text-muted-foreground text-[12px]">{d.reason}</td>
                          <td className="text-muted-foreground text-[12px]">{formatDate(d.donationDate)}</td>
                          <td className="text-right">
                            <button className="p-1.5 hover:bg-primary/5 text-primary rounded-lg transition-all">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredDonations.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-muted-foreground text-xs italic">
                            No donations found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-muted/20 border-t border-border/50 text-center">
                  <button className="text-[11px] font-bold text-primary hover:underline">View All Donations</button>
                </div>
              </div>
            </div>

            {/* Sidebar Modules - Compact */}
            <div className="space-y-6">
              {/* Birthdays Module */}
              <div className="spiritual-card p-5 border-none shadow-lg shadow-secondary/5 bg-white">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-secondary text-sm flex items-center gap-2">
                    <Cake className="w-4 h-4 text-primary" /> Upcoming Birthdays
                  </h3>
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">3 Today</span>
                </div>
                <div className="space-y-3">
                  {donations.slice(0, 3).map((d: any, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {d.donorName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-secondary truncate">{d.donorName}</p>
                          <p className="text-[10px] text-muted-foreground">Tomorrow</p>
                        </div>
                      </div>
                      <button
                        onClick={() => shareOnWhatsApp(d)}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-[11px] font-bold text-muted-foreground hover:text-primary transition-all flex items-center justify-center gap-1">
                  View Birthday Calendar <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Admin Quick Actions */}
              <div className="bg-secondary rounded-2xl p-5 text-white relative overflow-hidden shadow-lg shadow-secondary/20">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none -mr-4 -mt-4 grayscale">
                  <img src="/devi.png" alt="Devi" />
                </div>
                <h4 className="text-sm font-bold mb-1">Chairman's Corner</h4>
                <p className="text-[10px] text-white/50 mb-6">Review and approve trust actions.</p>

                <div className="space-y-2">
                  <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-[11px] font-bold border border-white/10">
                    Approve Bank Changes
                  </button>
                  <button className="w-full py-2.5 bg-primary text-white rounded-xl transition-all text-[11px] font-bold shadow-lg shadow-primary/20">
                    Add New Collector
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
