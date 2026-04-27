'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AartiSchedule() {
  const schedule = [
    { name: 'सकाळची आरती', time: '6:45 AM', desc: 'सकाळची मंगल आरती' },
    { name: 'नैवेद्य सोहळा', time: '11:45 AM', desc: 'पवित्र भोग अर्पण' },
    { name: 'धूप आरती', time: '6:15 PM', desc: 'सायंकाळची धूप सेवा' },
    { name: 'शेज आरती', time: '7:20 PM', desc: 'रात्रीची सांगता आरती' },
  ];

  return (
    <section
      className="relative w-full min-h-[550px] bg-cover bg-left flex items-center"
      style={{
        backgroundImage: "url('/images/aarti_bg.png')" // 🔁 your generated image
      }}
    >
      {/* Dark Overlay for readability */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex justify-end">

        <div className="w-full md:w-[45%]">

          {/* Header */}
          <div className="mb-6 text-white">
            <p className="text-orange-300 text-[11px] font-bold tracking-[0.2em] uppercase">
              पवित्र सेवा
            </p>
            <h2 className="text-2xl md:text-3xl font-black mt-1">
              आरती वेळापत्रक
            </h2>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-orange-200 hover:border-orange-400 hover:shadow-xl transition-all">

                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-800">
                      {item.name}
                    </h3>

                    <span className="text-orange-600 text-xs font-bold">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-500 mt-1">
                    {item.desc}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}