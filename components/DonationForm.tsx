'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, User, Phone, MapPin, Gift, ChevronRight, CheckCircle2, QrCode, Download, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import Receipt from './Receipt';
import { downloadPDF } from '@/lib/pdf';
import axios from 'axios';

export default function DonationForm() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '501',
    customAmount: '',
    reason: 'Birthday',
    customReason: '',
    donorName: '',
    mobileNumber: '',
    address: '',
  });

  const amounts = ['501', '1001', '2100', '5001'];
  const reasons = ['Birthday', 'Navratri', 'Javal (Munji)', 'Custom'];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const [lastDonation, setLastDonation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalAmount = formData.amount || formData.customAmount;
      const res = await axios.post('/api/donations', {
        ...formData,
        amount: Number(finalAmount),
      });

      if (res.data.success) {
        setLastDonation(res.data.data);
        setLoading(false);
        setStep(4);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff9933', '#d4af37', '#800000']
        });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to process donation. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (lastDonation) {
      downloadPDF('receipt-content', `Receipt_${lastDonation.receiptNumber.replace(/\//g, '_')}.pdf`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="spiritual-card p-8 md:p-12 relative overflow-hidden">
        {/* Background Devi Image Subtle */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none -mr-20 -mt-20">
          <img src="/devi.png" alt="Devi" className="w-full h-full object-contain" />
        </div>

        <div className="flex justify-between items-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= s ? 'spiritual-gradient text-white shadow-lg' : 'bg-[#d4af37]/10 text-[#d4af37]'
                }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-500 ${step > s ? 'spiritual-gradient' : 'bg-[#d4af37]/10'
                  }`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#800000]">{t.donation.amount}</h2>
                <p className="text-[#4a3728]/60 mt-2">Choose your contribution to support the trust</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFormData({ ...formData, amount: amt, customAmount: '' })}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${formData.amount === amt
                      ? 'border-[#ff9933] bg-[#ff9933]/5 shadow-inner scale-105'
                      : 'border-[#d4af37]/20 hover:border-[#ff9933]/40'
                      }`}
                  >
                    <span className={`text-2xl font-bold ${formData.amount === amt ? 'text-[#ff9933]' : 'text-[#4a3728]'}`}>
                      ₹{amt}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-[#ff9933]" />
                </div>
                <input
                  type="number"
                  placeholder={t.donation.customAmount}
                  value={formData.customAmount}
                  onChange={(e) => setFormData({ ...formData, customAmount: e.target.value, amount: '' })}
                  className="spiritual-input pl-12"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-[#4a3728]">{t.donation.reason}</label>
                <div className="grid grid-cols-2 gap-4">
                  {reasons.map((r) => (
                    <button
                      key={r}
                      onClick={() => setFormData({ ...formData, reason: r })}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${formData.reason === r
                        ? 'border-[#ff9933] bg-[#ff9933]/5'
                        : 'border-[#d4af37]/20'
                        }`}
                    >
                      <Gift className={`w-5 h-5 ${formData.reason === r ? 'text-[#ff9933]' : 'text-[#d4af37]'}`} />
                      <span className="font-semibold">{r}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#d4af37]/20 bg-[#fffdf5]">
                <input
                  type="checkbox"
                  id="recurring"
                  className="w-5 h-5 accent-[#ff9933]"
                  checked={formData.amount === 'recurring'} // Mocking the state for now
                  onChange={() => { }}
                />
                <label htmlFor="recurring" className="font-bold text-[#4a3728]">Make this a recurring monthly donation</label>
              </div>

              <button onClick={handleNext} className="spiritual-button w-full">
                {t.donation.submit} <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#800000]">{t.donation.donorDetails}</h2>
                <p className="text-[#4a3728]/60 mt-2">Information for the donation receipt</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff9933] w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.donation.name}
                    className="spiritual-input pl-12"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff9933] w-5 h-5" />
                  <input
                    type="tel"
                    placeholder={t.donation.mobile}
                    className="spiritual-input pl-12"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-[#ff9933] w-5 h-5" />
                  <textarea
                    placeholder={t.donation.address}
                    className="spiritual-input pl-12 h-32 pt-3"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 p-4 rounded-xl border-2 border-[#d4af37]/30 font-bold text-[#4a3728]">
                  Back
                </button>
                <button onClick={handleNext} className="spiritual-button flex-[2]">
                  Next Step <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#800000]">{t.donation.paymentTitle}</h2>
                <p className="text-[#4a3728]/60 mt-2">Complete your donation securely</p>
              </div>

              <div className="bg-[#fffdf5] border-2 border-[#d4af37]/30 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#d4af37]/10 pb-4">
                  <span className="font-semibold text-[#4a3728]">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-[#ff9933]">₹{formData.amount || formData.customAmount}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#d4af37]/10 pb-4">
                  <span className="font-semibold text-[#4a3728]">Donor:</span>
                  <span className="font-bold text-[#800000]">{formData.donorName}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl shadow-lg border border-[#d4af37]/20">
                <QrCode className="w-48 h-48 text-[#4a3728]" />
                <div className="text-center">
                  <p className="font-bold text-[#800000]">Kuldaivat Trust Bank Details</p>
                  <p className="text-sm text-[#4a3728]/60">Bank: HDFC Bank | A/C: 1234567890</p>
                  <p className="text-sm text-[#4a3728]/60">IFSC: HDFC0001234</p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="spiritual-button w-full h-16 text-lg"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Confirm Payment & Generate Receipt</>
                )}
              </button>
            </motion.div>
          )}

          {step === 4 && lastDonation && (
            <motion.div
              key="step4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-10 py-4"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 spiritual-gradient rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle2 className="text-white w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-[#800000]">{t.receipt.thankYou}</h2>
                  <p className="text-[#4a3728]/70 mt-1">Your divine contribution has been recorded.</p>
                </div>
              </div>

              {/* Live Preview of Receipt */}
              <div className="transform scale-[0.6] origin-top -mb-[350px] shadow-2xl">
                <Receipt donation={lastDonation} />
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
                <button onClick={handleDownload} className="spiritual-button px-10 gap-3">
                  <Download className="w-5 h-5" /> {t.receipt.download}
                </button>
                <button onClick={() => window.print()} className="px-10 py-3 rounded-xl border-2 border-[#ff9933] text-[#ff9933] font-bold hover:bg-[#ff9933]/5 transition-all flex items-center justify-center gap-3">
                  <Printer className="w-5 h-5" /> {t.receipt.print}
                </button>
              </div>

              <div className="pt-8">
                <button onClick={() => setStep(1)} className="text-[#4a3728]/60 font-bold hover:text-[#ff9933] transition-all">
                  ← Back to Home
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
