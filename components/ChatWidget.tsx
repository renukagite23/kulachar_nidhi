'use client';

import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function ChatWidget() {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-[60] flex flex-col items-end group"
    >
      <button className="relative flex flex-col items-center gap-1 bg-[#8B1A1A] hover:bg-[#A52A2A] text-white p-4 px-6 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white/20">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all -z-10" />

        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            {lang === 'mr' ? 'जय भवानी' : 'JAI BHAVANI'}
          </span>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>

        <div className="flex items-center gap-2 mt-1">
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="text-xs font-black uppercase tracking-widest">
            {lang === 'mr' ? 'चॅट करा' : 'CHAT NOW'}
          </span>
        </div>
      </button>

      {/* Status indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg" />
    </motion.div>
  );
}
