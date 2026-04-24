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
    <div id="receipt-content" className="w-[800px] p-12 bg-white border-[12px] border-[#d4af37] relative overflow-hidden text-[#4a3728]">
      {/* Background Ornament */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 grayscale pointer-events-none -mr-10 -mt-10">
        <img src="/devi.png" alt="Devi" />
      </div>

      <div className="text-center mb-10 border-b-4 border-[#ff9933] pb-8">
        <img src="/devi.png" alt="Trust Logo" className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-[#d4af37]" />
        <h1 className="text-4xl font-black text-[#800000] uppercase tracking-widest">Kuldaivat Trust</h1>
        <p className="text-[#ff9933] font-bold mt-1 tracking-widest">Digital Donation Receipt</p>
        <p className="text-sm mt-2 font-semibold">Reg. No: MAH/1234/TRUST | PAN: ABCDT1234E</p>
      </div>

      <div className="flex justify-between mb-10 text-lg">
        <div>
          <p className="font-bold text-[#800000]">Receipt No:</p>
          <p className="font-mono">{donation.receiptNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-[#800000]">Date:</p>
          <p>{formatDate(donation.donationDate)}</p>
        </div>
      </div>

      <div className="space-y-8 mb-12 py-8 px-6 bg-[#fffdf5] rounded-2xl border-2 border-[#d4af37]/20">
        <div className="flex border-b border-[#d4af37]/10 pb-4">
          <span className="w-1/3 font-bold text-[#800000]">Donor Name:</span>
          <span className="flex-1 text-xl font-bold uppercase">{donation.donorName}</span>
        </div>
        <div className="flex border-b border-[#d4af37]/10 pb-4">
          <span className="w-1/3 font-bold text-[#800000]">Mobile:</span>
          <span className="flex-1 font-semibold">{donation.mobileNumber}</span>
        </div>
        <div className="flex border-b border-[#d4af37]/10 pb-4">
          <span className="w-1/3 font-bold text-[#800000]">Purpose:</span>
          <span className="flex-1 font-semibold">{donation.reason}</span>
        </div>
        <div className="flex pt-4">
          <span className="w-1/3 font-bold text-[#800000]">Amount:</span>
          <span className="flex-1 text-3xl font-black text-[#ff9933]">₹{donation.amount}/-</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20 mt-20 items-end">
        <div className="text-center">
            <div className="h-20 flex items-center justify-center italic text-[#4a3728]/40">
                [Signature Placeholder]
            </div>
            <div className="border-t-2 border-[#4a3728]/20 pt-2 font-bold uppercase text-xs">
                Collector Signature
            </div>
        </div>
        <div className="text-center">
            <div className="h-20 flex items-center justify-center">
                <img src="/devi.png" alt="Chairman Signature" className="h-16 opacity-70" />
            </div>
            <div className="border-t-2 border-[#4a3728]/20 pt-2 font-bold uppercase text-xs">
                Chairman Signature
            </div>
        </div>
      </div>

      <div className="mt-12 text-center text-[10px] text-[#4a3728]/40 italic">
        * This is a computer generated receipt and does not require a physical signature. 
        Income tax benefits under section 80G may apply as per trust registration.
      </div>
    </div>
  );
}
