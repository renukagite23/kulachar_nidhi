'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function AartiSchedule() {
  const { t } = useLanguage();
  const schedule = [
    { name: t('aarti.morning'), time: '6:45 AM', desc: t('aarti.morning') },
    { name: t('aarti.naivedya'), time: '11:45 AM', desc: t('aarti.naivedya') },
    { name: t('aarti.dhoop'), time: '6:15 PM', desc: t('aarti.dhoop') },
    { name: t('aarti.shej'), time: '7:20 PM', desc: t('aarti.shej') },
  ];

  return (
    <section
      className="relative w-full min-h-[550px] bg-cover bg-left flex items-center"
      style={{
        backgroundImage: "url('/images/aarti_background.png')" // 🔁 your generated image
      }}
    >
      {/* Dark Overlay for readability */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex justify-end">

        <div className="w-full md:w-[45%]">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
              <span className="text-orange-300 font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em]">
                {t('aarti.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {t('aarti.title')}
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