'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';

export default function AartiSchedule() {
  const schedule = [
    { name: 'सकाळची आरती', time: '6:45 AM', desc: 'सकाळची मंगल आरती', icon: '🌅' },
    { name: 'नैवेद्य सोहळा', time: '11:45 AM', desc: 'पवित्र भोग अर्पण', icon: '🙏' },
    { name: 'धूप आरती', time: '6:15 PM', desc: 'सायंकाळची धूप सेवा', icon: '🕯️' },
    { name: 'शेज आरती', time: '7:20 PM', desc: 'रात्रीची सांगता आरती', icon: '🌙' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#FFF] border-y border-orange-100">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <p className="text-orange-600 text-[11px] font-bold tracking-[0.2em] uppercase">
              पवित्र सेवा
            </p>
            <h2 className="text-3xl font-black text-gray-800 mt-1">
              आरती वेळापत्रक
            </h2>
          </div>

          <button className="text-xs font-bold text-gray-500 hover:text-orange-600 transition">
            विस्तृत वेळापत्रक →
          </button>
        </div>

        {/* Horizontal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-md border border-orange-100 rounded-3xl p-5 shadow-md hover:shadow-xl hover:border-orange-300 transition-all duration-300">

                {/* Top Icon + Time */}
                <div className="flex justify-between items-start">
                  <div className="text-3xl">{item.icon}</div>

                  <span className="bg-orange-100 text-orange-700 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>

                {/* Title */}
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 text-sm group-hover:text-orange-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-5 pt-3 border-t border-orange-100 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    मुख्य गाभारा
                  </span>

                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition">
                    →
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-orange-200/0 group-hover:bg-orange-200/10 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}