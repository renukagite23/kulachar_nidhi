'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Loader2, IndianRupee, QrCode, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLanguage } from '@/lib/LanguageContext';
import confetti from 'canvas-confetti';

interface QuickDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
}

export default function QuickDonationModal({ isOpen, onClose, amount }: QuickDonationModalProps) {
  const { t, lang } = useLanguage();
  const { user } = useSelector((state: RootState) => state.auth);
  const [copied, setCopied] = useState(false);
  const [success, setSuccess] = useState(false);

  const upiId = "ekveeradevi@upi";
  const payeeName = "Shri Kulaswamini Ekavira Devi Mandir Trust";
  const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=Donation`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(upiUrl)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    setSuccess(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E65100', '#D4AF37']
    });
    setTimeout(() => {
      onClose();
      setSuccess(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-[400px] overflow-hidden"
          >
            {/* Header */}
            <div className={`p-6 text-center ${success ? 'bg-green-50' : 'bg-orange-50'}`}>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm mb-3">
                {success ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                ) : (
                  <QrCode className="w-8 h-8 text-orange-600" />
                )}
              </div>
              
              <h2 className="text-xl font-black text-gray-900">
                {success ? 'Payment Recorded' : 'Scan & Donate'}
              </h2>
              <p className="text-xs font-bold text-orange-600 mt-1 uppercase tracking-widest">
                Amount: ₹{amount}
              </p>
            </div>

            {/* QR Scanner Content */}
            <div className="p-6">
              {success ? (
                <div className="text-center space-y-6 py-4">
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Thank you for your generous contribution of ₹{amount}. <br/>
                    May Goddess Ekveera Devi's blessings be with you always.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-green-600 font-black uppercase tracking-widest bg-green-50 py-2 rounded-full px-4">
                    <ShieldCheck className="w-3 h-3" /> Securely Processed
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  {/* QR Image Wrapper */}
                  <div className="relative p-2 bg-white rounded-2xl border-2 border-dashed border-orange-200 shadow-inner group">
                    <img
                      src={qrCodeUrl}
                      alt="Donation QR Code"
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
                    />
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-all rounded-xl" />
                  </div>

                  <div className="text-center space-y-4 w-full">
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                      Scan this QR code using any UPI app (PhonePe, Google Pay, BHIM, etc.) to complete your donation of ₹{amount}.
                    </p>

                    {/* UPI ID Copy */}
                    <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
                      <div className="flex flex-col items-start translate-y-[1px]">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Pay to UPI ID</span>
                        <span className="text-xs font-bold text-gray-700">{upiId}</span>
                      </div>
                      <button 
                        onClick={handleCopyUPI}
                        className="p-2 rounded-lg hover:bg-orange-100 text-orange-600 transition-all active:scale-95"
                      >
                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={handleDone}
                      className="w-full bg-orange-600 text-white h-14 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group"
                    >
                      <Sparkles className="w-5 h-5" />
                      I Have Scanned & Paid
                    </button>

                    <div className="flex items-center justify-center gap-2 opacity-50">
                      <img src="/phonepe.png" alt="UPI" className="h-4 object-contain grayscale" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <img src="/gpay.png" alt="UPI" className="h-4 object-contain grayscale" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <img src="/bhim.png" alt="UPI" className="h-4 object-contain grayscale" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Footer */}
            {!success && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Verified Trust Payment Gateway
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
