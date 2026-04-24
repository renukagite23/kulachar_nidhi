'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';

export default function AartiSchedule() {
  const schedule = [
    { name: 'सकाळची आरती', time: 'सकाळी 6:45 - 7:30', desc: 'सकाळची आरती — दिवसाची पहिली प्रार्थना (दर्शन बंद)' },
    { name: 'नैवेद्य', time: 'दुपारी 11:45 - 12:20', desc: 'देवतांना पवित्र नैवेद्य अर्पण (दर्शन बंद)' },
    { name: 'सायंकाळची धूप आरती', time: 'सायंकाळी 6:15 - 6:40', desc: 'धूप व दीपांसह सायंकाळची आरती (दर्शन बंद)' },
    { name: 'सायंकाळची आरती', time: 'रात्री 7:20 - 7:45', desc: 'सायंकाळची समारोप आरती (दर्शन बंद)' },
  ];

  return (
    <section id="darshan" className="py-24 maroon-bg relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <img src="/devi.png" alt="Ornaments" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5 pointer-events-none rotate-180">
        <img src="/devi.png" alt="Ornaments" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#d4af37] mb-4 tracking-tight">दैनिक आरती वेळापत्रक</h2>
          <p className="text-white/60 uppercase tracking-widest text-sm font-bold">दिवसभरातील दिव्य आरती सोहळ्यांत आमच्यासोबत सामील व्हा</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 divide-y divide-[#d4af37]/20">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-3 bg-[#300000] p-6 text-[#d4af37] font-black uppercase text-xs tracking-widest">
              <div>आरती</div>
              <div>वेळ</div>
              <div>वर्णन</div>
            </div>

            {/* Table Rows */}
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 p-6 md:p-8 hover:bg-white/5 transition-colors gap-4 md:gap-0"
              >
                <div className="text-white font-bold text-lg flex items-center gap-2">
                  <Star className="w-4 h-4 gold-text md:hidden" />
                  {item.name}
                </div>
                <div className="gold-text font-black text-lg md:text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 md:hidden" />
                  {item.time}
                </div>
                <div className="text-white/60 text-sm italic flex items-center">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="spiritual-button-gold mx-auto">
            संपूर्ण दर्शन वेळापत्रक पहा
          </button>
        </div>
      </div>
    </section>
  );
}
