'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { History, Calendar, IndianRupee, Tag, CheckCircle2, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import Receipt from '@/components/Receipt';
import { downloadPDF } from '@/lib/pdf';

export default function DonationHistoryPage() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <History className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black text-secondary">Donation History</h1>
          <p className="text-muted-foreground mt-2 font-medium tracking-wide uppercase text-[10px]">Your spiritual contributions to Kuldaivat Trust</p>
        </div>

        <div className="spiritual-card overflow-hidden shadow-xl border-[#E8E2D9]">
          <div className="p-6 bg-muted/30 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-secondary">All Transactions</h2>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">Total: {donations.length} donations</p>
            </div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 h-10 w-full md:w-64 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />

              <input
                type="text"
                placeholder="Search..."
                className="w-full outline-none bg-transparent text-sm placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            {donations.length > 0 ? (
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Receipt No</th>
                    <th>Purpose</th>
                    <th>Status</th>
                    <th className="text-right">Amount</th>
                    <th className="text-center">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span className="font-bold text-secondary text-xs">
                            {format(new Date(donation.donationDate), 'dd MMM, yyyy')}
                          </span>
                        </div>
                      </td>
                      <td>
                        <code className="text-[10px] font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                          {donation.receiptNumber || 'N/A'}
                        </code>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-primary/50" />
                          <span className="capitalize font-medium text-xs">{donation.reason}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${donation.paymentStatus === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                          }`}>
                          {donation.paymentStatus}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1 font-black text-secondary">
                          <IndianRupee className="w-3 h-3 text-accent" />
                          {donation.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => handleDownload(donation)}
                          disabled={downloading === donation._id}
                          className="p-2 rounded-lg bg-primary/5 text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                          title="Download Receipt"
                        >
                          {downloading === donation._id ? (
                            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center">
                <h3 className="text-lg font-bold text-secondary">No Donations Found</h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Hidden Receipt Component for PDF Generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {selectedDonation && <Receipt donation={selectedDonation} />}
      </div>

      <Footer />
    </div>
  );
}
