'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IndianRupee, User, Phone, MapPin, Gift, ChevronRight, CheckCircle2, QrCode, Download, Printer, ArrowLeft, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import Receipt from './Receipt';
import { downloadPDF } from '@/lib/pdf';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addDonation } from '@/redux/slices/donationSlice';
import { updateUser } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function DonationForm() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '501',
    customAmount: '',
    reason: 'वाढदिवस',
    customReason: '',
    donorName: user?.name || '',
    mobileNumber: user?.phone || '',
    address: '',
  });

  // Update form data if user logs in while form is open
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        donorName: prev.donorName || user.name,
        mobileNumber: prev.mobileNumber || user.phone || '',
      }));
    }
  }, [user]);

  const amounts = ['501', '1001', '2100', '5001'];
  const reasons = [
    { key: 'birthday', label: t('donation.reasons.birthday') },
    { key: 'navratri', label: t('donation.reasons.navratri') },
    { key: 'munji', label: t('donation.reasons.munji') },
    { key: 'other', label: t('donation.reasons.other') },
  ];

  const handleNext = () => {
    if (step === 1 && !isAuthenticated) {
      router.push('/login');
      return;
    }
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);

  const [lastDonation, setLastDonation] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setLoading(true);

    try {
      const finalAmount = formData.amount || formData.customAmount;
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(finalAmount),
          donorName: formData.donorName, // Explicitly pass for schema
        }),
      });

      const data = await res.json();

      if (data.success) {
        setLastDonation(data.donation);
        
        // Update local state
        dispatch(addDonation(data.donation));
        dispatch(updateUser({ 
          totalDonations: (user?.totalDonations || 0) + Number(finalAmount) 
        }));

        setLoading(false);
        setStep(4);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E65100', '#D4AF37', '#4E342E']
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
    <div className="max-w-xl mx-auto py-6">
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-border shadow-2xl relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

        {/* Step Indicator - Compact & Unique */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-xs font-black transition-all z-10 ${step >= s ? 'bg-primary text-white shadow-lg' : 'bg-muted text-muted-foreground'
                  }`}
              >
                {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">टप्पा {step}/३</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-secondary">{t('donation.amount')}</h2>
                <p className="text-muted-foreground text-xs font-medium">{t('donation.subtitle')}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFormData({ ...formData, amount: amt, customAmount: '' })}
                    className={`py-4 px-4 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${formData.amount === amt
                        ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10'
                        : 'border-border text-secondary/60 hover:border-primary/40'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black">₹{amt}</span>
                      {formData.amount === amt && <Heart className="w-4 h-4 text-primary fill-primary" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="number"
                  placeholder={t('donation.custom')}
                  value={formData.customAmount}
                  onChange={(e) => setFormData({ ...formData, customAmount: e.target.value, amount: '' })}
                  className="spiritual-input !pl-12 !h-14 font-bold text-lg"
                />
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t('donation.reason')}</label>
                <div className="flex flex-wrap gap-2">
                  {reasons.map((r) => (
                    <button
                      key={r.key}
                      onClick={() => setFormData({ ...formData, reason: r.label })}
                      className={`px-4 py-2 rounded-xl border text-[11px] font-bold transition-all ${formData.reason === r.label
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-border text-secondary/60 hover:border-primary/40'
                        }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleNext} className="spiritual-button w-full h-14 text-base tracking-wide">
                {t('donation.payment_title')} <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-black text-secondary">{t('donation.donor_details')}</h2>
                <p className="text-muted-foreground text-xs font-medium">{t('donation.receipt_desc')}</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="text"
                    placeholder={t('donation.name')}
                    className="spiritual-input !pl-12 !h-12 font-bold"
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4 group-focus-within:scale-110 transition-transform" />
                  <input
                    type="tel"
                    placeholder={t('donation.mobile')}
                    className="spiritual-input !pl-12 !h-12 font-bold"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-primary w-4 h-4" />
                  <textarea
                    placeholder={t('donation.address')}
                    className="spiritual-input !pl-12 !h-24 pt-3 font-bold"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 spiritual-button-outline h-14">
                  <ArrowLeft className="w-4 h-4 mr-2" /> मागे
                </button>
                <button onClick={handleNext} className="flex-[2] spiritual-button h-14">
                  पुढील पायरी <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-black text-secondary">पेमेंट पूर्ण करा</h2>
                <p className="text-muted-foreground text-xs font-medium">आपली देणगी सुरक्षितपणे जमा करा.</p>
              </div>

              <div className="bg-muted/50 rounded-3xl p-6 flex justify-between items-center border border-border">
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('donation.total')}</p>
                  <p className="text-4xl font-black text-primary">₹{formData.amount || formData.customAmount}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">{t('donation.donor_details')}</p>
                  <p className="text-xs font-bold text-secondary">{formData.donorName}</p>
                </div>
              </div>

              <div className="relative aspect-square max-w-[200px] mx-auto bg-white p-4 rounded-3xl shadow-xl border border-border group overflow-hidden">
                <QrCode className="w-full h-full text-secondary opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[9px] font-black text-primary uppercase tracking-tighter">Scan to Pay</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs font-bold text-secondary">HDFC Bank | A/C: 1234567890</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">IFSC: HDFC0001234</p>
              </div>

              <div className="flex gap-4">
                <button onClick={handleBack} className="flex-1 spiritual-button-outline h-14">मागे</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-[2] spiritual-button h-14 shadow-2xl shadow-primary/20"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>{t('donation.confirm')}</>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && lastDonation && (
            <motion.div
              key="step4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="space-y-3">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-secondary">{t('donation.thank_you')}</h2>
                  <p className="text-muted-foreground text-sm font-medium">{t('donation.receipt_desc')}</p>
                </div>
              </div>

              <div className="transform scale-[0.65] md:scale-[0.8] origin-top -mb-[260px] md:-mb-[120px] shadow-2xl rounded-3xl overflow-hidden border border-border">
                <Receipt donation={lastDonation} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 pt-10">
                <button onClick={handleDownload} className="spiritual-button px-8 h-12 text-xs gap-2">
                  <Download className="w-4 h-4" /> {t('donation.download')}
                </button>
                <button onClick={() => window.print()} className="spiritual-button-outline px-8 h-12 text-xs gap-2">
                  <Printer className="w-4 h-4" /> {t('donation.print')}
                </button>
              </div>

              <div className="pt-4">
                <button onClick={() => setStep(1)} className="text-[10px] font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-widest border-b border-border hover:border-primary">
                  {t('donation.another')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
