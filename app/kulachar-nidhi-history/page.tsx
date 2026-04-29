'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { History, Calendar, IndianRupee, Tag, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import Receipt from '@/components/Receipt';
import { downloadPDF } from '@/lib/pdf';
import { motion } from 'framer-motion';

export default function KulacharNidhiHistoryPage() {
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const router = useRouter();

  const handleDownload = async (donation: any) => {
    setDownloading(donation._id);
    setSelectedDonation(donation);

    // Give time for React to render the component for capture
    setTimeout(async () => {
      try {
        await downloadPDF('receipt-content', `Receipt_${donation.receiptNumber || 'Donation'}.pdf`);
      } catch (err) {
        console.error('Download failed', err);
      } finally {
        setDownloading(null);
      }
    }, 200);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/user/donations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setDonations(data);
        }
      } catch (err) {
        console.error('Failed to fetch donations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [isAuthenticated, router, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
          >
            <History className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black text-secondary uppercase tracking-tight"
          >
            Kulachar Nidhi History
          </motion.h1>
          <p className="text-muted-foreground mt-2 font-bold uppercase tracking-[0.2em] text-[10px]">A dedicated record of your spiritual offerings</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="spiritual-card overflow-hidden shadow-2xl border-[#E8E2D9] bg-white rounded-3xl"
        >
          <div className="p-6 md:p-8 bg-muted/20 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-black text-secondary tracking-tight">All Transactions</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Total: {donations.length} {donations.length === 1 ? 'donation' : 'donations'}</p>
              </div>
            </div>

            <div className="flex items-center bg-white border border-border rounded-xl px-4 h-12 w-full md:w-72 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
              <Search className="w-4 h-4 text-muted-foreground/60 mr-3" />
              <input
                type="text"
                placeholder="Search by receipt or date..."
                className="w-full outline-none bg-transparent text-sm placeholder:text-muted-foreground/40 font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {donations.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/10">
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Date</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Receipt No</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Purpose</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-right">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 text-center">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {donations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-muted/5 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-secondary text-sm">
                            {format(new Date(donation.donationDate), 'dd MMM, yyyy')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-black text-muted-foreground/60 tracking-wider bg-muted/50 px-2.5 py-1 rounded-full border border-border/50">
                          {donation.receiptNumber || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2.5">
                          <Tag className="w-3.5 h-3.5 text-primary/40" />
                          <span className="font-bold text-secondary text-xs">{donation.reason || 'General Donation'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${donation.paymentStatus === 'completed'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : 'bg-amber-50 text-amber-600 border border-amber-100'
                          }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${donation.paymentStatus === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`} />
                          {donation.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-black text-secondary">
                        <div className="inline-flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5 text-accent" />
                          <span className="text-sm">{donation.amount.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDownload(donation)}
                          disabled={downloading === donation._id}
                          className="p-2.5 rounded-xl bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all shadow-sm border border-primary/10 disabled:opacity-50"
                          title="Download Receipt"
                        >
                          {downloading === donation._id ? (
                            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          ) : (
                            <Download className="w-4 h-4 shadow-sm" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <History className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <h3 className="text-xl font-black text-secondary tracking-tight">No Transactions Found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">You haven't made any contributions yet. Your spiritual history will appear here.</p>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Hidden Receipt Component for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {selectedDonation && <Receipt donation={selectedDonation} />}
      </div>

      <Footer />
    </div>
  );
}
