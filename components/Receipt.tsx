'use client';

import React from 'react';
import { formatDate } from '@/lib/utils';

interface ReceiptProps {
  donation: {
    donorName: string;
    amount: number;
    receiptNumber: string;
    donationDate: string;
    reason: string;
    mobileNumber: string;
  };
}

export default function Receipt({ donation }: ReceiptProps) {
  return (
    <div id="receipt-content" className="w-[800px] p-16 bg-[#FFFDF9] border-[1px] border-secondary relative overflow-hidden text-secondary print:shadow-none print:border-secondary">
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          #receipt-content {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Subtle Background Ornament */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.05] pointer-events-none -mr-20 -mt-20">
        <img src="/devi.png" alt="Devi" className="w-full h-full object-contain" />
      </div>

      {/* Central Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <img src="/devi.png" alt="Watermark" className="w-[400px] object-contain" />
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-16 border-b border-border pb-10 relative z-10">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl border border-primary/20">
            <img src="/devi.png" alt="Trust Logo" className="w-full h-full object-contain" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-black tracking-tight text-secondary">KULDAIVAT TRUST</h1>
            <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mt-1">Digital Donation Receipt</p>
            <p className="text-[10px] text-muted-foreground mt-2 font-black uppercase tracking-wider">Reg: MAH/1234/TRUST | PAN: ABCDT1234E</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Receipt Number</p>
          <p className="font-mono text-xl font-bold text-primary">{donation.receiptNumber}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-12 mb-16 relative z-10">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Donor Name</p>
            <p className="text-xl font-black text-secondary uppercase tracking-tight">{donation.donorName}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Mobile Number</p>
            <p className="text-base font-bold text-secondary">{donation.mobileNumber}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Donation Date</p>
            <p className="text-base font-bold text-secondary">{formatDate(donation.donationDate)}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Purpose of Donation</p>
            <p className="text-base font-bold text-secondary">{donation.reason}</p>
          </div>
        </div>
      </div>

      {/* Amount Section */}
      <div className="bg-primary/5 border border-primary/10 rounded-3xl p-10 mb-16 flex justify-between items-center relative z-10">
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Total Amount Received</p>
          <p className="text-xs font-bold text-secondary/60 italic">Your contribution supports our spiritual & social initiatives.</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-primary">₹{donation.amount}.00</p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="grid grid-cols-2 gap-24 mt-12 items-end relative z-10">
        <div className="text-center">
          <div className="h-20 flex items-center justify-center italic text-muted-foreground/30 text-[10px] font-bold uppercase tracking-widest">
            [Digitally Verified]
          </div>
          <div className="border-t border-border pt-3 text-[10px] font-black text-secondary uppercase tracking-widest">
            Collector Signature
          </div>
        </div>
        <div className="text-center">
          <div className="h-20 flex items-center justify-center">
            <img src="/devi.png" alt="Chairman Signature" className="h-16 object-contain opacity-60" />
          </div>
          <div className="border-t border-border pt-3 text-[10px] font-black text-secondary uppercase tracking-widest">
            Chairman / Trustee
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-16 pt-8 border-t border-border text-center relative z-10">
        <p className="text-[10px] text-muted-foreground font-bold tracking-tight leading-relaxed max-w-lg mx-auto">
          This is a computer-generated document and does not require a physical signature.
          All donations to Kuldaivat Trust are eligible for tax benefits under section 80G of the Income Tax Act.
        </p>
      </div>
    </div>
  );
}
