'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, MapPin, ChevronRight } from 'lucide-react';

export default function AartiSchedule() {
  const schedule = [
    { name: 'सकाळची आरती', time: '6:45 AM', desc: 'सकाळची मंगल आरती', icon: '🌅' },
    { name: 'नैवेद्य सोहळा', time: '11:45 AM', desc: 'पवित्र भोग अर्पण', icon: '🙏' },
    { name: 'धूप आरती', time: '6:15 PM', desc: 'सायंकाळची धूप सेवा', icon: '🕯️' },
    { name: 'शेज आरती', time: '7:20 PM', desc: 'रात्रीची सांगता आरती', icon: '🌙' },
  ];

  return (
    <section id="darshan" className="py-16 bg-[#FDFBF7] relative overflow-hidden border-y border-border/50">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">पवित्र सेवा</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-secondary tracking-tight">आरती वेळापत्रक</h2>
          </div>
          <p className="text-muted-foreground text-xs font-medium max-w-xs md:text-right">
            दिव्य आरती सोहळ्यांत आमच्यासोबत सामील व्हा आणि देवीची कृपा प्राप्त करा.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white border border-border p-4 rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="text-2xl">{item.icon}</div>
                <div className="bg-primary/5 text-primary text-[11px] font-black px-2.5 py-1 rounded-lg">
                  {item.time}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-secondary text-sm group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/50 flex justify-between items-center">
                <span className="text-[9px] font-bold text-secondary/40 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> मुख्य गाभारा
                </span>
                <ChevronRight className="w-3 h-3 text-border group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 text-[10px] font-bold text-secondary/60 hover:text-primary transition-all group">
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-all">
              <Clock className="w-3 h-3" />
            </div>
            विस्तृत वेळापत्रक पहा
          </button>
        </div>
      </div>
    </section>
  );
}
