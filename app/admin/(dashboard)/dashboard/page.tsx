'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  LayoutDashboard, Users, IndianRupee, TrendingUp,
  ArrowUpRight, Clock, ShieldCheck, Download
} from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { adminToken: token } = useSelector((state: RootState) => state.adminAuth);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const text = await res.text();

        console.log(text);

        let data;

        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error('Invalid JSON response:', text);
          throw new Error('API returned invalid JSON');
        }

        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);



  const generateQuarterlyReport = async () => {
    try {
      const res = await fetch('/api/admin/reports/quarterly', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      const doc = new jsPDF();

      // Title
      doc.setFontSize(20);
      doc.text('Quarterly Trust Report', 14, 20);

      // Generated Date
      doc.setFontSize(10);
      doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        28
      );

      // Summary
      doc.setFontSize(14);
      doc.text('Summary', 14, 40);

      doc.setFontSize(11);

      doc.text(`Total Users: ${data.stats.totalUsers}`, 14, 50);
      doc.text(`Total Events: ${data.stats.totalEvents}`, 14, 58);

      doc.text(
        `Total Donations: ${data.stats.totalDonationsCount}`,
        14,
        66
      );

      doc.text(
        `Total Donation Amount: Rs. ${data.stats.totalDonationAmount.toLocaleString('en-IN')}`,
        14,
        74
      );

      // Table
      doc.setFontSize(14);
      doc.text('Recent Transactions', 14, 90);

      autoTable(doc, {
        startY: 96,
        head: [['Donor', 'Receipt', 'Date', 'Amount']],
        body: data.recentTransactions.map((tx: any) => [
          tx.donorName,
          tx.receiptNumber || 'MT-GEN',
          new Date(tx.donationDate).toLocaleDateString(),
          `Rs. ${tx.amount.toLocaleString('en-IN')}`,
        ]),
      });

      // Download
      doc.save(`quarterly-report-${Date.now()}.pdf`);

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF report');
    }
  };



  const formatLogDetails = (details: string) => {
    if (!details || details === '-') return '-';
    try {
      const parsed = JSON.parse(details);
      return Object.entries(parsed)
        .map(([key, value]) => {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
          return `${formattedKey}: ${value}`;
        })
        .join('\n');
    } catch (e) {
      return details;
    }
  };

  const exportLogs = async () => {
    try {
      const res = await fetch('/api/admin/export/logs', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to export logs');
      }

      const doc = new jsPDF();

      // Premium Header
      doc.setFillColor(230, 81, 0); // Primary Color
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Trust Activity Registry', 14, 22);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('KULACHAR NIDHI ADMINISTRATIVE LOGS', 14, 32);

      // Meta Info
      doc.setTextColor(80, 80, 80);
      doc.setFontSize(9);
      doc.text(`Generated on: ${format(new Date(), 'dd MMMM yyyy, hh:mm a')}`, 14, 48);
      doc.text(`Total Records: ${data.logs.length}`, 14, 53);

      // Table
      autoTable(doc, {
        startY: 60,
        head: [['TIMESTAMP', 'ADMINISTRATOR', 'ACTION PERFORMED', 'ACTIVITY DETAILS']],
        body: data.logs.map((log: any) => [
          format(new Date(log.createdAt), 'dd/MM/yy\nHH:mm'),
          log.user?.name || 'System Admin',
          log.action.replace(/_/g, ' ').toUpperCase(),
          formatLogDetails(log.details)
        ]),
        styles: {
          fontSize: 8,
          cellPadding: 4,
          overflow: 'linebreak',
          lineColor: [240, 240, 240],
          lineWidth: 0.1,
        },
        headStyles: {
          fillColor: [245, 245, 245],
          textColor: [230, 81, 0],
          fontStyle: 'bold',
          fontSize: 9,
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 35 },
          2: { cellWidth: 40 },
          3: { cellWidth: 'auto' },
        },
        alternateRowStyles: {
          fillColor: [255, 253, 249],
        },
        margin: { top: 60, bottom: 20 },
        didDrawPage: (data) => {
          // Footer
          const str = 'Page ' + doc.getNumberOfPages();
          doc.setFontSize(8);
          doc.setTextColor(150, 150, 150);
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, 14, pageHeight - 10);
          doc.text('Confidential - Internal Trust Document', pageSize.width - 65, pageHeight - 10);
        },
      });

      doc.save(`Activity_Logs_${format(new Date(), 'ddMMyy_HHmm')}.pdf`);

    } catch (error) {
      console.error('Export logs failed:', error);
      alert('Failed to export logs');
    }
  };


  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] mb-2">
            <ShieldCheck className="w-4 h-4" /> Administrative Terminal
          </div>
          <h1 className="text-4xl font-black text-secondary tracking-tight">Trust Overview</h1>
        </div>
        <div className="flex gap-3">



          <button
            onClick={exportLogs}
            className="bg-white border-2 border-border px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-secondary hover:bg-muted/50 transition-all flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Export Logs
          </button>

          <button
            onClick={generateQuarterlyReport}
            className="spiritual-button !px-6 !py-2.5 text-xs"
          >
            Generate Quarterly Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Card 1: Total Users */}
        <div className="spiritual-card p-6 bg-white flex items-center justify-between border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Users</p>
            </div>
            <h3 className="text-3xl font-black text-secondary">{stats?.totalUsers || 0}</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> +12%
            </div>
          </div>
        </div>

        {/* Card 2: Total Events */}
        <div className="spiritual-card p-6 bg-white flex items-center justify-between border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Events</p>
            </div>
            <h3 className="text-3xl font-black text-secondary">{stats?.totalEvents || 0}</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> Managed
            </div>
          </div>
        </div>

        {/* Card 3: Total Donations (Count) */}
        <div className="spiritual-card p-6 bg-white flex items-center justify-between border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Donations</p>
            </div>
            <h3 className="text-3xl font-black text-secondary">{stats?.totalDonationsCount || 0}</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> Active
            </div>
          </div>
        </div>

        {/* Card 3: Total Amount */}
        <div className="spiritual-card p-6 bg-white flex items-center justify-between border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <IndianRupee className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Amount</p>
            </div>
            <h3 className="text-3xl font-black text-secondary flex items-baseline gap-1">
              <span className="text-xl text-primary font-bold">₹</span>
              {stats?.totalDonationAmount?.toLocaleString('en-IN') || 0}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md font-bold text-[10px]">
              <TrendingUp className="w-3 h-3" /> Target
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="spiritual-card overflow-hidden bg-white border-gray-100 shadow-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-black text-secondary capitalize italic">Recent Charity Flow</h3>
            <button className="text-primary font-bold text-xs flex items-center gap-1 hover:underline">
              View Detailed Ledger <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30">
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Donor Detail</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Timestamp</th>
                  <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {stats?.recentTransactions?.map((tx: any) => (
                  <tr key={tx._id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-secondary text-sm">{tx.donorName}</div>
                      <div className="text-[9px] text-muted-foreground font-medium uppercase">{tx.receiptNumber || 'MT-GEN'}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">
                      {format(new Date(tx.donationDate), 'dd MMM, HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-black text-primary text-sm flex items-center justify-end gap-0.5">
                        <IndianRupee className="w-3 h-3" />
                        {tx.amount.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Summary */}
        <div className="space-y-4">
          <div className="spiritual-card p-4 bg-secondary text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
              <ShieldCheck className="w-64 h-64 -translate-y-12 translate-x-12" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-1 tracking-tighter italic">Administrative Gateway</h3>
              <p className="text-white/60 text-[11px] mb-3 leading-tight max-w-sm">
                Secure access for managing the trust's spiritual and financial integrity. All activities are recorded for transparency.
              </p>


              <div className="space-y-4">

                {/* Top Collector Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 px-5 py-4 border border-orange-400/20">

                  <div className="absolute right-0 top-0 opacity-10">
                    <ShieldCheck className="w-40 h-40 translate-x-6 -translate-y-6" />
                  </div>

                  <div className="relative z-10">

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] font-black text-orange-100 mb-2">
                          Collector Performance
                        </p>

                        <h3 className="text-3xl font-black text-white italic">
                          Top Collector
                        </h3>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="flex items-end justify-between">

                      <div>
                        <h2 className="text-2xl font-black text-white mb-1">
                          {stats?.topCollector?.name || 'N/A'}
                        </h2>

                        <div className="flex items-center gap-1 text-orange-100">
                          <IndianRupee className="w-3 h-3" />
                          <span className="font-bold text-lg">
                            {stats?.topCollector?.totalAmount?.toLocaleString('en-IN') || 0} Collected
                          </span>
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                        <p className="text-[9px] uppercase tracking-widest text-orange-100 mb-1 font-black">
                          Monthly Growth
                        </p>

                        <div className="flex items-center gap-1 text-white font-black text-lg">
                          <TrendingUp className="w-4 h-4" />
                          {stats?.monthlyGrowth || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-3 gap-4">

                  {/* Monthly Collection */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all">

                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-3">
                      Monthly Collection
                    </p>

                    <div className="flex items-center gap-1 text-white mb-2">
                      <IndianRupee className="w-5 h-5 text-orange-300" />

                      <span className="text-2xl font-black">
                        {stats?.monthlyCollection >= 100000 
                          ? `${(stats.monthlyCollection / 100000).toFixed(1)}L` 
                          : stats?.monthlyCollection?.toLocaleString('en-IN') || 0}
                      </span>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-orange-300 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((stats?.monthlyCollection / (stats?.totalDonationAmount || 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Active Collectors */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all">

                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-3">
                      Active Collectors
                    </p>

                    <h3 className="text-3xl font-black text-white mb-2">
                      {stats?.activeCollectorsCount || 0}
                    </h3>

                    <div className="flex items-center gap-2 text-green-300 text-xs font-bold">
                      <div className="w-2 h-2 rounded-full bg-green-300"></div>
                      Currently Working
                    </div>
                  </div>

                  {/* Inactive Collectors */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all">

                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-3">
                      Inactive Collectors
                    </p>

                    <h3 className="text-3xl font-black text-white mb-2">
                      {String(stats?.inactiveCollectorsCount || 0).padStart(2, '0')}
                    </h3>

                    <div className="flex items-center gap-2 text-red-300 text-xs font-bold">
                      <div className="w-2 h-2 rounded-full bg-red-300"></div>
                      Need Attention
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button className="spiritual-card p-6 flex flex-col items-center gap-2 bg-white border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-secondary leading-none mb-1">{stats?.totalUsers || 0}</p>
                <span className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.15em]">Registered Devotees</span>
              </div>
            </button>
            <button className="spiritual-card p-6 flex flex-col items-center gap-2 bg-white border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <IndianRupee className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-secondary leading-none mb-1">{stats?.totalDonationsCount || 0}</p>
                <span className="text-[10px] font-black text-secondary/40 uppercase tracking-[0.15em]">Donation Streams</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
