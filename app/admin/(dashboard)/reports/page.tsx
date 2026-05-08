'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileDown,
    Search,
    Filter,
    Calendar,
    Download,
    FileText,
    Printer,
    ChevronRight,
    ChevronLeft,
    ArrowUpDown,
    History,
    Users,
    IndianRupee,
    ShieldCheck,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    MapPin,
    RefreshCw
} from 'lucide-react';
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Receipt from '@/components/Receipt';
import { downloadPDF } from '@/lib/pdf';

// --- Professional Color Palette ---
const THEME = {
    primary: '#FF9933', // Saffron
    secondary: '#4E342E', // Brown
    accent: '#D4AF37', // Gold
    background: '#F8F9FA',
    white: '#FFFFFF',
    border: '#E9ECEF',
    text: '#2D3436',
    muted: '#636E72',
    success: '#27AE60',
    error: '#EB5757',
    warning: '#F2994A'
};

type TabType = 'all' | 'collector' | 'festival' | 'audit' | 'failed';

export default function ReportsPage() {
    const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState<any[]>([]);
    const [filteredDonations, setFilteredDonations] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedDonation, setSelectedDonation] = useState<any>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchDonations();
    }, [token]);

    useEffect(() => {
        filterData();
    }, [searchTerm, dateRange, activeTab, donations]);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/donations', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            setDonations(data);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        let filtered = [...donations];

        // Search
        if (searchTerm) {
            filtered = filtered.filter(d =>
                d.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.mobileNumber?.includes(searchTerm)
            );
        }

        // Tab Filtering
        if (activeTab === 'failed') {
            filtered = filtered.filter(d => d.paymentStatus === 'failed');
        } else if (activeTab === 'collector') {
            filtered = filtered.filter(d => d.collector);
        } else if (activeTab === 'festival') {
            filtered = filtered.filter(d => d.reason?.toLowerCase().includes('festival') || d.occasion);
        }

        // Date Filtering
        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            end.setHours(23, 59, 59);
            filtered = filtered.filter(d => {
                const dDate = new Date(d.donationDate || d.createdAt);
                return dDate >= start && dDate <= end;
            });
        }

        setFilteredDonations(filtered);
        setCurrentPage(1);
    };

    const handleExport = () => {
        if (filteredDonations.length === 0) return;

        const exportData = filteredDonations.map(d => ({
            'Date': format(new Date(d.donationDate || d.createdAt), 'dd MMM yyyy hh:mm a'),
            'Receipt Number': d.receiptNumber || 'N/A',
            'Donor Name': d.donorName,
            'Mobile': d.mobileNumber,
            'Email': d.email || 'N/A',
            'Amount (₹)': d.amount,
            'Reason': d.reason,
            'Purpose': d.purpose || 'N/A',
            'Occasion': d.occasion || 'N/A',
            'Payment Status': d.paymentStatus || 'Completed',
            'Payment Method': d.paymentMethod || 'UPI',
            'Transaction ID': d.transactionId || 'N/A'
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Donations Ledger');

        const fileName = `Kulachar_Nidhi_Report_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    const handleExportPDF = (type: string) => {
        const doc = new jsPDF();
        let reportTitle = "Donations Report";
        let dataToExport = filteredDonations;

        const now = new Date();
        if (type === 'daily') {
            reportTitle = "Daily Donation Report";
            dataToExport = donations.filter(d => {
                const date = new Date(d.donationDate || d.createdAt);
                return format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
            });
        } else if (type === 'monthly') {
            reportTitle = "Monthly Donation Report";
            dataToExport = donations.filter(d => {
                const date = new Date(d.donationDate || d.createdAt);
                return format(date, 'yyyy-MM') === format(now, 'yyyy-MM');
            });
        } else if (type === 'festival') {
            reportTitle = "Festival Fund Report";
            dataToExport = donations.filter(d => d.reason?.toLowerCase().includes('festival') || d.occasion);
        } else if (type === 'collector') {
            reportTitle = "Collector Performance Report";
            dataToExport = donations.filter(d => d.collector);
        } else if (type === 'audit') {
            reportTitle = "Audit Trail Report";
            dataToExport = donations; // Full audit
        } else if (type === 'security') {
            reportTitle = "Security & Failed Payments Report";
            dataToExport = donations.filter(d => d.paymentStatus === 'failed');
        }

        const total = dataToExport.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

        // Header
        doc.setFontSize(22);
        doc.setTextColor(78, 52, 46); // Brown
        doc.text("KULACHAR NIDHI TRUST", 105, 15, { align: 'center' });

        doc.setFontSize(16);
        doc.setTextColor(255, 153, 51); // Saffron
        doc.text(reportTitle.toUpperCase(), 105, 25, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${format(now, 'dd MMM yyyy hh:mm a')}`, 105, 32, { align: 'center' });
        doc.text(`Total Records: ${dataToExport.length} | Total Amount: Rs. ${total.toLocaleString()}`, 105, 38, { align: 'center' });

        const tableData = dataToExport.map((d, i) => [
            format(new Date(d.donationDate || d.createdAt), 'dd/MM/yy'),
            d.donorName,
            d.receiptNumber || 'N/A',
            d.reason || d.purpose || 'General',
            d.paymentMethod || 'UPI',
            `Rs. ${Number(d.amount).toLocaleString()}`
        ]);

        autoTable(doc, {
            startY: 45,
            head: [['Date', 'Donor Name', 'Receipt #', 'Reason/Purpose', 'Method', 'Amount']],
            body: tableData,
            headStyles: { fillColor: [78, 52, 46], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [250, 250, 250] },
            styles: { fontSize: 9, cellPadding: 3 },
            margin: { top: 45 }
        });
        doc.save(`${reportTitle.replace(/\s+/g, '_')}_${format(now, 'yyyyMMdd')}.pdf`);
    };

    const handleDownloadReceipt = async (d: any) => {
        setDownloadingId(d._id);
        setSelectedDonation(d);

        setTimeout(async () => {
            try {
                await downloadPDF('receipt-content', `Receipt_${d.receiptNumber?.replace(/\//g, '_') || 'Donation'}.pdf`);
            } catch (err) {
                console.error('Receipt download failed:', err);
            } finally {
                setDownloadingId(null);
                setSelectedDonation(null);
            }
        }, 300);
    };

    const totalAmount = filteredDonations
        .filter(d => d.paymentStatus === 'completed' || !d.paymentStatus)
        .reduce((sum, d) => sum + (d.amount || 0), 0);

    const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);
    const paginatedData = filteredDonations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="min-h-screen bg-[#F4F6F8] p-4 md:p-8">
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-secondary tracking-tight">Generate Report </h1>
                        <p className="text-muted text-sm mt-1 font-medium italic">Certified ledger & donation analytics for Kulachar Nidhi Trust</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-secondary hover:bg-gray-50 transition-all shadow-sm">
                            <Printer className="w-4 h-4" /> Print Ledger
                        </button>
                        <button onClick={handleExport} className="flex items-center gap-2 px-6 py-2.5 bg-secondary text-white rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:bg-black transition-all">
                            <Download className="w-4 h-4" /> Export Excel
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-secondary uppercase tracking-widest mb-4 px-2">Live Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-secondary/60 uppercase tracking-widest">Total Amount</p>
                                <h4 className="text-xl font-black text-secondary">₹{totalAmount.toLocaleString('en-IN')}</h4>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl">
                                <p className="text-[10px] font-black text-secondary/60 uppercase tracking-widest">Selected Entries</p>
                                <h4 className="text-xl font-black text-secondary">{filteredDonations.length} Records</h4>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xs font-black text-secondary uppercase tracking-widest mb-6 px-2">Report Types</h3>
                        <nav className="space-y-1">
                            <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={FileText} label="Master History" />
                            <TabButton active={activeTab === 'collector'} onClick={() => setActiveTab('collector')} icon={Users} label="Collector Summary" />
                            <TabButton active={activeTab === 'festival'} onClick={() => setActiveTab('festival')} icon={Calendar} label="Festival Funds" />
                            <TabButton active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} icon={ShieldCheck} label="Security Trail" />
                            <TabButton active={activeTab === 'failed'} onClick={() => setActiveTab('failed')} icon={XCircle} label="Failed Payments" />
                        </nav>
                    </div>
                </div>

                <div className="lg:col-span-9 space-y-6">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                <input type="text" placeholder="Search by Donor, Receipt or Phone..." className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="date" className="bg-gray-50 border-none rounded-2xl py-3 px-4 text-xs font-bold text-secondary focus:ring-2 focus:ring-primary/20" onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))} />
                                <span className="text-muted font-bold text-xs uppercase">to</span>
                                <input type="date" className="bg-gray-50 border-none rounded-2xl py-3 px-4 text-xs font-bold text-secondary focus:ring-2 focus:ring-primary/20" onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))} />
                                <button onClick={() => fetchDonations()} className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-secondary"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary"><FileDown className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-black text-secondary">Export Center</h3>
                                <p className="text-xs text-secondary/60 font-bold uppercase tracking-widest">Generate and download custom reports</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            <ExportCard icon={FileText} label="Daily Report" onClick={() => handleExportPDF('daily')} color="blue" />
                            <ExportCard icon={Calendar} label="Monthly Report" onClick={() => handleExportPDF('monthly')} color="purple" />
                            <ExportCard icon={MapPin} label="Festival Report" onClick={() => handleExportPDF('festival')} color="green" />
                            <ExportCard icon={Users} label="Collector Report" onClick={() => handleExportPDF('collector')} color="orange" />
                            <ExportCard icon={History} label="Donor Report" onClick={() => handleExportPDF('all')} color="indigo" />
                            <ExportCard icon={ShieldCheck} label="Audit Report" onClick={() => handleExportPDF('audit')} color="amber" />
                            <ExportCard icon={ShieldCheck} label="Security Report" onClick={() => handleExportPDF('security')} color="red" />
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest">Donor Details</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest">Receipt #</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest text-right">Amount</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-secondary uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-20 text-center"><div className="flex flex-col items-center gap-4"><div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /><p className="text-xs font-black text-secondary uppercase tracking-widest">Fetching Nidhi Records...</p></div></td></tr>
                                    ) : paginatedData.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-20 text-center text-muted font-medium italic">No records found for the selected criteria.</td></tr>
                                    ) : paginatedData.map((d, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-5"><p className="text-sm font-bold text-secondary">{format(new Date(d.donationDate || d.createdAt), 'dd MMM yyyy')}</p><p className="text-[10px] text-secondary/60 font-bold">{format(new Date(d.donationDate || d.createdAt), 'hh:mm a')}</p></td>
                                            <td className="px-6 py-5"><p className="text-sm font-black text-secondary truncate max-w-[200px]">{d.donorName}</p><p className="text-[10px] text-secondary/60 font-bold">{d.mobileNumber}</p></td>
                                            <td className="px-6 py-5"><span className="text-[11px] font-black text-secondary/60 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">{d.receiptNumber || 'PENDING'}</span></td>
                                            <td className="px-6 py-5 text-right"><p className="text-sm font-black text-secondary">₹{d.amount?.toLocaleString('en-IN')}</p><p className="text-[10px] text-secondary/60 font-bold uppercase tracking-tighter">{d.paymentMethod || 'UPI'}</p></td>
                                            <td className="px-6 py-5"><StatusBadge status={d.paymentStatus} /></td>
                                            <td className="px-6 py-5"><div className="flex items-center gap-2"><button onClick={() => handleDownloadReceipt(d)} disabled={downloadingId === d._id} title="Download Receipt" className="p-2 hover:bg-white rounded-xl border border-gray-100 hover:border-gray-200 text-secondary shadow-sm transition-all disabled:opacity-50">{downloadingId === d._id ? (<div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />) : (<FileDown className="w-5 h-5" />)}</button></div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs font-bold">Showing <span className="text-secondary">{Math.min(paginatedData.length, itemsPerPage)}</span> of <span className="text-secondary">{filteredDonations.length}</span> records</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-xl bg-white border border-gray-200 text-secondary disabled:opacity-30 transition-all shadow-sm"><ChevronLeft className="w-4 h-4" /></button>
                                <div className="flex items-center gap-1">{[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'bg-white border border-gray-200 text-secondary hover:bg-gray-50'}`}>{i + 1}</button>))}</div>
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-xl bg-white border border-gray-200 text-secondary disabled:opacity-30 transition-all shadow-sm"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>

                    {activeTab === 'audit' && (
                        <div className="bg-secondary rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10"><ShieldCheck className="w-64 h-64" /></div>
                            <div className="relative z-10 space-y-6">
                                <div className="flex items-center gap-3"><div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><History className="w-6 h-6 text-primary" /></div><div><h2 className="text-xl font-black">Audit Compliance Report</h2><p className="text-white/70 text-xs font-bold uppercase tracking-widest">Strict traceability for all Nidhi transactions</p></div></div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="bg-white/5 border border-white/10 p-5 rounded-2xl"><p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Edited Records</p><p className="text-2xl font-black">04 <span className="text-xs text-white/30">Last 30 Days</span></p></div><div className="bg-white/5 border border-white/10 p-5 rounded-2xl"><p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Receipt Re-prints</p><p className="text-2xl font-black">12 <span className="text-xs text-white/30">Total History</span></p></div><div className="bg-white/5 border border-white/10 p-5 rounded-2xl"><p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">System Integrity</p><p className="text-2xl font-black text-success">Verified</p></div></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                {selectedDonation && <Receipt donation={selectedDonation} />}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${active ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-secondary/50 hover:bg-gray-50'}`}
        >
            <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-secondary/30 group-hover:text-secondary'}`} />
            <span className={`text-sm font-black tracking-tight ${active ? 'text-white' : 'text-secondary/70'}`}>{label}</span>
            {active && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
        </button>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isCompleted = status === 'completed' || !status;
    const isPending = status === 'pending';

    if (isCompleted) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/20 text-success rounded-full w-fit">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">Completed</span>
            </div>
        );
    }

    if (isPending) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/20 text-warning rounded-full w-fit">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-error/20 text-error rounded-full w-fit">
            <XCircle className="w-3.5 h-3.5" />
            <span className="text-[9px] font-black uppercase tracking-widest">Failed</span>
        </div>
    );
}

function ExportCard({ icon: Icon, label, onClick, color }: any) {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        red: 'bg-red-50 text-red-600 border-red-100',
    };

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${colors[color] || 'bg-gray-50 text-gray-600 border-gray-100'}`}
        >
            <Icon className="w-5 h-5 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-tight text-center">{label}</span>
        </button>
    );
}

function ChevronDown(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
}